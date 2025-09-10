
import prismaa from "@/db"

async function main() {
  const tags = [
    { name: "Limitless" },
    { name: "Fantasy" },
    { name: "Romance" },
    { name: "Sci-Fi" },
    { name: "Horror" },
    { name: "Angst" },
    { name: "Fluff" },
    { name: "Enemies-to-Lovers" },
    { name: "Smut" },
    { name: "Anime" },
    { name: "Dead-Dove" },
    { name: "Comedy" },
    { name: "RPG" },
    { name: "Monster" },
    { name: "Isekai" },
  ];

  for (const tag of tags) {
    await prismaa.tag.upsert({
      where: { name: tag.name },
      update: {}, // if tag already exists, do nothing
      create: tag,
    });
  }
}

main()
  .then(async () => {
    await prismaa.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaa.$disconnect();
    process.exit(1);
  });
