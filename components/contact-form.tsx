"use client";

import { useState } from "react";
import { getDict } from "@/lib/i18n";

export function ContactForm({ productId, lang }: { productId?: string; lang?: string }) {
  const t = getDict(lang).form;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      phone: form.get("phone"),
      whatsapp: form.get("whatsapp"),
      country: form.get("country"),
      city: form.get("city"),
      message: form.get("message"),
      productId,
    };

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.name}</label>
          <input
            required
            name="name"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.namePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.email}</label>
          <input
            required
            type="email"
            name="email"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.emailPlaceholder}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300">{t.company}</label>
        <input
          name="company"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          placeholder={t.companyPlaceholder}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.phone}</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.phonePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.whatsapp}</label>
          <input
            name="whatsapp"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.whatsappPlaceholder}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.country}</label>
          <input
            name="country"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.countryPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">{t.city}</label>
          <input
            name="city"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder={t.cityPlaceholder}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300">{t.message}</label>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          placeholder={t.messagePlaceholder}
        />
      </div>
      <button
        disabled={status === "submitting"}
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60 transition"
      >
        {status === "submitting" ? t.sending : t.send}
      </button>
      {status === "success" && (
        <p className="text-sm text-emerald-400">{t.success}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-rose-400">{t.error}</p>
      )}
    </form>
  );
}
