import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toFA, fmtNum, fmtNav, fmtTrillion, fmtPct, C, cn } from "@/app/shared";
import { PageHero, FinalCTA } from "@/app/components/PageLayout";
import { FUNDS } from "@/app/data";
import owjLogo from "@/imports/ouj_s.47c8d52d_1.png";
import andookhteLogoImg from "@/imports/andoukhteh_s.1e5e29bc_1.png";
import talaLogoImg from "@/imports/tala_s.608e9c94_1.png";
import atiehLogoImg from "@/imports/atieh_s.66a47f4c_1.png";
import dolatiLogoImg from "@/imports/mokhtasse_orage_dolati.1a80d1b8_1.png";
import ofoghLogoImg from "@/imports/ofogh_s.ca8cbc75_1.png";
import howToInvestImg from "@/imports/image-34.png";

const REAL_FUNDS = [
  {
    fundRegisterCode: "11014",
    logo: andookhteLogoImg,
    shortName: "اندوخته ملت",
    fundName: "صندوق سرمایه‌گذاری اندوخته ملت",
    fundTypeTitle: "با درآمد ثابت با پیش بینی سود",
    websiteAddress: "andookhtehmellat.ir",
    startDate: "۱۳۹۰/۱۲/۰۲",
    managerName: "تامین سرمایه بانک ملت",
    investmentManager: "آلفا آلفا",
    auditor: "موسسه ارقام نگر آریا",
    custodian: "موسسه حسابرسی هوشیار ممیز",
    registrationManager: "تامین سرمایه بانک ملت",
    liquidityGurantor1: "بانک ملت (سهامی عام)",
    liquidityGurantor2: "ندارد",
    profitGurantor: "ندارد",
    marketMaker: "ندارد",
    guaranteeRate: 16,
    minimumCapitalUnit: 1,
    maximumCapitalUnit: 525000000,
    remainedUnit: 73640460,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 1,
    profitDay: 31,
    dailyReturn: 0.08487,
    weeklyReturn: 0.5974,
    monthlyReturn: 2.5429,
    quarterReturn: 7.5400,
    semiYearly: 14.877,
    annualReturn: 29.5277,
    overallReturn: 307.159,
    nav: { date: "۱۴۰۵/۰۵/۰۸", cancelNav: 1005974, subscriptionNav: 1005974, statisticNav: 1006937, totalNetAssetValue: 454055788875294, totalUnit: 451359540, totalInvestor: 50596, totalCancelUnit: 3421447, totalSubscriptionUnit: 7529565 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱ (تا ۷ روز)", value: "0٪" }, { description: "پنالتی ۲ (تا ۱۵ روز)", value: "0٪" },
      { description: "پنالتی ۳ (تا ۳۰ روز)", value: "0٪" }, { description: "پنالتی ۴ (تا ۶۰ روز)", value: "0٪" },
      { description: "پنالتی ۵ (تا ۹۰ روز)", value: "0٪" },
    ],
    navAdjustSetting: [] as { splitRate: number; rateDate: string }[],
    color: "#2F8F5B",
  },
  {
    fundRegisterCode: "11233",
    logo: ofoghLogoImg,
    shortName: "افق ملت",
    fundName: "صندوق سرمایه‌گذاری افق ملت",
    fundTypeTitle: "قابل معامله سهامی",
    websiteAddress: "ofoghmellat.ir",
    startDate: "۱۳۹۷/۰۳/۰۶",
    managerName: "شرکت تامین سرمایه بانک ملت",
    investmentManager: "نامشخص",
    auditor: "موسسه حسابرسی و خدمات مدیریت آزموده کاران",
    custodian: "مشاور سرمایه گذاری هوشمند آبان",
    registrationManager: "ندارد",
    liquidityGurantor1: "نامشخص",
    liquidityGurantor2: "نامشخص",
    profitGurantor: "نامشخص",
    marketMaker: "صندوق سرمایه گذاری اختصاصی بازارگردانی ملت",
    guaranteeRate: 0,
    minimumCapitalUnit: 0,
    maximumCapitalUnit: 100000000,
    remainedUnit: 51888053,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 0,
    profitDay: 0,
    dailyReturn: 0,
    weeklyReturn: 4.3601,
    monthlyReturn: 0.1584,
    quarterReturn: 44.007,
    semiYearly: 37.143,
    annualReturn: 82.957,
    overallReturn: 4634.257,
    nav: { date: "۱۴۰۵/۰۵/۰۹", cancelNav: 476787, subscriptionNav: 481221, statisticNav: 481187, totalNetAssetValue: 22939132595636, totalUnit: 48111947, totalInvestor: 0, totalCancelUnit: 0, totalSubscriptionUnit: 0 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱", value: "5٪" }, { description: "پنالتی ۲", value: "4٪" },
      { description: "پنالتی ۳", value: "3٪" }, { description: "پنالتی ۴", value: "2٪" },
      { description: "پنالتی ۵", value: "1٪" },
    ],
    navAdjustSetting: [] as { splitRate: number; rateDate: string }[],
    color: "#F4512A",
  },
  {
    fundRegisterCode: "10895",
    logo: atiehLogoImg,
    shortName: "آتیه ملت",
    fundName: "صندوق سرمایه‌گذاری آتیه ملت",
    fundTypeTitle: "در اوراق بهادار با درآمد ثابت - قابل معامله",
    websiteAddress: "atiehmellat.ir",
    startDate: "۱۳۹۰/۰۵/۲۳",
    managerName: "تامین سرمایه بانک ملت",
    investmentManager: "ندارد",
    auditor: "موسسه حسابرسی هوشیار ممیز",
    custodian: "مشاور سرمایه گذاری هوشمند آبان",
    registrationManager: "تامین سرمایه بانک ملت",
    liquidityGurantor1: "بانک ملت (سهامی عام)",
    liquidityGurantor2: "ندارد",
    profitGurantor: "ندارد",
    marketMaker: "اختصاصی بازارگردانی ملت",
    guaranteeRate: 17,
    minimumCapitalUnit: 1,
    maximumCapitalUnit: 6000000000,
    remainedUnit: 105000000,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 0,
    profitDay: 1,
    dailyReturn: 0.07447,
    weeklyReturn: 0.6204,
    monthlyReturn: 2.9156,
    quarterReturn: 9.6834,
    semiYearly: 17.941,
    annualReturn: 36.077,
    overallReturn: 348.486,
    nav: { date: "۱۴۰۵/۰۵/۰۸", cancelNav: 18814, subscriptionNav: 18828, statisticNav: 18587, totalNetAssetValue: 110909020453530, totalUnit: 1600032704, totalInvestor: 0, totalCancelUnit: 0, totalSubscriptionUnit: 139000000 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱ (تا ۷ روز)", value: "0٪" }, { description: "پنالتی ۲ (تا ۱۵ روز)", value: "0٪" },
      { description: "پنالتی ۳ (تا ۳۰ روز)", value: "0٪" }, { description: "پنالتی ۴ (تا ۶۰ روز)", value: "0٪" },
      { description: "پنالتی ۵ (تا ۹۰ روز)", value: "0٪" },
    ],
    navAdjustSetting: [{ splitRate: 100, rateDate: "۱۴۰۳/۰۳/۱۱" }],
    color: "#C58A24",
  },
  {
    fundRegisterCode: "11075",
    logo: owjLogo,
    shortName: "اوج ملت",
    fundName: "صندوق سرمایه‌گذاری اوج ملت",
    fundTypeTitle: "با درآمد ثابت با پیش بینی سود",
    websiteAddress: "owjmellat.ir",
    startDate: "۱۳۹۱/۰۴/۱۱",
    managerName: "تامین سرمایه بانک ملت",
    investmentManager: "آلفا آلفا",
    auditor: "موسسه حسابرسی بیات رایان",
    custodian: "ایرانیان تحلیل فارابی",
    registrationManager: "تامین سرمایه بانک ملت",
    liquidityGurantor1: "بانک ملت (سهامی عام)",
    liquidityGurantor2: "ندارد",
    profitGurantor: "ندارد",
    marketMaker: "ندارد",
    guaranteeRate: 17,
    minimumCapitalUnit: 1,
    maximumCapitalUnit: 450000000,
    remainedUnit: 30886789,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 1,
    profitDay: 31,
    dailyReturn: 0.08289,
    weeklyReturn: 0.5828,
    monthlyReturn: 2.4814,
    quarterReturn: 7.3772,
    semiYearly: 14.6954,
    annualReturn: 28.4206,
    overallReturn: 307.147,
    nav: { date: "۱۴۰۵/۰۵/۰۸", cancelNav: 1005828, subscriptionNav: 1005828, statisticNav: 1008031, totalNetAssetValue: 421555733119403, totalUnit: 419113211, totalInvestor: 44826, totalCancelUnit: 3020881, totalSubscriptionUnit: 4274752 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱ (تا ۷ روز)", value: "0٪" }, { description: "پنالتی ۲ (تا ۱۵ روز)", value: "0٪" },
      { description: "پنالتی ۳ (تا ۳۰ روز)", value: "0٪" }, { description: "پنالتی ۴ (تا ۶۰ روز)", value: "0٪" },
      { description: "پنالتی ۵ (تا ۹۰ روز)", value: "0٪" },
    ],
    navAdjustSetting: [] as { splitRate: number; rateDate: string }[],
    color: "#6366F1",
  },
  {
    fundRegisterCode: "12314",
    logo: dolatiLogoImg,
    shortName: "خزانه ملت",
    fundName: "صندوق سرمایه‌گذاری خزانه ملت",
    fundTypeTitle: "در اوراق بهادار با درآمد ثابت - مختص اوراق دولتی - ساختار قابل معامله",
    websiteAddress: "mellatfund.ir",
    startDate: "۱۴۰۳/۰۶/۱۱",
    managerName: "تامین سرمایه بانک ملت",
    investmentManager: "نامشخص",
    auditor: "موسسه حسابرسی ارقام نگر آریا",
    custodian: "موسسه حسابرسی هوشیار ممیز",
    registrationManager: "نامشخص",
    liquidityGurantor1: "نامشخص",
    liquidityGurantor2: "نامشخص",
    profitGurantor: "نامشخص",
    marketMaker: "صندوق سرمایه گذاری اختصاصی بازارگردانی ملت",
    guaranteeRate: 0,
    minimumCapitalUnit: 1,
    maximumCapitalUnit: 1000000000,
    remainedUnit: 0,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 0,
    profitDay: 0,
    dailyReturn: 0,
    weeklyReturn: 0.7151,
    monthlyReturn: 2.8376,
    quarterReturn: 8.7172,
    semiYearly: 16.937,
    annualReturn: 33.830,
    overallReturn: 71.651,
    nav: { date: "۱۴۰۵/۰۵/۰۹", cancelNav: 17323, subscriptionNav: 17335, statisticNav: 16903, totalNetAssetValue: 17322563181986, totalUnit: 1000000000, totalInvestor: 0, totalCancelUnit: 0, totalSubscriptionUnit: 0 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱", value: "0٪" }, { description: "پنالتی ۲", value: "0٪" },
      { description: "پنالتی ۳", value: "0٪" }, { description: "پنالتی ۴", value: "0٪" },
      { description: "پنالتی ۵", value: "0٪" },
    ],
    navAdjustSetting: [] as { splitRate: number; rateDate: string }[],
    color: "#0EA5E9",
  },
  {
    fundRegisterCode: "12531",
    logo: talaLogoImg,
    shortName: "طلای زرین ملت",
    fundName: "صندوق طلای زرین ملت",
    fundTypeTitle: "صندوق طلا",
    websiteAddress: "mellatgoldfund.ir",
    startDate: "۱۴۰۴/۱۲/۱۸",
    managerName: "تامین سرمایه بانک ملت",
    investmentManager: "نامشخص",
    auditor: "موسسه ارقام نگر آریا",
    custodian: "موسسه حسابرسی هوشیار ممیز",
    registrationManager: "تامین سرمایه بانک ملت",
    liquidityGurantor1: "بانک ملت (سهامی عام)",
    liquidityGurantor2: "نامشخص",
    profitGurantor: "نامشخص",
    marketMaker: "ندارد",
    guaranteeRate: 16,
    minimumCapitalUnit: 10,
    maximumCapitalUnit: 4000000000,
    remainedUnit: 948692978,
    issuanceWage: 0,
    redemtionWage: 0,
    profitPeriod: 0,
    profitDay: 1,
    dailyReturn: -0.04497,
    weeklyReturn: 1.1836,
    monthlyReturn: 9.8883,
    quarterReturn: -10.502,
    semiYearly: 0,
    annualReturn: 0,
    overallReturn: 9.617,
    nav: { date: "۱۴۰۵/۰۵/۰۷", cancelNav: 11113, subscriptionNav: 11167, statisticNav: 11113, totalNetAssetValue: 33910247346072, totalUnit: 0, totalInvestor: 10405, totalCancelUnit: 3571462, totalSubscriptionUnit: 8041791 },
    wageSettings: [
      { description: "کارمزد ثابت صدور", value: "0" }, { description: "کارمزد ثابت ابطال", value: "0" },
      { description: "کارمزد متغیر صدور", value: "0" }, { description: "سقف کارمزد متغیر", value: "0" },
      { description: "پنالتی ۱ (تا ۷ روز)", value: "2٪" }, { description: "پنالتی ۲ (تا ۱۵ روز)", value: "1٪" },
      { description: "پنالتی ۳ (تا ۳۰ روز)", value: "0٪" }, { description: "پنالتی ۴ (تا ۶۰ روز)", value: "0٪" },
      { description: "پنالتی ۵ (تا ۹۰ روز)", value: "0٪" },
    ],
    navAdjustSetting: [] as { splitRate: number; rateDate: string }[],
    color: "#EAB308",
  },
];

