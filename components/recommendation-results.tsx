"use client";

import Link from "next/link";
import { useCompare } from "./compare-context";
import { Check, ArrowRight, RotateCcw, Scale, Thermometer, Droplets, Eye, Shield, DollarSign } from "lucide-react";

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

interface ResultItem {
  product: Product;
  score: number;
  reasons: string[];
}

function getAttr(product: Product, key: string, lang: string) {
  const a = product.attributes.find((x) => x.key === key);
  const val = a ? (lang === "zh" || !a.valueEn ? a.value : a.valueEn) : null;
  return val ? `${val}${a?.unit ? " " + a.unit : ""}` : "—";
}

export function RecommendationResults({
  results,
  lang,
  onReset,
}: {
  results: ResultItem[];
  lang: string;
  onReset: () => void;
}) {
  const { toggle, has } = useCompare();
  const isZh = lang === "zh";

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
        <p className="text-slate-400 mb-4">
          {isZh
            ? "未找到完全匹配的材料，建议放宽条件或联系我们获取定制方案。"
            : "No perfect matches found. Consider relaxing your criteria or contact us for custom solutions."}
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition"
        >
          <RotateCcw className="w-4 h-4" />
          {isZh ? "重新选择" : "Try Again"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {isZh ? "为您推荐" : "Recommended for You"}
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({results.length} {isZh ? "个结果" : "results"})
          </span>
        </h2>
        <button
          onClick={onReset}
          className="text-sm text-slate-400 hover:text-white transition"
        >
          {isZh ? "重新选择" : "Start Over"}
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((item, idx) => {
          const p = item.product;
          const inCompare = has(p.id);
          const rank = idx + 1;

          return (
            <div
              key={p.id}
              className={`rounded-xl border p-6 transition ${
                rank === 1
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        rank === 1
                          ? "bg-yellow-500 text-black"
                          : rank === 2
                          ? "bg-slate-400 text-black"
                          : rank === 3
                          ? "bg-amber-600 text-white"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {rank}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {isZh ? p.name : (p.nameEn || p.name)}
                    </h3>
                    {rank === 1 && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                        {isZh ? "最佳匹配" : "Best Match"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-400 mb-3">{p.code}</p>

                  {/* Key specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">
                        {getAttr(p, "operatingTempMax", lang)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">
                        {getAttr(p, "chemicalResistance", lang)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">
                        {getAttr(p, "transparency", lang)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">
                        {getAttr(p, "impactStrength", lang)}
                      </span>
                    </div>
                  </div>

                  {/* Match reasons */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.reasons.map((reason, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs"
                      >
                        <Check className="w-3 h-3" />
                        {reason}
                      </span>
                    ))}
                  </div>

                  {p.priceHint && (
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <DollarSign className="w-4 h-4" />
                      {p.priceHint}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() =>
                      toggle({ id: p.id, name: p.name, nameEn: p.nameEn, code: p.code })
                    }
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      inCompare
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {inCompare ? (
                      <>
                        <Check className="w-4 h-4" />
                        {isZh ? "已添加" : "Added"}
                      </>
                    ) : (
                      <>
                        <Scale className="w-4 h-4" />
                        {isZh ? "加入对比" : "Compare"}
                      </>
                    )}
                  </button>
                  <Link
                    href={`/product/${p.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
                  >
                    {isZh ? "查看详情" : "Details"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href={`/compare?ids=${results
            .filter((r) => has(r.product.id))
            .map((r) => r.product.id)
            .join(",")}`}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition ${
            results.filter((r) => has(r.product.id)).length < 2 ? "hidden" : ""
          }`}
        >
          {isZh ? "对比已选产品" : "Compare Selected"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
