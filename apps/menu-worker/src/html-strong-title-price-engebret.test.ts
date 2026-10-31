import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";
import { recoverStrongTitlePriceHtmlItems } from "./html-strong-title-price-recovery.js";

// Verbatim priced paragraphs captured 2026-10-30 from first-party
// https://www.engebret-cafe.no/menymenu (October à la carte).
const octoberMenu = `<h1>MENY I OKTOBER</h1>
<nav><a href="/julemeny-i-november-og-desember">Meny i november og desember - julemenyen</a></nav>
<p class="" style="white-space:pre-wrap;"><strong>Kamskjell og spekeskinke fra Ask med hvitløkspuré og urtesaus</strong>&nbsp;<strong>kr 295.-</strong><br><strong>allergener: skalldyr, bløtdyr, melk</strong><br><em>Scallops and local coppa styled ham with garlic pure and herb sauce</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Kalix løyrom med sitt klassiske tilbehør&nbsp;kr 350.-</strong><br><strong>allergener: fisk, melk, hvete</strong><br><em>Vendance roe with grilled toast, sour cream, red onions and dill</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Diana Camembert fra Bryne med bakt sopp, rosmarin og kirsebær kr 265.-<br>allergener: melk</strong><br><em>Norwegian Camembert with baked mushrooms, rosemary and cherries</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Sjøkrepssuppe kr 315.- <br>allergener: skalldyr, bløtdyr, melk, selleri</strong><br><em>Langustine soup with fennel</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Gratinert kongekrabbe med kålsalat og urtesmør</strong>&nbsp;<strong>kr 345.-<br>allergener: skalldyr, egg, sennep, melk, </strong><br><em>Gratinated arctic king crab served with coleslaw and herb butter</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Reinsdyrtartar med kantarellkrem, eggeplomme og rødbeter kr 295.-<br>allergener: egg, sennep, hvete</strong><br><em>Reindeer tartar with chantarelle cream, egg yolk and beet roots</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Lammerull med estragon, løk, buljong og konfitert steinsopp&nbsp;kr 275.-<br>allergener: egg </strong><br><em>Cured lamb roll in a porcini broth with estragon and confit cep mushrooms</em><br> </p>
<p class="" style="white-space:pre-wrap;"><strong>Fjellørret fra Blåfjell med ertepuré, brokkolini, rømmesaus og kokte poteter kr 495.-<br>allergener: fisk, melk</strong><br><em>Mountain trout with pea puree, broccolini, sour cream sauce and boiled potatoes</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Kveite med purreløk, gulbetpuré, brekkbønner, blåskjellsaus og poteter&nbsp;kr 495.-<br>allergener: fisk, bløtdyr, melk, selleri<br></strong><em>Artic halibut with leeks, yellow beet puree, string beans, mussel sauce and potatoes</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Breiflabb med østerssopp, kremet spinat, lettrøkt smørsaus og sprø poteter kr 515.-&nbsp; </strong><br><strong>allergener: fisk, melk, selleri, sennep</strong><br><em>Monkfish with oyster mushroom puree, creamy spinach,</em> <em>lightly smoked butter sauce and crispy potatoes</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Boknatorsk&nbsp;med&nbsp;kremstuede&nbsp;rotgrønnsaker, bacon&nbsp;og&nbsp;poteter kr&nbsp;455.-<br>allergener:&nbsp;fisk,&nbsp;melk,&nbsp;hvete,&nbsp;selleri</strong>&nbsp;<br><em>Semi&nbsp;dried&nbsp;stockfish&nbsp;of&nbsp;cod&nbsp;with&nbsp;creamed&nbsp;vegetables,&nbsp;bacon&nbsp;and&nbsp;potatoes<br></em>&nbsp;</p>
<p class="" style="white-space:pre-wrap;"><strong>Lutefisk fra Lofoten - Lutefisken serveres så mange ganger det er ønskelig&nbsp;kr 875.-<br>Serveres med stekt bacon og baconfett, ertestuing, lefser og assortert sennep.&nbsp; <br>Annet garnityr som hvit saus og sennepssaus; spør din servitør ved bestilling F, M<br>allergener: fisk, melk, hvete i lefser og flatbrød<br></strong><em>Lutefisk kr 875.-<br>Cured cod served with fried bacon, stewed peas, lefse, a selection of mustards and boiled potatoes from Senja.<br>Ask your waiter for other condiment options. Please feel free to ask for extra helpings of fish</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Lammecarre med gresskarpuré, glaserte gulrøtter, lammesaus og pommes anna kr 525.- <br>allergener: melk, selleri</strong><br><em>Rack of lamb, pumpkin puree, glazed carrots, lamb sauce and pommes anna</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Reinsdyrbiff med stekte kantareller, selleripuré, rosenkål, viltsaus med reinsdyrtunge og stekte poteter&nbsp;545.-</strong><br><strong>allergener: melk, selleri<br></strong><em>Reindeer steak with grilled chanterelles, celery puree, brussels sprouts, lingonberries, game sauce with reindeer tongue and fried potatoes</em></p>
<p class="" style="white-space:pre-wrap;"><strong>Okse indrefilet med potetpuré, panert løkring, rødvinssaus og kremet skogsopp med rosmarin&nbsp;545.-</strong><br><strong>allergener: melk, egg, hvete, selleri</strong><br><em>Beef tenderloin with mashed potatoes, onion ring, red wine sauce and  wild mushrooms with rosemary<br></em></p>
<p class="" style="white-space:pre-wrap;"><strong><em>Vegetar / Vegan / Vegetarian – dagens forrett og hovedrett, spør oss kr 195.- og kr 425.-<br></em></strong><em>Today’s vegetarian starter and main course, please ask your waiter</em></p>
<p class="" style="white-space:pre-wrap;"><em>&nbsp;&nbsp;</em>&nbsp;<br><strong>Norske oster med marmelade, frukt og nøttebrød&nbsp;kr 295.- <br>allergener: melk, hvete, nøtteblanding i brødet</strong><br>A selection of Norwegian cheeses, marmalade with fruit and nut bread<strong> </strong></p>
<p class="" style="white-space:pre-wrap;"><strong>Glasert sjokolade og nougatkake med peanøttfylt konfekt</strong>&nbsp;<strong>kr 235.-</strong><br><strong>allergener: melk, egg, peanøtter </strong><br><em>Glazed nougat and chocolate cake with caramel and peanut filled confect </em></p>
<p class="" style="white-space:pre-wrap;"><strong>Pæretårn med hasselnøttbunn og vaniljekrem&nbsp;kr 225.-<br>allergener: melk, egg, hvete, hasselnøtter<br></strong><em>Layered pear dessert on hazelnut bottom with vanilla cream&nbsp; </em></p>
<p class="" style="white-space:pre-wrap;"><strong>Brunostis med rømmekrem og krumkake kr 225.-</strong><br><strong>allergener: melk, egg, hvete </strong><br>Norwegian brown cheese ice cream with sour cream and traditional wafer </p>
<p class="" style="white-space:pre-wrap;"><strong>Engebrets karamellpudding med krem og hasselnøttstrø&nbsp;kr 225.-</strong><br><strong>allergener: melk, egg, hasselnøtter</strong><br>Engebret’s caramel pudding with whipped cream and hazelnuts&nbsp; &nbsp;</p>`;
const expectedPairs = [
  [
    "Kamskjell og spekeskinke fra Ask med hvitløkspuré og urtesaus",
    29500
  ],
  [
    "Kalix løyrom med sitt klassiske tilbehør",
    35000
  ],
  [
    "Diana Camembert fra Bryne med bakt sopp, rosmarin og kirsebær",
    26500
  ],
  [
    "Sjøkrepssuppe",
    31500
  ],
  [
    "Gratinert kongekrabbe med kålsalat og urtesmør",
    34500
  ],
  [
    "Reinsdyrtartar med kantarellkrem, eggeplomme og rødbeter",
    29500
  ],
  [
    "Lammerull med estragon, løk, buljong og konfitert steinsopp",
    27500
  ],
  [
    "Fjellørret fra Blåfjell med ertepuré, brokkolini, rømmesaus og kokte poteter",
    49500
  ],
  [
    "Kveite med purreløk, gulbetpuré, brekkbønner, blåskjellsaus og poteter",
    49500
  ],
  [
    "Breiflabb med østerssopp, kremet spinat, lettrøkt smørsaus og sprø poteter",
    51500
  ],
  [
    "Boknatorsk med kremstuede rotgrønnsaker, bacon og poteter",
    45500
  ],
  [
    "Lutefisk fra Lofoten",
    87500
  ],
  [
    "Lammecarre med gresskarpuré, glaserte gulrøtter, lammesaus og pommes anna",
    52500
  ],
  [
    "Reinsdyrbiff med stekte kantareller, selleripuré, rosenkål, viltsaus med reinsdyrtunge og stekte poteter",
    54500
  ],
  [
    "Okse indrefilet med potetpuré, panert løkring, rødvinssaus og kremet skogsopp med rosmarin",
    54500
  ],
  [
    "Norske oster med marmelade, frukt og nøttebrød",
    29500
  ],
  [
    "Glasert sjokolade og nougatkake med peanøttfylt konfekt",
    23500
  ],
  [
    "Pæretårn med hasselnøttbunn og vaniljekrem",
    22500
  ],
  [
    "Brunostis med rømmekrem og krumkake",
    22500
  ],
  [
    "Engebrets karamellpudding med krem og hasselnøttstrø",
    22500
  ]
] as const;

