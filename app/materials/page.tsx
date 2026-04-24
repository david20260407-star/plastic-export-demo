import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getDict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ParticlesBg } from "@/components/particles-bg";
import { MaterialsList } from "@/components/materials-list";
import { CompareBar } from "@/components/compare-bar";
import { ArrowLeft } from "lucide-react";

export default async function MaterialsPage() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { category: "Raw Materials" },
        { category: "Engineering Plastic" },
        { category: "Specialty Fiber" },
      ],
    },
    include: { attributes: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as Lang) || "en";
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-[#0a0f1c] pb-24">
      <ParticlesBg />
      <header className="border-b border-white/10 bg-[#0a0f1c]/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo-white.svg"
              alt="ChinaPlast Global"
              className="h-10 w-auto object-contain"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              ChinaPlast Global
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link href="/" className="hover:text-white transition">
              {t.nav.products}
            </Link>
            <Link href="/materials" className="text-white font-medium">
              {lang === "zh" ? "材料库" : "Materials"}
            </Link>
            <Link href="/compare" className="hover:text-white transition">
              {lang === "zh" ? "产品对比" : "Compare"}
            </Link>
            <Link href="/recommend" className="hover:text-white transition">
              {lang === "zh" ? "智能推荐" : "Recommend"}
            </Link>
            <Link href="/#about" className="hover:text-white transition">
              {t.nav.about}
            </Link>
            <Link href="/#contact" className="hover:text-white transition">
              {t.nav.contact}
            </Link>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition"
            >
              {t.nav.admin}
            </Link>
            <LangSwitcher lang={lang} />
          </nav>
          <MobileNav lang={lang} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> {t.productPage?.back || "Back"}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {lang === "zh" ? "塑料原料材料库" : "Plastic Materials Library"}
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            {lang === "zh"
              ? "浏览我们完整的标准塑料牌号库，查看详细物性参数，并选择最多 4 款产品进行并排对比。"
              : "Browse our standard plastic material grades, view detailed properties, and compare up to 4 products side by side."}
          </p>
        </div>

        <MaterialsList products={products} lang={lang} />
      </main>

      <CompareBar lang={lang} />
    </div>
  );
}
