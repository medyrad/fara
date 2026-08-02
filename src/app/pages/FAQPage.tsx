import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn, Pill } from "@/app/shared";

const FAQ_CATEGORIES = [
  {
    label: "ثبت‌نام و ورود",
    items: [
      { q: "آیا برای استفاده از سامانه باید ثبت‌نام کنم؟", a: "بله، برای خرید و فروش واحدهای صندوق باید در سامانه ثبت‌نام کنید و احراز هویت شوید." },
      { q: "چگونه می‌توانم ثبت‌نام کنم؟", a: "با مراجعه به سایت فراسود و کلیک بر روی گزینه ثبت‌نام، فرآیند ثبت‌نام را آغاز کنید. نیاز به کد ملی، شماره موبایل و اطلاعات حساب بانکی دارید." },
      { q: "آیا احراز هویت اینترنتی انجام می‌شود؟", a: "بله، احراز هویت از طریق سامانه سجام و شناسایی چهره به صورت آنلاین انجام می‌شود." },
      { q: "چه مدارکی برای ثبت‌نام نیاز است؟", a: "کد ملی، شماره موبایل به نام خودتان، شماره شبا حساب بانکی و اطلاعات بانکی برای پرداخت و برداشت." },
      { q: "اگر رمز عبورم را فراموش کردم چه کار کنم؟", a: "از گزینه «فراموشی رمز عبور» در صفحه ورود استفاده کنید. رمز جدید از طریق پیامک ارسال می‌شود." },
    ],
  },
  {
    label: "بازدهی / سود",
    items: [
      { q: "سود صندوق‌های سرمایه‌گذاری چگونه محاسبه می‌شود؟", a: "سود صندوق‌ها بر اساس NAV محاسبه می‌شود. سود شما برابر است با تفاوت قیمت صدور و ابطال واحدهای سرمایه‌گذاری." },
      { q: "آیا سود تضمین‌شده‌ای وجود دارد؟", a: "صندوق‌های با درآمد ثابت سود تقریبی مشخصی دارند اما تضمین قانونی وجود ندارد." },
      { q: "چه زمانی سود پرداخت می‌شود؟", a: "در صندوق‌های با درآمد ثابت، سود معمولاً ماهانه به حساب بانکی شما واریز می‌شود." },
      { q: "NAV چیست و چطور محاسبه می‌شود؟", a: "NAV یا ارزش خالص دارایی، ارزش کل دارایی‌های صندوق تقسیم بر تعداد واحدهای صادرشده است و هر روز کاری محاسبه و اعلام می‌شود." },
    ],
  },
  {
    label: "صدور و ابطال",
    items: [
      { q: "صدور واحد به چه معناست؟", a: "صدور یعنی خرید واحدهای سرمایه‌گذاری از صندوق. پس از پرداخت وجه، واحدها به پرتفوی شما اضافه می‌شوند." },
      { q: "ابطال واحد چیست؟", a: "ابطال یعنی فروش واحدهای سرمایه‌گذاری و دریافت وجه نقد. وجه پس از ابطال معمولاً ظرف ۱ تا ۲ روز کاری به حساب شما واریز می‌شود." },
      { q: "حداقل مبلغ سرمایه‌گذاری چقدر است؟", a: "حداقل مبلغ برای خرید هر صندوق متفاوت است و معمولاً از ۱۰۰ هزار تومان شروع می‌شود." },
      { q: "آیا می‌توانم در هر زمانی ابطال کنم؟", a: "بله، در روزهای کاری می‌توانید درخواست ابطال ثبت کنید." },
    ],
  },
  {
    label: "قوانین و مقررات",
    items: [
      { q: "صندوق‌های سرمایه‌گذاری تحت نظارت چه نهادی هستند؟", a: "صندوق‌های سرمایه‌گذاری تحت نظارت سازمان بورس و اوراق بهادار (سبا) فعالیت می‌کنند." },
      { q: "آیا سرمایه من در برابر ورشکستگی محافظت می‌شود؟", a: "دارایی‌های صندوق جدا از دارایی‌های شرکت مدیریت نگهداری می‌شود اما ریسک بازار همواره وجود دارد." },
      { q: "امیدنامه صندوق چیست؟", a: "امیدنامه سند قانونی صندوق است که جزئیات سرمایه‌گذاری، ریسک‌ها، کارمزدها و شرایط را توضیح می‌دهد." },
    ],
  },
  {
    label: "سوالات دیگر",
    items: [
      { q: "تفاوت صندوق سهامی، درآمد ثابت و مختلط چیست؟", a: "صندوق سهامی عمدتاً در سهام سرمایه‌گذاری می‌کند (ریسک بالا). صندوق درآمد ثابت در اوراق با درآمد ثابت (ریسک پایین). صندوق مختلط ترکیبی از هر دو است." },
      { q: "چطور بهترین صندوق را برای خود انتخاب کنم؟", a: "بر اساس افق سرمایه‌گذاری، میزان تحمل ریسک و هدف مالی خود انتخاب کنید." },
      { q: "آیا می‌توانم در چند صندوق همزمان سرمایه‌گذاری کنم؟", a: "بله، می‌توانید در چند صندوق مختلف همزمان سرمایه‌گذاری کنید و پرتفوی متنوعی داشته باشید." },
      { q: "سجام چیست و آیا باید ثبت‌نام کنم؟", a: "سجام سامانه احراز هویت بورسی است. برای سرمایه‌گذاری در صندوق‌ها، ثبت‌نام در سجام الزامی است." },
      { q: "آیا فراسود مجوز رسمی دارد؟", a: "بله، فراسود دارای مجوزهای لازم از سازمان بورس و اوراق بهادار ایران است." },
    ],
  },
];

