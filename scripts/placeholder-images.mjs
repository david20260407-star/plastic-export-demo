import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  await fs.mkdir(imagesDir, { recursive: true });

  const cats = {
    "Raw Material": "3b82f6",     // blue
    "Finished Product": "10b981", // emerald
    "Additive": "f59e0b",         // amber
  };

  const products = await prisma.product.findMany({ where: { image: null } });
  for (const p of products) {
    const color = cats[p.category] || "64748b";
    const text = encodeURIComponent(p.category);
    const url = `https://placehold.co/600x400/${color}/white?text=${text}`;
    const res = await fetch(url);
    const filename = `placeholder_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.png`;
    const destPath = path.join(imagesDir, filename);
    await fs.writeFile(destPath, Buffer.from(await res.arrayBuffer()));
    await prisma.product.update({
      where: { id: p.id },
      data: { image: `/images/${filename}` },
    });
    console.log(`✅ ${p.name} -> placeholder ${filename}`);
  }

  await prisma.$disconnect();
  console.log("\nPlaceholder images applied.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
