import { describe, expect, it } from "vitest";
import {
  HTML_SECTION_FIRST_CARD_RECOVERY_VERSION,
  recoverFirstCardAfterPlainFoodSections,
} from "./html-section-first-card-recovery.js";

describe("plain food-section first-card recovery", () => {
  it("ignores counted navigation and recovers first cards from later food sections", () => {
    const items = recoverFirstCardAfterPlainFoodSections(`
      Forretter (2)
      Hovedretter (2)
      Drikke (2)
      Forretter
      House Bread
      from 99 NOK
      Second Starter
      from 129 NOK
      Hovedretter (2)
      Popular dish
      House Plov
      Tradisjonell risrett med kjøtt, gulrøtter og aromatiske krydder.
      from 349 NOK
      Vegetable Plov
      from 329 NOK
      Drikke (2)
      House Soda
      55 NOK
      Ayran
      55 NOK
    `);

    expect(HTML_SECTION_FIRST_CARD_RECOVERY_VERSION).toBe("section-first-card-v3");
    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["House Bread", 9900, "from"],
      ["House Plov", 34900, "from"],
    ]);
  });

  it("recovers first dishes from richer section labels used by full restaurant menus", () => {
    const items = recoverFirstCardAfterPlainFoodSections(`
      TANDOORI DISHES
      CHICKEN TIKKA
      279,-
      LAMB TIKKA
      299,-
      CHICKEN CURRIES
      MANGO CHICKEN
      289,-
      SHAHI KORMA
      279,-
      LAMB CURRIES
      LAMB KARAHI
      299,-
      PRAWNS & BIRYANI
      GARLIC COCONUT PRAWNS
      289,-
      VEGETABLE MENU
      DAL MAKHNI
      229,-
      NANS
      PLAIN NAN
      59,-
      RAITA & SALAD
      PUNJABI RAITA (DIP)
      59,-
      SWEET DISHES
      MALAI AAM
      119,-
    `);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["CHICKEN TIKKA", 27900],
      ["MANGO CHICKEN", 28900],
      ["LAMB KARAHI", 29900],
      ["GARLIC COCONUT PRAWNS", 28900],
      ["DAL MAKHNI", 22900],
      ["PLAIN NAN", 5900],
      ["PUNJABI RAITA (DIP)", 5900],
      ["MALAI AAM", 11900],
    ]);
  });

  it("recovers bilingual sections without crossing into coffee or drinks", () => {
    const items = recoverFirstCardAfterPlainFoodSections(`
      FORRETTER/APETIZERS
      STREET FOOD FUSION (M, G)
      129.0
      MUMBAI MACHOORIAN (G)
      129.0
      KJØTT CURRIES/ NON-VEG CURRIES
      FENUGREEK CHICKEN (M, N) MILD
      285.0
      VEGETAR CURRIES / VEGETARIAN CURRIES
      ACHARI ALOO GOBHI VEGAN
      249.0
      BARNEMENY / CHILD MENU
      CHICKEN KORMA (M,N,G,PI)
      179.0
      NANBRØD/ NANBREAD
      TANDOORI NAN (G, E, M)
      59.0
      KAFFE / COFFEE
      CUPPUCINO (M)
      55.0
    `);

    expect(items.map((item) => item.name)).toEqual([
      "STREET FOOD FUSION (M, G)",
      "FENUGREEK CHICKEN (M, N) MILD",
      "ACHARI ALOO GOBHI VEGAN",
      "CHICKEN KORMA (M,N,G,PI)",
      "TANDOORI NAN (G, E, M)",
    ]);
  });

  it("preserves dotted European thousands for the first card after a later section boundary", () => {
    const items = recoverFirstCardAfterPlainFoodSections(`
      Forretter
      Small Plate
      99 NOK
      Hovedretter
      Sharing Menu Four
      from 2.396 NOK
      Sharing Menu Six
      from 3.100 NOK
    `);

    expect(items.map((item) => [item.name, item.priceMinor, item.priceKind])).toEqual([
      ["Sharing Menu Four", 239600, "from"],
    ]);
  });

  it("does not recover beverage first cards", () => {
    expect(
      recoverFirstCardAfterPlainFoodSections(`
        Forretter
        Falafel
        99 NOK
        Mineral Water
        House Soda
        55 NOK
        Kaffe / Coffee
        Cuppucino (M)
        55 NOK
      `).map((item) => item.name),
    ).toEqual(["Falafel"]);
  });

  it("does not carry an unfinished first-card candidate across a new menu scope", () => {
    const items = recoverFirstCardAfterPlainFoodSections(`
      Desserts
      Turmeric Ice Cream (G,M,E,N)
      With Crumble Motichoor
      Paan Shot (G,M,E, N)
      Made of beetle leaves
      The best way to end your meal
      kr.949,- PR PERS
      ALLERGIES: G = Gluten | E = Egg | M = Milk | N = Nuts
      A La Carte
      07. Papaddam Basket (M, MU)
      With aura special dips
      KR. 75,-
      Starters
      Coastal Delight
      KR. 179,-
    `);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Coastal Delight", 17900],
    ]);
  });
});
