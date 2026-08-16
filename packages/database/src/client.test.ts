import { readFileSync } from "node:fs";
import { X509Certificate } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { createDatabasePool, sanitizeDatabaseUrl } from "./client.js";

const originalDatabaseSsl = process.env.DATABASE_SSL;
const originalDatabaseSslCaPath = process.env.DATABASE_SSL_CA_PATH;

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(() => {
  restoreEnv("DATABASE_SSL", originalDatabaseSsl);
  restoreEnv("DATABASE_SSL_CA_PATH", originalDatabaseSslCaPath);
});

describe("database client TLS", () => {
  it("removes TLS query parameters so node-postgres cannot override the explicit SSL object", () => {
    const sanitized = sanitizeDatabaseUrl(
      "postgresql://user:pass@example.com:5432/postgres?sslmode=require&sslrootcert=/tmp/ca.crt&application_name=fysen",
    );
    const url = new URL(sanitized);

    expect(url.searchParams.get("sslmode")).toBeNull();
    expect(url.searchParams.get("sslrootcert")).toBeNull();
    expect(url.searchParams.get("application_name")).toBe("fysen");
  });

  it("uses the bundled Supabase root CA with certificate verification enabled", async () => {
    process.env.DATABASE_SSL = "verify-full";
    delete process.env.DATABASE_SSL_CA_PATH;

    const pool = createDatabasePool({
      connectionString: "postgresql://user:pass@example.com:5432/postgres?sslmode=require",
    });

    const ssl = pool.options.ssl;
    expect(ssl).toBeTypeOf("object");
    if (!ssl || typeof ssl !== "object") throw new Error("Expected verified SSL configuration");

    expect(ssl.rejectUnauthorized).toBe(true);
    expect(String(ssl.ca)).toContain("BEGIN CERTIFICATE");

    const certificate = new X509Certificate(String(ssl.ca));
    expect(certificate.subject).toContain("Supabase Root 2021 CA");
    expect(new Date(certificate.validTo).getTime()).toBeGreaterThan(Date.now());

    await pool.end();
  });

  it("allows an explicit CA path override for future certificate rotation", async () => {
    process.env.DATABASE_SSL = "verify-full";
    process.env.DATABASE_SSL_CA_PATH = new URL(
      "../certs/supabase-root-2021-ca.crt",
      import.meta.url,
    ).pathname;

    const pool = createDatabasePool({
      connectionString: "postgresql://user:pass@example.com:5432/postgres",
    });

    const ssl = pool.options.ssl;
    if (!ssl || typeof ssl !== "object") throw new Error("Expected verified SSL configuration");
    expect(String(ssl.ca)).toBe(
      readFileSync(new URL("../certs/supabase-root-2021-ca.crt", import.meta.url), "utf8"),
    );

    await pool.end();
  });
});
