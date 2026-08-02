import { useState, useEffect, useRef } from "react";
import React from "react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
export const C = {
  orange: "#F4512A",
  orangeHover: "#D94321",
  dark: "#1B1E22",
  bg: "#F7F7F5",
  white: "#FFFFFF",
  text: "#1B1E22",
  textSec: "#6F7378",
  border: "#E6E6E3",
  borderDark: "#30343A",
  success: "#2F8F5B",
  error: "#C83A32",
  warning: "#C58A24",
  info: "#476D9C",
  num: "#EEEEEB",
};
export const FONT = "'IRANSansX', 'IranSans', 'Vazirmatn', 'Tahoma', system-ui, sans-serif";
export const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useScrolled(threshold = 20) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return s;
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ─── Primitives ───────────────────────────────────────────────────────────────
export function cn(...cs: (string | undefined | false | null)[]) {
  return cs.filter(Boolean).join(" ");
}

export function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold px-3 py-1 rounded-full mb-3",
        dark
          ? "bg-white/10 text-white/80"
          : "text-[#F4512A]"
      )}
      style={!dark ? { background: "#FFF1EE" } : undefined}
    >
      {children}
    </span>
  );
}

export function BigNum({ n, className = "" }: { n: string; className?: string }) {
  return (
    <div
      className={cn("absolute -top-6 right-0 text-[140px] lg:text-[180px] font-black leading-none select-none pointer-events-none", className)}
      style={{ color: C.num }}
    >
      {n}
    </div>
  );
}

// ─── Utility Functions ────────────────────────────────────────────────────────
export function toFA(n: number) {
  return n.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}
export function fmtNum(n: number) {
  return toFA(Math.abs(Math.round(n)).toLocaleString("en"));
}
export function fmtNav(n: number) {
  return toFA(n.toLocaleString("en"));
}
export function fmtTrillion(n: number) {
  const t = n / 1e12;
  return toFA(t.toFixed(1)) + " همت";
}
export function fmtPct(n: number) {
  const sign = n < 0 ? "−" : "";
  return sign + toFA(Math.abs(n).toFixed(2)) + "٪";
}
