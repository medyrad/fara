import { useState } from "react";
import { Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { C } from "@/app/shared";
import { PageHero, FinalCTA, SupportSection } from "@/app/components/PageLayout";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero tag="تماس با ما" title="همراه شما هستیم" sub="تیم فراسود آماده پاسخ به سوالات و راهنمایی شما در تمام مراحل سرمایه‌گذاری است." />
      <section className="py-44 bg-[#F7F7F5]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#1B1E22] text-3xl font-black mb-6">اطلاعات تماس</h2>
              <div className="space-y-4">
                {[
                  { Icon: Phone, label: "تلفن مرکز", val: "۰۲۱-۱۲۳۴۵۶۷۸", color: C.success },
                  { Icon: Mail, label: "ایمیل", val: "info@farasood.ir", color: C.orange },
                  { Icon: MessageCircle, label: "پشتیبانی آنلاین", val: "۲۴ ساعته / ۷ روز هفته", color: C.info },
                ].map(({ Icon, label, val, color }) => (
                  <div key={label} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#E6E6E3]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: color + "18" }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-[#6F7378] text-xs mb-0.5">{label}</div>
                      <div className="text-[#1B1E22] font-bold">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E6E6E3] p-8">
              <h3 className="text-[#1B1E22] font-black text-xl mb-6">ارسال پیام</h3>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-48 gap-4">
                  <CheckCircle size={40} style={{ color: C.success }} />
                  <p className="text-[#1B1E22] font-bold text-lg">پیام شما ارسال شد!</p>
                  <p className="text-[#6F7378] text-sm">به زودی با شما تماس خواهیم گرفت.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full h-[52px] rounded-xl border border-[#E6E6E3] focus:border-[#1B1E22] px-4 text-sm outline-none transition-colors"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">ایمیل</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full h-[52px] rounded-xl border border-[#E6E6E3] focus:border-[#1B1E22] px-4 text-sm outline-none transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">پیام</label>
                    <textarea
                      value={form.msg}
                      onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
                      className="w-full h-32 rounded-xl border border-[#E6E6E3] focus:border-[#1B1E22] px-4 py-3 text-sm outline-none transition-colors resize-none"
                      placeholder="پیام خود را بنویسید..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-[52px] bg-[#F4512A] hover:bg-[#D94321] text-white font-bold rounded-full transition-colors"
                  >
                    ارسال پیام
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <SupportSection />
      <FinalCTA />
    </>
  );
}
