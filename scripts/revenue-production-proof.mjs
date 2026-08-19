import { createDatabasePool } from "../packages/database/dist/index.js";

const apiBaseUrl = (process.env.FYSEN_PUBLIC_API_URL?.trim() || "https://fysen-api.vercel.app").replace(/\/$/, "");
const webBaseUrl = (process.env.FYSEN_PUBLIC_WEB_URL?.trim() || "https://fysen-matsgran-8572s-projects.vercel.app").replace(/\/$/, "");
const claimRestaurantSlug = process.env.FYSEN_PROOF_CLAIM_RESTAURANT_SLUG?.trim() || "punjab-tandoori-gronland-oslo";

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

  const tokenColumnResult = await pool.query(
    `SELECT table_name,
            array_agg(column_name ORDER BY ordinal_position) AS columns
       FROM information_schema.columns
      WHERE table_schema = 'fysen'
        AND table_name = ANY($1::text[])
      GROUP BY table_name
      ORDER BY table_name`,
    [["restaurant_pro_setup_tokens", "restaurant_pro_sessions"]],
  );

  const columnsByTable = new Map(tokenColumnResult.rows.map((row) => [row.table_name, row.columns]));
  for (const tableName of ["restaurant_pro_setup_tokens", "restaurant_pro_sessions"]) {
    const columns = columnsByTable.get(tableName);
    if (!Array.isArray(columns)) fail(`Revenue production schema is missing ${tableName} columns`);
    if (!columns.includes("token_hash")) fail(`${tableName} is missing token_hash`);
    const forbiddenRawColumns = columns.filter((column) => column === "token" || column === "setup_token" || column === "session_token");
    if (forbiddenRawColumns.length > 0) fail(`${tableName} exposes a raw token column`, forbiddenRawColumns);
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
      setupTokens: "hash-only",
      sessions: "hash-only",
    },
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
  const location = proDashboardResponse.headers.get("location") ?? "";
  if (![302, 303, 307, 308].includes(proDashboardResponse.status) || !location.includes("/pro/login")) {
    fail("Public Fysen Pro web does not redirect unauthenticated visitors to login", {
      status: proDashboardResponse.status,
      location,
      proDashboardUrl,
    });
  }

  return {
    claim: { url: claimUrl, rendered: true },
    proLogin: { url: proLoginUrl, rendered: true },
    proDashboard: {
      url: proDashboardUrl,
      unauthenticatedRedirect: location,
      failClosed: true,
    },
  };
}

const pool = createDatabasePool({ maxConnections: 2 });
try {
  const schema = await verifyRevenueSchema(pool);
  const api = await verifyPublicRevenueApi();
  const web = await verifyPublicRevenueWeb();

  process.stdout.write(`${JSON.stringify({
    status: "verified",
    mutatingProductionRequests: false,
    schema,
    api,
    web,
  }, null, 2)}\n`);
} finally {
  await pool.end();
}
