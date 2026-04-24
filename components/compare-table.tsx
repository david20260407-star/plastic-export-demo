"use client";

import Link from "next/link";
import { Package } from "lucide-react";

interface CompareProduct {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  description: string;
  priceHint: string | null;
  attributes: {
    id: string;
    key: string;
    labelZh: string;
    labelEn: string;
    value: string;
    valueEn: string;
    unit: string | null;
    category: string;
    sortOrder: number;
  }[];
}

const categoryLabels: Record<string, { zh: string; en: string }> = {
  physical: { zh: "物理性能", en: "Physical" },
  thermal: { zh: "热性能", en: "Thermal" },
  mechanical: { zh: "机械性能", en: "Mechanical" },
  chemical: { zh: "化学性能", en: "Chemical" },
  compliance: { zh: "合规认证", en: "Compliance" },
  processing: { zh: "加工与应用", en: "Processing" },
};

const higherIsBetter = new Set([
  "tensileStrength",
  "flexuralModulus",
  "impactStrength",
  "heatDeflectionTemp",
  "operatingTempMax",
]);

function parseNum(v: string) {
  const m = v.match(/[+-]?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

function bestIndices(products: CompareProduct[], key: string): number[] {
  const vals = products.map((p, idx) => {
    const a = p.attributes.find((x) => x.key === key);
    return { idx, num: a ? parseNum(a.value) : null };
  });
  const valid = vals.filter((v) => v.num !== null) as { idx: number; num: number }[];
  if (valid.length === 0) return [];
  const isHigher = higherIsBetter.has(key);
  const target = isHigher
    ? Math.max(...valid.map((v) => v.num))
    : Math.min(...valid.map((v) => v.num));
  return valid.filter((v) => v.num === target).map((v) => v.idx);
}

export function CompareTable({
  products,
  lang,
}: {
  products: CompareProduct[];
  lang: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
        {lang === "zh" ? "请先前往材料库选择要对比的产品。" : "Please select products from the Materials Library to compare."}
      </div>
    );
  }

  // Build ordered attribute list from first product (all share same schema in our seed)
  const attrKeys = products[0].attributes.map((a) => a.key);

  // Group keys by category in display order
  const groups: { category: string; keys: string[] }[] = [];
  const seenCats: string[] = [];
  attrKeys.forEach((key) => {
    const cat = products[0].attributes.find((a) => a.key === key)?.category || "other";
    if (!seenCats.includes(cat)) {
      seenCats.push(cat);
      groups.push({ category: cat, keys: [] });
    }
    groups.find((g) => g.category === cat)?.keys.push(key);
  });

  return (
    <div className="space-y-8">
      {/* Header cards */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(160px, 1fr))` }}>
        <div />
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div className="font-medium text-white">{lang === "zh" ? p.name : (p.nameEn || p.name)}</div>
            <div className="text-xs text-slate-500">{p.code}</div>
            {p.priceHint && (
              <div className="mt-2 text-sm font-medium text-emerald-400">{p.priceHint}</div>
            )}
            <Link
              href={`/product/${p.id}`}
              className="mt-3 inline-block text-xs text-blue-400 hover:underline"
            >
              {lang === "zh" ? "查看详情 →" : "Details →"}
            </Link>
          </div>
        ))}
      </div>

      {/* Comparison grid */}
      {groups.map((g) => (
        <div key={g.category}
        >
          <div className="mb-3 text-sm font-semibold text-blue-400">
            {categoryLabels[g.category]?.[lang === "zh" ? "zh" : "en"] || g.category}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {g.keys.map((key, rowIdx) => {
              const label =
                lang === "zh"
                  ? products[0].attributes.find((a) => a.key === key)?.labelZh
                  : products[0].attributes.find((a) => a.key === key)?.labelEn;
              const bests = bestIndices(products, key);
              return (
                <div
                  key={key}
                  className={`grid items-center ${rowIdx !== g.keys.length - 1 ? "border-b border-white/10" : ""}`}
                  style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(160px, 1fr))` }}
                >
                  <div className="px-4 py-3 text-sm text-slate-300 bg-white/[0.02]">{label}</div>
                  {products.map((p, idx) => {
                    const a = p.attributes.find((x) => x.key === key);
                    const val = a ? (lang === "zh" || !a.valueEn ? a.value : a.valueEn) : null;
                    const text = val ? `${val}${a?.unit ? " " + a.unit : ""}` : "—";
                    const isBest = bests.includes(idx);
                    return (
                      <div
                        key={p.id + key}
                        className={`px-4 py-3 text-sm ${isBest ? "font-semibold text-emerald-400" : "text-white"}`}
                      >
                        {text}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
        {lang === "zh" ? "绿色高亮 = 该属性下的最佳值" : "Green highlight = best value for that property"}
      </div>
    </div>
  );
}
