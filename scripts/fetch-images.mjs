import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SLEEP_MS = 3000; // 3s interval to avoid rate-limit

async function downloadFromUrl(url, destPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buffer);
  return buffer.length;
}

function pollinationsUrl(prompt) {
  const q = encodeURIComponent(prompt);
  // generate a product photo style image; seed comes from time to avoid cache collision
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${q}?width=800&height=600&seed=${seed}&nologo=true&no-cache=true`;
}

function picsumUrl(seed) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
}

async function fetchImage(productName, keyword) {
  const imagesDir = path.join(process.cwd(), "public", "images");
  await fs.mkdir(imagesDir, { recursive: true });
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
  const destPath = path.join(imagesDir, filename);

  const shortName = productName.split(" / ")[0];
  // Try Pollinations.ai first (AI generated product photo)
  try {
    const prompt = `professional product photography, clean white background, studio lighting, ${keyword || shortName}`;
    const bytes = await downloadFromUrl(pollinationsUrl(prompt), destPath);
    console.log(`✅ AI generated: ${shortName} -> ${filename} (${Math.round(bytes / 1024)}KB)`);
    return `/images/${filename}`;
  } catch (err) {
    console.warn(`⚠️ Pollinations failed for ${shortName}: ${err.message}`);
  }

  // Fallback to Picsum (random real photography via seed)
  try {
    const bytes = await downloadFromUrl(picsumUrl(keyword || shortName), destPath);
    console.log(`✅ Picsum fallback: ${shortName} -> ${filename} (${Math.round(bytes / 1024)}KB)`);
    return `/images/${filename}`;
  } catch (err) {
    console.warn(`⚠️ Picsum also failed for ${shortName}: ${err.message}`);
  }

  return null;
}

async function main() {
  const researchDir = path.join(process.cwd(), "research");
  const files = [
    "raw-materials.json",
    "finished-products.json",
    "additives.json",
  ];

  for (const file of files) {
    const items = JSON.parse(await fs.readFile(path.join(researchDir, file), "utf-8"));
    for (const item of items) {
      const productName = item.nameZh ? `${item.name} / ${item.nameZh}` : item.name;
      const product = await prisma.product.findFirst({ where: { name: productName } });
      if (!product) {
        console.warn(`Product not found: ${productName}`);
        continue;
      }
      if (product.image) {
        console.log(`Skipping (already has image): ${product.name}`);
        continue;
      }

      const url = await fetchImage(product.name, item.imageKeywords || item.name);
      if (url) {
        await prisma.product.update({
          where: { id: product.id },
          data: { image: url },
        });
      } else {
        console.error(`❌ All sources failed: ${product.name}`);
      }
      await new Promise((r) => setTimeout(r, SLEEP_MS));
    }
  }

  await prisma.$disconnect();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