const FUNDS_ORDERED = ["11075", "11014", "12531", "10895", "12314", "11233"].map(
  (code) => REAL_FUNDS.find((f) => f.fundRegisterCode === code)!
);

function FundDetail({ fund }: { fund: typeof REAL_FUNDS[0] }) {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="py-4">
          <h2 className="text-[#1B1E22] text-2xl font-black">{fund.fundName}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: "بازدهی سالانه", value: fmtPct(fund.annualReturn), color: fund.annualReturn >= 0 ? "#2F8F5B" : "#EF4444" },
          { label: "NAV ابطال (ریال)", value: fmtNav(fund.nav.cancelNav), color: fund.color },
          { label: "ارزش کل دارایی", value: fmtTrillion(fund.nav.totalNetAssetValue), color: "#1B1E22" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E6E6E3] p-6 text-center flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px]">
            <div className="font-black text-2xl sm:text-3xl mb-3 break-all leading-tight" style={{ color: s.label === "NAV ابطال (ریال)" ? "#1B1E22" : s.color }}>{s.value}</div>
            <div className="text-[#6F7378] text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex mt-8 border-b border-[#E6E6E3] mb-6">
        {["مزایای سرمایه‌گذاری در صندوق", "شیوه سرمایه‌گذاری", "اطلاعات صندوق"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={cn(
              "relative px-6 py-3 font-bold text-sm transition-all duration-200 whitespace-nowrap",
              tab === i ? "text-[#1B1E22]" : "text-[#9EA3A8] hover:text-[#6F7378]"
            )}
          >
            {t}
            {tab === i && (
              <motion.div
                layoutId="fund-sub-tab-indicator"
                className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-[#F4512A]"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {tab === 0 && (
            <div className="bg-white rounded-2xl border border-[#E6E6E3] overflow-hidden">
              {[
                "ضمانت نقدشوندگی بانک ملت",
                "سود روزشمار (اسمی)، بدون نرخ شکست و معاف از مالیات",
                "پرداخت سود ماهیانه با قابلیت سرمایه‌گذاری مجدد",
                "سرمایه‌گذاری آنلاین و «بدون سقف» از طریق واریز مستقیم از حساب بانک ملت (بانکداری باز)",
                "امکان توثیق واحدهای سرمایه‌گذاری صندوق‌ها جهت دریافت تسهیلات بانکی",
                "پرداخت در همان‌روز ثبت درخواست ابطال (۴ نوبت پرداخت در روز)",
                "امکان اخذ گواهی تمکن مالی قابل ارائه به مراجع ذی‌صلاح به‌صورت لاتین و با ارز مدنظر با مراجعه به شعب بانک ملت در سراسر کشور",
              ].map((item, i) => (
                <div key={i} className={cn("flex items-start gap-4 px-6 py-4", i % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]")}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-[#C5C8CC]" />
                  <span className="text-[#1B1E22] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className="bg-white rounded-2xl border border-[#E6E6E3] overflow-hidden">
              <img src={howToInvestImg} alt="راهنما سرمایه‌گذاری در سامانه فراسود ملت" className="w-full h-auto" />
            </div>
          )}

          {tab === 2 && (
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-[#E6E6E3] overflow-hidden">
                {[
                  { l: "نوع صندوق", v: fund.fundTypeTitle },
                  { l: "مدیر صندوق", v: fund.managerName },
                  { l: "متولی صندوق", v: fund.custodian },
                  { l: "ضامن نقدشوندگی", v: fund.liquidityGurantor1 },
                  { l: "حسابرس", v: fund.auditor },
                  { l: "دوره تقسیم سود", v: fund.profitPeriod ? toFA(fund.profitPeriod) + " روزه (ماهانه)" : "ندارد" },
                ].map(({ l, v }, i) => (
                  <div key={l} className={cn("flex items-start justify-between gap-6 px-5 py-3.5 text-sm", i % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]")}>
                    <span className="text-[#6F7378] flex-shrink-0">{l}</span>
                    <span className="text-[#1B1E22] font-semibold text-left">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-[#E6E6E3] overflow-hidden self-start">
                {[
                  { l: "قیمت صدور", v: fmtNav(fund.nav.subscriptionNav) + " ریال", color: "#2F8F5B" },
                  { l: "قیمت ابطال", v: fmtNav(fund.nav.cancelNav) + " ریال", color: "#EF4444" },
                  { l: "قیمت آماری", v: fmtNav(fund.nav.statisticNav) + " ریال", color: "#1B1E22" },
                ].map(({ l, v, color }, i) => (
                  <div key={l} className={cn("flex items-center justify-between gap-6 px-5 py-3.5 text-sm", i % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]")}>
                    <span className="text-[#6F7378] flex-shrink-0">{l}</span>
                    <span className="font-bold" style={{ color }} dir="ltr">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#E6E6E3] px-5 py-4 flex items-center justify-center gap-6">
        <button className="bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors flex items-center gap-2 flex-shrink-0">
          سرمایه‌گذاری در این صندوق <ChevronLeft size={16} />
        </button>
      </div>
      <div className="h-24" />
    </div>
  );
}

export function FundsPage() {
  const [searchParams] = useSearchParams();
  const initialFund = Math.min(Math.max(parseInt(searchParams.get("fund") ?? "0") || 0, 0), FUNDS_ORDERED.length - 1);
  const [activeFund, setActiveFund] = useState(initialFund);
  const fund = FUNDS_ORDERED[activeFund];

  useEffect(() => {
    const idx = Math.min(Math.max(parseInt(searchParams.get("fund") ?? "0") || 0, 0), FUNDS_ORDERED.length - 1);
    setActiveFund(idx);
  }, [searchParams]);

  return (
    <>
      <PageHero tag="صندوق‌های سرمایه‌گذاری" title="صندوق‌های تأمین سرمایه بانک ملت" sub="اطلاعات کامل و به‌روز تمامی صندوق‌های سرمایه‌گذاری فراسود ملت" />
      <section className="bg-[#F7F7F5] py-12">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="bg-white border border-[#E6E6E3] rounded-2xl p-4 mb-8 overflow-x-auto">
            <div className="flex w-full min-w-max">
              {FUNDS_ORDERED.map((f, i) => {
                const isActive = activeFund === i;
                return (
                  <button
                    key={f.fundRegisterCode}
                    onClick={() => setActiveFund(i)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 flex-1 min-w-[100px] group",
                      isActive ? "bg-[#F7F7F5]" : "hover:bg-[#FAFAFA]"
                    )}
                  >
                    <div className={cn("w-12 h-12 flex items-center justify-center transition-all duration-200", isActive ? "" : "grayscale opacity-40 group-hover:opacity-60")}>
                      <img src={f.logo} alt={f.shortName} className="w-full h-full object-contain" />
                    </div>
                    <span className={cn("mt-1 text-xs font-bold leading-tight text-center transition-colors duration-200", isActive ? "text-[#1B1E22]" : "text-[#9EA3A8] group-hover:text-[#6F7378]")}>
                      {f.shortName}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="fund-tab-indicator"
                        className="absolute bottom-0 inset-x-4 h-0.5 rounded-full bg-[#F4512A]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFund}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FundDetail fund={fund} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function FundDetailPage() {
  const { id } = useParams() as { id: string };
  const fund = FUNDS.find((f) => f.id === id) ?? FUNDS[0];

  const faq = [
    { q: "حداقل مبلغ سرمایه‌گذاری چقدر است؟", a: `حداقل مبلغ سرمایه‌گذاری در ${fund.name} معادل ${fund.minInvest} است.` },
    { q: "نقدشوندگی این صندوق چگونه است؟", a: `صندوق ${fund.name} دارای نقدشوندگی ${fund.liquidity} است.` },
    { q: "چطور در این صندوق سرمایه‌گذاری کنم؟", a: "پس از ثبت‌نام و احراز هویت، می‌توانید از طریق پنل کاربری سرمایه‌گذاری کنید." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero tag={fund.typeShort} title={fund.name} sub={fund.desc} />
      <section className="py-44 bg-[#F7F7F5]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { l: "بازدهی سالانه", v: fund.ret, c: fund.color },
              { l: "ریسک", v: fund.risk, c: C.dark },
              { l: "نقدشوندگی", v: fund.liquidity, c: C.dark },
              { l: "حداقل سرمایه", v: fund.minInvest, c: C.dark },
            ].map(({ l, v, c }) => (
              <div key={l} className="bg-white rounded-2xl p-5 border border-[#E6E6E3] text-center">
                <div className="text-2xl font-black mb-1" style={{ color: c }}>{v}</div>
                <div className="text-[#6F7378] text-sm">{l}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[#E6E6E3] p-8 mb-8">
            <h3 className="text-[#1B1E22] font-bold text-lg mb-6">نمودار عملکرد ۶ ماهه</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fund.chart}>
                  <defs>
                    <linearGradient id={`gd-${fund.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C58A24" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#C58A24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fontSize: 12, fill: C.textSec }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: C.textSec }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: C.dark, border: "none", borderRadius: 12, color: "#fff" }}
                    itemStyle={{ color: "#C58A24" }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#C58A24" strokeWidth={2.5} fill={`url(#gd-${fund.id})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E6E6E3] p-8 mb-10">
            <h3 className="text-[#1B1E22] font-bold text-lg mb-6">سوالات متداول</h3>
            <div className="divide-y divide-[#E6E6E3]">
              {faq.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-right"
                  >
                    <span className="text-[#1B1E22] font-semibold text-sm">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={cn("text-[#6F7378] transition-transform shrink-0 mr-4", openFaq === i && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#6F7378] text-sm leading-relaxed pb-4">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-lg px-12 py-4 rounded-full transition-colors"
            >
              سرمایه‌گذاری در این صندوق <ChevronLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
