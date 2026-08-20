import { cuisines, type Cuisine } from "./cuisine-explorer-data";

export type CuisineTaxonomyLink = {
  readonly name: string;
  readonly cuisine: Cuisine | null;
};

export type CulinaryRegion = {
  readonly id: string;
  readonly name: string;
  readonly context: string;
  readonly cuisines: readonly CuisineTaxonomyLink[];
};

export type CulinaryWorld = {
  readonly id: string;
  readonly name: string;
  readonly context: string;
  readonly regions: readonly CulinaryRegion[];
};

export type CuisineTaxonomyPath = {
  readonly worldName: string;
  readonly regionName: string;
};

type CulinaryRegionSpec = {
  readonly id: string;
  readonly name: string;
  readonly context: string;
  readonly cuisineNames: readonly string[];
};

type CulinaryWorldSpec = {
  readonly id: string;
  readonly name: string;
  readonly context: string;
  readonly regions: readonly CulinaryRegionSpec[];
};

const taxonomySpecs: readonly CulinaryWorldSpec[] = [
  {
    id: "asia",
    name: "Asia",
    context: "Øst-Asia · Sørøst-Asia · Sør-Asia · Sentral-Asia · Vest-Asia",
    regions: [
      {
        id: "east-asia",
        name: "Øst-Asia",
        context: "Japan · Kina · Korea",
        cuisineNames: ["Japansk", "Kinesisk", "Koreansk"],
      },
      {
        id: "southeast-asia",
        name: "Sørøst-Asia",
        context: "Thailand · Vietnam · Filippinene",
        cuisineNames: ["Thai", "Vietnamesisk", "Filippinsk"],
      },
      {
        id: "south-asia",
        name: "Sør-Asia",
        context: "India · Pakistan · Nepal",
        cuisineNames: ["Indisk", "Pakistansk", "Nepalsk"],
      },
      {
        id: "central-asia",
        name: "Sentral-Asia",
        context: "Usbekistan og de sentralasiatiske mattradisjonene",
        cuisineNames: ["Usbekisk"],
      },
      {
        id: "west-asia",
        name: "Vest-Asia",
        context: "Anatolia · Iran · Levanten",
        cuisineNames: ["Tyrkisk", "Persisk", "Levantinsk"],
      },
    ],
  },
  {
    id: "europe",
    name: "Europa",
    context: "Norden · Vest-Europa · Iberia · Sør-Europa · Øst-Europa",
    regions: [
      {
        id: "nordics",
        name: "Norden",
        context: "Norge · Sverige · Danmark · Finland · Island",
        cuisineNames: ["Norsk", "Svensk", "Dansk", "Finsk", "Islandsk"],
      },
      {
        id: "britain-ireland",
        name: "Storbritannia & Irland",
        context: "Britiske og irske mattradisjoner",
        cuisineNames: ["Britisk", "Irsk"],
      },
      {
        id: "western-europe",
        name: "Vest-Europa",
        context: "Frankrike · Belgia · Nederland",
        cuisineNames: ["Fransk", "Belgisk", "Nederlandsk"],
      },
      {
        id: "central-europe",
        name: "Sentral-Europa",
        context: "Tyskland · Østerrike · Sveits · Tsjekkia",
        cuisineNames: ["Tysk", "Østerriksk", "Sveitsisk", "Tsjekkisk"],
      },
      {
        id: "iberia",
        name: "Iberia",
        context: "Spania · Portugal",
        cuisineNames: ["Spansk", "Portugisisk"],
      },
      {
        id: "southern-europe",
        name: "Sør-Europa",
        context: "Italia · Hellas og middelhavstradisjoner",
        cuisineNames: ["Italiensk", "Gresk"],
      },
      {
        id: "eastern-europe",
        name: "Øst-Europa",
        context: "Polen · Ukraina · Romania",
        cuisineNames: ["Polsk", "Ukrainsk", "Rumensk"],
      },
    ],
  },
  {
    id: "africa",
    name: "Afrika",
    context: "Nord-Afrika · Øst-Afrika · Vest-Afrika · sørlige Afrika",
    regions: [
      {
        id: "north-africa",
        name: "Nord-Afrika",
        context: "Egypt · Marokko · Tunisia",
        cuisineNames: ["Egyptisk", "Marokkansk", "Tunisisk"],
      },
      {
        id: "east-africa",
        name: "Øst-Afrika",
        context: "Etiopia · Eritrea og omkringliggende tradisjoner",
        cuisineNames: ["Etiopisk", "Eritreisk"],
      },
      {
        id: "west-africa",
        name: "Vest-Afrika",
        context: "Nigeria · Ghana · Senegal",
        cuisineNames: ["Nigeriansk", "Ghanesisk", "Senegalesisk"],
      },
      {
        id: "southern-africa",
        name: "Sørlige Afrika",
        context: "Sør-Afrika og omkringliggende tradisjoner",
        cuisineNames: ["Sørafrikansk"],
      },
    ],
  },
  {
    id: "americas",
    name: "Amerika",
    context: "Latin-Amerika · Karibia · Nord-Amerika",
    regions: [
      {
        id: "latin-america",
        name: "Latin-Amerika",
        context: "Mexico · Brasil · Andes · Sør-Amerika",
        cuisineNames: ["Mexicansk", "Brasiliansk", "Peruansk", "Argentinsk", "Colombiansk"],
      },
      {
        id: "caribbean",
        name: "Karibia",
        context: "Jamaica · Cuba og karibiske tradisjoner",
        cuisineNames: ["Jamaicansk", "Kubansk"],
      },
      {
        id: "north-america",
        name: "Nord-Amerika",
        context: "USA · Canada",
        cuisineNames: ["Amerikansk", "Kanadisk"],
      },
    ],
  },
  {
    id: "oceania",
    name: "Oseania",
    context: "Australia · New Zealand · Stillehavet",
    regions: [
      {
        id: "australia-new-zealand",
        name: "Australia & New Zealand",
        context: "Australske og newzealandske mattradisjoner",
        cuisineNames: ["Australsk", "Newzealandsk"],
      },
      {
        id: "pacific",
        name: "Stillehavet",
        context: "Polynesiske og andre stillehavstradisjoner",
        cuisineNames: ["Polynesisk"],
      },
    ],
  },
];

