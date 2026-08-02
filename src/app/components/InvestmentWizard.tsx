import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

// ─── INVESTMENT WIZARD MODAL ─────────────────────────────────────────────────
export const WIZARD_STEPS = [
  {
    question: "افق سرمایه‌گذاری من ... است.",
    options: ["کمتر از یکسال", "۱ تا ۲ سال", "۳ تا ۵ سال", "۶ تا ۱۰ سال", "۱۱ تا ۱۵ سال", "بیش از ۱۵ سال"],
  },
  {
    question: "برنامه من پس از پایان دوره سرمایه‌گذاری این است که کل مبلغ سرمایه‌گذاری خود را در یک دوره .... به مصرف برسانم.",
    options: ["کمتر از یکسال", "۱ تا ۲ سال", "۳ تا ۵ سال", "۶ تا ۱۰ سال", "۱۱ تا ۱۵ سال", "بیش از ۱۵ سال"],
  },
  {
    question: "از نظر من دوره سرمایه‌گذاری بلندمدت ... است.",
    options: ["۱ تا ۲ سال", "۳ تا ۴ سال", "۵ تا ۶ سال", "۷ تا ۸ سال", "بیش از ۸ سال"],
  },
  {
    question: "در یک بازه ۳ ماهه از تاریخ ۱۹ مرداد سال ۱۳۹۹ تا ۲۰ آبان سال ۱۳۹۹، بازار سهام افت ۴۲ درصدی به خود دیده است. درصورتی‌که در مدت زمان سه ماهه ارزش سرمایه‌گذاری من ۴۲ درصد افت پیدا می‌کرد، ...",
    options: [
      "تمام دارایی باقی‌مانده خود در بازار سرمایه را می‌فروختم.",
      "بخشی از دارایی باقی‌مانده خود در بازار سرمایه را می‌فروختم.",
      "کل دارایی باقی‌مانده خود را نگه می‌داشتم و چیزی به فروش نمی‌رساندم.",
      "نه‌تنها سهام خود را نمی‌فروختم بلکه در این شرایط سهام بیشتری نیز خرید می‌کردم.",
    ],
  },
  {
    question: "به‌طورکلی ترجیح می‌دهم در جایی سرمایه‌گذاری کنم که بازده کمتر اما مطمئن‌تری کسب کنم.",
    options: ["بسیار مخالفم", "مخالفم", "تا حدی موافقم", "موافقم", "بسیار موافقم"],
  },
  {
    question: "زمانی که بازار سرمایه در حال ریزش است، تمایل دارم بخشی از سهام خود را بفروشم و در سپرده بانکی با سود مطمئن سپرده‌گذاری کنم.",
    options: ["بسیار مخالفم", "مخالفم", "تا حدی موافقم", "موافقم", "بسیار موافقم"],
  },
  {
    question: "تصمیم‌های سرمایه‌گذاری خود را تنها بر اساس نظرات دوستان، همکاران و خانواده‌ی خود اتخاذ می‌کنم.",
    options: ["بسیار مخالفم", "مخالفم", "تا حدی موافقم", "موافقم", "بسیار موافقم"],
  },
  {
    question: "نمودار زیر نشان‌دهنده بیشترین سود و زیان بر روی سه سرمایه‌گذاری فرضی در یک دوره یکساله است. درصورتی‌که سرمایه‌گذاری اولیه ۱۰ میلیون تومان باشد، پول خود را در ... سرمایه‌گذاری می‌کنم.",
    options: [
      "گزینه سرمایه‌گذاری A (۲۰ درصد سود و صفر درصد زیان)",
      "گزینه سرمایه‌گذاری B (۴۰ درصد سود و ۲۰ درصد زیان)",
      "گزینه سرمایه‌گذاری C (۱۵۰ درصد سود و ۸۵ درصد زیان)",
    ],
    chart: true,
  },
  {
    question: "منابع درآمد فعلی و آینده من (از جمله حقوق، مستمری بازنشستگی، ...) ... می‌باشند.",
    options: ["بسیار ناپایدار", "ناپایدار", "تا حدی پایدار", "پایدار", "بسیار پایدار"],
  },
  {
    question: "در حوزه سرمایه‌گذاری در بازار سرمایه خود را فردی ... می‌دانم.",
    options: ["بسیار بی‌تجربه", "تا حدی بی‌تجربه", "تا حدی باتجربه", "باتجربه", "بسیار باتجربه"],
  },
];

