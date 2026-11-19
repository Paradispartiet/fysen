import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Keyboard,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { loadFeatured, searchDishes, type ArchivedDish, type FeaturedResponse } from "./src/api";
import { cleanDishName, formatPrice, safeHttpsUrl, validateSearchTerm } from "./src/format";
import { favoriteKey, readFavorites, writeFavorites, type FavoriteDish } from "./src/favorites";
import { createFavoritesController, type FavoritesSnapshot } from "./src/favorites-controller";
import { colors } from "./src/theme";
import { isWideLayout } from "./src/layout";
import { shouldRefreshAfterResume } from "./src/freshness";
import { parseFysenDeepLink } from "./src/deep-link";
import { priceProvenanceLabel } from "./src/price-provenance";

type Tab = "search" | "matlyst" | "favorites";

async function openExternal(url: string | null | undefined): Promise<void> {
  const safe = safeHttpsUrl(url);
  if (!safe) {
    Alert.alert("Lenken er ikke tilgjengelig", "Vi åpner bare sikre HTTPS-adresser.");
    return;
  }
  try {
    await Linking.openURL(safe);
  } catch {
    Alert.alert("Kunne ikke åpne lenken", "Prøv igjen når forbindelsen er tilgjengelig.");
  }
}

function Pill({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.pill} accessibilityRole="button">
      <Text style={styles.pillText}>{label}</Text>
    </Pressable>
  );
}

