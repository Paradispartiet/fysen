import { assertLocalOperatorEnvironment } from "./operator-environment.js";
import {
  assertAcceptedOnlyPayload,
  parseFysenProSessionSetCookie,
  summarizeFysenProDashboard,
} from "./fysen-pro-pilot-proof.js";

const SETUP_TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,200}$/;
const RESTAURANT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function requiredArgument(value: string | undefined, name: string): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required.`);
  return normalized;
}

function baseUrl(value: string | undefined, fallback: string): string {
  const normalized = value?.trim() || fallback;
  const parsed = new URL(normalized);
  if (parsed.protocol !== "https:") throw new Error("Fysen Pro production proof requires HTTPS endpoints.");
  return parsed.toString().replace(/\/$/, "");
}

function readHiddenSetupToken(): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY || typeof process.stdin.setRawMode !== "function") {
    throw new Error("Fysen Pro pilot proof requires an interactive TTY so the setup token cannot be piped or echoed.");
  }

  return new Promise<string>((resolve, reject) => {
    let secret = "";
    const stdin = process.stdin;

    const cleanup = () => {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
    };

    const finish = () => {
      cleanup();
      process.stdout.write("\n");
      if (!SETUP_TOKEN_PATTERN.test(secret)) {
        reject(new Error("Setup token has an invalid format."));
        return;
      }
      resolve(secret);
    };

    const onData = (chunk: Buffer | string) => {
      const text = typeof chunk === "string" ? chunk : chunk.toString("utf8");
      for (const character of text) {
        if (character === "\u0003") {
          cleanup();
          process.stdout.write("\n");
          reject(new Error("Fysen Pro pilot proof was cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          finish();
          return;
        }
        if (character === "\u007f" || character === "\b") {
          secret = secret.slice(0, -1);
          continue;
        }
        if (character >= " " && character !== "\u007f") secret += character;
      }
    };

    process.stdout.write("Paste one-time Fysen Pro setup token (input hidden): ");
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function proofFetch(url: string, init: RequestInit, label: string): Promise<Response> {
  try {
    return await fetch(url, {
      ...init,
      redirect: init.redirect ?? "manual",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new Error(`${label} request failed.`);
  }
}

async function safeJson(response: Response, label: string): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error(`${label} did not return valid JSON.`);
  }
}

function expectStatus(response: Response, expected: number, label: string): void {
  if (response.status !== expected) throw new Error(`${label} returned HTTP ${response.status}, expected ${expected}.`);
}

async function main(): Promise<void> {
  assertLocalOperatorEnvironment();
  const args = process.argv.slice(2).filter((value) => value !== "--");
  const expectedRestaurantSlug = requiredArgument(args[0], "restaurantSlug");
  if (!RESTAURANT_SLUG_PATTERN.test(expectedRestaurantSlug)) throw new Error("restaurantSlug has an invalid format.");
  if (args.length > 1) throw new Error("Usage: pro:pilot-proof -- <restaurantSlug>");

  const webBaseUrl = baseUrl(process.env.FYSEN_PUBLIC_WEB_URL, "https://fysen.vercel.app");
  const apiBaseUrl = baseUrl(process.env.FYSEN_PUBLIC_API_URL, "https://fysen-api.vercel.app");

  process.stderr.write(
    "This proof consumes one setup token, creates one short-lived Pro session, verifies it, then logs it out. No token value is printed.\n",
  );
  const setupToken = await readHiddenSetupToken();

  const redeemUrl = `${webBaseUrl}/api/pro/session`;
  const firstRedeem = await proofFetch(
    redeemUrl,
    {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ setupToken }),
    },
    "Fysen Pro web setup redemption",
  );
  expectStatus(firstRedeem, 201, "Fysen Pro web setup redemption");
  assertAcceptedOnlyPayload(await safeJson(firstRedeem, "Fysen Pro web setup redemption"), "Fysen Pro web setup redemption");

  const sessionCookie = parseFysenProSessionSetCookie(firstRedeem.headers.get("set-cookie"));
  const cookieHeader = `fysen_pro_session=${sessionCookie.sessionToken}`;

  const secondRedeem = await proofFetch(
    redeemUrl,
    {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ setupToken }),
    },
    "Fysen Pro one-time setup verification",
  );
  expectStatus(secondRedeem, 401, "Fysen Pro second setup redemption");
  if ((secondRedeem.headers.get("set-cookie") ?? "").includes("fysen_pro_session=")) {
    throw new Error("A consumed Fysen Pro setup token unexpectedly created another session cookie.");
  }

  const dashboardUrl = `${apiBaseUrl}/v1/pro/dashboard`;
  const dashboardResponse = await proofFetch(
    dashboardUrl,
    {
      method: "GET",
      headers: { accept: "application/json", authorization: `Bearer ${sessionCookie.sessionToken}` },
    },
    "Authenticated Fysen Pro dashboard API",
  );
  expectStatus(dashboardResponse, 200, "Authenticated Fysen Pro dashboard API");
  const dashboard = summarizeFysenProDashboard(
    await safeJson(dashboardResponse, "Authenticated Fysen Pro dashboard API"),
    expectedRestaurantSlug,
  );

  const proPageResponse = await proofFetch(
    `${webBaseUrl}/pro`,
    { method: "GET", headers: { cookie: cookieHeader } },
    "Authenticated Fysen Pro web",
  );
  expectStatus(proPageResponse, 200, "Authenticated Fysen Pro web");
  const proHtml = await proPageResponse.text();
  if (!proHtml.includes("Fysen Pro") || !proHtml.includes("Menyhelse")) {
    throw new Error("Authenticated Fysen Pro web did not render the dashboard surface.");
  }

  const logoutResponse = await proofFetch(
    redeemUrl,
    { method: "DELETE", headers: { accept: "application/json", cookie: cookieHeader } },
    "Fysen Pro logout",
  );
  expectStatus(logoutResponse, 200, "Fysen Pro logout");
  assertAcceptedOnlyPayload(await safeJson(logoutResponse, "Fysen Pro logout"), "Fysen Pro logout");
  const clearedCookie = (logoutResponse.headers.get("set-cookie") ?? "").toLowerCase();
  if (!clearedCookie.includes("fysen_pro_session=") || !clearedCookie.includes("max-age=0")) {
    throw new Error("Fysen Pro logout did not clear the local session cookie.");
  }

  const revokedDashboardResponse = await proofFetch(
    dashboardUrl,
    {
      method: "GET",
      headers: { accept: "application/json", authorization: `Bearer ${sessionCookie.sessionToken}` },
    },
    "Revoked Fysen Pro dashboard API",
  );
  expectStatus(revokedDashboardResponse, 401, "Revoked Fysen Pro dashboard API");

  const revokedWebResponse = await proofFetch(
    `${webBaseUrl}/pro`,
    { method: "GET", headers: { cookie: cookieHeader } },
    "Revoked Fysen Pro web",
  );
  const revokedLocation = revokedWebResponse.headers.get("location") ?? "";
  if (![302, 303, 307, 308].includes(revokedWebResponse.status) || !revokedLocation.includes("/pro/login")) {
    throw new Error("Revoked Fysen Pro session did not fail closed to the login surface.");
  }

  process.stdout.write(
    `${JSON.stringify({
      status: "verified",
      mutatingProductionRequests: true,
      tokenValuesPrinted: false,
      setupToken: { consumed: true, oneTime: true },
      sessionCookie: {
        httpOnly: sessionCookie.httpOnly,
        secure: sessionCookie.secure,
        sameSite: sessionCookie.sameSite,
        path: sessionCookie.path,
      },
      dashboard,
      web: { authenticatedDashboardRendered: true },
      logout: { accepted: true, serverSessionRevoked: true, webFailsClosedAfterLogout: true },
    }, null, 2)}\n`,
  );
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown Fysen Pro pilot proof error.";
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