describe("source-backed inline bold dish prices", () => {
  it("recovers all twenty October titles at their own prices without translations or navigation", async () => {
    const result = await extractMenuSource("html", {body: octoberMenu} as never);
    expect(result.items.map(item => [item.name, item.priceMinor])).toEqual(expectedPairs);
    expect(result.items.find(item => item.name === "Lutefisk fra Lofoten")?.description).toContain("serveres så mange ganger");
  });

  it("does not borrow following prices or promote italic translations and allergens", () => {
    const controls = `<p><strong>Soup one kr 120.-</strong><br><em>Soup translation</em></p>
      <p><strong>Soup two</strong> <strong>kr 130.-</strong></p>
      <p><strong>Soup three kr 140.-<br>allergener: melk</strong></p>
      <p><strong>Soup four kr 150.-</strong></p>
      <p><strong>Soup five kr 160.-</strong></p>
      <p><strong>Soup six kr 170.-</strong></p>`;
    const traps = `<p><strong>Unpriced fish</strong><br><em>English fish translation kr 999.-</em></p>
      <p><strong>Priced meat kr 450.-</strong><br><em>English meat translation</em></p>
      <p><em><strong>Italic translation kr 999.-</strong></em></p>
      <p><strong>allergener: melk kr 999.-</strong></p>
      <p><strong>Vegetar / Vegan / Vegetarian – dagens forrett og hovedrett, spør oss kr 195.- og kr 425.-</strong></p>`;
    expect(recoverStrongTitlePriceHtmlItems(controls + traps).map(item => [item.name,item.priceMinor])).toEqual([
      ["Soup one",12000],["Soup two",13000],["Soup three",14000],["Soup four",15000],
      ["Soup five",16000],["Soup six",17000],["Priced meat",45000],
    ]);
  });

  it("rejects alternative prices while retaining dish numbers and quantities", async () => {
    const html = `<p><strong>Soup one kr 120.-</strong></p>
      <p><strong>Soup two kr 130.-</strong></p>
      <p><strong>Soup three kr 140.-</strong></p>
      <p><strong>Soup four kr 150.-</strong></p>
      <p><strong>12. Dumplings kr 160.-</strong></p>
      <p><strong>Spring rolls 2 pcs kr 170.-</strong></p>
      <p><strong>Soup 120 / 180 kr</strong></p>
      <p><strong>Salad 150 og 220 kr</strong></p>
      <p><strong>Fish 250 eller 350 kr</strong></p>
      <p><strong>Fish 120 kr / 180 kr</strong></p>
      <p><strong>Salad 150, 220 kr</strong></p>`;
    const expected = [
      ["Soup one",12000],["Soup two",13000],["Soup three",14000],["Soup four",15000],
      ["12. Dumplings",16000],["Spring rolls 2 pcs",17000],
    ];
    expect(recoverStrongTitlePriceHtmlItems(html).map(item => [item.name, item.priceMinor])).toEqual(expected);
    const result = await extractMenuSource("html", {body: html} as never);
    expect(result.items.every(item => !/120 kr|150,|120 \/|150 og|250 eller/.test(item.name))).toBe(true);
  });
});

it("does not reintroduce a comma price alternative after title normalization", async()=>{
 const controls=["one","two","three","four","five","six"].map((n,i)=>`<p><strong>Soup ${n} kr ${120+i}.-</strong></p>`).join("");
 const result=await extractMenuSource("html",{body:controls+'<p><strong>Salad 150, 220 kr</strong></p>'} as never);
 expect(result.items.some(i=>i.name.startsWith("Salad"))).toBe(false);
});
