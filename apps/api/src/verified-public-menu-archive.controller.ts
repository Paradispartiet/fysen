import { BadRequestException, Controller, Get, Query, ServiceUnavailableException } from "@nestjs/common";
import { dishBrowseQuerySchema } from "@fysen/contracts/dish-browse";
import { dishSearchQuerySchema } from "@fysen/contracts";
import {
  archivedPublicBrowse,
  archivedPublicSearch,
  getVerifiedPublicArchive,
  type VerifiedPublicArchive,
} from "./verified-public-menu-archive.js";

async function archiveOrUnavailable(): Promise<VerifiedPublicArchive> {
  try {
    return await getVerifiedPublicArchive();
  } catch {
    // The public archive is checksum checked. Fail closed if GitHub, the
    // manifest, the hash or quarantine policy cannot be verified.
    throw new ServiceUnavailableException({
      code: "VERIFIED_MENU_ARCHIVE_UNAVAILABLE",
      message: "The verified menu archive is temporarily unavailable.",
    });
  }
}

@Controller("dishes/archive")
export class VerifiedPublicArchiveController {
  @Get("status")
  async status() {
    const archive = await archiveOrUnavailable();
    return {
      source: "verified-menu-archive" as const,
      realtime: false as const,
      archiveDate: archive.archiveDate,
      lastRefreshAt: archive.lastRefreshAt,
      restaurants: archive.restaurants.length,
      menuSources: archive.sources.length,
      menuItems: archive.items.length,
      identityQuarantines: archive.quarantinedSlugs.size,
    };
  }

  @Get("browse")
  async browse(@Query() query: unknown) {
    const parsed = dishBrowseQuerySchema.safeParse(query);
    if (!parsed.success) {
      throw new BadRequestException({
        code: "INVALID_ARCHIVED_DISH_BROWSE_QUERY",
        message: "Invalid archived dish browse query.",
      });
    }
    const archive = await archiveOrUnavailable();
    return archivedPublicBrowse(archive, parsed.data.city);
  }

  @Get("search")
  async search(@Query() query: unknown) {
    const parsed = dishSearchQuerySchema.safeParse(query);
    if (!parsed.success || parsed.data.sort !== "relevance" ||
        parsed.data.lat !== undefined || parsed.data.lon !== undefined) {
      throw new BadRequestException({
        code: "INVALID_ARCHIVED_DISH_SEARCH_QUERY",
        message: "Verified archive search supports dish relevance, not live distance or availability.",
      });
    }
    const archive = await archiveOrUnavailable();
    return archivedPublicSearch(archive, parsed.data.q, parsed.data.city, parsed.data.limit);
  }
}
