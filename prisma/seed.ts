import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "High-Density Polyethylene (HDPE)",
        code: "HDPE-SEED-001",
        category: "Raw Material",
        description:
          "Virgin HDPE granules suitable for blow molding, injection molding, and film applications. Consistent melt flow and excellent stiffness.",
        specs: "Melt Index: 0.3–30 g/10min\nDensity: 0.941–0.965 g/cm³\nPackaging: 25kg bags",
        priceHint: "FOB Shanghai $1,150–1,400 / MT",
        baseMaterial: "HDPE",
        applicationTags: "[]",
      },
      {
        name: "Polypropylene Homopolymer (PP-H)",
        code: "PPH-SEED-002",
        category: "Raw Material",
        description:
          "High stiffness PP homopolymer for packaging, automotive parts, and household products. Good processability and chemical resistance.",
        specs: "Melt Flow: 3–50 g/10min\nDensity: 0.90–0.91 g/cm³\nPackaging: 25kg bags",
        priceHint: "FOB Shanghai $1,100–1,350 / MT",
        baseMaterial: "PP",
        applicationTags: "[]",
      },
      {
        name: "PVC Resin SG-5",
        code: "PVC-SEED-003",
        category: "Raw Material",
        description:
          "General-purpose suspension PVC resin for pipes, fittings, profiles, and cables. Stable quality with low impurity levels.",
        specs: "K-Value: 66–68\nApparent Density: ≥0.48 g/ml\nPackaging: 25kg bags",
        priceHint: "FOB Shanghai $900–1,050 / MT",
        baseMaterial: "PVC",
        applicationTags: "[]",
      },
      {
        name: "Industrial Plastic Pallets",
        code: "PALLET-SEED-004",
        category: "Finished Product",
        description:
          "Heavy-duty recyclable plastic pallets in standard sizes. Ideal for warehousing, logistics, and export shipping.",
        specs: "Size: 1200x1000x150mm\nLoad: 1500kg static\nColors: Blue, Black, Grey",
        priceHint: "From $18 / piece",
        baseMaterial: null,
        applicationTags: "[]",
      },
      {
        name: "Custom Injection Molded Components",
        code: "OEM-SEED-005",
        category: "Finished Product",
        description:
          "OEM precision molded parts for automotive, electronics, and appliances. Tooling and mass production available.",
        specs: "Materials: PP, ABS, PA, PC\nTolerance: ±0.05mm\nMOQ: 5,000 pcs",
        priceHint: "Quotation on request",
        baseMaterial: null,
        applicationTags: "[]",
      },
      {
        name: "PET Preforms 28mm PCO",
        code: "PET-PREFORM-006",
        category: "Finished Product",
        description:
          "Food-grade PET preforms for beverage bottles. Crystal clear, consistent wall thickness, compatible with standard capping systems.",
        specs: "Neck Finish: 28mm PCO 1810\nWeight: 12–35g\nMOQ: 100,000 pcs",
        priceHint: "From $0.015 / piece",
        baseMaterial: "PET",
        applicationTags: "[]",
      },
    ],

  });
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
