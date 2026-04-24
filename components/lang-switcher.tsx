"use client";

export function LangSwitcher({ lang }: { lang: string }) {
  function toggle() {
    const next = lang === "zh" ? "en" : "zh";
    document.cookie = `lang=${next};path=/;max-age=31536000`;
    window.location.reload();
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded border border-white/10 bg-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition"
    >
      {lang === "zh" ? "English" : "中文"}
    </button>
  );
}
