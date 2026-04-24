"use client";

import Link from "next/link";
import { useCompare } from "./compare-context";
import { X, Scale } from "lucide-react";

export function CompareBar({ lang }: { lang: string }) {
  const { items, remove, clear } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0f1c]/95 backdrop-blur px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-sm text-slate-300 whitespace-nowrap">
            <Scale className="w-4 h-4 text-blue-400" />
            {lang === "zh" ? `已选 ${items.length}/4 个产品` : `Selected ${items.length}/4 products`}
          </div>
          <div className="flex items-center gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
              >
                <span className="truncate max-w-[120px]">{lang === "zh" ? item.name : (item.nameEn || item.name)}</span>
                <button
                  onClick={() => remove(item.id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-white/10"
                >
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clear}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            {lang === "zh" ? "清空" : "Clear"}
          </button>
          <Link
            href={`/compare?ids=${items.map((i) => i.id).join(",")}`}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
          >
            {lang === "zh" ? "开始对比" : "Compare"}
          </Link>
        </div>
      </div>
    </div>
  );
}
