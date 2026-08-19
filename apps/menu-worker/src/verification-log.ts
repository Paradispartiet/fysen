import {
  listRestaurantOnboardingManifests,
  type HoursVerificationStatus,
  type RestaurantOnboardingManifest,
} from "./onboarding-manifest.js";

export interface RestaurantVerificationLogEntry {
  readonly slug: string;
  readonly name: string;
  readonly hours: {
    readonly status: Exclude<HoursVerificationStatus, "verified">;
    readonly checkedAt: string;
    readonly note: string;
    readonly sourceUrl: string | null;
  };
}

export interface RestaurantVerificationLog {
  readonly uncertainCount: number;
  readonly entries: readonly RestaurantVerificationLogEntry[];
}

export function createRestaurantVerificationLog(
  manifests: readonly RestaurantOnboardingManifest[],
): RestaurantVerificationLog {
  const entries = manifests
    .flatMap((manifest): RestaurantVerificationLogEntry[] => {
      const hours = manifest.verification.hours;
      if (!hours) return [];
      return [
        {
          slug: manifest.restaurant.slug,
          name: manifest.restaurant.name,
          hours: {
            status: hours.status,
            checkedAt: hours.checkedAt,
            note: hours.note,
            sourceUrl: manifest.hoursSource?.url ?? null,
          },
        },
      ];
    })
    .sort((left, right) => left.slug.localeCompare(right.slug));

  return { uncertainCount: entries.length, entries };
}

export async function readRestaurantVerificationLog(directory?: string): Promise<RestaurantVerificationLog> {
  const manifests = await listRestaurantOnboardingManifests(directory);
  return createRestaurantVerificationLog(manifests.map((entry) => entry.manifest));
}
