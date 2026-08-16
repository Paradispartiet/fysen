import { readFileSync } from "node:fs";
import { Pool, type PoolConfig } from "pg";

const supabaseRootCa = new URL("../certs/supabase-root-2021-ca.crt", import.meta.url);
const tlsUrlParameters = ["sslmode", "sslcert", "sslkey", "sslrootcert"] as const;

export interface DatabasePoolOptions {
  readonly connectionString?: string;
  readonly maxConnections?: number;
  readonly ssl?: boolean;
}

export function databaseUrlFromEnv(): string {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) {
    throw new Error("DATABASE_URL is required");
  }
  return value;
}

export function sanitizeDatabaseUrl(value: string): string {
  const url = new URL(value);
  for (const parameter of tlsUrlParameters) {
    url.searchParams.delete(parameter);
  }
  return url.toString();
}

function verifiedSslFromEnv(): PoolConfig["ssl"] | undefined {
  const mode = process.env.DATABASE_SSL?.trim().toLowerCase();
  if (mode !== "1" && mode !== "true" && mode !== "verify-full") {
    return undefined;
  }

  const customCaPath = process.env.DATABASE_SSL_CA_PATH?.trim();
  const ca = customCaPath
    ? readFileSync(customCaPath, "utf8")
    : readFileSync(supabaseRootCa, "utf8");

  return {
    ca,
    rejectUnauthorized: true,
  };
}

export function createDatabasePool(options: DatabasePoolOptions = {}): Pool {
  const rawConnectionString = options.connectionString ?? databaseUrlFromEnv();
  const configuredSsl = verifiedSslFromEnv();
  const ssl = options.ssl === true ? configuredSsl ?? { rejectUnauthorized: true } : configuredSsl;

  const config: PoolConfig = {
    connectionString: sanitizeDatabaseUrl(rawConnectionString),
    max: options.maxConnections ?? 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };

  if (options.ssl !== false && ssl) {
    config.ssl = ssl;
  }

  return new Pool(config);
}
