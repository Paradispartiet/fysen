import { Pool, type PoolConfig } from "pg";

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

export function createDatabasePool(options: DatabasePoolOptions = {}): Pool {
  const connectionString = options.connectionString ?? databaseUrlFromEnv();
  const config: PoolConfig = {
    connectionString,
    max: options.maxConnections ?? 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };

  const envSsl = process.env.DATABASE_SSL === "1";
  if (options.ssl === true || (options.ssl === undefined && envSsl)) {
    config.ssl = { rejectUnauthorized: true };
  }

  return new Pool(config);
}
