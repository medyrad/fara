import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { cn } from "@/app/shared";
import farasoodLogo from "@/imports/farasood-login.d9b1db3f_1.png";

export const SUPPORT_TOPICS = [
  { q: "راهنمای نسخه موبایل سامانه فراسود ملت", a: "اپلیکیشن فراسود ملت برای iOS و Android در دسترس است. پس از نصب، با کد ملی یا شناسه ملی خود وارد شوید. تمام خدمات سرمایه‌گذاری شامل خرید، فروش و مشاهده پورتفولیو در اپ موجود است." },
  { q: "صندوق طلای زرین ملت", a: "صندوق طلای زرین ملت یک صندوق سرمایه‌گذاری مبتنی بر طلا است که دارایی آن عمدتاً در گواهی سپرده سکه و اوراق مشتقه طلا سرمایه‌گذاری می‌شود. بازدهی آن متناسب با نوسانات بازار طلا است." },
  { q: "امکان برداشت آنی وجه (ویژه صندوق اوج ملت و اندوخته ملت)", a: "در صندوق‌های اوج و اندوخته ملت، امکان برداشت آنی تا سقف ۵۰ میلیون تومان در روز وجود دارد. مبالغ بالاتر طبق روال عادی ابطال در ۱ روز کاری واریز می‌شود." },
  { q: "باشگاه فراسود", a: "باشگاه فراسود برنامه وفاداری پلتفرم است. با سرمایه‌گذاری و معرفی دوستان، امتیاز کسب کنید و از تخفیف کارمزد، جوایز و خدمات ویژه بهره‌مند شوید." },
  { q: "بازدهی و سود", a: "بازدهی صندوق‌های درآمد ثابت به‌صورت روزشمار محاسبه و در پایان دوره‌های تعیین‌شده به حساب واریز می‌شود. نرخ بازدهی برآوردی هر صندوق در صفحه اطلاعات آن قابل مشاهده است." },
  { q: "سرمایه‌گذاری و صدور", a: "برای صدور واحد، وجه از حساب شما کسر و واحدهای صندوق به ارزش NAV صدور روز بعد به نام شما ثبت می‌شود. حداقل مبلغ سرمایه‌گذاری در هر صندوق متفاوت است." },
  { q: "ابطال", a: "درخواست ابطال تا ساعت ۱۴ روز کاری ثبت و به قیمت NAV ابطال همان روز محاسبه می‌شود. مبلغ برداشت بسته به نوع صندوق ظرف ۱ تا ۲ روز کاری به حساب واریز می‌شود." },
  { q: "شباهت‌های صندوق‌های با درآمد ثابت اوج و اندوخته ملت", a: "هر دو صندوق درآمد ثابت با پیش‌بینی سود هستند، ضامن نقدشوندگی بانک ملت دارند، امکان برداشت آنی تا ۵۰ میلیون تومان دارند و سود ماهانه پرداخت می‌کنند." },
  { q: "تفاوت‌های صندوق‌های بادرآمدثابت اوج ملت و اندوخته ملت", a: "تفاوت اصلی در ترکیب دارایی و نرخ بازدهی پیش‌بینی‌شده است. اوج ملت بازدهی تضمین‌شده‌ی بالاتری دارد، در حالی که اندوخته ملت انعطاف بیشتری در تخصیص دارایی دارد." },
  { q: "سایر سوالات متداول", a: "برای مشاهده پاسخ سایر سوالات متداول، به بخش مرکز دانش سایت مراجعه کنید یا با کارشناسان ما تماس بگیرید." },
  { q: "شبکه‌های اجتماعی", a: "فراسود ملت را در شبکه‌های اجتماعی دنبال کنید:\n• اینستاگرام: @farasoodmelat\n• تلگرام: @farasoodmelat\n• توییتر: @farasood_ir" },
  { q: "دانلود راهنمای سرمایه‌گذاری", a: "راهنمای جامع سرمایه‌گذاری در صندوق‌های فراسود ملت به‌صورت PDF در بخش مرکز دانش سایت قابل دانلود است. این راهنما شامل نحوه ثبت‌نام، خرید و فروش واحد است." },
  { q: "ارتباط با کارشناس", a: "برای ارتباط مستقیم با کارشناسان ما می‌توانید از طریق تب «ارتباط با ما» فرم را تکمیل کنید، یا با شماره ۰۲۱-XXXX-XXXX تماس بگیرید. ساعات پاسخ‌گویی: شنبه تا چهارشنبه ۸ تا ۱۷." },
];

