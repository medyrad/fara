import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, RefreshCw, X, ChevronRight, CheckCircle } from "lucide-react";
import { C, cn } from "@/app/shared";

// ─── OTP INPUT (8-digit) ──────────────────────────────────────────────────────
function OtpInput({ value, onChange, digits: numDigits = 8 }: { value: string; onChange: (v: string) => void; digits?: number }) {
  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const r4 = useRef<HTMLInputElement>(null);
  const r5 = useRef<HTMLInputElement>(null);
  const r6 = useRef<HTMLInputElement>(null);
  const r7 = useRef<HTMLInputElement>(null);
  const allRefs = [r0, r1, r2, r3, r4, r5, r6, r7];
  const refs = allRefs.slice(0, numDigits);
  const chars = value.padEnd(numDigits, "").split("").slice(0, numDigits);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = [...chars]; next[i] = "";
      onChange(next.join("").trimEnd());
      if (i > 0) refs[i - 1].current?.focus();
    }
  };
  const handleChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...chars]; next[i] = ch;
    onChange(next.join(""));
    if (ch && i < numDigits - 1) refs[i + 1].current?.focus();
  };

  return (
    <div className="flex gap-1.5 justify-center" dir="ltr">
      {chars.map((d, i) => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          className="w-10 h-11 rounded-xl border-2 border-[#E6E6E3] text-center text-base font-black text-[#1B1E22] outline-none focus:border-[#F4512A] transition-colors bg-[#F7F7F5]"
        />
      ))}
    </div>
  );
}

// ─── PASSWORD STRENGTH ────────────────────────────────────────────────────────
const PW_RULES = [
  { id: "len",     label: "حداقل ۸ کاراکتر",       test: (p: string) => p.length >= 8 },
  { id: "upper",   label: "حداقل یک حرف بزرگ لاتین", test: (p: string) => /[A-Z]/.test(p) },
  { id: "num",     label: "حداقل یک عدد",            test: (p: string) => /[0-9]/.test(p) },
  { id: "latin",   label: "فقط کاراکتر لاتین",       test: (p: string) => p.length > 0 && !/[؀-ۿ]/.test(p) },
  { id: "special", label: "حداقل یک علامت (!@#$%...)", test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(p) },
];