export function InvestmentWizardModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [done, setDone] = useState(false);

  const current = WIZARD_STEPS[step];
  const selected = answers[step];
  const canNext = selected !== -1;

  const score = answers.reduce((sum, a, i) => sum + (a >= 0 ? (i === 0 ? Math.min(a, 4) : a) : 0), 0);
  const profile =
    score <= 8 ? "محافظه‌کار" :
    score <= 18 ? "محافظه‌کار میانه" :
    score <= 28 ? "متعادل" :
    score <= 36 ? "رشدگرا" : "تهاجمی";

  const recommendation =
    score <= 8
      ? { fixedIncome: 95, equity: 5 }
      : score <= 18
      ? { fixedIncome: 80, equity: 20 }
      : score <= 28
      ? { fixedIncome: 60, equity: 40 }
      : score <= 36
      ? { fixedIncome: 40, equity: 60 }
      : { fixedIncome: 20, equity: 80 };

  const handleSelect = (idx: number) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (step < 9) setStep(step + 1);
    else setDone(true);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(0);
    setAnswers(Array(10).fill(-1));
    setDone(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            className={`relative bg-white rounded-3xl w-full shadow-2xl transition-all duration-300 ${done ? "max-w-3xl" : "max-w-lg"}`}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dir="rtl"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 left-5 text-[#9B9FA5] hover:text-[#1B1E22] transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="px-4 pt-6 pb-6 lg:px-8 lg:pt-10 lg:pb-8">
              {!done ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-[#1B1E22]">سنجش ریسک‌پذیری</h2>
                  </div>

                  <div className="flex gap-1 mb-7">
                    {WIZARD_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-[#F4512A]" : "bg-[#F0F0EE]"}`}
                      />
                    ))}
                  </div>

                  <p className="text-[#1B1E22] font-bold text-base mb-5">{current.question}</p>

                  <div className="space-y-1">
                    {(current as any).chart && (
                      <div className="flex items-end justify-center gap-6 mb-4 h-36 px-4">
                        {[
                          { label: "A", gain: 20, loss: 0 },
                          { label: "B", gain: 40, loss: 20 },
                          { label: "C", gain: 150, loss: 85 },
                        ].map((bar) => {
                          const maxGain = 150;
                          const maxLoss = 85;
                          const gainH = Math.round((bar.gain / maxGain) * 72);
                          const lossH = Math.round((bar.loss / maxLoss) * 48);
                          return (
                            <div key={bar.label} className="flex flex-col items-center gap-0" style={{ width: 52 }}>
                              <span className="text-[10px] text-[#4A4E57] mb-0.5">%{bar.gain}</span>
                              <div className="bg-[#2F8F5B] rounded-t-sm w-full" style={{ height: gainH }} />
                              <div className="w-full border-t-2 border-[#1B1E22]" />
                              {bar.loss > 0 ? (
                                <>
                                  <div className="bg-[#E8352A] rounded-b-sm w-full" style={{ height: lossH }} />
                                  <span className="text-[10px] text-[#4A4E57] mt-0.5">%{bar.loss}-</span>
                                </>
                              ) : (
                                <span className="text-[10px] text-[#4A4E57] mt-0.5">۰</span>
                              )}
                              <span className="text-xs font-bold text-white bg-[#F4512A] rounded px-2 py-0.5 mt-1">{bar.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {current.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className="w-full flex items-center justify-between gap-3 py-3 px-1 rounded-xl hover:bg-[#FFF4F1] transition-colors group"
                      >
                        <span className={`text-sm transition-colors text-right flex-1 ${selected === i ? "text-[#F4512A] font-semibold" : "text-[#4A4E57] group-hover:text-[#1B1E22]"}`}>
                          {opt}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected === i ? "border-[#F4512A]" : "border-[#D0D0CC] group-hover:border-[#F4512A]"}`}>
                          {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#F4512A]" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-7 pt-6 border-t border-[#F0F0EE]">
                    <button
                      onClick={handlePrev}
                      disabled={step === 0}
                      className="flex items-center gap-2 text-[#1B1E22] disabled:opacity-30 disabled:text-[#9B9FA5] hover:text-[#F4512A] font-bold text-sm transition-colors"
                    >
                      <ChevronRight size={16} />
                      قبلی
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canNext}
                      className="flex items-center gap-2 bg-[#F4512A] disabled:opacity-40 hover:bg-[#D94321] text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
                    >
                      {step === 9 ? "مشاهده نتیجه" : "بعدی"}
                      <ChevronLeft size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left: pie chart */}
                    <div className="bg-[#F2F2F0] rounded-2xl p-5 lg:p-6 flex flex-col items-center lg:flex-shrink-0 lg:w-64">
                      <p className="text-[#1B1E22] font-black text-base mb-4 text-center leading-snug">ترکیب سرمایه‌گذاری پیشنهادی</p>
                      <PieChart width={180} height={180}>
                        <Pie
                          data={[
                            { name: "درآمد ثابت", value: recommendation.fixedIncome },
                            { name: "سهامی", value: recommendation.equity },
                          ]}
                          cx={90} cy={90} innerRadius={48} outerRadius={82}
                          startAngle={90} endAngle={-270} dataKey="value"
                        >
                          <Cell fill="#2F6B4A" />
                          <Cell fill="#F89521" />
                        </Pie>
                      </PieChart>
                      <div className="mt-4 space-y-2.5 w-full text-right">
                        <div className="flex items-start gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-sm bg-[#2F6B4A] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-[#1B1E22]">{recommendation.fixedIncome.toLocaleString("fa-IR")}٪ صندوق‌های با درآمد ثابت</p>
                            <p className="text-[11px] text-[#9B9FA5] mt-0.5">(اوج ملت، اندوخته ملت، آتیه ملت)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-sm bg-[#F89521] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-[#1B1E22]">{recommendation.equity.toLocaleString("fa-IR")}٪ صندوق سهامی</p>
                            <p className="text-[11px] text-[#9B9FA5] mt-0.5">(افق ملت)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: description + CTA */}
                    <div className="flex flex-col flex-1 min-w-0 py-2">
                      <div className="space-y-4 text-[#4A4E57] text-sm leading-relaxed flex-1 text-right">
                        <p>ترکیب سرمایه‌گذاری پیشنهادی صرفاً ترکیبی از دارایی‌ها برای فردی با ریسک‌پذیری و افق زمانی مشابه شماست.</p>
                        <p>اگر احساس می‌کنید که این پیشنهاد برای شما مناسب نیست، می‌توانید از ترکیب محافظه‌کارانه‌تر یا پرریسک‌تری استفاده کنید.</p>
                        <p>ترکیب دارایی‌های محافظه‌کارانه‌تر درصد بیشتری دارایی با درآمد ثابت و ترکیب پرریسک‌تر درصد بیشتری از صندوق‌های سهامی را شامل می‌شود.</p>
                      </div>
                      <div className="mt-6 space-y-3">
                        <Link
                          to="/funds"
                          onClick={handleClose}
                          className="block w-full text-center bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-5 py-3.5 rounded-full transition-colors text-sm"
                        >
                          برای شروع سرمایه‌گذاری ابتدا وارد سامانه فراسود ملت شوید.
                        </Link>
                        <button
                          onClick={() => { setStep(0); setAnswers(Array(10).fill(-1)); setDone(false); }}
                          className="w-full text-center text-[#9B9FA5] hover:text-[#1B1E22] text-sm transition-colors py-1"
                        >
                          شروع مجدد
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
