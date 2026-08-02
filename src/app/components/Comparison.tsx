import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { C, cn, useReveal, Pill } from "@/app/shared";
import { InvestmentWizardModal } from "@/app/components/InvestmentWizard";
import owjLogo from "@/imports/ouj_s.47c8d52d_1.png";
import andookhteLogoImg from "@/imports/andoukhteh_s.1e5e29bc_1.png";
import talaLogoImg from "@/imports/tala_s.608e9c94_1.png";
import atiehLogoImg from "@/imports/atieh_s.66a47f4c_1.png";
import dolatiLogoImg from "@/imports/mokhtasse_orage_dolati.1a80d1b8_1.png";
import ofoghLogoImg from "@/imports/ofogh_s.ca8cbc75_1.png";

// ─── MOBILE COMPARISON CAROUSEL ───────────────────────────────────────────────
export const COMPARISON_FUNDS = [
  { name: "اوج ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
  { name: "اندوخته ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
  { name: "آتیه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "دومین صندوق بزرگ بازارگردانی" },
  { name: "خزانه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "کم ریسک‌ترین صندوق" },
  { name: "افق ملت", settlement: "دو روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "متناسب با بازدهی پورتفوی صندوق", note: "بازدهی حداقل معادل شاخص بازار" },
];

export function MobileComparisonCarousel() {
  const [active, setActive] = useState(0);
  const total = COMPARISON_FUNDS.length;
  const row = COMPARISON_FUNDS[active];

  return (
    <div className="flex lg:hidden flex-col gap-4">
      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
        >
          <div className="text-white font-black text-sm border-b border-white/10 pb-3">{row.name}</div>
          {[
            { label: "زمان واریز وجه ابطال/فروش", val: row.settlement },
            { label: "ضامن نقدشوندگی/بازارگردان", val: row.guarantor },
            { label: "نحوه کسب بازدهی", val: row.earning },
            { label: "سایر توضیحات", val: row.note },
          ].map(({ label, val }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-white/50 text-[11px]">{label}</span>
              <span className="text-white/90 text-xs">{val}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between px-1">
        {/* RTL: ChevronRight = prev */}
        <button
          onClick={() => setActive((a) => (a - 1 + total) % total)}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="قبلی"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {COMPARISON_FUNDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === active ? "bg-[#F4512A] w-5" : "bg-white/30"
              )}
              aria-label={`صندوق ${i + 1}`}
            />
          ))}
        </div>

        {/* RTL: ChevronLeft = next */}
        <button
          onClick={() => setActive((a) => (a + 1) % total)}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="بعدی"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── COMPARISON SECTION ───────────────────────────────────────────────────────
export function ComparisonSection() {
  const { ref, vis } = useReveal();
  const [wizardOpen, setWizardOpen] = useState(false);

  const rows = [
    { label: "بازدهی سالانه", vals: ["۳۲.۴٪", "۴۸.۷٪", "۵۵.۳٪", "۶۸.۲٪", "۲۸.۱٪", "۵۸.۹٪"], colors: [C.success, C.orange, C.warning, C.info, "#3B7A57", "#7C3AED"] },
    { label: "ریسک", vals: ["کم", "متوسط", "متوسط", "زیاد", "خیلی کم", "متوسط رو به بالا"], colors: [C.success, C.warning, C.warning, C.error, C.success, C.warning] },
    { label: "نقدشوندگی", vals: ["روزانه", "هفتگی", "روزانه", "ماهانه", "روزانه", "هفتگی"], colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"] },
    { label: "حداقل سرمایه", vals: ["۱۰۰K", "۵۰۰K", "۱۰۰K", "۱M", "۱۰۰K", "۵۰۰K"], colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"] },
    { label: "نوع صندوق", vals: ["درآمد ثابت", "مختلط", "طلا", "سهامی", "اوراق دولتی", "مختلط پویا"], colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"] },
  ];

  const floatingLogos = [
    { src: owjLogo,           top: "8%",  left: "6%",   size: 110, delay: 0,    dur: 9  },
    { src: andookhteLogoImg,  top: "18%", left: "88%",  size: 90,  delay: 1.5,  dur: 11 },
    { src: talaLogoImg,       top: "60%", left: "5%",   size: 80,  delay: 3,    dur: 10 },
    { src: atiehLogoImg,      top: "72%", left: "82%",  size: 100, delay: 0.8,  dur: 12 },
    { src: dolatiLogoImg,     top: "38%", left: "92%",  size: 70,  delay: 2.2,  dur: 8  },
    { src: ofoghLogoImg,      top: "45%", left: "2%",   size: 85,  delay: 1,    dur: 13 },
  ];

  return (
    <section className="py-44 bg-[#1B1E22] relative overflow-hidden">
      {/* Floating blurred logos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingLogos.map((l, i) => (
          <motion.img
            key={i}
            src={l.src}
            alt=""
            style={{
              position: "absolute",
              top: l.top,
              left: l.left,
              width: l.size,
              height: l.size,
              objectFit: "contain",
            }}
            className="opacity-[0.18] blur-[1px]"
            animate={{ y: [0, -20, 0], scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
            transition={{
              duration: l.dur,
              delay: l.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#F4512A] opacity-[0.04] blur-[100px]" />
      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 relative z-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-18"
          >
            <Pill dark>مقایسه صندوق‌ها</Pill>
            <h2 className="text-white text-4xl lg:text-5xl font-black mb-4">
              کدام صندوق برای شما مناسب‌تر است؟
            </h2>
            <p className="text-white/55 text-base max-w-md mx-auto leading-relaxed">
              صندوق‌های فراسود را بر اساس معیارهای کلیدی مقایسه کنید.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="overflow-x-auto rounded-3xl"
          >
            {/* Desktop table */}
            <div className="hidden lg:block bg-white/5 border border-white/10 rounded-3xl overflow-hidden min-w-[860px]">
              <div className="grid border-b border-white/10 bg-white/8" style={{ gridTemplateColumns: "1fr 1.6fr 1.6fr 1.6fr 1.4fr" }}>
                {["نام صندوق","زمان‌واریز وجه ابطال/فروش","ضامن نقدشوندگی/بازارگردان","نحوه کسب بازدهی","سایر توضیحات"].map((h) => (
                  <div key={h} className="p-4 text-white font-bold text-xs text-center">{h}</div>
                ))}
              </div>
              {[
                { name: "اوج ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
                { name: "اندوخته ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
                { name: "آتیه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "دومین صندوق بزرگ بازارگردانی" },
                { name: "خزانه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "کم ریسک‌ترین صندوق" },
                { name: "افق ملت", settlement: "دو روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "متناسب با بازدهی پورتفوی صندوق", note: "بازدهی حداقل معادل شاخص بازار" },
              ].map((row, ri, arr) => (
                <div
                  key={row.name}
                  className={cn("grid items-center", ri < arr.length - 1 && "border-b border-white/10")}
                  style={{ gridTemplateColumns: "1fr 1.6fr 1.6fr 1.6fr 1.4fr" }}
                >
                  <div className="p-4 text-white font-bold text-xs text-center">{row.name}</div>
                  <div className="p-4 text-white/80 text-xs text-center border-r border-white/5">{row.settlement}</div>
                  <div className="p-4 text-white/80 text-xs text-center border-r border-white/5">{row.guarantor}</div>
                  <div className="p-4 text-white/80 text-xs text-center border-r border-white/5">{row.earning}</div>
                  <div className="p-4 text-white/80 text-xs text-center border-r border-white/5">{row.note}</div>
                </div>
              ))}
            </div>

            {/* Mobile carousel */}
            <MobileComparisonCarousel />
          </motion.div>

          <div className="text-center mt-8">
            <button
              onClick={() => setWizardOpen(true)}
              className="inline-flex items-center gap-2 bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              پیشنهاد سرمایه‌گذاری <ChevronLeft size={16} />
            </button>
            <InvestmentWizardModal open={wizardOpen} onClose={() => setWizardOpen(false)} />
          </div>
        </div>
      </div>
    </section>
  );
}
