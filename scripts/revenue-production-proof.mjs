import { createDatabasePool } from "../packages/database/dist/index.js";

const apiBaseUrl = (process.env.FYSEN_PUBLIC_API_URL?.trim() || "https://fysen-api.vercel.app").replace(/\/$/, "");
const webBaseUrl = (process.env.FYSEN_PUBLIC_WEB_URL?.trim() || "https://fysen-matsgran-8572s-projects.vercel.app").replace(/\/$/, "");
const ahaApiBaseUrl = (process.env.AHA_PUBLIC_API_URL?.trim() || "https://aha-canonical-api-production.redground-9c6e20c2.northeurope.azurecontainerapps.io").replace(/\/$/, "");
const ahaWebBaseUrl = (process.env.AHA_PUBLIC_WEB_URL?.trim() || "https://paradispartiet.github.io/AHA-EchoNet").replace(/\/$/, "");
const claimRestaurantSlug = process.env.FYSEN_PROOF_CLAIM_RESTAURANT_SLUG?.trim() || "punjab-tandoori-gronland-oslo";
const ahaCallbackUrl = `${webBaseUrl}/api/aha/callback`;

function fail(message, details = null) {
  const suffix = details === null ? "" : `: ${JSON.stringify(details)}`;
  throw new Error(`${message}${suffix}`);
}

