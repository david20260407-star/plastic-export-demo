"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";

export function MobileNav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = getDict(lang);

  const links = [
    { href: "#products", label: t.nav.products },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
    { href: "/admin", label: t.nav.admin },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-[57px] z-40 bg-[#0a0f1c]/95 backdrop-blur border-t border-white/10">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <LangSwitcher lang={lang} />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
