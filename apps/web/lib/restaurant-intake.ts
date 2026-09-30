import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import {
  restaurantIntakeRequestSchema,
  type RestaurantIntakeRequest,
} from "@fysen/contracts/restaurant-intake";
import {
  buildRestaurantIntakeSeed,
  intakeSlug,
} from "./restaurant-intake-seed.ts";

const repository = "Paradispartiet/fysen";
const apiRoot = `https://api.github.com/repos/${repository}`;
const maxBodyBytes = 32_000;

function authorized(request: Request, secret: string): boolean {
  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(supplied), hash(secret));
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } finally {
    reader.releaseLock();
  }
}

async function github(
  path: string,
  token: string,
  body?: unknown,
): Promise<unknown> {
  const response = await fetch(`${apiRoot}/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("GitHub intake request failed");
  return response.json() as Promise<unknown>;
}

function mainSha(value: unknown): string {
  const payload = value as { object?: { sha?: unknown } };
  if (
    typeof payload?.object?.sha !== "string" ||
    !/^[a-f0-9]{40}$/u.test(payload.object.sha)
  )
    throw new Error("Invalid main ref");
  return payload.object.sha;
}

export async function createRestaurantIntakePullRequest(
  input: RestaurantIntakeRequest,
  token: string,
) {
  const seed = buildRestaurantIntakeSeed(
    input,
    new Date().toISOString().slice(0, 10),
  );
  const slug = seed.restaurants[0]!.restaurant.slug;
  const id = randomUUID();
  const branch = `restaurant-intake/${slug}-${id}`;
  const seedPath = `apps/menu-worker/research/operator-${id}.seed.json`;
  const baseSha = mainSha(await github("git/ref/heads/main", token));
  const branchUrl = `https://github.com/${repository}/tree/${branch}`;
  try {
    await github("git/refs", token, {
      ref: `refs/heads/${branch}`,
      sha: baseSha,
    });
    const response = await fetch(`${apiRoot}/contents/${seedPath}`, {
      method: "PUT",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "x-github-api-version": "2022-11-28",
      },
      body: JSON.stringify({
        branch,
        message: `Research intake: ${input.name}`,
        content: Buffer.from(`${JSON.stringify(seed, null, 2)}\n`).toString(
          "base64",
        ),
      }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Seed write failed");
    const pr = (await github("pulls", token, {
      base: "main",
      head: branch,
      title: `Restaurant intake: ${input.name}`,
      body: `Registrert via operatørflaten.\n\nDekningsbidrag:\n${input.coverageNote
        .split("\n")
        .map((line) => `> ${line}`)
        .join(
          "\n",
        )}\n\nBatch-intake seed: ${seedPath}\n\nEksisterende Restaurant batch intake må bestå geokoding, dedupe og strict livevalidering. Kandidat og faktisk menyoutput skal vurderes før separat catalog-promotion.`,
    })) as { html_url?: unknown };
    if (
      typeof pr?.html_url !== "string" ||
      !pr.html_url.startsWith(`https://github.com/${repository}/pull/`)
    )
      throw new Error("Invalid PR receipt");
    return {
      status: "pending_validation" as const,
      pullRequestUrl: pr.html_url,
      seedPath,
    };
  } catch {
    // A timed-out write may have succeeded. Preserve the branch for inspection
    // instead of deleting it or silently repeating an external mutation.
    return { status: "needs_review" as const, branchUrl, seedPath };
  }
}

export async function handleRestaurantIntake(
  request: Request,
): Promise<Response> {
  const secret = process.env.FYSEN_RESTAURANT_INTAKE_OPERATOR_TOKEN;
  const token = process.env.FYSEN_RESTAURANT_INTAKE_GITHUB_TOKEN;
  const json = (body: unknown, status: number) =>
    Response.json(body, { status, headers: { "cache-control": "no-store" } });
  if (!secret || secret.length < 32 || !token)
    return json({ code: "INTAKE_NOT_CONFIGURED" }, 503);
  if (!authorized(request, secret)) return json({ code: "UNAUTHORIZED" }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return json({ code: "INVALID_ORIGIN" }, 403);
  let body: unknown;
  try {
    body = await readBody(request);
  } catch {
    return json({ code: "INVALID_JSON_OR_BODY_SIZE" }, 400);
  }
  const parsed = restaurantIntakeRequestSchema.safeParse(body);
  if (!parsed.success)
    return json(
      {
        code: "INVALID_INTAKE",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      400,
    );
  try {
    intakeSlug(parsed.data.name);
  } catch {
    return json(
      {
        code: "INVALID_INTAKE",
        issues: [
          {
            path: "name",
            message:
              "Oppgi et restaurantnavn som kan brukes i katalogens slug.",
          },
        ],
      },
      400,
    );
  }
  try {
    const receipt = await createRestaurantIntakePullRequest(parsed.data, token);
    return json(receipt, receipt.status === "pending_validation" ? 202 : 502);
  } catch {
    return json({ code: "INTAKE_UNAVAILABLE" }, 502);
  }
}