async function fetchWithProofTimeout(url, init = {}) {
  return fetch(url, {
    cache: "no-store",
    headers: {
      accept: "*/*",
      "user-agent": "FysenRevenueProductionProof/1.0",
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(10_000),
    ...init,
  });
}

async function verifyRevenueSchema(pool) {
  const requiredTables = [
    "restaurant_claims",
    "restaurant_access_grants",
    "restaurant_owned_profiles",
    "restaurant_claim_audit_log",
    "restaurant_pro_setup_tokens",
    "restaurant_pro_sessions",
    "restaurant_pro_access_audit_log",
    "aha_consumer_sessions",
    "min_mat_items",
    "aha_analysis_handoffs",
    "aha_consumer_audit_log",
  ];

  const tableResult = await pool.query(
    `SELECT expected.table_name,
            to_regclass('fysen.' || expected.table_name) IS NOT NULL AS materialized
       FROM unnest($1::text[]) AS expected(table_name)
      ORDER BY expected.table_name`,
    [requiredTables],
  );
  const missingTables = tableResult.rows.filter((row) => row.materialized !== true).map((row) => row.table_name);
  if (missingTables.length > 0) fail("Revenue production schema is missing required tables", missingTables);

  const tokenTables = [
    "restaurant_pro_setup_tokens",
    "restaurant_pro_sessions",
    "aha_consumer_sessions",
    "aha_analysis_handoffs",
  ];
  const tokenColumnResult = await pool.query(
    `SELECT table_name,
            array_agg(column_name ORDER BY ordinal_position) AS columns
       FROM information_schema.columns
      WHERE table_schema = 'fysen'
        AND table_name = ANY($1::text[])
      GROUP BY table_name
      ORDER BY table_name`,
    [tokenTables],
  );

  const columnsByTable = new Map(tokenColumnResult.rows.map((row) => [row.table_name, row.columns]));
  const forbiddenRawTokenColumns = new Set([
    "token",
    "setup_token",
    "session_token",
    "handoff_token",
    "access_token",
    "refresh_token",
    "authorization_code",
  ]);
  for (const tableName of tokenTables) {
    const columns = columnsByTable.get(tableName);
    if (!Array.isArray(columns)) fail(`Revenue production schema is missing ${tableName} columns`);
    if (!columns.includes("token_hash")) fail(`${tableName} is missing token_hash`);
    const forbiddenRawColumns = columns.filter((column) => forbiddenRawTokenColumns.has(column));
    if (forbiddenRawColumns.length > 0) fail(`${tableName} exposes a raw token column`, forbiddenRawColumns);
  }

  const consumerTables = ["aha_consumer_sessions", "min_mat_items", "aha_analysis_handoffs", "aha_consumer_audit_log"];
  const proTables = ["restaurant_access_grants", "restaurant_pro_sessions", "restaurant_claims"];
  const crossDomainForeignKeys = await pool.query(
    `SELECT source.relname AS source_table,
            target.relname AS target_table,
            constraint_row.conname
       FROM pg_constraint AS constraint_row
       JOIN pg_class AS source ON source.oid = constraint_row.conrelid
       JOIN pg_namespace AS source_namespace ON source_namespace.oid = source.relnamespace
       JOIN pg_class AS target ON target.oid = constraint_row.confrelid
       JOIN pg_namespace AS target_namespace ON target_namespace.oid = target.relnamespace
      WHERE constraint_row.contype = 'f'
        AND source_namespace.nspname = 'fysen'
        AND target_namespace.nspname = 'fysen'
        AND (
          (source.relname = ANY($1::text[]) AND target.relname = ANY($2::text[]))
          OR
          (source.relname = ANY($2::text[]) AND target.relname = ANY($1::text[]))
        )`,
    [consumerTables, proTables],
  );
  if (crossDomainForeignKeys.rows.length > 0) {
    fail("AHA consumer identity is linked to Restaurant Claim or Fysen Pro by foreign key", crossDomainForeignKeys.rows);
  }

  const demandSourceResult = await pool.query(
    `SELECT pg_get_expr(attribute_default.adbin, attribute_default.adrelid) AS default_expression
       FROM pg_attribute AS attribute
       JOIN pg_class AS relation ON relation.oid = attribute.attrelid
       JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
       JOIN pg_attrdef AS attribute_default
         ON attribute_default.adrelid = relation.oid
        AND attribute_default.adnum = attribute.attnum
      WHERE namespace.nspname = 'fysen'
        AND relation.relname = 'search_events'
        AND attribute.attname = 'demand_source'
        AND attribute.attisdropped = false
      LIMIT 1`,
  );
  const demandDefault = demandSourceResult.rows[0]?.default_expression ?? null;
  if (typeof demandDefault !== "string" || !demandDefault.includes("legacy_unclassified")) {
    fail("Production search demand provenance does not fail closed", { defaultExpression: demandDefault });
  }

  return {
    requiredTables,
    tokenStorage: {
      restaurantProSetupTokens: "hash-only",
      restaurantProSessions: "hash-only",
      ahaConsumerSessions: "hash-only",
      ahaAnalysisHandoffs: "hash-only",
    },
    consumerProIsolation: "no-cross-domain-foreign-keys",
    demandSourceDefault: "legacy_unclassified",
  };
}

function assertClaimContextPayload(payload) {
  if (!payload || typeof payload !== "object") fail("Public claim context payload is not an object", payload);
  if (payload?.restaurant?.slug !== claimRestaurantSlug) {
    fail("Public claim context returned the wrong restaurant", {
      expected: claimRestaurantSlug,
      actual: payload?.restaurant?.slug ?? null,
    });
  }
  if (payload?.restaurant?.city !== "Oslo") {
    fail("Public claim context returned the wrong city", payload?.restaurant);
  }
  if (!["unclaimed", "under_review", "claimed"].includes(payload?.claimState)) {
    fail("Public claim context returned an invalid claimState", { claimState: payload?.claimState ?? null });
  }

  const forbiddenPublicKeys = new Set([
    "claimantName",
    "claimantEmail",
    "claimantRole",
    "evidenceUrl",
    "evidenceNote",
    "reviewNote",
    "claimId",
    "accessGrantId",
  ]);
  const leakedKeys = [];
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (forbiddenPublicKeys.has(key)) leakedKeys.push(key);
      visit(child);
    }
  };
  visit(payload);
  if (leakedKeys.length > 0) fail("Public claim context leaks private claim fields", leakedKeys);
}