export function SupportFAB() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"topics" | "answer" | "form">("topics");
  const [activeTopic, setActiveTopic] = useState<typeof SUPPORT_TOPICS[0] | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", national: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  // Simulate agent online status — toggles every 8s for demo
  const [agentOnline, setAgentOnline] = useState(true);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setAgentOnline(v => v), 8000);
    return () => clearInterval(t);
  }, []);

  // When panel closes, show badge if agent responded
  useEffect(() => {
    if (!open && agentOnline) {
      const t = setTimeout(() => setHasNewMsg(true), 4000);
      return () => clearTimeout(t);
    }
  }, [open, agentOnline]);

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  const resetPanel = () => {
    setView("topics");
    setActiveTopic(null);
    setSent(false);
    setForm({ name: "", phone: "", national: "" });
  };

  const openTopic = (topic: typeof SUPPORT_TOPICS[0]) => {
    setActiveTopic(topic);
    setView("answer");
  };

  const inp = "w-full h-[48px] rounded-xl border border-[#E6E6E3] px-4 text-sm outline-none focus:border-[#F4512A] transition-colors bg-[#F7F7F5] placeholder:text-[#B0B4BA]";

  const headerTitle =
    view === "answer" && activeTopic ? activeTopic.q :
    view === "form" ? "ارتباط با کارشناس" :
    "پشتیبانی فراسود";

  const headerSub =
    view === "topics" ? (agentOnline ? "کارشناس آنلاین — چطور کمک کنم؟" : "پیام بگذارید، پاسخ می‌دهیم") :
    view === "answer" ? "پاسخ سوال شما" :
    "با کارشناس ما در ارتباط باشید";

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div key="fab-bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
            onClick={() => { setOpen(false); resetPanel(); }} />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div key="fab-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-24 left-4 right-4 sm:right-auto sm:left-6 sm:w-[360px] z-[100] bg-white rounded-[28px] shadow-[0_24px_80px_rgba(27,30,34,0.22)] overflow-hidden flex flex-col max-h-[80vh]"
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-gradient-to-l from-[#F4512A] to-[#FF7A50] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {view !== "topics" && (
                  <button onClick={() => view === "answer" ? setView("topics") : resetPanel()}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0">
                    <ChevronRight size={16} className="text-white" />
                  </button>
                )}
                {view === "topics" && (
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <MessageCircle size={18} className="text-white" />
                    </div>
                    {/* online indicator */}
                    <span className={cn(
                      "absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-[#F4512A]",
                      agentOnline ? "bg-[#2FD060]" : "bg-[#9EA3A8]"
                    )} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-white font-black text-sm leading-tight truncate">{headerTitle}</div>
                  <div className="text-white/75 text-[11px] mt-0.5 flex items-center gap-1">
                    {view === "topics" && (
                      <span className={cn("w-1.5 h-1.5 rounded-full", agentOnline ? "bg-[#2FD060]" : "bg-white/50")} />
                    )}
                    {headerSub}
                  </div>
                </div>
              </div>
              <button onClick={() => { setOpen(false); resetPanel(); }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0">
                <X size={15} className="text-white" />
              </button>
            </div>

            {/* Tab bar (only on topics/form, not answer) */}
            {view !== "answer" && (
              <div className="flex mx-4 mt-4 mb-2 bg-[#F7F7F5] rounded-xl p-1 gap-1 flex-shrink-0">
                {([["topics","سوالات متداول"],["form","ارتباط با ما"]] as const).map(([v, l]) => (
                  <button key={v} onClick={() => { setView(v as "topics" | "form"); setSent(false); setActiveTopic(null); }}
                    className={cn("flex-1 py-2 text-xs font-bold rounded-[10px] transition-all",
                      view === v ? "bg-white text-[#1B1E22] shadow-sm" : "text-[#9EA3A8] hover:text-[#6F7378]")}>
                    {l}
                  </button>
                ))}
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1 min-h-0">
              <AnimatePresence mode="wait">

                {/* ── Topics list ── */}
                {view === "topics" && (
                  <motion.div key="topics"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="px-4 pb-4 pt-1 space-y-2"
                  >
                    <p className="text-[#6F7378] text-[11px] leading-relaxed pb-1">
                      برای دریافت پاسخ روی موضوع مورد نظر کلیک کنید
                    </p>
                    {SUPPORT_TOPICS.map((t, i) => (
                      <motion.button key={t.q}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.025 }}
                        onClick={() => openTopic(t)}
                        className="w-full text-right px-4 py-3 rounded-xl bg-[#FFF5F2] hover:bg-[#FFE8E0] border border-[#F4512A]/15 text-[#1B1E22] text-xs font-semibold transition-all flex items-center justify-between gap-2 group"
                      >
                        <span className="text-right leading-snug">{t.q}</span>
                        <ChevronLeft size={13} className="text-[#F4512A] flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* ── Inline answer ── */}
                {view === "answer" && activeTopic && (
                  <motion.div key="answer"
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    className="px-4 pb-5 pt-3 flex flex-col gap-4"
                  >
                    {/* Agent bubble */}
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F4512A] to-[#FF7A50] flex items-center justify-center">
                          <MessageCircle size={15} className="text-white" />
                        </div>
                        {agentOnline && (
                          <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-[#2FD060] border-2 border-white" />
                        )}
                      </div>
                      <div className="bg-[#F7F7F5] rounded-2xl rounded-tr-sm px-4 py-3 flex-1">
                        <p className="text-[#1B1E22] text-xs leading-relaxed whitespace-pre-line">{activeTopic.a}</p>
                        <div className="text-[#9EA3A8] text-[10px] mt-2 flex items-center gap-1">
                          <CheckCircle size={10} className="text-[#2FD060]" />
                          پاسخ کارشناس فراسود
                        </div>
                      </div>
                    </div>

                    {/* Follow-up prompt */}
                    <div className="bg-[#FFF5F2] border border-[#F4512A]/20 rounded-2xl px-4 py-3 text-center">
                      <p className="text-[#6F7378] text-xs mb-2">سوال دیگری دارید؟</p>
                      <div className="flex gap-2">
                        <button onClick={() => setView("topics")}
                          className="flex-1 py-2 rounded-xl bg-white border border-[#E6E6E3] text-[#1B1E22] text-xs font-semibold hover:bg-[#F7F7F5] transition-colors">
                          سوالات دیگر
                        </button>
                        <button onClick={() => setView("form")}
                          className="flex-1 py-2 rounded-xl bg-[#F4512A] text-white text-xs font-semibold hover:bg-[#D94321] transition-colors">
                          ارتباط با کارشناس
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Contact form ── */}
                {view === "form" && (
                  <motion.div key="form"
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    className="px-4 pb-5 pt-2"
                  >
                    {sent ? (
                      <div className="flex flex-col items-center py-8 gap-3 text-center">
                        <div className="w-14 h-14 rounded-full bg-[#F4512A]/10 flex items-center justify-center">
                          <CheckCircle size={28} className="text-[#F4512A]" />
                        </div>
                        <div className="text-[#1B1E22] font-black text-base">پیام ثبت شد</div>
                        <div className="text-[#6F7378] text-xs leading-relaxed max-w-[200px]">کارشناسان ما در اسرع وقت با شما تماس می‌گیرند</div>
                        <button onClick={resetPanel} className="text-[#F4512A] text-xs font-bold hover:underline mt-1">
                          بازگشت به موضوعات
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-4 mt-1">
                          <div className="relative">
                            <img src={farasoodLogo} alt="" className="w-8 h-8 object-contain rounded-lg" />
                            {agentOnline && <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-[#2FD060] border-2 border-white" />}
                          </div>
                          <p className="text-[#6F7378] text-xs">سلام! اطلاعات خود را وارد کنید تا کارشناس با شما تماس بگیرد.</p>
                        </div>
                        <form onSubmit={sendForm} className="space-y-3">
                          <input required placeholder="نام و نام خانوادگی" value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} />
                          <input required placeholder="تلفن همراه" type="tel" value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inp} />
                          <input required placeholder="کد ملی" value={form.national}
                            onChange={e => setForm(f => ({ ...f, national: e.target.value }))} className={inp} />
                          <button type="submit" disabled={loading}
                            className={cn("w-full h-[48px] rounded-xl text-white font-bold text-sm transition-colors",
                              loading ? "bg-[#F4512A]/60 cursor-not-allowed" : "bg-[#F4512A] hover:bg-[#D94321]")}>
                            {loading ? "در حال ارسال..." : "شروع مکالمه"}
                          </button>
                        </form>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 py-2.5 border-t border-[#F0F0EE] flex-shrink-0">
              <span className={cn("w-1.5 h-1.5 rounded-full", agentOnline ? "bg-[#2FD060]" : "bg-[#9EA3A8]")} />
              <span className="text-[#9EA3A8] text-[10px]">{agentOnline ? "کارشناس آنلاین" : "پاسخ‌گویی در ساعات اداری"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2">
        <motion.button
          onClick={() => { setOpen(o => !o); setHasNewMsg(false); }}
          whileTap={{ scale: 0.92 }}
          aria-label="پشتیبانی"
          className="relative"
        >
          <motion.div
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={cn(
              "w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(244,81,42,0.45)] flex items-center justify-center transition-colors",
              open ? "bg-[#1B1E22]" : "bg-[#F4512A]"
            )}
          >
            {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
          </motion.div>

          {/* Online badge */}
          {!open && agentOnline && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#2FD060] border-2 border-white shadow-sm"
            />
          )}

          {/* New message badge */}
          {!open && hasNewMsg && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.4 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-[9px] font-black">۱</span>
            </motion.span>
          )}
        </motion.button>

        {/* Label pill */}
        {!open && (
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white text-[#1B1E22] text-xs font-bold px-3 py-2 rounded-full shadow-md border border-[#E6E6E3] hidden sm:flex items-center gap-1.5">
            {agentOnline && <span className="w-1.5 h-1.5 rounded-full bg-[#2FD060]" />}
            پشتیبانی
          </motion.div>
        )}
      </div>
    </>
  );
}
