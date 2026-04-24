import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getDict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ParticlesBg } from "@/components/particles-bg";
import { RecommendationForm } from "@/components/recommendation-form";
import { ArrowLeft, Sparkles } from "lucide-react";

export default async function RecommendPage() {
  const products = await prisma.product.findMany({
    where: { category: "Raw Materials" },
    include: { attributes: { orderBy: { sortOrder: "asc" } } },
  });

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as Lang) || "en";

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
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
              {lang === "zh" ? "首页" : "Home"}
            </Link>
            <Link href="/materials" className="hover:text-white transition">
              {lang === "zh" ? "材料库" : "Materials"}
            </Link>
            <Link href="/compare" className="hover:text-white transition">
              {lang === "zh" ? "对比" : "Compare"}
            </Link>
            <Link href="/recommend" className="text-white font-medium">
              {lang === "zh" ? "智能推荐" : "Recommend"}
            </Link>
            <Link href="/#about" className="hover:text-white transition">
              {lang === "zh" ? "关于" : "About"}
            </Link>
            <Link href="/#contact" className="hover:text-white transition">
              {lang === "zh" ? "联系" : "Contact"}
            </Link>
            <LangSwitcher lang={lang} />
          </nav>
          <MobileNav lang={lang} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> {lang === "zh" ? "返回" : "Back"}
          </Link>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400 mb-4">
            <Sparkles className="w-4 h-4" />
            {lang === "zh" ? "AI 驱动" : "AI Powered"}
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {lang === "zh" ? "智能材料推荐" : "Smart Material Recommendation"}
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            {lang === "zh"
              ? "告诉我们您的应用需求，我们将为您匹配最合适的塑料原料。"
              : "Tell us your application requirements and we'll match you with the most suitable plastic materials."}
          </p>
        </div>

        <RecommendationForm products={products} lang={lang} />
      </main>
    </div>
  );
}