async function verifyPublicRevenueApi() {
  const claimUrl = `${apiBaseUrl}/v1/restaurants/${encodeURIComponent(claimRestaurantSlug)}/claim`;
  const claimResponse = await fetchWithProofTimeout(claimUrl);
  if (!claimResponse.ok) {
    fail("Public Claim Restaurant context API is unavailable", { status: claimResponse.status, claimUrl });
  }
  const claimPayload = await claimResponse.json();
  assertClaimContextPayload(claimPayload);

  const proDashboardUrl = `${apiBaseUrl}/v1/pro/dashboard`;
  const proDashboardResponse = await fetchWithProofTimeout(proDashboardUrl, { redirect: "manual" });
  if (proDashboardResponse.status !== 401) {
    fail("Public Fysen Pro dashboard is not fail-closed without a session", {
      status: proDashboardResponse.status,
      proDashboardUrl,
    });
  }

  const minMatUrl = `${apiBaseUrl}/v1/min-mat`;
  const minMatResponse = await fetchWithProofTimeout(minMatUrl, { redirect: "manual" });
  if (minMatResponse.status !== 401) {
    fail("Public Min mat API is not fail-closed without an AHA consumer session", {
      status: minMatResponse.status,
      minMatUrl,
    });
  }

  return {
    claimContext: {
      url: claimUrl,
      restaurantSlug: claimPayload.restaurant.slug,
      claimState: claimPayload.claimState,
      piiFree: true,
    },
    proDashboard: {
      url: proDashboardUrl,
      unauthenticatedStatus: 401,
      failClosed: true,
    },
    minMat: {
      url: minMatUrl,
      unauthenticatedStatus: 401,
      failClosed: true,
    },
  };
}

async function verifyAhaFysenBoundary() {
  const exchangeUrl = `${ahaApiBaseUrl}/v1/integrations/fysen/exchange`;
  const exchangeResponse = await fetchWithProofTimeout(exchangeUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      clientId: "fysen",
      redirectUri: ahaCallbackUrl,
      codeVerifier: "c".repeat(64),
      authorizationCode: `${"a".repeat(80)}.${"b".repeat(43)}`,
    }),
  });
  if (exchangeResponse.status !== 409) {
    fail("AHA Fysen exchange is not active with the exact production callback allowlisted", {
      expectedStatusForSignedCodeRejection: 409,
      actualStatus: exchangeResponse.status,
      exchangeUrl,
      callback: ahaCallbackUrl,
    });
  }

  const authorizePageUrl = `${ahaWebBaseUrl}/authorize-fysen.html`;
  const authorizePageResponse = await fetchWithProofTimeout(authorizePageUrl);
  if (!authorizePageResponse.ok) {
    fail("Public AHA Fysen authorization page is unavailable", { status: authorizePageResponse.status, authorizePageUrl });
  }
  const authorizeHtml = await authorizePageResponse.text();
  if (!authorizeHtml.includes("Koble Fysen til AHA") || !authorizeHtml.includes("fysen:min_mat")) {
    fail("Public AHA Fysen authorization page is stale", { authorizePageUrl });
  }

  const handoffPageUrl = `${ahaWebBaseUrl}/fysen.html`;
  const handoffPageResponse = await fetchWithProofTimeout(handoffPageUrl);
  if (!handoffPageResponse.ok) {
    fail("Public AHA Fysen handoff page is unavailable", { status: handoffPageResponse.status, handoffPageUrl });
  }
  const handoffHtml = await handoffPageResponse.text();
  if (!handoffHtml.includes("Min mat fra Fysen") || !handoffHtml.includes("Analyser i AHA")) {
    fail("Public AHA Fysen handoff page is stale", { handoffPageUrl });
  }

  return {
    exchange: {
      url: exchangeUrl,
      exactCallbackAllowlisted: true,
      invalidSignedCodeStatus: 409,
      mutating: false,
    },
    authorizationPage: { url: authorizePageUrl, rendered: true },
    handoffPage: { url: handoffPageUrl, rendered: true },
  };
}

