import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // PPS Modified Products
  const ppsModifiedProducts = [
    {
      name: "PPS GF30% 玻纤增强 / PPS GF30% Glass Fiber Reinforced",
      nameEn: "PPS GF30% Glass Fiber Reinforced",
      code: "PPS-GF30-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "以聚苯硫醚（PPS）为基材，加入30%玻璃纤维增强。具有优异的机械强度、耐热性和尺寸稳定性。适用于汽车、电子电气、家电等领域的高性能结构件。正常使用温度可达190℃，热变形温度262℃。阻燃等级UL94 V-0。颜色可定制（本色或黑色）。\n\nPPS-based material with 30% glass fiber reinforcement. Excellent mechanical strength, heat resistance, and dimensional stability. For high-performance structural parts in automotive, electrical, and appliance industries. Service temperature up to 190°C, HDT 262°C. UL94 V-0 flame retardancy. Colors customizable.",
      specs: "牌号 Grades: AG301A1 (良流动), AG301A (标准)\n密度 Density: 1.54 g/cm³\n拉伸强度 Tensile: 150 MPa\n弯曲模量 Flexural Modulus: 12 GPa\n弯曲强度 Flexural Strength: 230 MPa\n缺口冲击 Notched Izod: 12 kJ/m²\n热变形温度 HDT: 262°C\n阻燃性 Flame Retardancy: UL94 V-0\nCTI: 125",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: true,
      applicationTags: JSON.stringify(["automotive","electrical","appliance","heat-resistant","flame-retardant"]),
    },
    {
      name: "PPS GF40% 玻纤增强 / PPS GF40% Glass Fiber Reinforced",
      nameEn: "PPS GF40% Glass Fiber Reinforced",
      code: "PPS-GF40-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "40%玻璃纤维增强PPS，具有更高的机械强度和刚性，同时保持良好的加工流动性。适用于对强度和尺寸精度要求更高的结构件，如泵壳、齿轮、刹车支架等。\n\n40% glass fiber reinforced PPS with higher mechanical strength and rigidity while maintaining good processability. For structural parts requiring higher strength and precision, such as pump housings, gears, brake brackets.",
      specs: "牌号 Grades: AG401A (标准), AG401A1 (良流动低毛边), AG401A-HF (低氯)\n密度 Density: 1.64 g/cm³\n拉伸强度 Tensile: 180 MPa\n弯曲模量 Flexural Modulus: 14.5 GPa\n弯曲强度 Flexural Strength: 285 MPa\n缺口冲击 Notched Izod: 13 kJ/m²\n热变形温度 HDT: 255°C\n阻燃性 Flame Retardancy: UL94 V-0\nCTI: 175",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: true,
      applicationTags: JSON.stringify(["automotive","machinery","pump","gear","heat-resistant"]),
    },
    {
      name: "PPS GF50% 玻纤增强 / PPS GF50% Glass Fiber Reinforced",
      nameEn: "PPS GF50% Glass Fiber Reinforced",
      code: "PPS-GF50-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "50%玻璃纤维增强PPS，最高刚性版本，适用于极端负载条件下的结构件。低毛边、良流动配方，便于复杂结构注塑成型。\n\n50% glass fiber reinforced PPS, highest rigidity grade for extreme load conditions. Low-flash, good-flow formulation for complex injection molding.",
      specs: "牌号 Grades: AG501A1 (良流动低毛边), AG501A (标准)\n密度 Density: 1.80 g/cm³\n拉伸强度 Tensile: 225 MPa\n弯曲模量 Flexural Modulus: 22.5 GPa\n弯曲强度 Flexural Strength: 325 MPa\n缺口冲击 Notched Izod: 17 kJ/m²\n热变形温度 HDT: 263°C\n阻燃性 Flame Retardancy: UL94 V-0\nCTI: 200",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: true,
      applicationTags: JSON.stringify(["automotive","machinery","high-load","structural"]),
    },
    {
      name: "PPS 玻矿增强 / PPS Glass Fiber + Mineral Reinforced",
      nameEn: "PPS Glass Fiber + Mineral Reinforced",
      code: "PPS-GF-MINERAL-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "玻璃纤维+矿物复合增强PPS，具有高填充、低翘曲、良流动等特性。适用于大型薄壁件和对尺寸稳定性要求高的应用。CTI等级可选（最高275），适合高电压电气部件。\n\nGlass fiber + mineral composite reinforced PPS. High fill, low warpage, good flow. For large thin-wall parts. CTI grades available (up to 275) for high-voltage electrical components.",
      specs: "牌号 Grades: AMG601A (标准), AMG601A1 (高强度良流动), AMG601A-CI (CTI等级), AMG652A (高强度), AMG651A-HF (低氯)\n密度 Density: 1.95-2.0 g/cm³\n拉伸强度 Tensile: 155-170 MPa\n弯曲模量 Flexural Modulus: 19.5-20 GPa\n弯曲强度 Flexural Strength: 240-275 MPa\n热变形温度 HDT: 255-262°C\n阻燃性 Flame Retardancy: UL94 V-0\nCTI: 200-275",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: false,
      applicationTags: JSON.stringify(["electrical","thin-wall","low-warpage","high-cti"]),
    },
    {
      name: "PPS 碳纤维增强 / PPS Carbon Fiber Reinforced",
      nameEn: "PPS Carbon Fiber Reinforced",
      code: "PPS-CF-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "碳纤维增强PPS，具有超高刚性、轻量化、导电/导热等特性。比重仅1.45-1.5，适用于高端航空航天、汽车轻量化、电子散热等对性能要求苛刻的领域。\n\nCarbon fiber reinforced PPS with ultra-high rigidity, lightweight (SG 1.45-1.5), conductive/thermal properties. For demanding aerospace, automotive lightweighting, and electronics thermal management.",
      specs: "牌号 Grades: ACF10 (CF10%), ACF20 (CF20%), ACF30 (CF30%)\n密度 Density: 1.45-1.50 g/cm³\n拉伸强度 Tensile: 210 MPa\n弯曲模量 Flexural Modulus: 32 GPa\n弯曲强度 Flexural Strength: 350 MPa\n缺口冲击 Notched Izod: 9.5 kJ/m²\n热变形温度 HDT: 265°C\n阻燃性 Flame Retardancy: UL94 V-0",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: true,
      applicationTags: JSON.stringify(["aerospace","automotive","lightweight","conductive","thermal"]),
    },
    {
      name: "PPS 特殊功能改性 / PPS Special Function Modified",
      nameEn: "PPS Special Function Modified",
      code: "PPS-SPECIAL-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "具有自润滑、防静电、导电导热等特殊功能的PPS改性材料。通过添加PTFE、碳纤维等改性剂实现特定功能，满足特殊工况需求。\n\nPPS modified materials with special functions: self-lubricating, anti-static, conductive/thermal. Achieved by adding PTFE, carbon fiber and other modifiers for special working conditions.",
      specs: "牌号 Grades: ACGP401A (PTFE+CF30%自润滑), AMGP552A (PTFE+GF30%自润滑), ACG401A (防静电), AMJ701A (导电导热)\n密度 Density: 1.50-1.80 g/cm³\n拉伸强度 Tensile: 150-210 MPa\n弯曲模量 Flexural Modulus: 16-32 GPa\n阻燃性 Flame Retardancy: UL94 V-0",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: false,
      applicationTags: JSON.stringify(["self-lubricating","anti-static","conductive","wear-resistant"]),
    },
    {
      name: "PPS 挤出成型 / PPS Extrusion Grade",
      nameEn: "PPS Extrusion Grade",
      code: "PPS-EXTRUSION-ANFEL",
      category: "Engineering Plastic",
      baseMaterial: "PPS",
      description: "专为挤出成型工艺设计的PPS材料，可用于生产线材、薄壁管材、棒材、板材等。具有良好的熔体强度和挤出稳定性。\n\nPPS materials specially designed for extrusion processes. Suitable for producing wires, thin-wall tubes, rods, and sheets. Good melt strength and extrusion stability.",
      specs: "牌号 Grades: AR1010T系列 (挤出), AR1010-EX (非增强改性)\n熔点 Melting Point: 282°C\n阻燃性 Flame Retardancy: UL94 V-0",
      priceHint: null,
      image: "/research/pps/pps-modified/cover.jpg",
      featured: false,
      applicationTags: JSON.stringify(["extrusion","wire","tube","sheet","profile"]),
    },
  ];

  // PPS Fiber
  const ppsFiberProducts = [
    {
      name: "PPS 短纤维 / PPS Short Fiber",
      nameEn: "PPS Short Fiber",
      code: "PPS-FIBER-ANFEL",
      category: "Specialty Fiber",
      baseMaterial: "PPS",
      description: "聚苯硫醚（PPS）短纤维是一种新型高性能热塑性纤维，具有耐高温、耐酸碱、阻燃等优异性能。在85℃、60%浓度的强酸强碱溶液中浸泡七天以上，纤维强度保持率超过92%。针刺成毡后正常使用温度190℃，瞬间使用温度可达220℃。年产10000吨。\n\nPPS short fiber is a high-performance thermoplastic fiber with excellent heat resistance, acid/alkali resistance, and flame retardancy. After soaking in 60% strong acid/alkali at 85°C for over 7 days, fiber strength retention exceeds 92%. Normal use temperature 190°C after needle-punching, instantaneous up to 220°C. Annual capacity: 10,000 tons.",
      specs: "纤度 Fineness: 0.89-6.0 dtex\n切断长度 Cut Length: 3-76 mm\n正常使用温度 Service Temp: 190°C\n瞬间使用温度 Peak Temp: 220°C\n耐酸碱性 Acid/Alkali Resistance: 60%浓度，7天，强度保持率>92%\n包装 Packaging: 200±10kg/包，塑料薄膜内袋+聚丙烯编织外袋",
      priceHint: null,
      image: "/research/pps/pps-fiber/cover.png",
      featured: true,
      applicationTags: JSON.stringify(["filtration","dust-collection","power-plant","cement","metallurgy","insulation","protective-clothing"]),
    },
  ];

  const allProducts = [...ppsModifiedProducts, ...ppsFiberProducts];
  let inserted = 0;

  for (const p of allProducts) {
    const existing = await prisma.product.findUnique({ where: { code: p.code } });
    if (existing) {
      console.log(`Skipped (exists): ${p.code}`);
      continue;
    }
    await prisma.product.create({ data: p });
    inserted++;
    console.log(`Inserted: ${p.code}`);
  }

  console.log(`\nDone! Inserted ${inserted} PPS products.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