const cuisineByName = new Map(cuisines.map((cuisine) => [cuisine.name, cuisine] as const));

export const culinaryWorlds: readonly CulinaryWorld[] = taxonomySpecs.map((world) => ({
  id: world.id,
  name: world.name,
  context: world.context,
  regions: world.regions.map((region) => ({
    id: region.id,
    name: region.name,
    context: region.context,
    cuisines: region.cuisineNames.map((name) => ({
      name,
      cuisine: cuisineByName.get(name) ?? null,
    })),
  })),
}));

const activeCuisinePaths = new Map<string, CuisineTaxonomyPath>();
for (const world of culinaryWorlds) {
  for (const region of world.regions) {
    for (const link of region.cuisines) {
      if (!link.cuisine) continue;
      if (activeCuisinePaths.has(link.name)) {
        throw new Error(`Cuisine taxonomy assigns active cuisine more than once: ${link.name}`);
      }
      activeCuisinePaths.set(link.name, { worldName: world.name, regionName: region.name });
    }
  }
}

for (const cuisine of cuisines) {
  if (!activeCuisinePaths.has(cuisine.name)) {
    throw new Error(`Active Matlyst cuisine is missing from culinary taxonomy: ${cuisine.name}`);
  }
}

export function activeRegionCuisines(region: CulinaryRegion): readonly Cuisine[] {
  return region.cuisines.flatMap((link) => link.cuisine ? [link.cuisine] : []);
}

export function activeWorldCuisines(world: CulinaryWorld): readonly Cuisine[] {
  return world.regions.flatMap(activeRegionCuisines);
}

export function cuisineTaxonomyPath(cuisineName: string): CuisineTaxonomyPath | null {
  return activeCuisinePaths.get(cuisineName) ?? null;
}