async function verifyPublicRevenueWeb() {
  const claimUrl = `${webBaseUrl}/claim?restaurant=${encodeURIComponent(claimRestaurantSlug)}`;
  const claimResponse = await fetchWithProofTimeout(claimUrl);
  if (!claimResponse.ok) fail("Public Claim Restaurant web is unavailable", { status: claimResponse.status, claimUrl });
  const claimHtml = await claimResponse.text();
  if (!claimHtml.includes("Claim Restaurant") || !claimHtml.includes("Driver du")) {
    fail("Public Claim Restaurant web is not rendering the current claim surface", { claimUrl });
  }

  const proLoginUrl = `${webBaseUrl}/pro/login`;
  const proLoginResponse = await fetchWithProofTimeout(proLoginUrl);
  if (!proLoginResponse.ok) fail("Public Fysen Pro login is unavailable", { status: proLoginResponse.status, proLoginUrl });
  const proLoginHtml = await proLoginResponse.text();
  if (!proLoginHtml.includes("Fysen Pro") || !proLoginHtml.includes("Engangskode")) {
    fail("Public Fysen Pro login is not rendering the current secure login surface", { proLoginUrl });
  }

  const proDashboardUrl = `${webBaseUrl}/pro`;
  const proDashboardResponse = await fetchWithProofTimeout(proDashboardUrl, { redirect: "manual" });
  const proLocation = proDashboardResponse.headers.get("location") ?? "";
  if (![302, 303, 307, 308].includes(proDashboardResponse.status) || !proLocation.includes("/pro/login")) {
    fail("Public Fysen Pro web does not redirect unauthenticated visitors to login", {
      status: proDashboardResponse.status,
      location: proLocation,
      proDashboardUrl,
    });
  }

  const minMatUrl = `${webBaseUrl}/min-mat`;
  const minMatResponse = await fetchWithProofTimeout(minMatUrl);
  if (!minMatResponse.ok) fail("Public Min mat web is unavailable", { status: minMatResponse.status, minMatUrl });
  const minMatHtml = await minMatResponse.text();
  if (!minMatHtml.includes("Min mat") || !minMatHtml.includes("Logg inn med AHA")) {
    fail("Public Min mat web is not rendering the AHA consumer login surface", { minMatUrl });
  }

  const connectUrl = `${webBaseUrl}/api/aha/connect?returnTo=${encodeURIComponent("/min-mat")}`;
  const connectResponse = await fetchWithProofTimeout(connectUrl, { redirect: "manual" });
  const connectLocation = connectResponse.headers.get("location") ?? "";
  if (![302, 303, 307, 308].includes(connectResponse.status) || !connectLocation) {
    fail("Public AHA connect route does not redirect", {
      status: connectResponse.status,
      location: connectLocation,
      connectUrl,
    });
  }
  let authorizationRedirect;
  try {
    authorizationRedirect = new URL(connectLocation, webBaseUrl);
  } catch {
    fail("Public AHA connect route returned an invalid redirect URL", { connectLocation });
  }
  const expectedAuthorizeUrl = new URL(`${ahaWebBaseUrl}/authorize-fysen.html`);
  if (authorizationRedirect.origin !== expectedAuthorizeUrl.origin || authorizationRedirect.pathname !== expectedAuthorizeUrl.pathname) {
    fail("Public AHA connect route redirects to the wrong authorization surface", {
      actual: authorizationRedirect.toString(),
      expected: expectedAuthorizeUrl.toString(),
    });
  }
  const codeChallenge = authorizationRedirect.searchParams.get("code_challenge") ?? "";
  const state = authorizationRedirect.searchParams.get("state") ?? "";
  if (
    authorizationRedirect.searchParams.get("client_id") !== "fysen"
    || authorizationRedirect.searchParams.get("redirect_uri") !== ahaCallbackUrl
    || !/^[A-Za-z0-9_-]{43,128}$/.test(codeChallenge)
    || !/^[A-Za-z0-9_-]{24,128}$/.test(state)
  ) {
    fail("Public AHA connect redirect is missing the PKCE/state/callback contract", {
      redirect: authorizationRedirect.toString(),
      callback: ahaCallbackUrl,
    });
  }

  return {
    claim: { url: claimUrl, rendered: true },
    proLogin: { url: proLoginUrl, rendered: true },
    proDashboard: {
      url: proDashboardUrl,
      unauthenticatedRedirect: proLocation,
      failClosed: true,
    },
    minMat: { url: minMatUrl, rendered: true, unauthenticated: true },
    ahaConnect: {
      url: connectUrl,
      authorizationUrl: `${authorizationRedirect.origin}${authorizationRedirect.pathname}`,
      callback: authorizationRedirect.searchParams.get("redirect_uri"),
      pkce: true,
      state: true,
    },
  };
}

const pool = createDatabasePool({ maxConnections: 2 });
try {
  const schema = await verifyRevenueSchema(pool);
  const api = await verifyPublicRevenueApi();
  const aha = await verifyAhaFysenBoundary();
  const web = await verifyPublicRevenueWeb();

  process.stdout.write(`${JSON.stringify({
    status: "verified",
    mutatingProductionRequests: false,
    schema,
    api,
    aha,
    web,
  }, null, 2)}\n`);
} finally {
  await pool.end();
}
