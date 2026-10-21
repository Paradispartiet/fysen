import {
  normalizeFavorites,
  toggleFavorite,
  type FavoriteDish,
} from "./favorites-model";

export type FavoritesSnapshot = {
  ready: boolean;
  items: readonly FavoriteDish[];
};

export type FavoritesIssue = "load" | "save";

export type FavoritesStorage = {
  read(): Promise<FavoriteDish[]>;
  write(items: readonly FavoriteDish[]): Promise<void>;
};

/**
 * UI updates immediately; writes are serialized so rapid taps cannot
 * persist an older snapshot over the latest choice.
 *
 * A failed final write rolls back to the latest successfully saved state.
 * Saving is unavailable until the initial local read has finished.
 */
export function createFavoritesController(
  storage: FavoritesStorage,
  onChange: (value: FavoritesSnapshot) => void,
  onIssue: (issue: FavoritesIssue) => void,
) {
  let items: FavoriteDish[] = [];
  let lastPersisted: FavoriteDish[] = [];
  let ready = false;
  let revision = 0;
  let loadPromise: Promise<void> | null = null;
  let writeQueue: Promise<void> = Promise.resolve();

  const publish = () => onChange({ ready, items: [...items] });

  function hydrate(): Promise<void> {
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        const saved = normalizeFavorites(await storage.read());
        // Defensive guard: even an unexpected early mutation must survive hydration.
        if (revision === 0) {
          items = saved;
          lastPersisted = saved;
        }
      } catch {
        onIssue("load");
      } finally {
        ready = true;
        publish();
      }
    })();
    return loadPromise;
  }

  function toggle(item: FavoriteDish): boolean {
    if (!ready) return false;

    const next = toggleFavorite(items, item);
    if (JSON.stringify(next) === JSON.stringify(items)) return false;
    items = next;
    publish();
    const myRevision = ++revision;
    const snapshot = [...next];

    writeQueue = writeQueue.then(async () => {
      await storage.write(snapshot);
      lastPersisted = snapshot;
    }).catch(() => {
      if (revision === myRevision) {
        items = [...lastPersisted];
        publish();
      }
      onIssue("save");
    });

    return true;
  }

  return {
    hydrate,
    toggle,
    flush: () => writeQueue,
    snapshot: (): FavoritesSnapshot => ({ ready, items: [...items] }),
  };
}
