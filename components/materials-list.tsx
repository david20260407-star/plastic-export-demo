"use client";

import Link from "next/link";
import { useCompare } from "./compare-context";
import { Scale, ExternalLink, Package } from "lucide-react";

interface MaterialProduct {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  baseMaterial: string | null;
  image: string | null;
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

function getAttr(product: MaterialProduct, key: string, lang: string) {
  const a = product.attributes.find((x) => x.key === key);
  const val = a ? (lang === "zh" || !a.valueEn ? a.value : a.valueEn) : null;
  return val ? `${val}${a?.unit ? " " + a.unit : ""}` : "—";
}

export function MaterialsList({
  products,
  lang,
}: {
  products: MaterialProduct[];
  lang: string;
}) {
  const { toggle, has, items } = useCompare();

  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
          {lang === "zh" ? "暂无材料数据" : "No materials available yet."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-4 py-3 w-10">
                  <Scale className="w-4 h-4 text-blue-400" />
                </th>
                <th className="px-4 py-3">{lang === "zh" ? "产品名称" : "Product"}</th>
                <th className="px-4 py-3">{lang === "zh" ? "基材" : "Base"}</th>
                <th className="px-4 py-3">{lang === "zh" ? "密度" : "Density"}</th>
                <th className="px-4 py-3">
                  {lang === "zh" ? "拉伸强度" : "Tensile Str."}
                </th>
                <th className="px-4 py-3">{lang === "zh" ? "HDT" : "HDT"}</th>
                <th className="px-4 py-3">{lang === "zh" ? "加工方式" : "Processing"}</th>
                <th className="px-4 py-3">{lang === "zh" ? "价格区间" : "Price"}</th>
                <th className="px-4 py-3 text-right">{lang === "zh" ? "操作" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map((p) => {
                const checked = has(p.id);
                const disabled = !checked && items.length >= 4;
                return (
                  <tr
                    key={p.id}
                    className={`transition ${checked ? "bg-blue-500/10" : "hover:bg-white/[0.03]"}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle({ id: p.id, name: p.name, nameEn: p.nameEn, code: p.code })}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 disabled:opacity-30"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-slate-800" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                            <Package className="w-5 h-5 text-slate-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-white">{lang === "zh" ? p.name : (p.nameEn || p.name)}</div>
                          <div className="text-xs text-slate-500">{p.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{p.baseMaterial || "—"}</td>
                    <td className="px-4 py-3 text-slate-300">{getAttr(p, "density", lang)}</td>
                    <td className="px-4 py-3 text-slate-300">{getAttr(p, "tensileStrength", lang)}</td>
                    <td className="px-4 py-3 text-slate-300">{getAttr(p, "heatDeflectionTemp", lang)}</td>
                    <td className="px-4 py-3 text-slate-300">{getAttr(p, "processingMethod", lang)}</td>
                    <td className="px-4 py-3 text-emerald-400">{p.priceHint || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/product/${p.id}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        {lang === "zh" ? "详情" : "Details"}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