function PasswordRules({ password }: { password: string }) {
  return (
    <div className="bg-[#F7F7F5] rounded-xl p-3 space-y-1.5">
      {PW_RULES.map(r => {
        const ok = r.test(password);
        return (
          <div key={r.id} className="flex items-center gap-2">
            <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
              ok ? "bg-[#2F8F5B]" : "bg-[#E6E6E3]")}>
              {ok && <CheckCircle size={10} className="text-white" />}
            </div>
            <span className={cn("text-[11px] transition-colors", ok ? "text-[#2F8F5B] font-semibold" : "text-[#9EA3A8]")}>{r.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function isStrongPassword(p: string) { return PW_RULES.every(r => r.test(p)); }

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
export type AuthMode = "login" | "register" | "forgot";
export type UserType = "real" | "legal";

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [userType, setUserType] = useState<UserType>("real");
  // login
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginCaptcha, setLoginCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(() => Math.floor(Math.random() * 90000000 + 10000000).toString());
  const [loginErrs, setLoginErrs] = useState<Record<string, string>>({});
  const [showLoginPw, setShowLoginPw] = useState(false);
  // register
  const [regId, setRegId] = useState("");
  const [regStep, setRegStep] = useState<"id" | "otp" | "newpass" | "done">("id");
  const [regOtp, setRegOtp] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassConfirm, setRegPassConfirm] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [regCountdown, setRegCountdown] = useState(0);
  // forgot
  const [fgtId, setFgtId] = useState("");
  const [fgtStep, setFgtStep] = useState<"id" | "otp" | "newpass" | "done">("id");
  const [fgtOtp, setFgtOtp] = useState("");
  const [fgtPass, setFgtPass] = useState("");
  const [fgtPassConfirm, setFgtPassConfirm] = useState("");
  const [showFgtPw, setShowFgtPw] = useState(false);
  const [fgtCountdown, setFgtCountdown] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (regCountdown <= 0) return;
    const t = setTimeout(() => setRegCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [regCountdown]);

  useEffect(() => {
    if (fgtCountdown <= 0) return;
    const t = setTimeout(() => setFgtCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [fgtCountdown]);

  const resetAll = () => {
    setLoginId(""); setLoginPw(""); setLoginCaptcha(""); setLoginErrs({});
    setRegId(""); setRegStep("id"); setRegOtp(""); setRegPass(""); setRegPassConfirm(""); setRegCountdown(0);
    setFgtId(""); setFgtStep("id"); setFgtOtp(""); setFgtPass(""); setFgtPassConfirm(""); setFgtCountdown(0);
    setLoading(false);
  };

  const switchMode = (m: AuthMode) => { setMode(m); };

  const inp = "w-full h-[50px] rounded-xl border border-[#E6E6E3] px-4 text-sm outline-none focus:border-[#F4512A] transition-colors bg-white placeholder:text-[#B0B4BA]";
  const btn = (disabled: boolean) => cn("w-full h-[50px] rounded-full font-bold text-sm text-white transition-colors flex items-center justify-center gap-2",
    disabled ? "bg-[#F4512A]/40 cursor-not-allowed" : "bg-[#F4512A] hover:bg-[#D94321]");

  const idLabel = userType === "real" ? "کد ملی" : "شناسه ملی شرکت";
  const idPlaceholder = userType === "real" ? "کد ملی ۱۰ رقمی" : "شناسه ملی ۱۱ رقمی";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" dir="rtl">
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { onClose(); resetAll(); }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="relative bg-white rounded-[32px] w-full max-w-[420px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-[#F4512A] to-[#FF7A50] px-6 pt-5 pb-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            {(mode !== "login" && (
              (mode === "register" && regStep !== "id") ||
              (mode === "forgot" && fgtStep !== "id")
            )) ? (
              <button onClick={() => {
                if (mode === "register") setRegStep(s => s === "otp" ? "id" : s === "newpass" ? "otp" : "id");
                if (mode === "forgot") setFgtStep(s => s === "otp" ? "id" : s === "newpass" ? "otp" : "id");
              }} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <ChevronRight size={16} className="text-white" />
              </button>
            ) : <div />}
            <button onClick={() => { onClose(); resetAll(); }} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <X size={15} className="text-white" />
            </button>
          </div>
          <div className="text-white font-black text-xl leading-tight">
            {mode === "login" ? "ورود به سامانه فراسود" :
             mode === "register" ? (regStep === "id" ? "ثبت‌نام در فراسود" : regStep === "otp" ? "تأیید پیامک" : regStep === "newpass" ? "تعریف رمز عبور" : "ثبت‌نام موفق") :
             fgtStep === "id" ? "بازیابی رمز عبور" : fgtStep === "otp" ? "تأیید پیامک" : fgtStep === "newpass" ? "رمز عبور جدید" : "رمز عبور تغییر یافت"}
          </div>
          <div className="text-white/70 text-xs mt-1">
            {mode === "login" ? "با نام کاربری و رمز عبور وارد شوید" :
             mode === "register" && regStep === "id" ? `${idLabel} خود را برای بررسی سجام وارد کنید` :
             mode === "register" && regStep === "otp" ? `کد ۸ رقمی ارسال‌شده به موبایل را وارد کنید` :
             mode === "register" && regStep === "newpass" ? `نام کاربری شما ${userType === "real" ? "کد ملی" : "شناسه ملی"} شما می‌باشد` :
             mode === "forgot" && fgtStep === "id" ? `${idLabel} خود را وارد کنید` :
             mode === "forgot" && fgtStep === "otp" ? "کد ۸ رقمی ارسال‌شده به موبایل را وارد کنید" :
             mode === "forgot" && fgtStep === "newpass" ? "رمز عبور جدید خود را تعریف کنید" : ""}
          </div>

          {/* step dots for register/forgot */}
          {(mode === "register" || mode === "forgot") && (
            <div className="flex gap-1.5 mt-3">
              {["id","otp","newpass"].map((s, i) => {
                const cur = mode === "register" ? regStep : fgtStep;
                const idx = ["id","otp","newpass","done"].indexOf(cur);
                return <div key={s} className={cn("h-1 rounded-full transition-all duration-300", i <= idx ? "bg-white" : "bg-white/30", i === idx ? "w-8" : "w-4")} />;
              })}
            </div>
          )}
        </div>


        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">

            {/* ════════ LOGIN ════════ */}
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="space-y-3">
                {/* user type */}
                <div className="flex bg-[#F7F7F5] rounded-xl p-1 gap-1">
                  {([["real","کاربر حقیقی"],["legal","کاربر حقوقی"]] as const).map(([t, l]) => (
                    <button key={t} onClick={() => setUserType(t)}
                      className={cn("flex-1 py-2 text-xs font-bold rounded-[10px] transition-all",
                        userType === t ? "bg-white text-[#1B1E22] shadow-sm" : "text-[#9EA3A8] hover:text-[#6F7378]")}>
                      {l}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">{idLabel}</label>
                  <input type="text" inputMode="numeric" placeholder={idPlaceholder} value={loginId}
                    onChange={e => setLoginId(e.target.value.replace(/\D/g, ""))}
                    className={cn(inp, loginErrs.id && "border-red-400")} dir="ltr" />
                  {loginErrs.id && <p className="text-red-500 text-[11px] mt-1">{loginErrs.id}</p>}
                </div>

                <div>
                  <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">رمز عبور</label>
                  <div className="relative">
                    <input type={showLoginPw ? "text" : "password"} placeholder="رمز عبور خود را وارد کنید" value={loginPw}
                      onChange={e => setLoginPw(e.target.value)}
                      className={cn(inp, "pl-11", loginErrs.pw && "border-red-400")} dir="ltr" />
                    <button type="button" onClick={() => setShowLoginPw(v => !v)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EA3A8] hover:text-[#6F7378]">
                      {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {loginErrs.pw && <p className="text-red-500 text-[11px] mt-1">{loginErrs.pw}</p>}
                </div>

                {/* Captcha */}
                <div>
                  <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">کد امنیتی</label>
                  <div className="flex gap-2 items-stretch">
                    <input type="text" inputMode="numeric" placeholder="کد امنیتی را وارد کنید" value={loginCaptcha}
                      onChange={e => setLoginCaptcha(e.target.value.replace(/\D/g, ""))}
                      className={cn(inp, "flex-1", loginErrs.cap && "border-red-400")} dir="ltr" />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button type="button" title="کد جدید" onClick={() => { setCaptchaCode(Math.floor(Math.random() * 90000000 + 10000000).toString()); setLoginCaptcha(""); }}
                        className="text-[#9EA3A8] hover:text-[#1B1E22] transition-colors">
                        <RefreshCw size={15} />
                      </button>
                      <div className="h-[50px] px-3 rounded-xl flex items-center justify-center select-none" style={{ background: C.dark }}>
                        <span className="text-white font-black text-sm font-mono tracking-[3px]">{captchaCode}</span>
                      </div>
                    </div>
                  </div>
                  {loginErrs.cap && <p className="text-red-500 text-[11px] mt-1">{loginErrs.cap}</p>}
                </div>

                <button onClick={() => { switchMode("forgot"); }} className="block text-[#F4512A] text-xs font-semibold hover:underline mr-auto">
                  رمز عبور را فراموش کرده‌اید؟
                </button>

                <button disabled={loading} onClick={() => {
                  const e: Record<string,string> = {};
                  if (!loginId) e.id = "این فیلد الزامی است";
                  if (!loginPw) e.pw = "این فیلد الزامی است";
                  if (loginCaptcha !== captchaCode) e.cap = "کد امنیتی اشتباه است";
                  setLoginErrs(e);
                  if (Object.keys(e).length) return;
                  setLoading(true);
                  setTimeout(() => { setLoading(false); onClose(); resetAll(); }, 1500);
                }} className={btn(loading)}>
                  {loading ? <><RefreshCw size={15} className="animate-spin" />در حال ورود...</> : "ورود"}
                </button>

                <button onClick={() => switchMode("register")} className="w-full text-center text-[#6F7378] text-xs">
                  حساب کاربری ندارید؟ <span className="text-[#F4512A] font-bold">ثبت‌نام کنید</span>
                </button>
              </motion.div>
            )}

            {/* ════════ REGISTER ════════ */}
            {mode === "register" && (
              <motion.div key={`reg-${regStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="space-y-3">

                {/* ── Step 1: ID + Sajam check ── */}
                {regStep === "id" && (<>
                  <div className="flex bg-[#F7F7F5] rounded-xl p-1 gap-1">
                    {([["real","کاربر حقیقی"],["legal","کاربر حقوقی"]] as const).map(([t, l]) => (
                      <button key={t} onClick={() => setUserType(t)}
                        className={cn("flex-1 py-2 text-xs font-bold rounded-[10px] transition-all",
                          userType === t ? "bg-white text-[#1B1E22] shadow-sm" : "text-[#9EA3A8] hover:text-[#6F7378]")}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">{idLabel}</label>
                    <input type="text" inputMode="numeric" placeholder={idPlaceholder} value={regId}
                      onChange={e => setRegId(e.target.value.replace(/\D/g, ""))}
                      className={inp} dir="ltr" />
                  </div>
                  <div className="flex items-start gap-2 bg-[#FFF5F2] border border-[#F4512A]/20 rounded-xl p-3">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F4512A]">
                      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/></svg>
                    </div>
                    <p className="text-[#6F7378] text-[11px] leading-relaxed">
                      برای ثبت‌نام، سجام شما بررسی می‌شود. در صورت وجود، پیامک یکبارمصرف ارسال خواهد شد.
                    </p>
                  </div>
                  <button disabled={loading || regId.length < 10} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("otp"); setRegCountdown(120); }, 1200);
                  }} className={btn(loading || regId.length < 10)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال بررسی سجام...</> : "بررسی و ارسال کد"}
                  </button>
                </>)}

                {/* ── Step 2: OTP ── */}
                {regStep === "otp" && (<>
                  <p className="text-[#6F7378] text-xs text-center">کد ۸ رقمی ارسال‌شده به موبایل ثبت‌شده در سجام را وارد کنید</p>
                  <OtpInput value={regOtp} onChange={setRegOtp} digits={8} />
                  <div className="text-center text-xs text-[#6F7378]">
                    {regCountdown > 0
                      ? <span>ارسال مجدد تا <span className="text-[#F4512A] font-bold">{Math.floor(regCountdown/60)}:{String(regCountdown%60).padStart(2,"0")}</span></span>
                      : <button onClick={() => { setRegCountdown(120); setRegOtp(""); }} className="text-[#F4512A] font-bold hover:underline">ارسال مجدد کد</button>}
                  </div>
                  <button disabled={loading || regOtp.length < 8} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("newpass"); }, 1000);
                  }} className={btn(loading || regOtp.length < 8)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال تأیید...</> : "تأیید کد"}
                  </button>
                </>)}

                {/* ── Step 3: Set Password ── */}
                {regStep === "newpass" && (<>
                  <div className="bg-[#F7F7F5] rounded-xl px-4 py-3 text-xs text-[#6F7378] leading-relaxed">
                    نام کاربری شما: <span className="font-black text-[#1B1E22] font-mono" dir="ltr">{regId}</span><br/>
                    <span className="text-[10px]">({userType === "real" ? "کد ملی" : "شناسه ملی"} شما می‌باشد)</span>
                  </div>
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">رمز عبور</label>
                    <div className="relative">
                      <input type={showRegPw ? "text" : "password"} placeholder="رمز عبور قوی تعریف کنید" value={regPass}
                        onChange={e => setRegPass(e.target.value)}
                        className={cn(inp, "pl-11")} dir="ltr" />
                      <button type="button" onClick={() => setShowRegPw(v => !v)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EA3A8]">
                        {showRegPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {regPass.length > 0 && <PasswordRules password={regPass} />}
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">تکرار رمز عبور</label>
                    <input type="password" placeholder="رمز عبور را تکرار کنید" value={regPassConfirm}
                      onChange={e => setRegPassConfirm(e.target.value)} className={inp} dir="ltr" />
                    {regPassConfirm && regPass !== regPassConfirm && (
                      <p className="text-red-500 text-[11px] mt-1">رمزهای عبور مطابقت ندارند</p>
                    )}
                  </div>
                  <button disabled={loading || !isStrongPassword(regPass) || regPass !== regPassConfirm} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("done"); }, 1200);
                  }} className={btn(loading || !isStrongPassword(regPass) || regPass !== regPassConfirm)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال ثبت...</> : "تکمیل ثبت‌نام"}
                  </button>
                </>)}

                {/* ── Done ── */}
                {regStep === "done" && (
                  <div className="flex flex-col items-center py-6 gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#F4512A]/10 flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#F4512A]" />
                    </div>
                    <div>
                      <div className="text-[#1B1E22] font-black text-lg mb-1">ثبت‌نام موفق!</div>
                      <div className="text-[#6F7378] text-sm">به فراسود خوش آمدید</div>
                    </div>
                    <button onClick={() => { onClose(); resetAll(); }}
                      className="bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-3 rounded-full text-sm transition-colors">
                      شروع سرمایه‌گذاری
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ════════ FORGOT ════════ */}
            {mode === "forgot" && (
              <motion.div key={`fgt-${fgtStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="space-y-3">

                {/* ── Step 1: ID ── */}
                {fgtStep === "id" && (<>
                  <div className="flex bg-[#F7F7F5] rounded-xl p-1 gap-1">
                    {([["real","کاربر حقیقی"],["legal","کاربر حقوقی"]] as const).map(([t, l]) => (
                      <button key={t} onClick={() => setUserType(t)}
                        className={cn("flex-1 py-2 text-xs font-bold rounded-[10px] transition-all",
                          userType === t ? "bg-white text-[#1B1E22] shadow-sm" : "text-[#9EA3A8] hover:text-[#6F7378]")}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">{idLabel}</label>
                    <input type="text" inputMode="numeric" placeholder={idPlaceholder} value={fgtId}
                      onChange={e => setFgtId(e.target.value.replace(/\D/g, ""))}
                      className={inp} dir="ltr" />
                  </div>
                  <p className="text-[#6F7378] text-[11px]">
                    در صورت وجود در سامانه، یک پیامک یکبارمصرف برای بازیابی رمز عبور ارسال می‌شود.
                  </p>
                  <button disabled={loading || fgtId.length < 10} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setFgtStep("otp"); setFgtCountdown(120); }, 1200);
                  }} className={btn(loading || fgtId.length < 10)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال بررسی...</> : "ارسال کد بازیابی"}
                  </button>
                </>)}

                {/* ── Step 2: OTP ── */}
                {fgtStep === "otp" && (<>
                  <p className="text-[#6F7378] text-xs text-center">کد ۸ رقمی ارسال‌شده به موبایل ثبت‌شده را وارد کنید</p>
                  <OtpInput value={fgtOtp} onChange={setFgtOtp} digits={8} />
                  <div className="text-center text-xs text-[#6F7378]">
                    {fgtCountdown > 0
                      ? <span>ارسال مجدد تا <span className="text-[#F4512A] font-bold">{Math.floor(fgtCountdown/60)}:{String(fgtCountdown%60).padStart(2,"0")}</span></span>
                      : <button onClick={() => { setFgtCountdown(120); setFgtOtp(""); }} className="text-[#F4512A] font-bold hover:underline">ارسال مجدد کد</button>}
                  </div>
                  <button disabled={loading || fgtOtp.length < 8} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setFgtStep("newpass"); }, 1000);
                  }} className={btn(loading || fgtOtp.length < 8)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال تأیید...</> : "تأیید کد"}
                  </button>
                </>)}

                {/* ── Step 3: New Password ── */}
                {fgtStep === "newpass" && (<>
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">رمز عبور جدید</label>
                    <div className="relative">
                      <input type={showFgtPw ? "text" : "password"} placeholder="رمز عبور جدید" value={fgtPass}
                        onChange={e => setFgtPass(e.target.value)} className={cn(inp, "pl-11")} dir="ltr" />
                      <button type="button" onClick={() => setShowFgtPw(v => !v)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EA3A8]">
                        {showFgtPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {fgtPass.length > 0 && <PasswordRules password={fgtPass} />}
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">تکرار رمز عبور جدید</label>
                    <input type="password" placeholder="رمز عبور را تکرار کنید" value={fgtPassConfirm}
                      onChange={e => setFgtPassConfirm(e.target.value)} className={inp} dir="ltr" />
                    {fgtPassConfirm && fgtPass !== fgtPassConfirm && (
                      <p className="text-red-500 text-[11px] mt-1">رمزهای عبور مطابقت ندارند</p>
                    )}
                  </div>
                  <button disabled={loading || !isStrongPassword(fgtPass) || fgtPass !== fgtPassConfirm} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setFgtStep("done"); }, 1200);
                  }} className={btn(loading || !isStrongPassword(fgtPass) || fgtPass !== fgtPassConfirm)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال ذخیره...</> : "ذخیره رمز عبور"}
                  </button>
                </>)}

                {/* ── Done ── */}
                {fgtStep === "done" && (
                  <div className="flex flex-col items-center py-6 gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#F4512A]/10 flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#F4512A]" />
                    </div>
                    <div>
                      <div className="text-[#1B1E22] font-black text-lg mb-1">رمز عبور تغییر یافت!</div>
                      <div className="text-[#6F7378] text-sm">اکنون می‌توانید با رمز جدید وارد شوید</div>
                    </div>
                    <button onClick={() => { switchMode("login"); setFgtStep("id"); setFgtId(""); setFgtOtp(""); setFgtPass(""); setFgtPassConfirm(""); }}
                      className="bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-3 rounded-full text-sm transition-colors">
                      ورود به سامانه
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
