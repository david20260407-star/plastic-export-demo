import Link from "next/link";
import { cookies } from "next/headers";
import {
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Factory,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { getDict, type Lang, getCategoryLabel } from "@/lib/i18n";
import { MissionSection } from "@/components/mission-section";
import { ParticlesBg } from "@/components/particles-bg";
import { TrustStats } from "@/components/trust-stats";

export default async function HomePage(props: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const searchParams = await props.searchParams;
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const activeTab = searchParams?.tab || "raw";

  const filteredProducts = products.filter((p) => {
    if (activeTab === "engineering") return p.category === "Engineering Plastics";
    if (activeTab === "fiber") return p.category === "Specialty Fiber";
    if (activeTab === "finished") return p.category === "Finished Product";
    if (activeTab === "additive") return p.category === "Additive";
    return true;
  });

  const tabs = [
    { key: "engineering", labelEn: "Engineering Plastics", labelZh: "工程塑料" },
    { key: "fiber", labelEn: "Specialty Fiber", labelZh: "特种纤维" },
    { key: "finished", labelEn: "Finished Products", labelZh: "制品" },
    { key: "additive", labelEn: "Additives", labelZh: "添加剂" },
  ];

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as Lang) || "en";
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <ParticlesBg />
      {/* Header */}
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
            <Link href="#products" className="hover:text-white transition">
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
            <Link href="#about" className="hover:text-white transition">
              {t.nav.about}
            </Link>
            <Link href="#contact" className="hover:text-white transition">
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-[#0a0f1c]" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t.hero.badge}
            </div>
            <p className="text-lg md:text-xl italic tracking-wide text-blue-300 mb-4">
              Trust Us Fly Together
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
              {t.hero.title1} <br />
              <span className="text-blue-400">{t.hero.title2}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 transition"
              >
                {t.hero.browse} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/5 transition"
              >
                {t.hero.quote}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bars */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-white">{t.trust.plantTitle}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.trust.plantDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-white">{t.trust.logisticsTitle}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.trust.logisticsDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-white">{t.trust.qualityTitle}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.trust.qualityDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Team */}
      <section className="py-20 bg-gradient-to-b from-[#0a0f1c] to-blue-950/20 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
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
        </div>
      </section>

      {/* Mission */}
      <MissionSection lang={lang} />

      {/* Products */}
      <section id="products" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                {t.products.heading}
              </h2>
              <p className="text-slate-400 mt-2">
                {t.products.subheading}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <Link
                    key={tab.key}
                    href={`/?tab=${tab.key}#products`}
                    className={[
                      "px-4 py-2 rounded-full text-sm font-medium border transition",
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-white/10 text-slate-300 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    {lang === "zh" ? tab.labelZh : tab.labelEn}
                  </Link>
                );
              })}
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
              {t.products.empty}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {t.about.heading}
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {t.about.desc}
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {t.about.bullet1}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {t.about.bullet2}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {t.about.bullet3}
              </li>
            </ul>
          </div>
          <TrustStats />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {t.contact.heading}
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              {t.contact.desc}
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>sales@chinaplast-global.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+86 21 5555 8888</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Shanghai, China</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© {new Date().getFullYear()} ChinaPlast Global. {t.footer.rights}</p>
            <p className="text-xs text-slate-600 italic">Trust Us Fly Together</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#products" className="hover:text-slate-300">
              {t.nav.products}
            </Link>
            <Link href="#about" className="hover:text-slate-300">
              {t.nav.about}
            </Link>
            <Link href="#contact" className="hover:text-slate-300">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
