import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      code: "PPS-GF30-ANFEL",
      name: "PPS GF30% 玻纤增强 / PPS GF30% Glass Fiber Reinforced",
      nameEn: "PPS GF30% Glass Fiber Reinforced",
      description: "以聚苯硫醚（PPS）为基材，加入30%玻璃纤维增强。具有优异的机械强度、耐热性和尺寸稳定性。适用于汽车、电子电气、家电等领域的高性能结构件。正常使用温度可达190℃，热变形温度262℃。阻燃等级UL94 V-0。颜色可定制（本色或黑色）。",
      descriptionEn: "PPS-based material with 30% glass fiber reinforcement. Excellent mechanical strength, heat resistance, and dimensional stability. For high-performance structural parts in automotive, electrical, and appliance industries. Service temperature up to 190°C, HDT 262°C. UL94 V-0 flame retardancy. Colors customizable.",
    },
    {
      code: "PPS-GF40-ANFEL",
      name: "PPS GF40% 玻纤增强 / PPS GF40% Glass Fiber Reinforced",
      nameEn: "PPS GF40% Glass Fiber Reinforced",
      description: "40%玻璃纤维增强PPS，具有更高的机械强度和刚性，同时保持良好的加工流动性。适用于对强度和尺寸精度要求更高的结构件，如泵壳、齿轮、刹车支架等。",
      descriptionEn: "40% glass fiber reinforced PPS with higher mechanical strength and rigidity while maintaining good processability. For structural parts requiring higher strength and precision, such as pump housings, gears, brake brackets.",
    },
    {
      code: "PPS-GF50-ANFEL",
      name: "PPS GF50% 玻纤增强 / PPS GF50% Glass Fiber Reinforced",
      nameEn: "PPS GF50% Glass Fiber Reinforced",
      description: "50%玻璃纤维增强PPS，最高刚性版本，适用于极端负载条件下的结构件。低毛边、良流动配方，便于复杂结构注塑成型。",
      descriptionEn: "50% glass fiber reinforced PPS, highest rigidity grade for extreme load conditions. Low-flash, good-flow formulation for complex injection molding.",
    },
    {
      code: "PPS-GF-MINERAL-ANFEL",
      name: "PPS 玻矿增强 / PPS Glass Fiber + Mineral Reinforced",
      nameEn: "PPS Glass Fiber + Mineral Reinforced",
      description: "玻璃纤维+矿物复合增强PPS，具有高填充、低翘曲、良流动等特性。适用于大型薄壁件和对尺寸稳定性要求高的应用。CTI等级可选（最高275），适合高电压电气部件。",
      descriptionEn: "Glass fiber + mineral composite reinforced PPS. High fill, low warpage, good flow. For large thin-wall parts. CTI grades available (up to 275) for high-voltage electrical components.",
    },
    {
      code: "PPS-CF-ANFEL",
      name: "PPS 碳纤维增强 / PPS Carbon Fiber Reinforced",
      nameEn: "PPS Carbon Fiber Reinforced",
      description: "碳纤维增强PPS，具有超高刚性、轻量化、导电/导热等特性。比重仅1.45-1.5，适用于高端航空航天、汽车轻量化、电子散热等对性能要求苛刻的领域。",
      descriptionEn: "Carbon fiber reinforced PPS with ultra-high rigidity, lightweight (SG 1.45-1.5), conductive/thermal properties. For demanding aerospace, automotive lightweighting, and electronics thermal management.",
    },
    {
      code: "PPS-SPECIAL-ANFEL",
      name: "PPS 特殊功能改性 / PPS Special Function Modified",
      nameEn: "PPS Special Function Modified",
      description: "具有自润滑、防静电、导电导热等特殊功能的PPS改性材料。通过添加PTFE、碳纤维等改性剂实现特定功能，满足特殊工况需求。",
      descriptionEn: "PPS modified materials with special functions: self-lubricating, anti-static, conductive/thermal. Achieved by adding PTFE, carbon fiber and other modifiers for special working conditions.",
    },
    {
      code: "PPS-EXTRUSION-ANFEL",
      name: "PPS 挤出成型 / PPS Extrusion Grade",
      nameEn: "PPS Extrusion Grade",
      description: "专为挤出成型工艺设计的PPS材料，可用于生产线材、薄壁管材、棒材、板材等。具有良好的熔体强度和挤出稳定性。",
      descriptionEn: "PPS materials specially designed for extrusion processes. Suitable for producing wires, thin-wall tubes, rods, and sheets. Good melt strength and extrusion stability.",
    },
    {
      code: "PPS-FIBER-ANFEL",
      name: "PPS 短纤维 / PPS Short Fiber",
      nameEn: "PPS Short Fiber",
      description: "聚苯硫醚（PPS）短纤维是一种新型高性能热塑性纤维，具有耐高温、耐酸碱、阻燃等优异性能。在85℃、60%浓度的强酸强碱溶液中浸泡七天以上，纤维强度保持率超过92%。针刺成毡后正常使用温度190℃，瞬间使用温度可达220℃。年产10000吨。",
      descriptionEn: "PPS short fiber is a high-performance thermoplastic fiber with excellent heat resistance, acid/alkali resistance, and flame retardancy. After soaking in 60% strong acid/alkali at 85°C for over 7 days, fiber strength retention exceeds 92%. Normal use temperature 190°C after needle-punching, instantaneous up to 220°C. Annual capacity: 10,000 tons.",
    },
  ];

  for (const u of updates) {
    await prisma.product.updateMany({
      where: { code: u.code },
      data: {
        name: u.name,
        nameEn: u.nameEn,
        description: u.description,
        descriptionEn: u.descriptionEn,
      },
    });
    console.log(`Updated: ${u.code}`);
  }

  console.log("\nDone! All PPS products updated with bilingual names.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
