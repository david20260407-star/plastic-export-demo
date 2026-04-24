"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CompareItem {
  id: string;
  name: string;
  nameEn: string;
  code: string;
}

interface CompareContextType {
  items: CompareItem[];
  add: (item: CompareItem) => void;
  remove: (id: string) => void;
  toggle: (item: CompareItem) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cpg-compare");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cpg-compare", JSON.stringify(items));
  }, [items, hydrated]);

  const add = (item: CompareItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      if (prev.length >= 4) return prev; // max 4
      return [...prev, item];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggle = (item: CompareItem) => {
    if (items.find((i) => i.id === item.id)) {
      remove(item.id);
    } else {
      add(item);
    }
  };

  const has = (id: string) => items.some((i) => i.id === id);

  const clear = () => setItems([]);

  return (
    <CompareContext.Provider value={{ items, add, remove, toggle, has, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
