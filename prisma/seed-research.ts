import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const researchDir = path.join(process.cwd(), "research");

  const files = [
    "raw-materials.json",
    "finished-products.json",
    "additives.json",
  ];

  let inserted = 0;

  for (const file of files) {
    const fullPath = path.join(researchDir, file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }

    const items = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    for (const item of items) {
      const name = item.nameZh ? `${item.name} / ${item.nameZh}` : item.name;
      const slug = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-").slice(0, 30);
      const code = `${slug}-${Date.now().toString(36).toUpperCase()}`;
      await prisma.product.create({
        data: {
          name,
          code,
          category: item.category,
          description: item.description,
          specs: item.specs || null,
          priceHint: item.priceHint || null,
          image: null,
          featured: false,
          baseMaterial: null,
          applicationTags: "[]",
        },
      });
      inserted++;
    }
  }

  console.log(`Seed research complete. Inserted ${inserted} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
