import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getDict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ParticlesBg } from "@/components/particles-bg";
import { CompareTable } from "@/components/compare-table";
import { CompareBar } from "@/components/compare-bar";
import { ArrowLeft } from "lucide-react";

export default async function ComparePage(props: {
  searchParams?: Promise<{ ids?: string }>;
}) {
  const searchParams = await props.searchParams;
  const ids = searchParams?.ids?.split(",").filter(Boolean) || [];

  const products =
    ids.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: ids } },
          include: { attributes: { orderBy: { sortOrder: "asc" } } },
        })
      : [];

  // preserve query order
  const ordered = ids
    .map((id) => products.find((p: typeof products[0]) => p.id === id))
    .filter(Boolean) as typeof products;

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
            <Link href="/materials" className="hover:text-white transition">
              {lang === "zh" ? "材料库" : "Materials"}
            </Link>
            <Link href="/compare" className="text-white font-medium">
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
            href="/materials"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> {t.productPage?.back || "Back"}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {lang === "zh" ? "产品物性对比" : "Product Comparison"}
          </h1>
          <p className="text-slate-400 mt-2">
            {lang === "zh"
              ? "并排查看关键物理、机械及热性能参数差异。"
              : "Compare key physical, mechanical and thermal properties side by side."}
          </p>
        </div>

        <CompareTable products={ordered} lang={lang} />
      </main>

      <CompareBar lang={lang} />
    </div>
  );
}
