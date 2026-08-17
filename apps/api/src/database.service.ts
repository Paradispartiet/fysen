import { Injectable, type OnApplicationShutdown } from "@nestjs/common";
import { createDatabasePool } from "@fysen/database";

type DatabasePool = ReturnType<typeof createDatabasePool>;

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private databasePool: DatabasePool | null = null;

  pool(): DatabasePool {
    this.databasePool ??= createDatabasePool({ maxConnections: 10 });
    return this.databasePool;
  }

  async onApplicationShutdown(): Promise<void> {
    if (!this.databasePool) return;
    const pool = this.databasePool;
    this.databasePool = null;
    await pool.end();
  }
}
