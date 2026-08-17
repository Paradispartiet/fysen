type DishKnowledge = {
  aliases: string[];
  name: string;
  origin: string;
  summary: string;
};

const dishKnowledge: DishKnowledge[] = [
  {
    aliases: ["tartar", "biff tartar", "beef tartare"],
    name: "Tartar",
    origin: "Europeisk restauranttradisjon",
    summary: "Tartar serveres vanligvis rå og finhakket. Navnet brukes også om varianter med fisk eller andre råvarer.",
  },
  {
    aliases: ["ramen", "shoyu ramen", "miso ramen"],
    name: "Ramen",
    origin: "Japan",
    summary: "Ramen er en japansk nudelsuppe med røtter i kinesiske nudeltradisjoner og mange regionale stiler.",
  },
  {
    aliases: ["carbonara", "pasta carbonara"],
    name: "Carbonara",
    origin: "Roma, Italia",
    summary: "Carbonara forbindes særlig med Roma og bygges tradisjonelt rundt pasta, egg, hard ost, speket svinekjøtt og sort pepper.",
  },
  {
    aliases: ["biryani"],
    name: "Biryani",
    origin: "Sør-Asia",
    summary: "Biryani er en aromatisk risrett med mange regionale varianter og ulike kombinasjoner av krydder og råvarer.",
  },
  {
    aliases: ["falafel"],
    name: "Falafel",
    origin: "Midtøsten",
    summary: "Falafel er friterte boller av kikerter eller favabønner. Hvilken råvare som brukes varierer mellom tradisjoner.",
  },
  {
    aliases: ["pho", "phở"],
    name: "Pho",
    origin: "Vietnam",
    summary: "Pho er en vietnamesisk nudelsuppe, vanligvis bygget rundt kraft, risnudler og aromatiske urter eller krydder.",
  },
];

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("nb-NO").replace(/\s+/g, " ");
}

function findKnowledge(query: string): DishKnowledge | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  return dishKnowledge.find((knowledge) => knowledge.aliases.some((alias) => normalize(alias) === normalizedQuery)) ?? null;
}

export function DishKnowledgeNote({ query }: { query: string }) {
  const knowledge = findKnowledge(query);
  if (!knowledge) return null;

  return (
    <aside className="dishKnowledgeNote" aria-label={`Om retten ${knowledge.name}`}>
      <div className="dishKnowledgeTopline">
        <span>Om retten</span>
        <span>{knowledge.origin}</span>
      </div>
      <h2>{knowledge.name}</h2>
      <p>{knowledge.summary}</p>
      <small>Generell matkunnskap · ikke menybevis</small>
    </aside>
  );
}