function FAQAccordionItem({ item, isOpen, onToggle, index }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void; index: number }) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) setHeight(isOpen ? answerRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.035 }}
      className={cn(
        "bg-white rounded-2xl border overflow-hidden transition-[border-color,box-shadow] duration-300",
        isOpen ? "border-[#F4512A]/40 shadow-[0_4px_24px_rgba(244,81,42,0.10)]" : "border-[#E5E5E3] hover:border-[#F4512A]/25 hover:shadow-sm"
      )}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-5 text-right gap-4 group">
        <span className={cn("font-bold text-sm lg:text-base flex-1 transition-colors duration-300", isOpen ? "text-[#1B1E22]" : "text-[#1B1E22] group-hover:text-[#F4512A]")}>
          {item.q}
        </span>
        <motion.div
          animate={{ backgroundColor: isOpen ? "#F4512A" : "rgba(244,81,42,0.10)", rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke={isOpen ? "#fff" : "#F4512A"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>
      <div style={{ height, overflow: "hidden", transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <div ref={answerRef} className="px-6 pb-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.25, delay: isOpen ? 0.1 : 0 }}>
            <div className="h-px bg-[#F4512A]/20 mb-5" />
            <p className="text-[#6F7378] leading-8 text-sm lg:text-base">{item.a}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <section className="bg-[#1B1E22] pt-[76px] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F4512A] opacity-[0.05] blur-[80px]" />
        </div>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 pt-14 relative z-10">
          <Pill dark>سوالات متداول</Pill>
          <h1 className="text-white text-4xl lg:text-6xl font-black mt-2 mb-4 leading-tight">پاسخ به سوالات شما</h1>
          <p className="text-white/55 text-lg max-w-lg leading-relaxed">پاسخ سوالات رایج سرمایه‌گذاران فراسود را اینجا بیابید.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FAQ_CATEGORIES.map((cat, i) => (
            <button key={cat.label} onClick={() => { setOpenIdx(null); setActiveTab(i); }}
              className={cn(
                "px-5 py-2.5 rounded-full font-bold text-sm transition-[color,box-shadow,border-color] duration-300",
                activeTab === i
                  ? "bg-[#F4512A] text-white shadow-[0_4px_16px_rgba(244,81,42,0.35)]"
                  : "bg-white border border-[#E5E5E3] text-[#1B1E22] hover:border-[#F4512A]/50 hover:text-[#F4512A]"
              )}>
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }} className="flex flex-col gap-3">
            {FAQ_CATEGORIES[activeTab].items.map((item, i) => (
              <FAQAccordionItem key={i} index={i} item={item}
                isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
