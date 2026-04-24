"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { getCategoryLabel } from "@/lib/i18n";

export function ProductCard({
  product,
  lang = "en",
}: {
  product: {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    category: string;
    specs?: string | null;
    image?: string | null;
    priceHint?: string | null;
  };
  lang?: string;
}) {
  const displayName = lang === "zh" ? product.name : (product.nameEn || product.name);
  const displayCategory = getCategoryLabel(product.category, lang);
  const displayDesc = lang === "zh" ? product.description : (product.descriptionEn || product.description);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-800/60">
        {product.image ? (
          <img
            src={product.image}
            alt={displayName}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <Package className="h-10 w-10 text-slate-500" />
        )}
      </div>
      <div className="text-xs font-medium text-blue-400">{displayCategory}</div>
      <h3 className="mt-1 text-base font-medium text-white group-hover:text-blue-300 transition">
        {displayName}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-400">
        {displayDesc}
      </p>
      {product.priceHint && (
        <div className="mt-3 text-sm font-medium text-emerald-400">
          {product.priceHint}
        </div>
      )}
    </Link>
  );
}
