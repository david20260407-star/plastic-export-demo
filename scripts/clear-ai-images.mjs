import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

async function clearDir(dirPath, preserveSet) {
  let deleted = 0;
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (preserveSet.has(entry.name)) {
        console.log(`Preserving directory: ${entry.name}/`);
        continue;
      }
      deleted += await clearDir(fullPath, preserveSet);
      await fs.rmdir(fullPath);
    } else {
      await fs.unlink(fullPath);
      deleted++;
    }
  }
  return deleted;
}

async function main() {
  // Clear all product.image fields in database
  const result = await prisma.product.updateMany({
    data: { image: null },
  });
  console.log(`Cleared image field for ${result.count} products in DB.`);

  // Delete all files under public/images except preserved dirs (e.g. manual/)
  const preserve = new Set(["manual"]);
  let deletedFiles = 0;
  try {
    deletedFiles = await clearDir(IMAGES_DIR, preserve);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No public/images directory found.");
    } else {
      throw err;
    }
  }
  console.log(`Deleted ${deletedFiles} image files from public/images/.`);
  if (preserve.size > 0) {
    console.log(`Preserved directories: ${Array.from(preserve).join(", ")}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
