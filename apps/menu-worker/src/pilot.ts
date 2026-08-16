import {
  createDatabasePool,
  MenuIndexRepository,
  runMigrations,
} from "@fysen/database";
import { watchMenuSourceOnce, type MenuWatchSummary } from "./watcher.js";

const RODEO_PILOT = {
  restaurant: {
    slug: "rodeo-oslo",
    name: "Rodeo",
    websiteUrl: "https://www.rodeooslo.no/",
    address: "Sannergata 2",
    city: "Oslo",
    countryCode: "NO",
    latitude: 59.9285684,
    longitude: 10.758157,
  },
  source: {
    url: "https://www.rodeooslo.no/",
    sourceType: "html" as const,
    checkIntervalMinutes: 360,
    minimumExpectedItems: 5,
  },
} as const;

export async function runRodeoPilot(): Promise<MenuWatchSummary> {
  const pool = createDatabasePool();
  try {
    await runMigrations(pool);
    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant(RODEO_PILOT.restaurant);
    const source = await repository.upsertMenuSource({
      restaurantId,
      ...RODEO_PILOT.source,
      userAgent: process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1",
    });
    return await watchMenuSourceOnce(repository, source.id);
  } finally {
    await pool.end();
  }
}