function PrimaryButton({ label, onPress, disabled = false }: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button"
      style={[styles.primaryButton, disabled && styles.disabledButton]}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SectionHeading({ kicker, title, intro }: {
  kicker?: string;
  title: string;
  intro?: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <Text style={styles.sectionTitle}>{title}</Text>
      {intro ? <Text style={styles.subtitle}>{intro}</Text> : null}
    </View>
  );
}

function SearchResultCard({
  result,
  isFavorite,
  onFavorite,
  favoritesReady,
}: {
  result: ArchivedDish;
  isFavorite: boolean;
  onFavorite: (dish: FavoriteDish) => void;
  favoritesReady: boolean;
}) {
  const query = result.normalizedName.slice(0, 80).trim();
  const observedAt = new Date(result.menu.observedAt);
  const observedText = Number.isNaN(observedAt.getTime())
    ? "Menyens kilde oppgitt"
    : "Meny observert " + observedAt.toLocaleDateString("nb-NO");

  return (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <View style={styles.flex}>
          <Text style={styles.dishName}>{result.name}</Text>
          <Text style={styles.restaurantName}>{result.restaurant.name}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={!favoritesReady ? "Favoritter lastes inn" : isFavorite ? "Fjern rett fra favoritter" : "Lagre retten som favoritt"}
          accessibilityState={{ disabled: !favoritesReady }}
          disabled={!favoritesReady}
          onPress={() => onFavorite({ name: result.name, query })}
          style={styles.favoriteButton}>
          <Text style={[styles.star, isFavorite && styles.starSaved]}>{isFavorite ? "★" : "☆"}</Text>
        </Pressable>
      </View>
      <Text style={styles.price}>{formatPrice(result)}</Text>
      {result.priceMinor !== null ? (
        <Text style={styles.priceSource}>{priceProvenanceLabel(result.menu.sourceUrl)}</Text>
      ) : null}
      <Text style={styles.address}>{result.restaurant.address}, {result.restaurant.city}</Text>
      <Text style={styles.freshness}>{observedText} · Kontroller alltid meny og pris</Text>
      <View style={styles.actions}>
        {safeHttpsUrl(result.menu.sourceUrl) ? (
          <Pill label="Se meny ↗" onPress={() => void openExternal(result.menu.sourceUrl)} />
        ) : null}
      </View>
    </View>
  );
}

function SearchScreen({
  value,
  setValue,
  wide,
  searchRequest,
  refreshRequest,
  favorites,
  favoritesReady,
  onFavorite,
}: {
  value: string;
  setValue: (value: string) => void;
  wide: boolean;
  searchRequest: number;
  refreshRequest: number;
  favorites: readonly FavoriteDish[];
  favoritesReady: boolean;
  onFavorite: (dish: FavoriteDish) => void;
}) {
  const [results, setResults] = useState<ArchivedDish[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const lastRequest = useRef(0);
  const lastSearchedTerm = useRef<string | null>(null);

  const perform = useCallback(async (term: string) => {
    request.current?.abort();
    const current = ++lastRequest.current;
    const validated = validateSearchTerm(term);
    if (!validated) {
      setLoading(false);
      setResults([]);
      setSearched(false);
      lastSearchedTerm.current = null;
      setError("Skriv minst 2 og maksimalt 80 tegn.");
      return;
    }
    Keyboard.dismiss();
    const controller = new AbortController();
    request.current = controller;
    lastSearchedTerm.current = validated;
    setLoading(true);
    setSearched(true);
    setError(null);
    setResults([]);
    try {
      const response = await searchDishes(validated, controller.signal);
      if (current === lastRequest.current && !controller.signal.aborted) setResults(response.results);
    } catch {
      if (current === lastRequest.current && !controller.signal.aborted) {
        setError("Kunne ikke hente menytreff. Kontroller nettet og prøv igjen.");
      }
    } finally {
      if (current === lastRequest.current && !controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchRequest > 0) void perform(value);
    // New searches from Matlyst and Favoritter are coordinated by the request counter.
  }, [searchRequest, perform]);

  useEffect(() => {
    if (refreshRequest > 0 && lastSearchedTerm.current) void perform(lastSearchedTerm.current);
  }, [refreshRequest, perform]);

  useEffect(() => () => { request.current?.abort(); }, []);


  function cardFor(result: ArchivedDish) {
    const key = [result.restaurant.slug, result.normalizedName, result.menu.sourceUrl,
      result.menu.observedAt, String(result.priceMinor)].join(":");
    return (
      <View key={key} style={wide ? styles.tabletGridCell : undefined}>
        <SearchResultCard
          result={result}
          favoritesReady={favoritesReady}
          isFavorite={favorites.some((item) => favoriteKey(item.query) === favoriteKey(result.normalizedName.slice(0, 80).trim()))}
          onFavorite={onFavorite}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.screenContent, wide && styles.wideContent]} keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={loading}
          onRefresh={() => { if (lastSearchedTerm.current) void perform(lastSearchedTerm.current); }}
          tintColor={colors.green} colors={[colors.green]} />
      }>
      <SectionHeading kicker="OSLO • MAT PÅ MENYEN" title="Hva har du lyst på?"
        intro="Finn en rett først. Se deretter hvilke restauranter som faktisk har den." />
      <View style={styles.searchBox}>
        <TextInput
          value={value}
          onChangeText={setValue}
          onSubmitEditing={() => void perform(value)}
          placeholder="For eksempel ramen, pizza eller pho"
          placeholderTextColor={colors.soft}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Søk etter en matrett"
          maxLength={80}
          style={styles.searchInput}
        />
        <PrimaryButton label="Søk" onPress={() => void perform(value)} disabled={loading} />
      </View>
      {!searched ? (
        <View style={styles.suggested}>
          <Text style={styles.smallHeading}>Populære søk</Text>
          <View style={styles.actions}>
            {["Ramen", "Sushi", "Burger", "Pho"].map((term) => (
              <Pill key={term} label={term} onPress={() => {
                setValue(term);
                void perform(term);
              }} />
            ))}
          </View>
        </View>
      ) : null}
      {loading ? <View style={styles.center}><ActivityIndicator color={colors.green} size="large" /><Text style={styles.muted}>Søker i dokumenterte menyer …</Text></View> : null}
      {error ? <View style={styles.notice}><Text style={styles.noticeText}>{error}</Text><Pill label="Prøv igjen" onPress={() => void perform(value)} /></View> : null}
      {searched && !loading && !error ? (
        <>
          <Text style={styles.resultsLabel}>Viser {results.length} menytreff i Oslo</Text>
          {results.length === 0 ? (
            <Text style={styles.muted}>Ingen treff i de dokumenterte menyene. Prøv et annet rettnavn.</Text>
          ) : (
            <>
              <Text style={styles.searchTrustNote}>Treff bygger på tekst i restaurantens meny, ikke en garanti for at retten er den du søker etter.</Text>
              <View style={wide ? styles.tabletGrid : undefined}>{results.map(cardFor)}</View>
            </>
          )}
        </>
      ) : null}
      <Text style={styles.footerNote}>Fysen viser dokumenterte menytreff, ikke garantier for tilgjengelighet.</Text>
    </ScrollView>
  );
}

function ArchivedBrowseCard({ dish, onPick }: {
  dish: FeaturedResponse["dishes"][number];
  onPick: (query: string) => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={() => onPick(dish.query)} style={styles.popularCard}>
      <View style={styles.flex}>
        <Text style={styles.popularName}>{cleanDishName(dish.name)}</Text>
        <Text style={styles.muted}>{dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"} registrert med retten</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

function MatlystScreen({
  featured, loading, error, retry, onPick, wide,
}: {
  featured: FeaturedResponse | null;
  wide: boolean;
  loading: boolean;
  error: boolean;
  retry: () => void;
  onPick: (query: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={[styles.screenContent, wide && styles.wideContent]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={retry} tintColor={colors.green} colors={[colors.green]} />}>
      <SectionHeading kicker="UTFORSK MENYER" title="Matlyst"
        intro="Oppdag retter og restauranter i det dokumenterte menyutvalget. Ikke sanntidsdata." />
      {loading ? <View style={styles.center}><ActivityIndicator color={colors.green} size="large" /><Text style={styles.muted}>Henter Matlyst …</Text></View> : null}
      {error ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Kunne ikke hente Matlyst akkurat nå.</Text>
          <PrimaryButton label="Prøv igjen" onPress={retry} />
        </View>
      ) : null}
      {featured && !loading && !error ? (
        <>
          <SectionHeading kicker="FRA MENYARKIVET" title="Utforsk retter"
            intro="Antall registrerte restauranter – ikke popularitet eller tilgjengelighet akkurat nå." />
          {featured.dishes.length ? (
            <View style={wide ? styles.tabletGrid : undefined}>
              {featured.dishes.map((dish) => (
                <View key={dish.query} style={wide ? styles.tabletGridCell : undefined}>
                  <ArchivedBrowseCard dish={dish} onPick={onPick} />
                </View>
              ))}
            </View>
          ) : <Text style={styles.muted}>Ingen dokumenterte retter i utvalget.</Text>}
        </>
      ) : null}
    </ScrollView>
  );
}

function FavoritesScreen({ favorites, ready, onPick, onRemove, wide }: {
  favorites: readonly FavoriteDish[];
  wide: boolean;
  ready: boolean;
  onPick: (query: string) => void;
  onRemove: (dish: FavoriteDish) => void;
}) {
  return (
    <ScrollView contentContainerStyle={[styles.screenContent, wide && styles.wideContent]}>
      <SectionHeading kicker="DIN MATLISTE" title="Favoritter"
        intro="Lagret på denne mobilen. Åpne et nytt søk for å se oppdaterte menyer og priser." />
      {!ready ? (
        <View style={styles.center}><ActivityIndicator color={colors.green} /><Text style={styles.muted}>Laster favoritter …</Text></View>
      ) : !favorites.length ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Ingen favoritter ennå. Søk etter en rett og trykk på stjernen for å lagre den.</Text>
          <PrimaryButton label="Finn noe godt" onPress={() => onPick("ramen")} />
        </View>
      ) : favorites.map((dish) => (
        <View key={favoriteKey(dish.query)} style={styles.favoriteRow}>
          <Pressable onPress={() => onPick(dish.query)} style={styles.flex} accessibilityRole="button">
            <Text style={styles.popularName}>{dish.name}</Text>
            <Text style={styles.muted}>Søk etter ferske treff →</Text>
          </Pressable>
          <Pressable onPress={() => onRemove(dish)} style={styles.removeButton}
            accessibilityLabel={"Fjern " + dish.name} accessibilityRole="button">
            <Text style={styles.removeText}>Fjern</Text>
          </Pressable>
        </View>
      ))}
      <Text style={styles.footerNote}>Favorittene synkroniseres ikke mellom enheter og kan forsvinne hvis appdata slettes.</Text>
    </ScrollView>
  );
}

function TabItem({ label, glyph, selected, onPress }: {
  label: string; glyph: string; selected: boolean; onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="tab" accessibilityState={{ selected }}
      style={styles.tabItem}>
      <Text style={[styles.tabGlyph, selected && styles.selected]}>{glyph}</Text>
      <Text style={[styles.tabLabel, selected && styles.selected]}>{label}</Text>
    </Pressable>
  );
}

function NativeFysen() {
  const { width } = useWindowDimensions();
  const wide = isWideLayout(width);
  const [tab, setTab] = useState<Tab>("search");
  const [query, setQuery] = useState("");
  const [searchRequest, setSearchRequest] = useState(0);
  const [refreshRequest, setRefreshRequest] = useState(0);
  const [favoriteState, setFavoriteState] = useState<FavoritesSnapshot>({ ready: false, items: [] });
  const favoriteController = useRef<ReturnType<typeof createFavoritesController> | null>(null);
  if (!favoriteController.current) {
    favoriteController.current = createFavoritesController(
      { read: readFavorites, write: writeFavorites },
      setFavoriteState,
      (issue) => Alert.alert("Favoritter", issue === "load"
        ? "Kunne ikke lese lagrede favoritter på mobilen."
        : "Kunne ikke lagre favoritten. Siste vellykkede lagring er beholdt."),
    );
  }
  const [featured, setFeatured] = useState<FeaturedResponse | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState(false);
  const currentFeatured = useRef<AbortController | null>(null);
  const backgroundAt = useRef<number | null>(null);

  const refreshFeatured = useCallback(async () => {
    currentFeatured.current?.abort();
    const controller = new AbortController();
    currentFeatured.current = controller;
    setLoadingFeatured(true);
    setFeaturedError(false);
    try {
      const response = await loadFeatured(controller.signal);
      if (!controller.signal.aborted) setFeatured(response);
    } catch {
      if (!controller.signal.aborted) {
        setFeatured(null);
        setFeaturedError(true);
      }
    } finally {
      if (!controller.signal.aborted) setLoadingFeatured(false);
    }
  }, []);

  useEffect(() => {
    void favoriteController.current?.hydrate();
    void refreshFeatured();
    return () => currentFeatured.current?.abort();
  }, [refreshFeatured]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background" || nextState === "inactive") {
        if (backgroundAt.current === null) backgroundAt.current = Date.now();
      } else if (nextState === "active") {
        if (shouldRefreshAfterResume(backgroundAt.current, Date.now())) {
          void refreshFeatured();
          setRefreshRequest((previous) => previous + 1);
        }
        backgroundAt.current = null;
      }
    });
    return () => subscription.remove();
  }, [refreshFeatured]);

  const navigateToSearch = useCallback((term: string) => {
    setQuery(term);
    setSearchRequest((previous) => previous + 1);
    setTab("search");
  }, []);

  useEffect(() => {
    const navigateFromUrl = (url: string | null) => {
      const destination = parseFysenDeepLink(url);
      if (!destination) return;
      if (destination.tab === "search" && destination.query) {
        navigateToSearch(destination.query);
      } else {
        setTab(destination.tab);
      }
    };
    void Linking.getInitialURL().then(navigateFromUrl).catch(() => {
      // A failed initial-link lookup must never prevent the app opening.
    });
    const subscription = Linking.addEventListener("url", ({ url }) => navigateFromUrl(url));
    return () => subscription.remove();
  }, [navigateToSearch]);

  function toggleFavorite(dish: FavoriteDish) {
    favoriteController.current?.toggle(dish);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <View style={styles.header}>
        <View style={styles.logoMark}><Text style={styles.logoGlyph}>F</Text></View>
        <Text style={styles.brand}>fysen</Text>
        <View style={styles.osloTag}><Text style={styles.osloTagText}>OSLO</Text></View>
      </View>
      <View style={styles.flex}>
        <View style={[styles.flex, tab !== "search" && styles.hidden]}>
          <SearchScreen value={query} setValue={setQuery} wide={wide} searchRequest={searchRequest} refreshRequest={refreshRequest}
            favorites={favoriteState.items} favoritesReady={favoriteState.ready}
            onFavorite={toggleFavorite} />
        </View>
        {tab === "matlyst" ? (
          <MatlystScreen wide={wide} featured={featured} loading={loadingFeatured} error={featuredError}
            retry={() => void refreshFeatured()} onPick={navigateToSearch} />
        ) : null}
        {tab === "favorites" ? (
          <FavoritesScreen wide={wide} favorites={favoriteState.items} ready={favoriteState.ready}
            onPick={navigateToSearch} onRemove={toggleFavorite} />
        ) : null}
      </View>
      <View style={styles.tabs}>
        <View style={styles.tabsInner} accessibilityRole="tablist">
          <TabItem label="Søk" glyph="⌕" selected={tab === "search"} onPress={() => setTab("search")} />
          <TabItem label="Matlyst" glyph="✦" selected={tab === "matlyst"} onPress={() => setTab("matlyst")} />
          <TabItem label="Favoritter" glyph="☆" selected={tab === "favorites"} onPress={() => setTab("favorites")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeFysen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  hidden: { display: "none" },
  header: { height: 62, flexDirection: "row", alignItems: "center", paddingHorizontal: 22, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoMark: { width: 30, height: 30, borderRadius: 9, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  logoGlyph: { fontSize: 21, fontWeight: "900", color: colors.inkOnGreen },
  brand: { color: colors.white, fontSize: 26, fontWeight: "800", letterSpacing: -1, marginLeft: 9 },
  osloTag: { marginLeft: "auto", borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  osloTagText: { color: colors.muted, fontSize: 11, letterSpacing: 1.5, fontWeight: "700" },
  screenContent: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 44 },
  wideContent: { width: "100%", maxWidth: 1020, alignSelf: "center", paddingHorizontal: 28 },
  tabletGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, alignItems: "stretch" },
  tabletGridCell: { width: "48%", flexGrow: 1, flexShrink: 1, minWidth: 300 },
  sectionHeading: { marginBottom: 20, marginTop: 10 },
  kicker: { color: colors.green, fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 9 },
  sectionTitle: { color: colors.white, fontSize: 33, fontWeight: "800", letterSpacing: -1.1, lineHeight: 38 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 10, lineHeight: 21 },
  searchBox: { backgroundColor: colors.paper, padding: 12, borderRadius: 18, borderWidth: 1, borderColor: colors.border, gap: 12 },
  searchInput: { color: colors.white, fontSize: 16, minHeight: 46, paddingHorizontal: 8 },
  primaryButton: { minHeight: 47, borderRadius: 12, backgroundColor: colors.green, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  primaryButtonText: { color: colors.inkOnGreen, fontWeight: "800", fontSize: 15 },
  disabledButton: { opacity: 0.5 },
  suggested: { marginTop: 26 },
  smallHeading: { color: colors.white, fontSize: 14, fontWeight: "700", marginBottom: 13 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  pill: { borderColor: colors.border, borderWidth: 1, backgroundColor: colors.surface, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 15, minHeight: 40, justifyContent: "center" },
  pillText: { color: colors.green, fontSize: 13, fontWeight: "700" },
  center: { alignItems: "center", justifyContent: "center", paddingVertical: 50, gap: 15 },
  muted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  resultsLabel: { color: colors.green, fontWeight: "700", marginTop: 24, marginBottom: 12 },
  card: { padding: 18, borderRadius: 17, backgroundColor: colors.paper, borderColor: colors.border, borderWidth: 1, marginBottom: 12 },
  rowTop: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  dishName: { color: colors.white, fontSize: 21, fontWeight: "800", lineHeight: 26 },
  restaurantName: { color: colors.green, fontSize: 15, fontWeight: "600", marginTop: 8 },
  description: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 10 },
  descriptionToggle: { minHeight: 40, justifyContent: "center", alignSelf: "flex-start", paddingRight: 15 },
  descriptionToggleText: { color: colors.green, fontSize: 13, fontWeight: "700" },
  resultGroupHeading: { color: colors.white, fontWeight: "800", fontSize: 17, marginTop: 17, marginBottom: 12 },
  searchTrustNote: { color: colors.soft, fontSize: 12, lineHeight: 19, marginBottom: 4 },
  resultGroupCards: { marginTop: 12 },
  price: { color: colors.white, fontSize: 20, fontWeight: "800", marginTop: 14 },
  priceSource: { color: colors.muted, fontSize: 12, marginTop: 5 },
  address: { color: colors.muted, fontSize: 12, lineHeight: 19, marginTop: 8 },
  freshness: { color: colors.soft, fontSize: 11, marginTop: 11 },
  favoriteButton: { paddingHorizontal: 8, paddingVertical: 1, minWidth: 44, minHeight: 44, alignItems: "center" },
  star: { fontSize: 30, color: colors.muted },
  starSaved: { color: colors.green },
  freshLabel: { color: colors.burnt, fontWeight: "800", fontSize: 11, letterSpacing: 1.8, marginBottom: 12 },
  popularCard: { flexDirection: "row", backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, padding: 18, borderRadius: 16, marginBottom: 10, gap: 15, alignItems: "center", minHeight: 85 },
  rank: { color: colors.green, fontSize: 26, fontWeight: "800", minWidth: 28 },
  popularName: { color: colors.white, fontSize: 16, fontWeight: "800", marginBottom: 5 },
  arrow: { color: colors.green, fontWeight: "800", fontSize: 24 },
  favoriteRow: { flexDirection: "row", alignItems: "center", borderRadius: 15, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, padding: 17, marginBottom: 10 },
  removeButton: { padding: 12 },
  removeText: { color: colors.burnt, fontWeight: "700" },
  notice: { backgroundColor: colors.surface, borderRadius: 16, padding: 18, gap: 14, marginVertical: 18 },
  noticeText: { color: colors.white, fontSize: 14, lineHeight: 21 },
  footerNote: { color: colors.soft, fontSize: 11, lineHeight: 18, marginTop: 24 },
  tabs: { height: 68, backgroundColor: colors.paper, borderTopWidth: 1, borderTopColor: colors.border },
  tabsInner: { width: "100%", maxWidth: 1020, alignSelf: "center", flex: 1, flexDirection: "row" },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3, minHeight: 60 },
  tabGlyph: { color: colors.soft, fontSize: 24, fontWeight: "700", lineHeight: 27 },
  tabLabel: { color: colors.soft, fontSize: 11, fontWeight: "700" },
  selected: { color: colors.green },
});
