import { useState } from "react";
import { motion } from "motion/react";
import { Phone, BookOpen, CheckCircle } from "lucide-react";
import { C, EASE, cn, useReveal, Pill } from "@/app/shared";
import { InvestmentWizardModal } from "@/app/components/InvestmentWizard";

export function PageHero({ title, sub, tag }: { title: string; sub?: string; tag?: string }) {
  return (
    <section className="bg-[#1B1E22] pt-[76px] pb-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F4512A] opacity-[0.05] blur-[80px]" />
      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 pt-14 relative z-10">
        {tag && <Pill dark>{tag}</Pill>}
        <h1 className="text-white text-4xl lg:text-6xl font-black mt-2 mb-4 leading-tight">{title}</h1>
        {sub && <p className="text-white/55 text-lg max-w-lg leading-relaxed">{sub}</p>}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { ref, vis } = useReveal();
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <section className="py-44 bg-[#1B1E22] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#F4512A] opacity-[0.07] blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-[#2F8F5B] opacity-[0.04] blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1280 400" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0 ${200 + i * 25} Q320 ${150 - i * 15} 640 ${200 + i * 25} Q960 ${250 + i * 15} 1280 ${200 + i * 25}`}
              stroke="#F4512A" strokeWidth="1" fill="none"
            />
          ))}
        </svg>
      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 text-center relative z-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Pill dark>شروع کنید</Pill>
            <h2 className="text-white text-4xl lg:text-6xl font-black mb-5 leading-tight">
              آماده‌اید سرمایه‌گذاری را<br />شروع کنید؟
            </h2>
            <p className="text-white/55 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              صندوق مناسب خود را پیدا کنید و مسیر سرمایه‌گذاری را با فراسود آغاز کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setWizardOpen(true)}
                className="inline-block bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-base px-10 py-4 rounded-full transition-colors"
              >
                پیشنهاد سرمایه‌گذاری
              </button>
              <InvestmentWizardModal open={wizardOpen} onClose={() => setWizardOpen(false)} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SupportSection() {
  const { ref, vis } = useReveal();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);
  const BUDGETS = ["۱ میلیارد تومان به بالا", "۵ میلیارد تومان به بالا", "۱۰ میلیارد تومان به بالا"];

  return (
    <section className="py-44 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Pill>پشتیبانی</Pill>
            <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black mb-4 leading-tight">
              در مسیر سرمایه‌گذاری<br />همراه شما هستیم
            </h2>
            <p className="text-[#6F7378] text-base leading-relaxed mb-8">
              تیم متخصص فراسود آماده پاسخ به سوالات و راهنمایی شما در تمام مراحل سرمایه‌گذاری است.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { Icon: Phone, label: "مرکز تماس", val: "پشتیبانی آنلاین", color: C.success },
                { Icon: BookOpen, label: "سوالات متداول", val: "بخش FAQ", color: C.warning },
              ].map(({ Icon, label, val, color }) => (
                <div key={label} className="flex items-start gap-3 p-4 bg-[#F7F7F5] rounded-2xl border border-[#E6E6E3]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[#6F7378] text-xs">{label}</div>
                    <div className="text-[#1B1E22] text-sm font-bold">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <div className="bg-[#1B1E22] rounded-[32px] p-10 lg:p-14">
              <h3 className="text-white text-2xl font-black mb-3">مشاوره رایگان برای شما، با موضوع سبدگردانی</h3>
              <p className="text-white/55 text-sm mb-10 leading-relaxed">
                اطلاعات خود را وارد کنید تا کارشناسان فراسود با شما تماس بگیرند.
              </p>
              {sent ? (
                <div className="flex items-center gap-3 bg-[#2F8F5B]/20 border border-[#2F8F5B]/30 rounded-2xl p-4">
                  <CheckCircle size={20} style={{ color: C.success }} />
                  <p className="text-white text-sm font-semibold">درخواست شما ثبت شد. به زودی با شما تماس می‌گیریم.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="نام و نام خانوادگی"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full h-[52px] bg-white/8 border border-white/15 rounded-xl px-4 text-white placeholder:text-white/35 text-sm outline-none focus:border-white/40 transition-colors text-right"
                  />
                  <div className="flex gap-2 bg-white/8 border border-white/15 rounded-xl p-1">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={cn(
                          "flex-1 h-[40px] rounded-lg text-xs font-bold transition-all duration-200",
                          budget === b
                            ? "bg-[#F4512A] text-white"
                            : "text-white/50 hover:text-white/80"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <input
                    type="tel"
                    dir="rtl"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
                      setPhone(val);
                    }}
                    className="w-full h-[52px] bg-white/8 border border-white/15 rounded-xl px-4 text-white placeholder:text-white/35 text-sm outline-none focus:border-white/40 transition-colors text-right"
                  />
                  <button
                    onClick={() => phone && fullName && setSent(true)}
                    className="w-full h-[52px] bg-[#F4512A] hover:bg-[#D94321] text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    ارسال
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
