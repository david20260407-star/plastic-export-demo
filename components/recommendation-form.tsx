"use client";

import { useState } from "react";
import Link from "next/link";
import { RecommendationResults } from "./recommendation-results";
import { Loader2, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  baseMaterial: string | null;
  attributes: {
    id: string;
    key: string;
    labelZh: string;
    labelEn: string;
    value: string;
    valueEn: string;
    unit: string | null;
    category: string;
  }[];
  priceHint: string | null;
}

interface FormState {
  application: string;
  tempRequirement: string;
  chemicalExposure: string;
  transparency: string;
  impactRequirement: string;
  budgetPriority: string;
}

const initialForm: FormState = {
  application: "",
  tempRequirement: "",
  chemicalExposure: "",
  transparency: "",
  impactRequirement: "",
  budgetPriority: "",
};

export function RecommendationForm({
  products,
  lang,
}: {
  products: Product[];
  lang: string;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [results, setResults] = useState<
    { product: Product; score: number; reasons: string[] }[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const isZh = lang === "zh";

  const questions = [
    {
      key: "application" as const,
      label: isZh ? "1. 您的产品用于什么场景？" : "1. What is your product used for?",
      options: [
        { value: "packaging", label: isZh ? "食品/日化包装" : "Food/Cosmetic Packaging" },
        { value: "automotive", label: isZh ? "汽车零部件" : "Automotive Parts" },
        { value: "electronics", label: isZh ? "电子电器外壳" : "Electronics Housing" },
        { value: "medical", label: isZh ? "医疗器械" : "Medical Devices" },
        { value: "optical", label: isZh ? "光学/透明件" : "Optical/Transparent Parts" },
        { value: "industrial", label: isZh ? "工业零件" : "Industrial Components" },
        { value: "household", label: isZh ? "日用品/玩具" : "Household/Toys" },
      ],
    },
    {
      key: "tempRequirement" as const,
      label: isZh ? "2. 使用环境温度要求？" : "2. Operating temperature requirement?",
      options: [
        { value: "low", label: isZh ? "常温 (< 60°C)" : "Room temp (< 60°C)" },
        { value: "medium", label: isZh ? "中温 (60-120°C)" : "Medium (60-120°C)" },
        { value: "high", label: isZh ? "高温 (> 120°C)" : "High (> 120°C)" },
        { value: "veryhigh", label: isZh ? "极高温 (> 200°C)" : "Very high (> 200°C)" },
      ],
    },
    {
      key: "chemicalExposure" as const,
      label: isZh ? "3. 是否会接触化学物质？" : "3. Chemical exposure?",
      options: [
        { value: "none", label: isZh ? "无特殊接触" : "None" },
        { value: "oils", label: isZh ? "油脂/润滑油" : "Oils/Grease" },
        { value: "solvents", label: isZh ? "有机溶剂/酸碱" : "Solvents/Acids" },
        { value: "alcohol", label: isZh ? "酒精/消毒水" : "Alcohol/Disinfectants" },
      ],
    },
    {
      key: "transparency" as const,
      label: isZh ? "4. 透明度要求？" : "4. Transparency requirement?",
      options: [
        { value: "opaque", label: isZh ? "不透明" : "Opaque" },
        { value: "translucent", label: isZh ? "半透明" : "Translucent" },
        { value: "transparent", label: isZh ? "透明" : "Transparent" },
        { value: "high-transparent", label: isZh ? "高透明/光学级" : "High transparency/Optical" },
      ],
    },
    {
      key: "impactRequirement" as const,
      label: isZh ? "5. 抗冲击性能要求？" : "5. Impact resistance requirement?",
      options: [
        { value: "standard", label: isZh ? "标准" : "Standard" },
        { value: "high", label: isZh ? "高抗冲" : "High impact" },
        { value: "veryhigh", label: isZh ? "极高抗冲" : "Very high impact" },
      ],
    },
    {
      key: "budgetPriority" as const,
      label: isZh ? "6. 预算优先级？" : "6. Budget priority?",
      options: [
        { value: "lowcost", label: isZh ? "低成本优先" : "Cost priority" },
        { value: "balanced", label: isZh ? "性价比平衡" : "Balanced" },
        { value: "performance", label: isZh ? "性能优先" : "Performance priority" },
      ],
    },
  ];

  function getAttr(product: Product, key: string) {
    return product.attributes.find((a) => a.key === key)?.value || "";
  }

  function getAttrEn(product: Product, key: string) {
    const attr = product.attributes.find((a) => a.key === key);
    return attr?.valueEn || attr?.value || "";
  }

  function calculateScore(product: Product): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    const opTemp = parseFloat(getAttr(product, "operatingTempMax")) || 0;
    const transparency = getAttr(product, "transparency");
    const chemicalResistance = getAttr(product, "chemicalResistance");
    const impactStrength = parseFloat(getAttr(product, "impactStrength")) || 0;

    // Temperature matching
    if (form.tempRequirement === "low" && opTemp < 80) {
      score += 20;
      reasons.push(isZh ? "适合常温使用" : "Suitable for room temperature");
    } else if (form.tempRequirement === "medium" && opTemp >= 80 && opTemp < 120) {
      score += 20;
      reasons.push(isZh ? "适合中温环境" : "Suitable for medium temperature");
    } else if (form.tempRequirement === "high" && opTemp >= 120 && opTemp < 180) {
      score += 20;
      reasons.push(isZh ? "耐高温性能优异" : "Excellent heat resistance");
    } else if (form.tempRequirement === "veryhigh" && opTemp >= 150) {
      score += 25;
      reasons.push(isZh ? "极耐高温" : "Extreme heat resistance");
    }

    // Transparency matching
    if (form.transparency === "opaque" && transparency === "不透明") {
      score += 15;
      reasons.push(isZh ? "不透明材料" : "Opaque material");
    } else if (form.transparency === "translucent" && transparency === "半透明") {
      score += 15;
      reasons.push(isZh ? "半透明特性" : "Translucent");
    } else if (
      form.transparency === "transparent" &&
      (transparency === "透明" || transparency === "高透明")
    ) {
      score += 15;
      reasons.push(isZh ? "透明材料" : "Transparent material");
    } else if (form.transparency === "high-transparent" && transparency === "高透明") {
      score += 20;
      reasons.push(isZh ? "光学级透明度" : "Optical grade transparency");
    }

    // Chemical resistance
    if (form.chemicalExposure === "none" || form.chemicalExposure === "oils") {
      score += 10;
    } else if (
      (form.chemicalExposure === "solvents" || form.chemicalExposure === "alcohol") &&
      (chemicalResistance === "优" || chemicalResistance === "良")
    ) {
      score += 15;
      reasons.push(isZh ? "耐化学性好" : "Good chemical resistance");
    }

    // Impact resistance
    if (form.impactRequirement === "standard" && impactStrength >= 4) {
      score += 10;
    } else if (form.impactRequirement === "high" && impactStrength >= 10) {
      score += 15;
      reasons.push(isZh ? "高抗冲击" : "High impact resistance");
    } else if (form.impactRequirement === "veryhigh" && impactStrength >= 40) {
      score += 20;
      reasons.push(isZh ? "极高抗冲击" : "Extreme impact resistance");
    }

    // Application specific
    if (form.application === "packaging" && product.baseMaterial === "PP") {
      score += 10;
      reasons.push(isZh ? "常用于包装" : "Commonly used for packaging");
    }
    if (form.application === "automotive" && product.baseMaterial === "PA66") {
      score += 10;
      reasons.push(isZh ? "适合汽车应用" : "Suitable for automotive");
    }
    if (form.application === "optical" && transparency === "高透明") {
      score += 15;
      reasons.push(isZh ? "光学级材料" : "Optical grade material");
    }
    if (form.application === "electronics" && product.baseMaterial === "ABS") {
      score += 10;
      reasons.push(isZh ? "常用于电子产品" : "Commonly used for electronics");
    }

    // Budget consideration (price hint as proxy)
    const priceHint = product.priceHint || "";
    if (form.budgetPriority === "lowcost" && priceHint.includes("1,100")) {
      score += 10;
      reasons.push(isZh ? "经济实惠" : "Economical choice");
    } else if (form.budgetPriority === "performance" && priceHint.includes("3,")) {
      score += 10;
      reasons.push(isZh ? "高性能材料" : "High performance material");
    }

    return { score, reasons };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const scored = products
        .map((product) => {
          const { score, reasons } = calculateScore(product);
          return { product, score, reasons };
        })
        .filter((item) => item.score > 30) // Only show good matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setResults(scored);
      setLoading(false);
    }, 800);
  }

  function reset() {
    setForm(initialForm);
    setResults(null);
  }

  if (results) {
    return (
      <RecommendationResults
        results={results}
        lang={lang}
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
        {questions.map((q) => (
          <div key={q.key}>
            <label className="block text-sm font-medium text-white mb-3">
              {q.label}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, [q.key]: opt.value }))}
                  className={`px-3 py-2 rounded-lg text-sm transition text-left ${
                    form[q.key] === opt.value
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 rounded-lg text-slate-400 hover:text-white transition"
        >
          {isZh ? "重置" : "Reset"}
        </button>
        <button
          type="submit"
          disabled={loading || !form.application || !form.tempRequirement}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isZh ? "分析中..." : "Analyzing..."}
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              {isZh ? "获取推荐" : "Get Recommendations"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
