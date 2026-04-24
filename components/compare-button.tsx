"use client";

import { useCompare } from "./compare-context";
import { Scale, Check } from "lucide-react";

export function CompareButton({
  product,
  lang,
}: {
  product: { id: string; name: string; nameEn: string; code: string };
  lang: string;
}) {
  const { toggle, has } = useCompare();
  const active = has(product.id);

  return (
    <button
      onClick={() => toggle(product)}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-white/10 text-white hover:bg-white/5"
      }`}
    >
      {active ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
      {active
        ? lang === "zh"
          ? "已加入对比"
          : "Added"
        : lang === "zh"
        ? "加入对比"
        : "Add to Compare"}
    </button>
  );
}
