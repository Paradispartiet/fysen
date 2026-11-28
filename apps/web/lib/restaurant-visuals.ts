type RestaurantIdentity = { readonly name: string; readonly address: string };

const byporten = {
  logo: "/restaurants/egon-byporten/logo.svg",
  exterior: "/restaurants/egon-byporten/exterior.webp",
  interior: "/restaurants/egon-byporten/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-byporten",
} as const;

const karlJohan = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-karl-johan/exterior.webp",
  interior: "/restaurants/egon-karl-johan/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-karl-johan",
} as const;

const nordstrand = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-nordstrand/exterior.webp",
  interior: null,
  sourceUrl: "https://egon.no/restauranter/oslo/egon-nordstrand",
} as const;

const storo = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-storo/exterior.webp",
  interior: "/restaurants/egon-storo/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-storo",
} as const;

const ulleval = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-ullevaal/exterior.webp",
  interior: null,
  sourceUrl: "https://egon.no/restauranter/oslo/egon-ullevaal",
} as const;

const peppesEnsjo = {
  logo: "/restaurants/peppes/logo.svg",
  exterior: "/restaurants/peppes-ensjo/exterior.jpg",
  interior: null,
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Peppes_Pizza_p%C3%A5_Ensj%C3%B8_(oktober_2017).jpg",
  photoCredit: "Kjetil Ree",
  photoDate: "2017-10-08",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
} as const;

const peppesStortingsgata = {
  logo: "/restaurants/peppes/logo.svg",
  exterior: "/restaurants/peppes-stortingsgata/exterior.jpg",
  interior: null,
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Peppes_Pizza_Stortingsgata_(2017-01-08).jpg",
  photoCredit: "Kjetil Ree",
  photoDate: "2017-01-08",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
} as const;

const lorry = {
 logo: "/restaurants/lorry/logo.png",
 exterior: "/restaurants/lorry/exterior.jpg",
 interior: "/restaurants/lorry/interior.webp",
 interiorIllustrationSource: "https://lorry.no/",
 sourceUrl: "https://commons.wikimedia.org/wiki/File:Parkveien_12_med_restaurant_Lorry.jpg",
 photoCredit: "Helge Høifødt",
 photoDate: "2020-04-22",
 licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
} as const;

const schroder = {
 logo: null,
 exterior: "/restaurants/schroder/exterior.jpg",
 interior: "/restaurants/schroder/interior.jpg",
 interiorPhoto: {
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Restaurant_Schr%C3%B8der_Oslo_with_painting_of_Youngstorget.jpg",
  photoCredit: "Helge Høifødt",
  photoDate: "2016-01-22",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
 },
 sourceUrl: "https://commons.wikimedia.org/wiki/File:Restaurant_Schroder.JPG",
 photoCredit: "Helge Høifødt",
 photoDate: "2007-06-09",
 licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
} as const;

const palmyra = {
 logo: null,
 exterior: "/restaurants/palmyra/exterior.jpg",
 interior: null,
 sourceUrl: "https://commons.wikimedia.org/wiki/File:Palmyra_Cafe_-_2017-02-12.jpg",
 photoCredit: "Kjetil Ree",
 photoDate: "2017-02-12",
 licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
} as const;

const louise = {
 logo: "/restaurants/louise/logo.svg",
 exterior: "/restaurants/louise/exterior.jpg",
 interior: null,
 sourceUrl: "https://commons.wikimedia.org/wiki/File:DS_Louise_Restaurant%2C_Aker_Brygge_(2327057427).jpg",
 photoCredit: "Andy Mitchell",
 photoDate: "2008-03-09",
 licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
} as const;

function normalized(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

/** Match the branch and street address, independent of archive/live IDs. */
export function restaurantVisuals(restaurant: RestaurantIdentity) {
  const address = normalized(restaurant.address);
  const name = normalized(restaurant.name);
  if (name === "restaurant schrøder" && /^waldemar thranes gate 8(?: |$)/u.test(address)) return schroder;
  if (["palmyra café", "palmyra cafe"].includes(name) && /^norbygata 15 ?a(?: |$)/u.test(address)) return palmyra;
  if (["d s louise", "d s louise restaurant bar", "louise restaurant bar"].includes(name) && /^stranden 3(?: |$)/u.test(address)) return louise;
  if (normalized(restaurant.name) === "lorry restaurant" &&
      /^parkveien 12(?: |$)/u.test(address)) return lorry;
  if (normalized(restaurant.name) === "peppes pizza stortingsgata" &&
      /^stortingsgata 4(?: |$)/u.test(address)) return peppesStortingsgata;
  if (normalized(restaurant.name) === "peppes pizza ensjø" &&
      /^rolf hofmos gate 34(?: |$)/u.test(address)) return peppesEnsjo;
  if (["egon ullevål", "egon ullevaal"].includes(normalized(restaurant.name)) &&
      /^sognsveien 77 ?c(?: |$)/u.test(address)) return ulleval;
  if (normalized(restaurant.name) === "egon storo" &&
      /^vitaminveien 9 11(?: |$)/u.test(address)) return storo;
  if (normalized(restaurant.name) === "egon nordstrand" &&
      /^ekebergveien 228 ?b(?: |$)/u.test(address)) {
    return nordstrand;
  }
  if (normalized(restaurant.name) === "egon karl johan" &&
      (address === "karl johans gate 37" || address.startsWith("karl johans gate 37 "))) {
    return karlJohan;
  }
  return normalized(restaurant.name) === "egon byporten" &&
    (address === "jernbanetorget 6" || address.startsWith("jernbanetorget 6 "))
    ? byporten : null;
}
