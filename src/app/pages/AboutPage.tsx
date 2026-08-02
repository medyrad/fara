import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn, Pill } from "@/app/shared";
import { PageHero, FinalCTA } from "@/app/components/PageLayout";
import aboutImage from "@/imports/Group_1261157529.png";

export function AboutPage() {
  const [whyOpen, setWhyOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState({ province: "", city: "", neighborhood: "" });

  const BRANCHES = [
    { name: "شعبه مستقل مرکزی", province: "تهران", city: "تهران", phone: "۰۲۱-۸۳۹۳۴۸۵", address: "خیابان ایت‌الله طالقانی، خیابان شهید عراقی، نرسیده به میدان موتوری(فرصت سابق)" },
    { name: "ظفر", province: "تهران", city: "تهران", phone: "۰۲۱-۸۸۹۸۸۱۳", address: "خیابان خالد اسلامبولی (وزرا)، خیابان بیست و سوم، پلاک ۵" },
    { name: "شهریار", province: "تهران", city: "شهریار", phone: "۰۲۱-۶۵۲۳۳۵۰۱", address: "شهریار، خیابان ولیعصر، پلاک ۳۵۳" },
    { name: "میدان قائم شهریار", province: "تهران", city: "شهریار", phone: "۰۲۶-۶۵۲۵۰۳۳", address: "شهریار، اول بلوار ازادگان، پلاک ۱۵۶" },
    { name: "صادقیه شهریار", province: "تهران", city: "شهریار", phone: "۰۲۶-۶۵۲۳۳۳۷۰", address: "باغستان، شهرک صادقیه، خیابان چالکله، پلاک ۱" },
    { name: "میدان آزادگان کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۳۵۵۵۹۹۴", address: "کرج، بلوار طالقانی، خیابان نثار، کوچه شهید حسینی" },
    { name: "میدان شهداء کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۳۹۹۳۹۱", address: "دکتر بهشتی، نرسیده به میدان شهداء، پلاک ۳۲۷" },
    { name: "شهید رجایی کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۴۶۰۳۱۸۲", address: "رجائی شهر، اول خیابان نثار، خیابان ۱۲ متری اصلی" },
    { name: "شهید حاج یوسف خورشیدی کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۴۴۷۶۰۴۲", address: "رجائی شهر، اول خیابان نثار، نبش خیابان دکتر بهشتی، پلاک ۶۱" },
    { name: "کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۴۴۷۷۵۰۰", address: "خیابان دکتر بهشتی، نرسیده به میدان کرج، روبروی خیابان دکتر طالقانی، پلاک ۶۱" },
    { name: "سه راه رجائی شهر کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۴۴۷۳۷۹۳", address: "خیابان دکتر بهشتی، نرسیده به میدان کرج، نبش خیابان دکتر تهرانی، پلاک ۱۵۸" },
    { name: "گلستان کرج", province: "البرز", city: "کرج", phone: "۰۲۶-۳۴۶۷۸۱۸", address: "گلستان، دوازدهم، پلاک ۳۹۱" },
    { name: "محمد شهر کرج", province: "البرز", city: "محمد شهر", phone: "۰۲۶-۳۲۹۰۸۷۳", address: "محمدشهر، بلوار امام انصار خمینی" },
    { name: "چهاراه کارگزار", province: "البرز", city: "کرج", phone: "۰۲۶-۳۳۵۵۳۶۹۷", address: "چهل و پنج متری کلشهر، چهار راه کارگزار، پلاک ۱" },
  ];

  const provinces = Array.from(new Set(BRANCHES.map(b => b.province)));
  const availableCities = branchSearch.province
    ? Array.from(new Set(BRANCHES.filter(b => b.province === branchSearch.province).map(b => b.city)))
    : Array.from(new Set(BRANCHES.map(b => b.city)));

  const filtered = BRANCHES.filter(b =>
    (!branchSearch.province || b.province === branchSearch.province) &&
    (!branchSearch.city || b.city === branchSearch.city) &&
    (!branchSearch.neighborhood || b.address.includes(branchSearch.neighborhood))
  );

  return (
    <>
      <PageHero tag="درباره فراسود ملت" title="پلتفرم هوشمند سرمایه‌گذاری" sub="سامانه فراسود ملت با هدف تسهیل سرمایه‌گذاری مطمئن در معتبرترین و نقدشونده‌ترین صندوق‌های سرمایه‌گذاری فعالیت می‌کند." />

      <section className="bg-[#F7F7F5] py-20">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-3xl overflow-hidden">
              <img src={aboutImage} alt="سرمایه‌گذاری هوشمند" className="w-full h-auto block" />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <Pill>درباره ما</Pill>
                <h2 className="text-[#1B1E22] text-3xl font-black mt-3 mb-4">پلتفرم هوشمند سرمایه‌گذاری</h2>
                <p className="text-[#6F7378] leading-8 text-[15px]">
                  سامانه فراسود ملت با هدف تسهیل سرمایه‌گذاری مطمئن در معتبرترین و نقدشونده‌ترین صندوق‌های سرمایه‌گذاری بازار بورس، از پاییز ۱۴۰۱ فعالیت خود را آغاز نموده است.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { title: "چشم‌انداز", body: "تبدیل شدن به دستیار هوشمند افراد در امور سرمایه‌گذاری." },
                  { title: "پشتوانه", body: "بانک ملت به عنوان یکی از بزرگترین و معتبرترین بانک‌های ایرانی پشتوانه این سامانه است." },
                  { title: "شعار ما", body: "فراسود ملت با شعار «قرار از سود»، همراه سرمایه‌گذاران در مسیر کسب سود و رشد مالی است." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F4512A] mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-[#1B1E22] font-bold text-sm">{item.title}: </span>
                      <span className="text-[#6F7378] text-sm leading-7">{item.body}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-[#E6E6E3] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setWhyOpen(!whyOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-right"
                >
                  <span className="text-[#1B1E22] font-bold text-sm">چرا فراسود ملت؟</span>
                  <ChevronDown size={16} className={cn("text-[#F4512A] transition-transform duration-300 flex-shrink-0", whyOpen && "rotate-180")} />
                </button>
                {whyOpen && (
                  <div className="border-t border-[#E6E6E3] grid grid-cols-2 gap-px bg-[#E6E6E3]">
                    {[
                      { icon: "🏦", title: "پشتوانه بانک ملت", desc: "یکی از بزرگترین بانک‌های ایران" },
                      { icon: "📈", title: "صندوق‌های متنوع", desc: "ترکیب متنوع برای هر هدف مالی" },
                      { icon: "💧", title: "نقدشوندگی بالا", desc: "زیرساخت قوی بانک ملت" },
                      { icon: "🔒", title: "امنیت سرمایه", desc: "سرمایه‌گذاری در صندوق‌های بورسی" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <div className="text-[#1B1E22] font-bold text-xs">{item.title}</div>
                          <div className="text-[#6F7378] text-xs mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-[#F7F7F5]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="bg-[#1B1E22] rounded-3xl py-12 px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "+۱۶۱/۳", label: "همت دارایی", sub: "مجموع صندوق‌ها" },
              { num: "۶", label: "صندوق فعال", sub: "ترکیب متنوع" },
              { num: "+۱۳۰۰", label: "شعبه بانک ملت", sub: "در سراسر کشور" },
              { num: "+۱۴ سال", label: "تجربه تأمین سرمایه", sub: "سابقه بانک ملت" },
            ].map((s, i) => (
              <div key={i} className="text-center bg-white/5 rounded-2xl p-6 border border-white/8">
                <div className="text-[#F4512A] text-3xl font-black mb-1">{s.num}</div>
                <div className="text-white font-bold text-sm mb-1">{s.label}</div>
                <div className="text-white/40 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F5] py-20">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-[#1B1E22] text-3xl font-black mb-2">شعب بانک ملت</h2>
              <p className="text-[#6F7378] text-sm">جهت مراجعه حضوری، شعبه نزدیک خود را پیدا کنید</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={branchSearch.province}
                  onChange={e => setBranchSearch(p => ({ ...p, province: e.target.value, city: "" }))}
                  className="h-12 pr-4 pl-10 w-44 rounded-xl border border-[#E6E6E3] bg-white text-[#1B1E22] text-sm outline-none focus:border-[#F4512A] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">نام استان</option>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F7378] pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={branchSearch.city}
                  onChange={e => setBranchSearch(p => ({ ...p, city: e.target.value }))}
                  className="h-12 pr-4 pl-10 w-44 rounded-xl border border-[#E6E6E3] bg-white text-[#1B1E22] text-sm outline-none focus:border-[#F4512A] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">نام شهر</option>
                  {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F7378] pointer-events-none" />
              </div>
              <input
                type="text"
                placeholder="محله"
                value={branchSearch.neighborhood}
                onChange={e => setBranchSearch(p => ({ ...p, neighborhood: e.target.value }))}
                className="h-12 px-4 w-36 rounded-xl border border-[#E6E6E3] bg-white text-[#1B1E22] text-sm outline-none focus:border-[#F4512A] transition-colors"
              />
            </div>
          </div>
          <div className="hidden lg:block bg-white rounded-3xl border border-[#E6E6E3] overflow-hidden">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-[#1B1E22]">
                  {["نام شعبه", "استان", "شهر", "تلفن", "آدرس"].map(h => (
                    <th key={h} className="px-5 py-4 text-white/70 text-sm font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={i} className={cn("border-b border-[#E6E6E3] transition-colors hover:bg-[#F7F7F5]", i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]")}>
                    <td className="px-5 py-4 text-[#1B1E22] font-semibold text-sm">{b.name}</td>
                    <td className="px-5 py-4 text-[#6F7378] text-sm">{b.province}</td>
                    <td className="px-5 py-4 text-[#6F7378] text-sm">{b.city}</td>
                    <td className="px-5 py-4 text-[#6F7378] text-sm font-mono" dir="ltr">{b.phone}</td>
                    <td className="px-5 py-4 text-[#6F7378] text-xs max-w-xs">{b.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex lg:hidden flex-col gap-3">
            {filtered.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E6E6E3] p-5">
                <div className="font-black text-[#1B1E22] text-sm mb-3 pb-3 border-b border-[#E6E6E3]">{b.name}</div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6F7378]">استان / شهر</span>
                    <span className="text-[#1B1E22] font-semibold">{b.province} — {b.city}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6F7378]">تلفن</span>
                    <span className="text-[#1B1E22] font-mono" dir="ltr">{b.phone}</span>
                  </div>
                  <div className="text-xs text-[#6F7378] mt-1">{b.address}</div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#6F7378]">شعبه‌ای با این مشخصات یافت نشد.</div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
