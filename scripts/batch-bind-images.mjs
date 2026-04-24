import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MANUAL_DIR = path.join(process.cwd(), "public", "images", "manual");

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "");
}

function scoreMatch(fileName, productName) {
  const f = normalize(fileName);
  const p = normalize(productName);

  if (f === p) return 1000;
  if (p.includes(f)) return 500 + f.length;
  if (f.includes(p)) return 400 + p.length;

  // count common 4-char substrings as rough similarity
  let hits = 0;
  for (let i = 0; i <= f.length - 4; i++) {
    const sub = f.slice(i, i + 4);
    if (p.includes(sub)) hits++;
  }
  return hits;
}

async function main() {
  await fs.mkdir(MANUAL_DIR, { recursive: true });

  let files;
  try {
    files = (await fs.readdir(MANUAL_DIR)).filter((f) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
    );
  } catch {
    console.log("No manual/ directory found or empty.");
    return;
  }

  if (files.length === 0) {
    console.log("No images found in public/images/manual/");
    return;
  }

  const products = await prisma.product.findMany({});
  const matchedProductIds = new Set();
  const matched = [];
  const unmatched = [];

  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    let best = null;
    let bestScore = -1;

    for (const p of products) {
      if (matchedProductIds.has(p.id)) continue;
      // Use English name part for matching
      const enName = p.name.split(" / ")[0];
      const score = scoreMatch(base, enName);
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }

    // Threshold: need at least a modest substring hit or exact inclusion
    if (best && bestScore >= 4) {
      await prisma.product.update({
        where: { id: best.id },
        data: { image: `/images/manual/${file}` },
      });
      matchedProductIds.add(best.id);
      matched.push({ file, product: best.name, score: bestScore });
    } else {
      unmatched.push({ file, bestGuess: best?.name || null, score: bestScore });
    }
  }

  console.log(`\n✅ Matched & bound: ${matched.length}`);
  for (const m of matched) {
    console.log(`  • ${m.file}  →  ${m.product}`);
  }

  if (unmatched.length) {
    console.log(`\n⚠️ Unmatched: ${unmatched.length} (rename and re-run)`);
    for (const u of unmatched) {
      console.log(
        `  • ${u.file}${u.bestGuess ? `  (best guess: ${u.bestGuess}, score ${u.score})` : ""}`
      );
    }
  }

  // Show products still without images
  const remaining = products.filter((p) => !p.image && !matchedProductIds.has(p.id));
  if (remaining.length) {
    console.log(`\n📭 Products still missing images: ${remaining.length}`);
    for (const r of remaining) {
      console.log(`  • ${r.name}`);
    }
  }

  await prisma.$disconnect();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
