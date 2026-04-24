import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AttrInput {
  key: string;
  labelZh: string;
  labelEn: string;
  value: string;
  valueEn: string;
  unit: string | null;
  category: string;
  sortOrder: number;
}

async function main() {
  // Find all PPS products
  const products = await prisma.product.findMany({
    where: { baseMaterial: "PPS" },
    select: { id: true, code: true },
  });

  const productMap = new Map(products.map((p) => [p.code, p.id]));

  // ── GF30% (AG301A) ──
  const gf30Attrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "1.54", valueEn: "1.54", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "moldingShrinkageFlow", labelZh: "成型收缩率(平行)", labelEn: "Molding Shrinkage (Flow)", value: "0.2", valueEn: "0.2", unit: "%", category: "processing", sortOrder: 2 },
    { key: "moldingShrinkageAcross", labelZh: "成型收缩率(垂直)", labelEn: "Molding Shrinkage (Across)", value: "0.6", valueEn: "0.6", unit: "%", category: "processing", sortOrder: 3 },
    { key: "waterAbsorption", labelZh: "吸水率", labelEn: "Water Absorption", value: "0.02", valueEn: "0.02", unit: "%", category: "physical", sortOrder: 4 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "150", valueEn: "150", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "tensileElongation", labelZh: "断裂伸长率", labelEn: "Tensile Elongation", value: "1.6", valueEn: "1.6", unit: "%", category: "mechanical", sortOrder: 11 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "12", valueEn: "12", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "flexuralStrength", labelZh: "弯曲强度", labelEn: "Flexural Strength", value: "230", valueEn: "230", unit: "MPa", category: "mechanical", sortOrder: 13 },
    { key: "notchedIzod", labelZh: "缺口冲击强度", labelEn: "Notched Izod Impact", value: "12", valueEn: "12", unit: "kJ/m²", category: "mechanical", sortOrder: 14 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "heatDeflectionTemp", labelZh: "热变形温度", labelEn: "HDT", value: "262", valueEn: "262", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
    { key: "dielectricStrength", labelZh: "介电强度", labelEn: "Dielectric Strength", value: "16", valueEn: "16", unit: "kV/mm", category: "electrical", sortOrder: 30 },
    { key: "dielectricConstant", labelZh: "介电常数", labelEn: "Dielectric Constant", value: "4", valueEn: "4", unit: null, category: "electrical", sortOrder: 31 },
    { key: "volumeResistivity", labelZh: "体积电阻率", labelEn: "Volume Resistivity", value: "2.2×10¹⁵", valueEn: "2.2×10¹⁵", unit: "Ω·cm", category: "electrical", sortOrder: 32 },
    { key: "cti", labelZh: "CTI(漏电起痕指数)", labelEn: "CTI", value: "125", valueEn: "125", unit: null, category: "electrical", sortOrder: 33 },
  ];

  // ── GF40% (AG401A) ──
  const gf40Attrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "1.64", valueEn: "1.64", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "moldingShrinkageFlow", labelZh: "成型收缩率(平行)", labelEn: "Molding Shrinkage (Flow)", value: "0.2", valueEn: "0.2", unit: "%", category: "processing", sortOrder: 2 },
    { key: "moldingShrinkageAcross", labelZh: "成型收缩率(垂直)", labelEn: "Molding Shrinkage (Across)", value: "0.3", valueEn: "0.3", unit: "%", category: "processing", sortOrder: 3 },
    { key: "waterAbsorption", labelZh: "吸水率", labelEn: "Water Absorption", value: "0.02", valueEn: "0.02", unit: "%", category: "physical", sortOrder: 4 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "180", valueEn: "180", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "tensileElongation", labelZh: "断裂伸长率", labelEn: "Tensile Elongation", value: "1.5", valueEn: "1.5", unit: "%", category: "mechanical", sortOrder: 11 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "14.5", valueEn: "14.5", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "flexuralStrength", labelZh: "弯曲强度", labelEn: "Flexural Strength", value: "285", valueEn: "285", unit: "MPa", category: "mechanical", sortOrder: 13 },
    { key: "notchedIzod", labelZh: "缺口冲击强度", labelEn: "Notched Izod Impact", value: "13", valueEn: "13", unit: "kJ/m²", category: "mechanical", sortOrder: 14 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "heatDeflectionTemp", labelZh: "热变形温度", labelEn: "HDT", value: "255", valueEn: "255", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
    { key: "cti", labelZh: "CTI(漏电起痕指数)", labelEn: "CTI", value: "175", valueEn: "175", unit: null, category: "electrical", sortOrder: 33 },
  ];

  // ── GF50% (AG501A) ──
  const gf50Attrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "1.80", valueEn: "1.80", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "moldingShrinkageFlow", labelZh: "成型收缩率(平行)", labelEn: "Molding Shrinkage (Flow)", value: "0.1", valueEn: "0.1", unit: "%", category: "processing", sortOrder: 2 },
    { key: "moldingShrinkageAcross", labelZh: "成型收缩率(垂直)", labelEn: "Molding Shrinkage (Across)", value: "0.12", valueEn: "0.12", unit: "%", category: "processing", sortOrder: 3 },
    { key: "waterAbsorption", labelZh: "吸水率", labelEn: "Water Absorption", value: "0.02", valueEn: "0.02", unit: "%", category: "physical", sortOrder: 4 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "225", valueEn: "225", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "tensileElongation", labelZh: "断裂伸长率", labelEn: "Tensile Elongation", value: "1.3", valueEn: "1.3", unit: "%", category: "mechanical", sortOrder: 11 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "22.5", valueEn: "22.5", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "flexuralStrength", labelZh: "弯曲强度", labelEn: "Flexural Strength", value: "325", valueEn: "325", unit: "MPa", category: "mechanical", sortOrder: 13 },
    { key: "notchedIzod", labelZh: "缺口冲击强度", labelEn: "Notched Izod Impact", value: "17", valueEn: "17", unit: "kJ/m²", category: "mechanical", sortOrder: 14 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "heatDeflectionTemp", labelZh: "热变形温度", labelEn: "HDT", value: "263", valueEn: "263", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
    { key: "cti", labelZh: "CTI(漏电起痕指数)", labelEn: "CTI", value: "200", valueEn: "200", unit: null, category: "electrical", sortOrder: 33 },
  ];

  // ── 玻矿增强 (AMG601A) ──
  const mineralAttrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "2.0", valueEn: "2.0", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "moldingShrinkageFlow", labelZh: "成型收缩率(平行)", labelEn: "Molding Shrinkage (Flow)", value: "0.08", valueEn: "0.08", unit: "%", category: "processing", sortOrder: 2 },
    { key: "moldingShrinkageAcross", labelZh: "成型收缩率(垂直)", labelEn: "Molding Shrinkage (Across)", value: "0.1", valueEn: "0.1", unit: "%", category: "processing", sortOrder: 3 },
    { key: "waterAbsorption", labelZh: "吸水率", labelEn: "Water Absorption", value: "0.02", valueEn: "0.02", unit: "%", category: "physical", sortOrder: 4 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "170", valueEn: "170", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "tensileElongation", labelZh: "断裂伸长率", labelEn: "Tensile Elongation", value: "1.2", valueEn: "1.2", unit: "%", category: "mechanical", sortOrder: 11 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "20", valueEn: "20", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "flexuralStrength", labelZh: "弯曲强度", labelEn: "Flexural Strength", value: "275", valueEn: "275", unit: "MPa", category: "mechanical", sortOrder: 13 },
    { key: "notchedIzod", labelZh: "缺口冲击强度", labelEn: "Notched Izod Impact", value: "12", valueEn: "12", unit: "kJ/m²", category: "mechanical", sortOrder: 14 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "heatDeflectionTemp", labelZh: "热变形温度", labelEn: "HDT", value: "255", valueEn: "255", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
    { key: "cti", labelZh: "CTI(漏电起痕指数)", labelEn: "CTI", value: "200", valueEn: "200", unit: null, category: "electrical", sortOrder: 33 },
  ];

  // ── 碳纤维增强 (ACF20代表值) ──
  const cfAttrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "1.48", valueEn: "1.48", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "moldingShrinkageFlow", labelZh: "成型收缩率(平行)", labelEn: "Molding Shrinkage (Flow)", value: "0.1", valueEn: "0.1", unit: "%", category: "processing", sortOrder: 2 },
    { key: "moldingShrinkageAcross", labelZh: "成型收缩率(垂直)", labelEn: "Molding Shrinkage (Across)", value: "0.15", valueEn: "0.15", unit: "%", category: "processing", sortOrder: 3 },
    { key: "waterAbsorption", labelZh: "吸水率", labelEn: "Water Absorption", value: "0.02", valueEn: "0.02", unit: "%", category: "physical", sortOrder: 4 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "210", valueEn: "210", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "tensileElongation", labelZh: "断裂伸长率", labelEn: "Tensile Elongation", value: "1.2", valueEn: "1.2", unit: "%", category: "mechanical", sortOrder: 11 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "32", valueEn: "32", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "flexuralStrength", labelZh: "弯曲强度", labelEn: "Flexural Strength", value: "350", valueEn: "350", unit: "MPa", category: "mechanical", sortOrder: 13 },
    { key: "notchedIzod", labelZh: "缺口冲击强度", labelEn: "Notched Izod Impact", value: "9.5", valueEn: "9.5", unit: "kJ/m²", category: "mechanical", sortOrder: 14 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "heatDeflectionTemp", labelZh: "热变形温度", labelEn: "HDT", value: "265", valueEn: "265", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
    { key: "cti", labelZh: "CTI(漏电起痕指数)", labelEn: "CTI", value: "150", valueEn: "150", unit: null, category: "electrical", sortOrder: 33 },
  ];

  // ── 特殊功能系列 (取中间值) ──
  const specialAttrs: AttrInput[] = [
    { key: "density", labelZh: "密度", labelEn: "Density", value: "1.65", valueEn: "1.65", unit: "g/cm³", category: "physical", sortOrder: 1 },
    { key: "tensileStrength", labelZh: "拉伸强度", labelEn: "Tensile Strength", value: "180", valueEn: "180", unit: "MPa", category: "mechanical", sortOrder: 10 },
    { key: "flexuralModulus", labelZh: "弯曲模量", labelEn: "Flexural Modulus", value: "24", valueEn: "24", unit: "GPa", category: "mechanical", sortOrder: 12 },
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
  ];

  // ── 挤出成型 ──
  const extrusionAttrs: AttrInput[] = [
    { key: "meltingPoint", labelZh: "熔点", labelEn: "Melting Point", value: "282", valueEn: "282", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "flameRetardancy", labelZh: "阻燃性", labelEn: "Flame Retardancy", value: "V-0", valueEn: "V-0", unit: null, category: "thermal", sortOrder: 22 },
  ];

  // ── PPS短纤维 ──
  const fiberAttrs: AttrInput[] = [
    { key: "fineness", labelZh: "纤度", labelEn: "Fineness", value: "0.89-6.0", valueEn: "0.89-6.0", unit: "dtex", category: "physical", sortOrder: 1 },
    { key: "cutLength", labelZh: "切断长度", labelEn: "Cut Length", value: "3-76", valueEn: "3-76", unit: "mm", category: "physical", sortOrder: 2 },
    { key: "serviceTemp", labelZh: "正常使用温度", labelEn: "Service Temperature", value: "190", valueEn: "190", unit: "°C", category: "thermal", sortOrder: 20 },
    { key: "peakTemp", labelZh: "瞬间使用温度", labelEn: "Peak Temperature", value: "220", valueEn: "220", unit: "°C", category: "thermal", sortOrder: 21 },
    { key: "acidAlkaliResistance", labelZh: "耐酸碱性", labelEn: "Acid/Alkali Resistance", value: "60%浓度，7天，强度保持率>92%", valueEn: "60% conc., 7 days, strength retention >92%", unit: null, category: "chemical", sortOrder: 40 },
  ];

  const mapping: Record<string, AttrInput[]> = {
    "PPS-GF30-ANFEL": gf30Attrs,
    "PPS-GF40-ANFEL": gf40Attrs,
    "PPS-GF50-ANFEL": gf50Attrs,
    "PPS-GF-MINERAL-ANFEL": mineralAttrs,
    "PPS-CF-ANFEL": cfAttrs,
    "PPS-SPECIAL-ANFEL": specialAttrs,
    "PPS-EXTRUSION-ANFEL": extrusionAttrs,
    "PPS-FIBER-ANFEL": fiberAttrs,
  };

  let totalInserted = 0;

  for (const [code, attrs] of Object.entries(mapping)) {
    const productId = productMap.get(code);
    if (!productId) {
      console.warn(`Product not found: ${code}`);
      continue;
    }

    // Delete existing attributes for this product first
    await prisma.productAttribute.deleteMany({ where: { productId } });

    for (const attr of attrs) {
      await prisma.productAttribute.create({
        data: { ...attr, productId },
      });
      totalInserted++;
    }

    console.log(`Written ${attrs.length} attributes to ${code}`);
  }

  console.log(`\nDone! Total attributes inserted: ${totalInserted}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
