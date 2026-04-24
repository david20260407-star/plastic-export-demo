"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye, EyeOff, Plus, Loader2 } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "inquiries">("products");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);

  useEffect(() => {
    const m = document.cookie.match(/lang=([^;]+)/);
    setLang(m?.[1] === "zh" ? "zh" : "en");
  }, []);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setAuthenticated(true);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    async function load() {
      const [p, i] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/inquiries").then((r) => r.json()),
      ]);
      setProducts(p);
      setInquiries(i);
    }
    load();
  }, [authenticated]);

  const t = getDict(lang).admin;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);
    
    if (newPwd !== confirmPwd) {
      setPwdError(lang === "zh" ? "两次输入的密码不一致" : "Passwords do not match");
      return;
    }
    
    if (newPwd.length < 6) {
      setPwdError(lang === "zh" ? "新密码至少6位" : "Password must be at least 6 characters");
      return;
    }
    
    setChangingPwd(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
      });
      
      if (res.ok) {
        setPwdSuccess(true);
        setCurrentPwd("");
        setNewPwd("");
        setConfirmPwd("");
        setTimeout(() => {
          setShowPasswordModal(false);
          setPwdSuccess(false);
        }, 2000);
      } else {
        const data = await res.json();
        setPwdError(data.error || (lang === "zh" ? "修改失败" : "Failed to change password"));
      }
    } catch {
      setPwdError(lang === "zh" ? "网络错误" : "Network error");
    } finally {
      setChangingPwd(false);
    }
  }

  async function loadData() {
    const [p, i] = await Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/inquiries").then((r) => r.json()),
    ]);
    setProducts(p);
    setInquiries(i);
  }

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  }

  async function deleteProduct(id: string) {
    if (!confirm(lang === "zh" ? "确定删除此产品？" : "Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await loadData();
  }

  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        category: form.get("category"),
        description: form.get("description"),
        specs: form.get("specs"),
        image: form.get("image") || null,
        priceHint: form.get("priceHint") || null,
      }),
    });
    (e.target as HTMLFormElement).reset();
    await loadData();
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center gap-3 text-slate-300">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.02] p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <img
              src="/images/logo-white.svg"
              alt="ChinaPlast Global"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-semibold text-white mb-4 text-center">{t.login}</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-4"
          />
          {loginError && (
            <p className="text-sm text-rose-400 mb-3">{t.incorrect}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
          >
            {t.enter}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <header className="border-b border-white/10 bg-[#0a0f1c]/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-white.svg"
              alt="ChinaPlast Global"
              className="h-10 w-auto object-contain"
            />
            <h1 className="text-lg font-semibold text-white">{t.dashboard}</h1>
          </div>
          <div className="flex items-center gap-4">
            <LangSwitcher lang={lang} />
            <button
              onClick={() => setShowPasswordModal(true)}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              {lang === "zh" ? "修改密码" : "Change Password"}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {t.products} ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {t.inquiries} ({inquiries.length})
          </button>
        </div>

        {activeTab === "products" && (
          <div className="space-y-8">
            <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-medium text-white mb-4">{t.addProduct}</h2>
              <form onSubmit={addProduct} className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  name="name"
                  placeholder={t.name}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <input
                  required
                  name="category"
                  placeholder={t.category}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    ref={imageInputRef}
                    name="image"
                    placeholder={t.image}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 transition">
                    {uploading ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const url = await uploadImage(file);
                          if (imageInputRef.current) imageInputRef.current.value = url || "";
                        } catch (err: any) {
                          alert(err.message || "Upload failed");
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  name="priceHint"
                  placeholder={t.price}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <textarea
                  required
                  name="description"
                  placeholder={t.description}
                  className="sm:col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <textarea
                  name="specs"
                  placeholder={t.specs}
                  className="sm:col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition"
                  >
                    <Plus className="w-4 h-4" /> {t.add}
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 text-left">{t.name}</th>
                    <th className="px-4 py-3 text-left">{t.category}</th>
                    <th className="px-4 py-3 text-left">{t.imageCol}</th>
                    <th className="px-4 py-3 text-left">{t.price}</th>
                    <th className="px-4 py-3 text-right">{t.delete}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="px-4 py-3 text-white">{p.name}</td>
                      <td className="px-4 py-3 text-slate-400">{p.category}</td>
                      <td className="px-4 py-3">
                        {p.image ? (
                          <label className="cursor-pointer inline-block">
                            <img
                              src={p.image}
                              alt=""
                              className="h-10 w-10 rounded object-cover border border-white/10"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const url = await uploadImage(file);
                                  await fetch(`/api/products/${p.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ image: url }),
                                  });
                                  await loadData();
                                } catch (err: any) {
                                  alert(err.message || "Upload failed");
                                }
                              }}
                            />
                          </label>
                        ) : (
                          <label className="cursor-pointer inline-flex items-center justify-center h-10 w-10 rounded border border-white/10 bg-white/5 text-xs text-slate-500 hover:bg-white/10">
                            +
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const url = await uploadImage(file);
                                  await fetch(`/api/products/${p.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ image: url }),
                                  });
                                  await loadData();
                                } catch (err: any) {
                                  alert(err.message || "Upload failed");
                                }
                              }}
                            />
                          </label>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{p.priceHint || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" /> {t.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td className="px-4 py-8 text-center text-slate-500" colSpan={5}>
                        {t.noProducts}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-3xl font-bold text-white">{inquiries.length}</div>
                <div className="text-sm text-slate-400 mt-1">{t.total}</div>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center">
                <div className="text-3xl font-bold text-blue-400">{inquiries.filter((i) => !i.read).length}</div>
                <div className="text-sm text-slate-400 mt-1">{t.unread}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-3xl font-bold text-emerald-400">{inquiries.filter((i) => i.read).length}</div>
                <div className="text-sm text-slate-400 mt-1">{t.readLabel}</div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setInquiryFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    inquiryFilter === f
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {f === "all" ? t.all : f === "unread" ? t.unread : t.readLabel}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-4">
              {(() => {
                const list = inquiries.filter((i) =>
                  inquiryFilter === "all" ? true : inquiryFilter === "unread" ? !i.read : i.read
                );
                if (list.length === 0) {
                  return (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-500">
                      {t.noInquiries}
                    </div>
                  );
                }
                return list.map((i) => (
                  <div
                    key={i.id}
                    className={`rounded-xl border transition ${
                      i.read
                        ? "border-white/10 bg-white/[0.02]"
                        : "border-blue-500/30 bg-blue-500/5"
                    }`}
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white text-lg">{i.name}</h3>
                            {!i.read && (
                              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                {t.new}
                              </span>
                            )}
                            {i.company && (
                              <span className="text-sm text-slate-400 truncate">@{i.company}</span>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <span className="text-blue-400">{t.contact}:</span> {i.email}
                            </span>
                            {i.phone && (
                              <span className="inline-flex items-center gap-1">
                                <span className="text-blue-400">{t.phone}:</span> {i.phone}
                              </span>
                            )}
                            {i.whatsapp && (
                              <span className="inline-flex items-center gap-1">
                                <span className="text-blue-400">{t.whatsapp}:</span> {i.whatsapp}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 text-sm">
                            {i.product ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400">
                                <span className="text-slate-400">{t.inquireAbout}:</span>
                                <Link
                                  href={`/product/${i.product.id}`}
                                  className="hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {i.product.name}
                                </Link>
                              </span>
                            ) : (
                              <span className="text-slate-500">{t.noProduct}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-500">{new Date(i.createdAt).toLocaleString()}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {expandedId === i.id ? "▲" : "▼"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedId === i.id && (
                      <div className="border-t border-white/10 px-5 py-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.company}</div>
                            <div className="text-sm text-white truncate">{i.company || "—"}</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.email}</div>
                            <div className="text-sm text-white truncate">{i.email}</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.phone}</div>
                            <div className="text-sm text-white truncate">{i.phone || "—"}</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.whatsapp}</div>
                            <div className="text-sm text-white truncate">{i.whatsapp || "—"}</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.country}</div>
                            <div className="text-sm text-white truncate">{i.country || "—"}</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                            <div className="text-xs text-slate-500">{t.city}</div>
                            <div className="text-sm text-white truncate">{i.city || "—"}</div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {t.message}
                          </span>
                          <p className="mt-1 text-slate-200 whitespace-pre-line">{i.message}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={async () => {
                              await fetch(`/api/inquiries/${i.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ read: !i.read }),
                              });
                              await loadData();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm text-white transition"
                          >
                            {i.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {i.read ? t.markAsUnread : t.markAsRead}
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(t.confirmDeleteInquiry)) return;
                              await fetch(`/api/inquiries/${i.id}`, { method: "DELETE" });
                              await loadData();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-sm text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                            {t.deleteInquiry}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        )}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <form
              onSubmit={handleChangePassword}
              className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0f172a] p-8"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                {lang === "zh" ? "修改密码" : "Change Password"}
              </h2>
              <input
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder={lang === "zh" ? "当前密码" : "Current password"}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-3"
              />
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder={lang === "zh" ? "新密码（至少6位）" : "New password (min 6 chars)"}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-3"
              />
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder={lang === "zh" ? "确认新密码" : "Confirm new password"}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-3"
              />
              {pwdError && (
                <p className="text-sm text-rose-400 mb-3">{pwdError}</p>
              )}
              {pwdSuccess && (
                <p className="text-sm text-emerald-400 mb-3">
                  {lang === "zh" ? "密码修改成功！" : "Password changed successfully!"}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPwdError("");
                    setCurrentPwd("");
                    setNewPwd("");
                    setConfirmPwd("");
                  }}
                  className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition"
                >
                  {lang === "zh" ? "取消" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={changingPwd}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition disabled:opacity-50"
                >
                  {changingPwd
                    ? (lang === "zh" ? "保存中..." : "Saving...")
                    : (lang === "zh" ? "确认修改" : "Confirm")}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
