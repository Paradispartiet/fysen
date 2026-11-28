import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const gyozaTranslations = {
  "nn": {
    "overview": "Gyoza blir kjende igjen på kontrasten mellom ei brun og sprø underside og eit mjukt, dampa deigskal. Fyllet er ofte svinekjøt og kål, men variantar med grønsaker, kylling og sjømat er vanlege.",
    "history": "Japansk gyoza er nærskyld med kinesisk jiaozi. Retten fekk stor utbreiing i Japan på 1900-talet og utvikla ein eigen, ofte tynnare stil med tydelegare kvitlaukspreg.",
    "flavor": "Saftig, salt og aromatisk fyll møter mild deig og tydeleg steikeskorpe. Ein enkel dipp med soyasaus og eddik gjev syre og balanse.",
    "technique": "Den klassiske pannemetoden kombinerer steiking og damping: først farge i olje, så litt vatn under lok, og til slutt tørrsteiking for å få tilbake sprøheita.",
    "essentials": [
      "Tynne gyoza- eller dumplingark.",
      "Finhakka kål og aromatiske ingrediensar som ingefær, kvitlauk og vårlauk.",
      "Fyll av svin, kylling, sopp eller grønsaker.",
      "Soyasaus, sesamolje og riseddik for smak og dipp."
    ],
    "recipe": {
      "label": "Pannesteikte gyoza",
      "yield": "ca. 28 stk.",
      "time": "ca. 55 min",
      "ingredients": [
        "28 gyozaark",
        "300 g svinekjøtdeig",
        "200 g finsnitta hovudkål",
        "2 vårlaukar",
        "1 ss riven ingefær",
        "1 kvitlauksfedd",
        "1,5 ss soyasaus",
        "1 ts sesamolje",
        "nøytral olje",
        "1 dl vatn"
      ],
      "steps": [
        "Salt kålen lett, lat han stå i ti minutt og press ut overflødig væske.",
        "Bland kål, kjøt, vårlauk, ingefær, kvitlauk, soyasaus og sesamolje.",
        "Legg ei lita skei fyll på kvart ark, fukt kanten og brett tett.",
        "Steik gyoza i olje til undersida er gyllen, tilset vatn og legg på lok.",
        "Damp til fyllet er gjennomsteikt, ta av loket og lat botnen bli sprø igjen."
      ]
    },
    "variants": [
      "Yaki gyoza: pannesteikte og dampa.",
      "Sui gyoza: kokte i vatn eller kraft.",
      "Age gyoza: friterte og sprø tvers gjennom."
    ],
    "serving": [
      "Blir serverte rett frå panna med soyasaus og riseddik.",
      "Chiliolje kan tilsetjast dippen for meir varme."
    ],
    "commonMistakes": [
      "For mykje fyll slik at dumplingen ikkje kan forseglast.",
      "Vått kålfyll som sprengjer deigen under steiking.",
      "Å hoppe over den siste tørrsteikinga og miste den sprø botnen."
    ]
  },
  "sv": {
    "overview": "Gyoza känns igen på kontrasten mellan en brun och krispig undersida och ett mjukt, ångat degskal. Fyllningen består ofta av fläskkött och kål, men varianter med grönsaker, kyckling och skaldjur är vanliga.",
    "history": "Japansk gyoza är nära besläktad med kinesisk jiaozi. Rätten fick stor spridning i Japan under 1900-talet och utvecklade en egen, ofta tunnare stil med tydligare vitlökssmak.",
    "flavor": "Saftig, salt och aromatisk fyllning möter mild deg och en tydlig stekyta. En enkel dippsås med sojasås och vinäger ger syra och balans.",
    "technique": "Den klassiska pannmetoden kombinerar stekning och ångkokning: först färg i olja, sedan lite vatten under lock och till sist torrstekning för att återställa krispigheten.",
    "essentials": [
      "Tunna gyoza- eller dumplingark.",
      "Finhackad kål och aromatiska ingredienser som ingefära, vitlök och salladslök.",
      "Fyllning av fläsk, kyckling, svamp eller grönsaker.",
      "Sojasås, sesamolja och risvinäger för smak och dippsås."
    ],
    "recipe": {
      "label": "Pannstekta gyoza",
      "yield": "ca 28 st.",
      "time": "ca 55 min",
      "ingredients": [
        "28 gyozaark",
        "300 g fläskfärs",
        "200 g finstrimlad vitkål",
        "2 salladslökar",
        "1 msk riven ingefära",
        "1 vitlöksklyfta",
        "1,5 msk sojasås",
        "1 tsk sesamolja",
        "neutral olja",
        "1 dl vatten"
      ],
      "steps": [
        "Salta kålen lätt, låt den stå i tio minuter och pressa ut överflödig vätska.",
        "Blanda kål, kött, salladslök, ingefära, vitlök, sojasås och sesamolja.",
        "Lägg en liten sked fyllning på varje ark, fukta kanten och vik ihop tätt.",
        "Stek gyoza i olja tills undersidan är gyllene, tillsätt vatten och lägg på lock.",
        "Ångkoka tills fyllningen är genomstekt, ta av locket och låt botten bli krispig igen."
      ]
    },
    "variants": [
      "Yaki gyoza: pannstekta och ångkokta.",
      "Sui gyoza: kokta i vatten eller buljong.",
      "Age gyoza: friterade och krispiga rakt igenom."
    ],
    "serving": [
      "Serveras direkt från pannan med sojasås och risvinäger.",
      "Chiliolja kan tillsättas i dippsåsen för mer hetta."
    ],
    "commonMistakes": [
      "För mycket fyllning så att dumplingen inte kan förslutas.",
      "Blöt kålfyllning som spräcker degen under stekning.",
      "Att hoppa över den sista torrstekningen och förlora den krispiga botten."
    ]
  },
  "da": {
    "overview": "Gyoza kendes på kontrasten mellem en brun og sprød underside og et blødt, dampet dejhylster. Fyldet er ofte svinekød og kål, men varianter med grøntsager, kylling og fisk eller skaldyr er almindelige.",
    "history": "Japansk gyoza er nært beslægtet med kinesisk jiaozi. Retten blev meget udbredt i Japan i 1900-tallet og udviklede sin egen, ofte tyndere stil med tydeligere hvidløgssmag.",
    "flavor": "Saftigt, salt og aromatisk fyld møder mild dej og en tydelig stegeskorpe. En enkel dip med sojasauce og eddike giver syre og balance.",
    "technique": "Den klassiske pandemetode kombinerer stegning og dampning: først bruning i olie, derefter lidt vand under låg og til sidst tørstegning for at genskabe sprødheden.",
    "essentials": [
      "Tynde gyoza- eller dumplingark.",
      "Finthakket kål og aromatiske ingredienser som ingefær, hvidløg og forårsløg.",
      "Fyld af svin, kylling, svampe eller grøntsager.",
      "Sojasauce, sesamolie og riseddike til smag og dip."
    ],
    "recipe": {
      "label": "Pandesteget gyoza",
      "yield": "ca. 28 stk.",
      "time": "ca. 55 min",
      "ingredients": [
        "28 gyozaark",
        "300 g hakket svinekød",
        "200 g fintsnittet hvidkål",
        "2 forårsløg",
        "1 spsk revet ingefær",
        "1 fed hvidløg",
        "1,5 spsk sojasauce",
        "1 tsk sesamolie",
        "neutral olie",
        "1 dl vand"
      ],
      "steps": [
        "Salt kålen let, lad den stå i ti minutter, og pres overskydende væske ud.",
        "Bland kål, kød, forårsløg, ingefær, hvidløg, sojasauce og sesamolie.",
        "Læg en lille skefuld fyld på hvert ark, fugt kanten, og fold tæt sammen.",
        "Steg gyoza i olie, til undersiden er gylden, tilsæt vand, og læg låg på.",
        "Damp, til fyldet er gennemstegt, tag låget af, og lad bunden blive sprød igen."
      ]
    },
    "variants": [
      "Yaki gyoza: pandestegte og dampede.",
      "Sui gyoza: kogt i vand eller bouillon.",
      "Age gyoza: friterede og sprøde hele vejen igennem."
    ],
    "serving": [
      "Serveres direkte fra panden med sojasauce og riseddike.",
      "Chiliolie kan tilsættes dippen for mere styrke."
    ],
    "commonMistakes": [
      "For meget fyld, så dumplingen ikke kan lukkes tæt.",
      "Vådt kålfyld, som får dejen til at revne under stegning.",
      "At springe den sidste tørstegning over og miste den sprøde bund."
    ]
  },
  "fi": {
    "overview": "Gyozan tunnistaa ruskean, rapean pohjan ja pehmeän, höyrytetyn taikinakuoren kontrastista. Täytteenä on usein sianlihaa ja kaalia, mutta myös kasvis-, kana- ja mereneläväversiot ovat yleisiä.",
    "history": "Japanilainen gyoza on läheistä sukua kiinalaiselle jiaozille. Ruokalaji yleistyi Japanissa 1900-luvulla ja sai oman, usein ohuemman ja valkosipulisemman tyylinsä.",
    "flavor": "Mehukas, suolainen ja aromaattinen täyte kohtaa miedon taikinan ja rapean paistopinnan. Yksinkertainen soijakastikkeesta ja etikasta tehty dippi tuo hapokkuutta ja tasapainoa.",
    "technique": "Klassisessa pannumenetelmässä yhdistyvät paistaminen ja höyrytys: ensin ruskistetaan öljyssä, sitten lisätään hieman vettä kannen alle ja lopuksi paistetaan ilman vettä rapeuden palauttamiseksi.",
    "essentials": [
      "Ohuita gyoza- tai dumplingtaikinalevyjä.",
      "Hienonnettua kaalia sekä aromaattisia aineksia, kuten inkivääriä, valkosipulia ja kevätsipulia.",
      "Täyte sianlihasta, kanasta, sienistä tai kasviksista.",
      "Soijakastiketta, seesamiöljyä ja riisiviinietikkaa maustamiseen ja dippiin."
    ],
    "recipe": {
      "label": "Pannulla paistetut gyozat",
      "yield": "n. 28 kpl",
      "time": "n. 55 min",
      "ingredients": [
        "28 gyozataikinalevyä",
        "300 g sianjauhelihaa",
        "200 g hienoksi suikaloitua keräkaalia",
        "2 kevätsipulia",
        "1 rkl raastettua inkivääriä",
        "1 valkosipulinkynsi",
        "1,5 rkl soijakastiketta",
        "1 tl seesamiöljyä",
        "neutraalin makuista öljyä",
        "1 dl vettä"
      ],
      "steps": [
        "Suolaa kaali kevyesti, anna sen seistä kymmenen minuuttia ja purista ylimääräinen neste pois.",
        "Sekoita kaali, liha, kevätsipuli, inkivääri, valkosipuli, soijakastike ja seesamiöljy.",
        "Laita pieni lusikallinen täytettä jokaiselle taikinalevylle, kostuta reuna ja taita tiiviisti kiinni.",
        "Paista gyozat öljyssä kullanruskeiksi pohjasta, lisää vesi ja peitä kannella.",
        "Höyrytä, kunnes täyte on täysin kypsää, poista kansi ja anna pohjan rapeutua uudelleen."
      ]
    },
    "variants": [
      "Yaki gyoza: pannulla paistettuja ja höyrytettyjä.",
      "Sui gyoza: vedessä tai liemessä keitettyjä.",
      "Age gyoza: uppopaistettuja ja kauttaaltaan rapeita."
    ],
    "serving": [
      "Tarjoillaan suoraan pannulta soijakastikkeen ja riisiviinietikan kanssa.",
      "Dippiin voi lisätä chiliöljyä tulisuuden lisäämiseksi."
    ],
    "commonMistakes": [
      "Liian runsas täyte, jolloin nyyttiä ei voi sulkea tiiviisti.",
      "Märkä kaalitäyte, joka rikkoo taikinan paistettaessa.",
      "Viimeisen kuivapaiston väliin jättäminen, jolloin rapea pohja menetetään."
    ]
  },
  "is": {
    "overview": "Gyoza einkennist af andstæðu milli brúnaðs, stökks botns og mjúks, gufusoðins deighylkis. Fyllingin er oft svínakjöt og kál en útgáfur með grænmeti, kjúklingi eða sjávarfangi eru algengar.",
    "history": "Japanskt gyoza er náskylt kínversku jiaozi. Rétturinn varð útbreiddur í Japan á 20. öld og þróaði sinn eigin, oft þynnri stíl með meira hvítlauksbragði.",
    "flavor": "Safarík, sölt og ilmandi fylling mætir mildu deigi og greinilegri steikarskorpu. Einföld ídýfa með sojasósu og ediki gefur sýru og jafnvægi.",
    "technique": "Hefðbundna pönnuaðferðin sameinar steikingu og gufusuðu: fyrst er brúnað í olíu, síðan er litlu vatni bætt við undir loki og að lokum steikt án vatns til að endurheimta stökkleikann.",
    "essentials": [
      "Þunn gyoza- eða dumpling-deigblöð.",
      "Fínsaxað kál og ilmandi hráefni eins og engifer, hvítlaukur og vorlaukur.",
      "Fylling úr svínakjöti, kjúklingi, sveppum eða grænmeti.",
      "Sojasósa, sesamolía og hrísgrjónaedik til bragðbætingar og ídýfu."
    ],
    "recipe": {
      "label": "Pönnusteikt gyoza",
      "yield": "u.þ.b. 28 stk.",
      "time": "u.þ.b. 55 mín.",
      "ingredients": [
        "28 gyoza-deigblöð",
        "300 g svínahakk",
        "200 g fínt skorið hvítkál",
        "2 vorlaukar",
        "1 msk. rifið engifer",
        "1 hvítlauksrif",
        "1,5 msk. sojasósa",
        "1 tsk. sesamolía",
        "bragðlítil olía",
        "1 dl vatn"
      ],
      "steps": [
        "Saltið kálið lítillega, látið standa í tíu mínútur og kreistið umframvökva úr því.",
        "Blandið saman káli, kjöti, vorlauk, engifer, hvítlauk, sojasósu og sesamolíu.",
        "Setjið litla skeið af fyllingu á hvert deigblað, vætið brúnina og brjótið þétt saman.",
        "Steikið gyoza í olíu þar til botninn er gylltur, bætið vatni við og setjið lok á.",
        "Gufusjóðið þar til fyllingin er fullelduð, fjarlægið lokið og látið botninn verða stökkan aftur."
      ]
    },
    "variants": [
      "Yaki gyoza: pönnusteikt og gufusoðið.",
      "Sui gyoza: soðið í vatni eða soði.",
      "Age gyoza: djúpsteikt og stökkt í gegn."
    ],
    "serving": [
      "Borið fram beint af pönnunni með sojasósu og hrísgrjónaediki.",
      "Bæta má chiliolíu út í ídýfuna fyrir meiri styrk."
    ],
    "commonMistakes": [
      "Of mikil fylling þannig að ekki sé hægt að loka deiginu þétt.",
      "Blaut kálfylling sem sprengir deigið við steikingu.",
      "Að sleppa lokasteikingunni án vatns og missa stökka botninn."
    ]
  },
  "en": {
    "overview": "Gyoza are recognised by the contrast between a browned, crisp underside and a soft, steamed wrapper. The filling is often pork and cabbage, but vegetable, chicken and seafood versions are common.",
    "history": "Japanese gyoza are closely related to Chinese jiaozi. The dish became widespread in Japan in the twentieth century and developed its own style, often with thinner wrappers and a stronger garlic flavour.",
    "flavor": "Juicy, salty and aromatic filling meets mild dough and a distinct fried crust. A simple soy sauce and vinegar dip provides acidity and balance.",
    "technique": "The classic pan method combines frying and steaming: first brown in oil, then add a little water under a lid, and finally fry without water to restore crispness.",
    "essentials": [
      "Thin gyoza or dumpling wrappers.",
      "Finely chopped cabbage and aromatics such as ginger, garlic and spring onions.",
      "Pork, chicken, mushroom or vegetable filling.",
      "Soy sauce, sesame oil and rice vinegar for flavour and dipping."
    ],
    "recipe": {
      "label": "Pan-fried gyoza",
      "yield": "approx. 28 pieces",
      "time": "approx. 55 min",
      "ingredients": [
        "28 gyoza wrappers",
        "300 g minced pork",
        "200 g finely shredded white cabbage",
        "2 spring onions",
        "1 tbsp grated ginger",
        "1 garlic clove",
        "1.5 tbsp soy sauce",
        "1 tsp sesame oil",
        "neutral oil",
        "1 dl water"
      ],
      "steps": [
        "Lightly salt the cabbage, let it stand for ten minutes and squeeze out excess liquid.",
        "Mix the cabbage, meat, spring onions, ginger, garlic, soy sauce and sesame oil.",
        "Place a small spoonful of filling on each wrapper, moisten the edge and fold to seal tightly.",
        "Fry the gyoza in oil until golden underneath, add water and cover with a lid.",
        "Steam until the filling is cooked through, remove the lid and let the bottom become crisp again."
      ]
    },
    "variants": [
      "Yaki gyoza: pan-fried and steamed.",
      "Sui gyoza: boiled in water or stock.",
      "Age gyoza: deep-fried and crisp throughout."
    ],
    "serving": [
      "Serve straight from the pan with soy sauce and rice vinegar.",
      "Chilli oil can be added to the dip for more heat."
    ],
    "commonMistakes": [
      "Too much filling, preventing the dumpling from sealing.",
      "Wet cabbage filling that bursts the wrapper during cooking.",
      "Skipping the final dry-frying stage and losing the crisp bottom."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
