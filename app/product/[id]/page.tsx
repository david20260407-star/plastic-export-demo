import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/contact-form";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ParticlesBg } from "@/components/particles-bg";
import { CompareButton } from "@/components/compare-button";
import { getDict, type Lang, getCategoryLabel, getTagLabel } from "@/lib/i18n";
import { notFound } from "next/navigation";

function TagsSection({ tags, lang }: { tags: string | null; lang: string }) {
  if (!tags || tags === "[]") return null;
  try {
    const parsed = JSON.parse(tags) as string[];
    if (!parsed.length) return null;
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {parsed.map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">
            {getTagLabel(tag, lang)}
          </span>
        ))}
      </div>
    );
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return notFound();

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as Lang) || "en";
  const t = getDict(lang);

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
              {t.nav.products}
            </Link>
            <Link href="/materials" className="hover:text-white transition">
              {lang === "zh" ? "材料库" : "Materials"}
            </Link>
            <Link href="/compare" className="hover:text-white transition">
              {lang === "zh" ? "对比" : "Compare"}
            </Link>
            <Link href="/recommend" className="hover:text-white transition">
              {lang === "zh" ? "智能推荐" : "Recommend"}
            </Link>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition"
            >
              {t.nav.admin}
            </Link>
            <LangSwitcher lang={lang} />
          </nav>
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" /> {t.productPage.back}
            </Link>
            <LangSwitcher lang={lang} />
          </div>
          <MobileNav lang={lang} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-2">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-800/60">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <Package className="h-20 w-20 text-slate-600" />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-blue-400">{getCategoryLabel(product.category, lang)}</div>
              <h1 className="mt-2 text-3xl font-semibold text-white">{lang === "zh" ? product.name : (product.nameEn || product.name)}</h1>
              <p className="mt-3 text-slate-300 leading-relaxed">{lang === "zh" ? product.description : (product.descriptionEn || product.description)}</p>
              <TagsSection tags={product.applicationTags} lang={lang} />
            </div>

            {product.specs && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h2 className="text-sm font-medium text-white mb-2">{t.productPage.specs}</h2>
                <p className="text-slate-400 text-sm whitespace-pre-line">{product.specs}</p>
              </div>
            )}

            {product.priceHint && (
              <div className="space-y-1">
                <div className="text-xl font-medium text-emerald-400">{product.priceHint}</div>
                <div className="text-xs text-amber-400/80">{t.productPage.priceNote1}</div>
                <div className="text-xs text-blue-400/80">{t.productPage.priceNote2}</div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <CompareButton product={{ id: product.id, name: product.name, nameEn: product.nameEn, code: product.code }} lang={lang} />
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-medium text-white mb-1">{t.productPage.requestQuote}</h2>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {t.productPage.reply24h}
              </div>
              <ContactForm lang={lang} productId={product.id} />
            </div>
          </div>
        </div>

        {/* Trust Team */}
        <section className="mt-16 py-12 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {t.trustTeam.heading}
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {t.trustTeam.desc}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">30+</div>
              <div className="text-sm text-slate-300">{t.trustTeam.stat1}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-sm text-slate-300">{t.trustTeam.stat2}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">West</div>
              <div className="text-sm text-slate-300">{t.trustTeam.stat3}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">EN/CN</div>
              <div className="text-sm text-slate-300">{t.trustTeam.stat4}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
