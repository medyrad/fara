import { useState, useEffect, useRef, useCallback } from "react";
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation, useParams, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, Eye, EyeOff, RefreshCw,
  TrendingUp, Shield, Phone, Mail, Download, Clock,
  Calendar, BookOpen, BarChart2, FileText, MessageCircle,
  ChevronLeft, ChevronRight, Layers, Award, Users, Activity, Globe,
  Search, CheckCircle, Instagram, Linkedin, Send,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from "recharts";
import fundLogo from "@/imports/ouj_s.47c8d52d.svg";
import owjLogo from "@/imports/ouj_s.47c8d52d_1.png";
import andookhteLogoImg from "@/imports/andoukhteh_s.1e5e29bc_1.png";
import talaLogoImg from "@/imports/tala_s.608e9c94_1.png";
import atiehLogoImg from "@/imports/atieh_s.66a47f4c_1.png";
import dolatiLogoImg from "@/imports/mokhtasse_orage_dolati.1a80d1b8_1.png";
import ofoghLogoImg from "@/imports/ofogh_s.ca8cbc75_1.png";
import heroIllustration from "@/imports/image.png";
import heroBanner1 from "@/imports/image-17.png";
import heroBanner2 from "@/imports/image-18.png";
import heroBanner3 from "@/imports/image-19.png";
import siteLogo from "@/imports/logo.svg";
import farasoodLogo from "@/imports/farasood-login.d9b1db3f_1.png";
import relatedLogo1 from "@/imports/image-3.png";
import relatedLogo2 from "@/imports/image-4.png";
import aboutImage from "@/imports/image-30.png";
import howToInvestImg from "@/imports/image-34.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
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
const FONT = "'Vazirmatn', ui-sans-serif, system-ui, sans-serif";
const EASE = [0.16, 1, 0.3, 1] as const;
function toFA(n: number | string) { return n.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]); }

// ─── Data ─────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    headline: "سرمایه‌گذاری هوشمند،\nآینده‌ای مطمئن‌تر",
    sub: "با صندوق‌های سرمایه‌گذاری فراسود، سرمایه‌ی خود را در مسیر رشد قرار دهید.",
    cta: "مشاهده صندوق‌ها",
    ctaHref: "/funds",
    cta2: "بیشتر بدانید",
    cta2Href: "/funds",
    metric: "۳۲٪",
    metricLabel: "بازدهی سالانه",
    accent: C.orange,
  },
  {
    headline: "فرصت‌های سرمایه‌گذاری\nفراسود را کشف کنید",
    sub: "متناسب با میزان ریسک‌پذیری و اهداف مالی شما، بهترین صندوق را انتخاب کنید.",
    cta: "مقایسه صندوق‌ها",
    ctaHref: "/funds",
    cta2: "راهنمای سرمایه‌گذاری",
    cta2Href: "/funds",
    metric: "+۱۲۰K",
    metricLabel: "سرمایه‌گذار فعال",
    accent: C.success,
  },
  {
    headline: "سرمایه‌گذاری آنلاین،\nهر زمان و هر مکان",
    sub: "پلتفرم فراسود به شما امکان می‌دهد بدون مراجعه حضوری سرمایه‌گذاری کنید.",
    cta: "ثبت‌نام رایگان",
    ctaHref: "/register",
    cta2: "آشنایی با فراسود",
    cta2Href: "/about",
    metric: "۳ دقیقه",
    metricLabel: "تا شروع سرمایه‌گذاری",
    accent: C.orange,
  },
];

const FUNDS = [
  {
    id: "owj",
    name: "صندوق اوج ملت",
    type: "صندوق در اوراق با درآمد ثابت",
    typeShort: "درآمد ثابت",
    ret: "۳۰.۳۹٪",
    retMonthly: "۳۵٪",
    risk: "کم",
    riskLevel: 1,
    liquidity: "روزانه",
    minInvest: "۱۰۰,۰۰۰ تومان",
    desc: "مناسب سرمایه‌گذاران با ریسک‌پذیری پایین که به دنبال درآمد ثابت و مطمئن هستند.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 107 }, { m: "خر", v: 115 }, { m: "تیر", v: 119 }, { m: "مر", v: 126 }, { m: "شه", v: 132 }],
    color: C.success,
  },
  {
    id: "andookhte",
    name: "صندوق اندوخته ملت",
    type: "صندوق مختلط",
    typeShort: "درآمد ثابت",
    ret: "۳۱.۱۵٪",
    retMonthly: "۳۶٪",
    risk: "کم",
    riskLevel: 1,
    liquidity: "هفتگی",
    minInvest: "۵۰۰,۰۰۰ تومان",
    desc: "ترکیبی از سهام و اوراق برای تعادل میان رشد و پایداری سرمایه.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 112 }, { m: "خر", v: 128 }, { m: "تیر", v: 135 }, { m: "مر", v: 142 }, { m: "شه", v: 149 }],
    color: C.orange,
  },
  {
    id: "talayi",
    name: "صندوق طلای زرین ملت",
    type: "صندوق سرمایه‌گذاری در طلا",
    typeShort: "مبتنی بر طلا",
    ret: "-",
    retMonthly: "-",
    risk: "متوسط",
    riskLevel: 2,
    liquidity: "روزانه",
    minInvest: "۱۰۰,۰۰۰ تومان",
    desc: "سرمایه‌گذاری در طلا و اوراق مبتنی بر طلا برای حفظ ارزش دارایی در برابر تورم.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 110 }, { m: "خر", v: 122 }, { m: "تیر", v: 131 }, { m: "مر", v: 140 }, { m: "شه", v: 155 }],
    color: C.warning,
  },
  {
    id: "atiyeh",
    name: "صندوق آتیه ملت",
    type: "صندوق سرمایه‌گذاری در سهام",
    typeShort: "درآمد ثابت ETF",
    ret: "۳۸٪",
    retMonthly: "۳۸٪",
    risk: "کم",
    riskLevel: 1,
    liquidity: "ماهانه",
    minInvest: "۱,۰۰۰,۰۰۰ تومان",
    desc: "برای سرمایه‌گذاران با دید بلندمدت که به دنبال رشد قابل توجه سرمایه هستند.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 118 }, { m: "خر", v: 138 }, { m: "تیر", v: 152 }, { m: "مر", v: 162 }, { m: "شه", v: 168 }],
    color: C.info,
  },
  {
    id: "dolati",
    name: "صندوق خزانه ملت",
    type: "صندوق در اوراق با درآمد ثابت دولتی",
    typeShort: "درآمد ثابت ETF",
    ret: "-",
    retMonthly: "۳۸٪",
    risk: "کم",
    riskLevel: 1,
    liquidity: "روزانه",
    minInvest: "۱۰۰,۰۰۰ تومان",
    desc: "سرمایه‌گذاری در اوراق دولتی با ضمانت دولت و کمترین ریسک ممکن در بازار سرمایه.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 105 }, { m: "خر", v: 111 }, { m: "تیر", v: 116 }, { m: "مر", v: 122 }, { m: "شه", v: 128 }],
    color: "#3B7A57",
  },
  {
    id: "ofoq",
    name: "صندوق افق ملت",
    type: "صندوق سرمایه‌گذاری مختلط",
    typeShort: "سهامی ETF",
    ret: "متناسب با بازدهی پورتفوی صندوق",
    retMonthly: "متناسب با بازدهی پورتفوی صندوق",
    risk: "پرریسک",
    riskLevel: 5,
    liquidity: "هفتگی",
    minInvest: "۵۰۰,۰۰۰ تومان",
    desc: "ترکیب پویا از سهام، طلا و اوراق برای بهره‌مندی از فرصت‌های متنوع بازار.",
    chart: [{ m: "فر", v: 100 }, { m: "ار", v: 115 }, { m: "خر", v: 130 }, { m: "تیر", v: 142 }, { m: "مر", v: 150 }, { m: "شه", v: 159 }],
    color: "#7C3AED",
  },
];

const ARTICLES = [
  {
    id: "1", slug: "fund-benefits", cat: "سرمایه‌گذاری",
    title: "صندوق‌های سرمایه‌گذاری چه مزایایی دارند؟",
    desc: "با مزایای سرمایه‌گذاری در صندوق‌های مشترک آشنا شوید و مقایسه‌ای با سایر ابزارهای مالی انجام دهید.",
    time: "۸ دقیقه", date: "۱۴۰۳/۰۵/۱۲", featured: true,
    thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    body: `صندوق‌های سرمایه‌گذاری مشترک یکی از محبوب‌ترین ابزارهای مالی در دنیا هستند که به افراد با سرمایه‌های کوچک امکان می‌دهند در بازارهای مالی حضور داشته باشند.

## مدیریت حرفه‌ای

یکی از بزرگترین مزایای صندوق‌های سرمایه‌گذاری، بهره‌مندی از مدیریت حرفه‌ای است. تیم‌های متخصص با تجربه‌ای عمیق در بازارهای مالی، سبد دارایی‌ها را به صورت مستمر رصد و بهینه می‌کنند. این مزیت برای کسانی که وقت یا دانش کافی برای مدیریت مستقیم سرمایه ندارند، بسیار ارزشمند است.

## تنوع‌بخشی به سرمایه

صندوق‌ها با توزیع سرمایه در دارایی‌های متنوع، ریسک را به شکل چشمگیری کاهش می‌دهند. این اصل که به آن «تنوع‌بخشی» می‌گویند، از ضرب‌المثل قدیمی «همه تخم‌مرغ‌ها را در یک سبد نگذار» الهام گرفته است.

## نقدشوندگی مناسب

برخلاف دارایی‌هایی مانند مسکن، صندوق‌های سرمایه‌گذاری نقدشوندگی بالایی دارند. در اکثر صندوق‌های درآمد ثابت می‌توانید در کمتر از ۷۲ ساعت سرمایه‌تان را برداشت کنید.

## حداقل سرمایه پایین

با مبالغ بسیار کم هم می‌توانید در صندوق‌ها سرمایه‌گذاری کنید. برخی صندوق‌ها از ۱۰۰ هزار تومان پذیره‌نویسی می‌کنند که این ویژگی دسترسی به بازار سرمایه را دموکراتیک کرده است.

## نظارت و شفافیت

صندوق‌های سرمایه‌گذاری تحت نظارت سازمان بورس و اوراق بهادار هستند و موظفند اطلاعات کامل و به‌روزی از ترکیب دارایی‌ها و عملکردشان منتشر کنند.`,
  },
  {
    id: "2", slug: "nav-calculation", cat: "آموزش",
    title: "نحوه محاسبه NAV صندوق‌های سرمایه‌گذاری",
    desc: "NAV یا ارزش خالص دارایی، مهم‌ترین شاخص برای ارزیابی عملکرد صندوق‌های سرمایه‌گذاری است.",
    time: "۶ دقیقه", date: "۱۴۰۳/۰۵/۰۸", featured: false,
    thumb: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    body: `NAV مخفف Net Asset Value یا ارزش خالص دارایی است و نشان می‌دهد هر واحد سرمایه‌گذاری صندوق چقدر ارزش دارد.

## فرمول محاسبه NAV

فرمول ساده محاسبه NAV به این شکل است: ارزش کل دارایی‌های صندوق منهای بدهی‌های صندوق، تقسیم بر تعداد واحدهای صادرشده.

## چرا NAV مهم است؟

NAV معیار اصلی برای خرید و فروش واحدهای صندوق است. وقتی NAV بالا می‌رود، یعنی دارایی‌های صندوق رشد کرده و ارزش سرمایه‌گذاری شما افزایش یافته است.

## تفاوت NAV ابطال و صدور

صندوق‌ها معمولاً دو قیمت دارند: قیمت صدور (برای خرید) که کمی بالاتر از NAV است و قیمت ابطال (برای فروش) که کمی پایین‌تر. این اختلاف کارمزد صندوق را پوشش می‌دهد.

## تناوب محاسبه

بیشتر صندوق‌های ایرانی NAV را روزانه محاسبه و منتشر می‌کنند. این اطلاعات از طریق سایت‌های سازمان بورس و وبسایت خود صندوق قابل مشاهده است.`,
  },
  {
    id: "3", slug: "risk-management", cat: "ریسک سرمایه‌گذاری",
    title: "مدیریت ریسک در سرمایه‌گذاری‌های مالی",
    desc: "آشنایی با انواع ریسک در بازارهای مالی و روش‌های کاهش آن برای حفظ سرمایه.",
    time: "۱۰ دقیقه", date: "۱۴۰۳/۰۵/۰۱", featured: true,
    thumb: "https://images.unsplash.com/photo-1771931322109-180bb1b35bf8?w=600&q=80",
    body: `مدیریت ریسک یکی از مهارت‌های اساسی هر سرمایه‌گذار موفق است. بدون شناخت ریسک، نمی‌توان تصمیمات آگاهانه‌ای در بازارهای مالی گرفت.

## انواع ریسک در بازار سرمایه

ریسک بازار، ریسک نقدشوندگی، ریسک اعتباری و ریسک تورمی از مهم‌ترین ریسک‌هایی هستند که هر سرمایه‌گذاری با آن‌ها روبه‌رو است.

## استراتژی‌های کاهش ریسک

تنوع‌بخشی به سبد، سرمایه‌گذاری تدریجی و تعیین حد ضرر از ابزارهای اصلی مدیریت ریسک هستند. هرگز تمام سرمایه را در یک دارایی یا یک بازار قرار ندهید.

## ریسک‌پذیری شخصی

هر فرد سطح متفاوتی از ریسک‌پذیری دارد. این سطح به سن، درآمد، اهداف مالی و شخصیت فرد بستگی دارد. شناخت ریسک‌پذیری شخصی اولین قدم در انتخاب سرمایه‌گذاری مناسب است.

## ابزارهای پوشش ریسک

اوراق قرضه، صندوق‌های درآمد ثابت و دارایی‌های واقعی مانند طلا ابزارهای خوبی برای پوشش ریسک پرتفوی سهامی هستند.`,
  },
  {
    id: "4", slug: "fixed-vs-equity", cat: "صندوق",
    title: "تفاوت صندوق درآمد ثابت با صندوق سهامی",
    desc: "مقایسه جامع انواع صندوق‌های سرمایه‌گذاری از نظر بازدهی، ریسک و نقدشوندگی.",
    time: "۷ دقیقه", date: "۱۴۰۳/۰۴/۲۸", featured: false,
    thumb: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
    body: `انتخاب بین صندوق درآمد ثابت و صندوق سهامی یکی از اولین و مهم‌ترین تصمیمات یک سرمایه‌گذار تازه‌کار است.

## صندوق درآمد ثابت

این صندوق‌ها عمدتاً در اوراق قرضه دولتی، سپرده بانکی و اوراق مشارکت سرمایه‌گذاری می‌کنند. بازدهی آن‌ها قابل پیش‌بینی‌تر اما معمولاً کمتر از صندوق‌های سهامی است. مناسب برای افراد با ریسک‌پذیری پایین یا افق سرمایه‌گذاری کوتاه‌مدت.

## صندوق سهامی

این صندوق‌ها بیشتر سرمایه را در سهام شرکت‌های بورسی می‌گذارند. پتانسیل بازدهی بالاتری دارند اما نوسانات بیشتری هم تجربه می‌کنند. مناسب برای سرمایه‌گذاران با افق بلندمدت.

## جدول مقایسه

| ویژگی | درآمد ثابت | سهامی |
|-------|-----------|-------|
| ریسک | کم | بالا |
| بازدهی انتظاری | ۲۵-۳۵٪ | ۴۰-۸۰٪ |
| نقدشوندگی | روزانه | هفتگی |

## کدام را انتخاب کنیم؟

اگر به پول خود در کمتر از یک سال نیاز دارید، درآمد ثابت انتخاب بهتری است. برای افق بیش از سه سال، صندوق‌های سهامی معمولاً عملکرد بهتری دارند.`,
  },
  {
    id: "5", slug: "capital-market-glossary", cat: "اصطلاحات",
    title: "واژه‌نامه جامع بازار سرمایه ایران",
    desc: "تعریف دقیق مهم‌ترین اصطلاحات بازار سرمایه از بورس و فرابورس تا ابزارهای مشتقه.",
    time: "۱۲ دقیقه", date: "۱۴۰۳/۰۴/۲۰", featured: true,
    thumb: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    body: `آشنایی با اصطلاحات تخصصی بازار سرمایه پیش‌نیاز هر سرمایه‌گذاری موفق است. در این مقاله پرکاربردترین واژه‌ها را توضیح می‌دهیم.

## NAV – ارزش خالص دارایی
ارزش کل دارایی‌های صندوق منهای بدهی‌ها تقسیم بر تعداد واحدها. معیار اصلی قیمت‌گذاری صندوق‌ها.

## P/E – نسبت قیمت به درآمد
نشان می‌دهد بازار حاضر است چند برابر سود سالانه یک شرکت برای سهامش پول بدهد. P/E پایین‌تر معمولاً نشانه ارزندگی بیشتر است.

## EPS – سود هر سهم
کل سود خالص شرکت تقسیم بر تعداد سهام. یکی از مهم‌ترین معیارهای ارزیابی سودآوری.

## شناوری سهام
درصدی از سهام که در دست عموم مردم است و قابل معامله می‌باشد. شناوری بالا نقدشوندگی بهتری ایجاد می‌کند.

## صف خرید و فروش
وقتی تقاضا از عرضه بیشتر باشد صف خرید و وقتی عرضه از تقاضا بیشتر باشد صف فروش شکل می‌گیرد.`,
  },
  {
    id: "6", slug: "dca-strategy", cat: "سرمایه‌گذاری",
    title: "استراتژی میانگین‌گیری هزینه دلاری (DCA) چیست؟",
    desc: "روشی ساده و کم‌ریسک برای ورود تدریجی به بازار و کاهش تأثیر نوسانات قیمتی.",
    time: "۵ دقیقه", date: "۱۴۰۳/۰۴/۱۵", featured: false,
    thumb: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=600&q=80",
    body: `استراتژی DCA یا Dollar Cost Averaging یکی از ساده‌ترین و مؤثرترین روش‌های سرمایه‌گذاری است که حتی برای مبتدیان هم قابل استفاده است.

## DCA چگونه کار می‌کند؟

به جای یک‌باره وارد کردن کل سرمایه، در فواصل منظم (مثلاً ماهانه) مبلغ ثابتی سرمایه‌گذاری می‌کنید. وقتی قیمت پایین است واحد بیشتری می‌خرید و وقتی بالا است کمتر.

## مزایای DCA

این روش تأثیر نوسانات را کاهش می‌دهد، از تصمیم‌گیری احساسی جلوگیری می‌کند و نیازی به پیش‌بینی بازار ندارید.

## DCA در صندوق‌های سرمایه‌گذاری

صندوق‌های فراسود این استراتژی را به سادگی ممکن می‌کنند. می‌توانید دستور خرید ماهانه ثابت تنظیم کنید و بدون دغدغه به سرمایه‌گذاری منظم ادامه دهید.`,
  },
  {
    id: "7", slug: "portfolio-diversification", cat: "آموزش",
    title: "چگونه سبد سرمایه‌گذاری متنوع بسازیم؟",
    desc: "اصول تنوع‌بخشی به دارایی‌ها برای کاهش ریسک و بهینه‌سازی بازدهی بلندمدت.",
    time: "۹ دقیقه", date: "۱۴۰۳/۰۴/۰۸", featured: false,
    thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    body: `ساختن یک سبد متنوع یکی از اصول پایه‌ای سرمایه‌گذاری موفق است. تنوع‌بخشی ریسک را کاهش می‌دهد بدون اینکه بازدهی را قربانی کند.

## اصل تنوع‌بخشی

هری مارکوویتز اقتصاددان برنده نوبل نشان داد که با ترکیب دارایی‌های با همبستگی پایین، می‌توان ریسک کلی پرتفوی را کاهش داد.

## دارایی‌های مناسب برای ایران

در شرایط اقتصادی ایران، یک سبد متنوع می‌تواند شامل صندوق درآمد ثابت (۴۰٪)، سهام (۳۰٪)، طلا (۲۰٪) و نقد (۱۰٪) باشد.

## بازبینی دوره‌ای

سبد سرمایه‌گذاری باید حداقل سالی یک‌بار بازبینی شود. با تغییر شرایط بازار، وزن دارایی‌ها از تخصیص هدف فاصله می‌گیرد و باید تعادل مجدد برقرار شود.`,
  },
  {
    id: "8", slug: "systematic-risk", cat: "ریسک سرمایه‌گذاری",
    title: "ریسک سیستماتیک در برابر ریسک غیرسیستماتیک",
    desc: "تفاوت ریسک‌های قابل کنترل و غیرقابل کنترل در بازارهای مالی و نحوه برخورد با هرکدام.",
    time: "۸ دقیقه", date: "۱۴۰۳/۰۳/۲۵", featured: false,
    thumb: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
    body: `درک تفاوت بین ریسک سیستماتیک و غیرسیستماتیک به شما کمک می‌کند استراتژی بهتری برای مدیریت سرمایه طراحی کنید.

## ریسک سیستماتیک

ریسک بازار یا سیستماتیک آن دسته از ریسک‌هایی هستند که کل بازار را تحت تأثیر قرار می‌دهند؛ مانند رکود اقتصادی، تغییرات نرخ بهره یا بحران‌های سیاسی. این ریسک‌ها با تنوع‌بخشی قابل حذف نیستند.

## ریسک غیرسیستماتیک

این ریسک‌ها مختص یک شرکت یا صنعت هستند؛ مانند مشکلات مدیریتی، رقابت جدید یا دعاوی حقوقی. با تنوع‌بخشی کافی می‌توان این نوع ریسک را به حداقل رساند.

## بتا: معیار ریسک سیستماتیک

ضریب بتا نشان می‌دهد یک سهم یا صندوق چقدر نسبت به نوسانات بازار حساس است. بتای بالای ۱ یعنی نوسان بیشتر از بازار.`,
  },
  {
    id: "9", slug: "etf-iran", cat: "صندوق",
    title: "صندوق‌های قابل معامله (ETF) در ایران",
    desc: "آشنایی با ETF‌های بورسی، مزایا، معایب و نحوه خرید و فروش آن‌ها در بازار سرمایه.",
    time: "۷ دقیقه", date: "۱۴۰۳/۰۳/۱۸", featured: false,
    thumb: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=600&q=80",
    body: `ETF یا صندوق‌های قابل معامله در بورس، ترکیبی از مزایای صندوق‌های سرمایه‌گذاری و سهام هستند.

## ETF چیست؟

ETF مانند سهام در بورس خرید و فروش می‌شود اما مانند صندوق مشترک، سبدی از دارایی‌ها را نگه می‌دارد. این ترکیب نقدشوندگی بالا و تنوع را با هم فراهم می‌کند.

## مزایای ETF

کارمزد پایین‌تر از صندوق‌های معمولی، امکان خرید و فروش لحظه‌ای در ساعات معاملاتی، شفافیت بالاتر و سهولت در معامله از مزایای اصلی ETF‌ها هستند.

## ETF‌های ایرانی

در بازار ایران انواع ETF سهامی، طلا، درآمد ثابت و مختلط وجود دارد. برخی ETF‌های دولتی مانند دارا اول و پالایش در بورس قابل معامله هستند.`,
  },
  {
    id: "10", slug: "inflation-protection", cat: "سرمایه‌گذاری",
    title: "تأثیر تورم بر سرمایه‌گذاری و راه‌های مقابله",
    desc: "چگونه تورم ارزش پول نقد را کاهش می‌دهد و کدام دارایی‌ها سپر تورمی بهتری هستند.",
    time: "۱۱ دقیقه", date: "۱۴۰۳/۰۳/۱۰", featured: true,
    thumb: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80",
    body: `تورم دشمن پنهان پس‌انداز است. پول نقد در حساب بانکی هر سال بخشی از ارزش واقعی‌اش را از دست می‌دهد.

## تورم چگونه سرمایه را می‌خورد؟

اگر تورم سالانه ۴۰٪ باشد و سرمایه شما ۳۰٪ بازدهی داشته باشد، در واقع ۱۰٪ قدرت خرید از دست داده‌اید. بازدهی واقعی = بازدهی اسمی منهای تورم.

## دارایی‌های تورم‌پوش

طلا، سهام شرکت‌های صادراتی، مسکن و ارز به صورت تاریخی بهترین عملکرد را در برابر تورم داشته‌اند.

## صندوق طلا راهکاری آسان

برای کسانی که نمی‌خواهند مستقیم طلا بخرند، صندوق‌های طلا گزینه مناسبی هستند. نقدشوندگی بالا و هزینه نگهداری پایین از مزایای این صندوق‌هاست.

## استراتژی پیشنهادی

بخشی از سبد را همیشه در دارایی‌های تورم‌پوش نگه دارید. میزان آن بسته به افق سرمایه‌گذاری و ریسک‌پذیری شما متفاوت است.`,
  },
  {
    id: "11", slug: "compound-interest", cat: "آموزش",
    title: "مفهوم بهره مرکب و قدرت زمان در سرمایه‌گذاری",
    desc: "چرا سرمایه‌گذاری زودهنگام مهم‌ترین تصمیم مالی زندگی شماست و اعداد چه می‌گویند.",
    time: "۶ دقیقه", date: "۱۴۰۳/۰۲/۲۸", featured: false,
    thumb: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&q=80",
    body: `آلبرت انیشتین بهره مرکب را «هشتمین عجایب دنیا» نامید. این مفهوم ساده می‌تواند زندگی مالی شما را متحول کند.

## بهره مرکب چیست؟

در بهره مرکب، سود شما روی سرمایه اولیه به‌علاوه سودهای قبلی محاسبه می‌شود. به بیان ساده‌تر، سود سودتان هم سود می‌گیرد.

## قدرت زمان

اگر از ۲۵ سالگی ماهی ۵۰۰ هزار تومان با بازدهی سالانه ۳۰٪ سرمایه‌گذاری کنید، تا ۶۵ سالگی میلیاردها تومان خواهید داشت. شروع دیر هزینه سنگینی دارد.

## قانون ۷۲

برای تخمین سریع زمان دو برابر شدن سرمایه، عدد ۷۲ را بر نرخ بازدهی سالانه تقسیم کنید. با بازدهی ۳۶٪ سرمایه هر ۲ سال دو برابر می‌شود.`,
  },
  {
    id: "12", slug: "pe-ratio", cat: "اصطلاحات",
    title: "P/E چیست و چگونه سهام را ارزیابی کنیم؟",
    desc: "نسبت قیمت به درآمد، ابزاری ساده و پرکاربرد برای سنجش ارزندگی سهام شرکت‌ها.",
    time: "۵ دقیقه", date: "۱۴۰۳/۰۲/۱۵", featured: false,
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    body: `نسبت P/E یکی از ابتدایی‌ترین و پرکاربردترین ابزارهای ارزیابی سهام است که هر سرمایه‌گذاری باید با آن آشنا باشد.

## P/E چگونه محاسبه می‌شود؟

P/E = قیمت هر سهم تقسیم بر سود هر سهم (EPS). اگر سهمی ۱۰۰۰ تومان قیمت دارد و EPS آن ۱۰۰ تومان باشد، P/E برابر ۱۰ است.

## تفسیر P/E

P/E پایین نشان می‌دهد سهم ارزان‌تر از سودآوری‌اش معامله می‌شود. P/E بالا ممکن است نشانه انتظارات رشد بالا یا قیمت‌گذاری بیش از حد باشد.

## P/E در مقایسه با صنعت

P/E را همیشه با میانگین صنعت مقایسه کنید. P/E ۲۰ در صنعتی با میانگین ۳۰، نشانه ارزندگی است. اما همین P/E در صنعتی با میانگین ۱۰ گران‌بودن را نشان می‌دهد.`,
  },
  {
    id: "13", slug: "choose-right-fund", cat: "صندوق",
    title: "راهنمای انتخاب صندوق سرمایه‌گذاری مناسب",
    desc: "معیارهایی که باید قبل از سرمایه‌گذاری در هر صندوقی بررسی کنید تا بهترین انتخاب را داشته باشید.",
    time: "۱۰ دقیقه", date: "۱۴۰۳/۰۲/۰۵", featured: false,
    thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    body: `با وجود صدها صندوق سرمایه‌گذاری در ایران، انتخاب درست می‌تواند چالش‌برانگیز باشد. این راهنما به شما کمک می‌کند.

## اول اهداف خود را مشخص کنید

قبل از هر چیز بدانید چقدر ریسک می‌پذیرید، به پول‌تان در چه بازه زمانی نیاز دارید و هدف بازدهی شما چیست. این سه سؤال صندوق مناسب را مشخص می‌کند.

## معیارهای ارزیابی صندوق

بازدهی تاریخی (حداقل ۳ سال)، نرخ هزینه، نقدشوندگی، اعتبار مدیر صندوق و مقایسه با شاخص مرجع از مهم‌ترین معیارها هستند.

## به تبلیغات اعتماد نکنید

بازدهی گذشته تضمینی برای آینده نیست. صندوقی که سال گذشته بهترین بازدهی داشته لزوماً امسال هم بهترین نخواهد بود.

## تنوع در صندوق‌ها

مثل دارایی‌ها، سرمایه‌گذاری در چند صندوق مختلف هم می‌تواند ریسک را کاهش دهد.`,
  },
  {
    id: "14", slug: "behavioral-finance", cat: "ریسک سرمایه‌گذاری",
    title: "چگونه رفتار احساسی در بازار را کنترل کنیم؟",
    desc: "اشتباهات رایج رفتاری سرمایه‌گذاران و تکنیک‌های مالی رفتاری برای تصمیم‌گیری منطقی.",
    time: "۸ دقیقه", date: "۱۴۰۳/۰۱/۲۵", featured: false,
    thumb: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
    body: `تحقیقات نشان می‌دهد بیشترین ضرر سرمایه‌گذاران نه از بازار، بلکه از تصمیمات احساسی خودشان ناشی می‌شود.

## اشتباهات رایج احساسی

ترس از دست دادن (FOMO) در بازارهای صعودی، وحشت و فروش در بازارهای نزولی، دلبستگی به سهام زیانده و تأیید تعصبات شخصی از رایج‌ترین خطاهای رفتاری هستند.

## سوگیری‌های شناختی

انسان‌ها تمایل دارند اطلاعاتی را ببینند که باورهایشان را تأیید کند. این سوگیری تأیید می‌تواند به تصمیمات ضرررسان منجر شود.

## راه‌های کنترل احساسات

استراتژی مکتوب داشته باشید و به آن پایبند باشید. سرمایه‌گذاری اتوماتیک و منظم، بررسی سبد نه روزانه بلکه ماهانه، و مشورت با مشاور مالی می‌تواند کمک کند.`,
  },
  {
    id: "15", slug: "market-comparison-1403", cat: "سرمایه‌گذاری",
    title: "مقایسه بازدهی بازارهای مختلف در ایران – ۱۴۰۳",
    desc: "تحلیل مقایسه‌ای عملکرد بورس، طلا، ارز، مسکن و سپرده بانکی در سال جاری.",
    time: "۱۴ دقیقه", date: "۱۴۰۳/۰۱/۱۰", featured: true,
    thumb: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80",
    body: `هر سال سرمایه‌گذاران با این سؤال روبه‌رو هستند: پول را کجا بگذاریم؟ در این مقاله عملکرد بازارهای اصلی را مقایسه می‌کنیم.

## بورس اوراق بهادار

شاخص کل بورس در نیمه اول ۱۴۰۳ رشد ۳۵٪ داشت. صنایع پتروشیمی، فولاد و بانک‌ها بهترین عملکرد را داشتند.

## طلا و سکه

قیمت طلا در داخل کشور با رشد دلار و افزایش قیمت جهانی طلا، بازدهی نزدیک به ۵۵٪ در نیمه اول سال داشت.

## ارز

دلار در نیمه اول ۱۴۰۳ حدود ۳۰٪ افزایش یافت. این رشد کمتر از تورم بود که نشان می‌دهد سرمایه‌گذاری در ارز لزوماً بهترین انتخاب نیست.

## سپرده بانکی

با نرخ بهره ۲۳٪ سالانه، سپرده بانکی در نیمه اول حدود ۱۱.۵٪ بازدهی داشت که پایین‌ترین عملکرد در بین بازارها بود.

## جمع‌بندی

طلا و بورس بهترین بازدهی را داشتند. صندوق‌های ترکیبی که در هر دو سرمایه‌گذاری می‌کنند، گزینه میانه‌ای برای کاهش ریسک هستند.`,
  },
];

const NEWS = [
  {
    id: "1", title: "بازدهی صندوق اوج ملت در نیمه اول ۱۴۰۳",
    cat: "اخبار صندوق", date: "۱۴۰۳/۰۵/۱۵",
    excerpt: "صندوق اوج ملت در نیمه اول ۱۴۰۳ بازدهی ۱۸.۵ درصدی برای سرمایه‌گذاران خود به ارمغان آورد و رکورد جدیدی در عملکرد این صندوق ثبت شد.",
    slug: "owj-h1-1403", pinned: true,
    thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: "2", title: "فراسود جایزه بهترین پلتفرم سرمایه‌گذاری آنلاین را دریافت کرد",
    cat: "اخبار شرکت", date: "۱۴۰۳/۰۵/۱۰",
    excerpt: "در هفتمین دوره جوایز مالی ایران، فراسود به عنوان بهترین پلتفرم سرمایه‌گذاری آنلاین شناخته شد.",
    slug: "award-2024", pinned: true,
    thumb: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=600&q=80",
  },
  {
    id: "3", title: "رونمایی از صندوق طلای زرین ملت و صندوق افق ملت",
    cat: "اخبار صندوق", date: "۱۴۰۳/۰۵/۰۵",
    excerpt: "فراسود با معرفی دو صندوق جدید طلا و مختلط پویا، سبد محصولات خود را به شش صندوق گسترش داد.",
    slug: "new-funds-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=600&q=80",
  },
  {
    id: "4", title: "اطلاعیه تغییر ساعت پذیره‌نویسی صندوق‌های درآمد ثابت",
    cat: "اطلاعیه", date: "۱۴۰۳/۰۵/۰۱",
    excerpt: "به اطلاع سرمایه‌گذاران محترم می‌رسد که از تاریخ ۱۴۰۳/۰۵/۰۵ ساعت پذیره‌نویسی به ۱۴:۳۰ تغییر می‌یابد.",
    slug: "subscription-time-change", pinned: true,
    thumb: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&q=80",
  },
  {
    id: "5", title: "گزارش بازار سرمایه – تیرماه ۱۴۰۳",
    cat: "تحلیل بازار", date: "۱۴۰۳/۰۴/۳۱",
    excerpt: "بررسی روند شاخص کل بورس و فرابورس در تیرماه و پیش‌بینی مسیر بازار در مردادماه.",
    slug: "market-tir-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1642790551116-18e4f313f6c9?w=600&q=80",
  },
  {
    id: "6", title: "بازدهی صندوق آتیه ملت از مرز ۶۸ درصد گذشت",
    cat: "اخبار صندوق", date: "۱۴۰۳/۰۴/۲۵",
    excerpt: "صندوق سهامی آتیه ملت در دوره دوازده ماهه منتهی به تیرماه ۱۴۰۳ بازدهی ۶۸.۲ درصدی ثبت کرد.",
    slug: "atiyeh-68pct", pinned: false,
    thumb: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  },
  {
    id: "7", title: "نشست مدیران فراسود با سازمان بورس و اوراق بهادار",
    cat: "اخبار شرکت", date: "۱۴۰۳/۰۴/۱۸",
    excerpt: "مدیران ارشد فراسود در نشستی با مسئولان سازمان بورس، برنامه‌های توسعه محصول را تشریح کردند.",
    slug: "seo-meeting-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
  },
  {
    id: "8", title: "اطلاعیه برگزاری مجمع سالانه صندوق اوج ملت",
    cat: "اطلاعیه", date: "۱۴۰۳/۰۴/۱۰",
    excerpt: "مجمع سالانه صندوق اوج ملت روز سه‌شنبه ۱۴۰۳/۰۴/۱۹ راس ساعت ۱۰ صبح برگزار خواهد شد.",
    slug: "owj-assembly-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
  },
  {
    id: "9", title: "تحلیل بازار طلا و تأثیر آن بر صندوق طلای زرین ملت",
    cat: "تحلیل بازار", date: "۱۴۰۳/۰۴/۰۵",
    excerpt: "با افزایش قیمت طلا در بازارهای جهانی، صندوق طلای زرین ملت بازدهی قابل توجهی را تجربه کرده است.",
    slug: "gold-analysis-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80",
  },
  {
    id: "10", title: "راه‌اندازی اپلیکیشن موبایل فراسود برای iOS و Android",
    cat: "اخبار شرکت", date: "۱۴۰۳/۰۳/۲۸",
    excerpt: "اپلیکیشن رسمی فراسود با امکان خرید، فروش و رصد لحظه‌ای سبد سرمایه‌گذاری منتشر شد.",
    slug: "app-launch-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
  {
    id: "11", title: "اطلاعیه توقف موقت پذیره‌نویسی صندوق اندوخته ملت",
    cat: "اطلاعیه", date: "۱۴۰۳/۰۳/۲۰",
    excerpt: "به اطلاع می‌رساند که پذیره‌نویسی صندوق اندوخته ملت از تاریخ ۱۴۰۳/۰۳/۲۵ به مدت یک هفته متوقف خواهد بود.",
    slug: "andookhte-pause-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  },
  {
    id: "12", title: "فراسود در نمایشگاه بانک، بیمه و بورس حضور یافت",
    cat: "اخبار شرکت", date: "۱۴۰۳/۰۳/۱۰",
    excerpt: "غرفه فراسود در هجدهمین نمایشگاه بین‌المللی بانک، بیمه و بورس با استقبال گسترده‌ای روبه‌رو شد.",
    slug: "exhibition-1403", pinned: false,
    thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

const REPORTS = [
  {
    id: "1", title: "گزارش عملکرد ماهانه صندوق‌ها – تیرماه ۱۴۰۳",
    cat: "گزارش عملکرد", date: "۱۴۰۳/۰۵/۰۱",
    desc: "تحلیل جامع عملکرد شش صندوق فراسود در دوره مالی تیرماه ۱۴۰۳ به همراه مقایسه با شاخص بازار.", slug: "monthly-tir-1403", pinned: true,
  },
  {
    id: "2", title: "تحلیل بازار سرمایه – بهار ۱۴۰۳",
    cat: "تحلیل بازار", date: "۱۴۰۳/۰۴/۱۵",
    desc: "بررسی روندهای بازار سرمایه در فصل بهار و چشم‌انداز تابستان ۱۴۰۳ با نگاهی به متغیرهای کلان.", slug: "market-spring-1403", pinned: true,
  },
  {
    id: "3", title: "گزارش سالانه فراسود – ۱۴۰۲",
    cat: "گزارش سالانه", date: "۱۴۰۳/۰۳/۲۰",
    desc: "گزارش کامل عملکرد شرکت و صندوق‌های سرمایه‌گذاری در سال مالی ۱۴۰۲ شامل صورت‌های مالی.", slug: "annual-1402", pinned: true,
  },
  {
    id: "4", title: "گزارش عملکرد ماهانه صندوق‌ها – خردادماه ۱۴۰۳",
    cat: "گزارش عملکرد", date: "۱۴۰۳/۰۴/۰۱",
    desc: "بررسی عملکرد صندوق‌های فراسود در خردادماه و مقایسه با بازدهی ماه‌های پیشین.", slug: "monthly-khordad-1403", pinned: false,
  },
  {
    id: "5", title: "گزارش انتشار عمومی اطلاعات صندوق اوج ملت – فصل اول ۱۴۰۳",
    cat: "انتشار عمومی اطلاعات", date: "۱۴۰۳/۰۳/۳۱",
    desc: "اطلاعات ترکیب دارایی‌ها، بزرگترین سهامداران و وضعیت نقدینگی صندوق اوج ملت.", slug: "owj-disclosure-q1-1403", pinned: false,
  },
  {
    id: "6", title: "تحلیل بازار طلا و ارز – اردیبهشت ۱۴۰۳",
    cat: "تحلیل بازار", date: "۱۴۰۳/۰۳/۱۰",
    desc: "تأثیر نوسانات طلای جهانی و نرخ ارز بر عملکرد صندوق‌های طلا و مختلط فراسود.", slug: "gold-fx-analysis-1403", pinned: false,
  },
  {
    id: "7", title: "گزارش عملکرد ماهانه صندوق‌ها – اردیبهشت ۱۴۰۳",
    cat: "گزارش عملکرد", date: "۱۴۰۳/۰۳/۰۱",
    desc: "گزارش کامل عملکرد صندوق‌های فراسود در اردیبهشت‌ماه با جداول بازدهی تفکیکی.", slug: "monthly-ordibehesht-1403", pinned: false,
  },
  {
    id: "8", title: "انتشار عمومی اطلاعات صندوق اندوخته ملت – فصل اول ۱۴۰۳",
    cat: "انتشار عمومی اطلاعات", date: "۱۴۰۳/۰۲/۳۰",
    desc: "گزارش ترکیب پرتفولیو، نسبت‌های مالی کلیدی و اطلاعات ضروری صندوق اندوخته ملت.", slug: "andookhte-disclosure-q1-1403", pinned: false,
  },
  {
    id: "9", title: "گزارش فصل زمستان ۱۴۰۲ – مروری بر عملکرد سالانه",
    cat: "گزارش فصلی", date: "۱۴۰۳/۰۲/۱۰",
    desc: "مرور جامع عملکرد صندوق‌های فراسود در فصل زمستان ۱۴۰۲ و جمع‌بندی کل سال.", slug: "winter-1402-report", pinned: false,
  },
  {
    id: "10", title: "تحلیل چشم‌انداز بازار سرمایه – سال ۱۴۰۳",
    cat: "تحلیل بازار", date: "۱۴۰۳/۰۱/۲۰",
    desc: "پیش‌بینی روندهای بازار سرمایه در سال ۱۴۰۳ بر اساس متغیرهای اقتصاد کلان و سیاست‌گذاری.", slug: "outlook-1403", pinned: false,
  },
  {
    id: "11", title: "انتشار عمومی اطلاعات صندوق طلای زرین ملت – فصل چهارم ۱۴۰۲",
    cat: "انتشار عمومی اطلاعات", date: "۱۴۰۳/۰۱/۰۵",
    desc: "آخرین وضعیت ترکیب دارایی، مقایسه با شاخص مرجع طلا و صورت‌های مالی صندوق طلای زرین.", slug: "tala-disclosure-q4-1402", pinned: false,
  },
  {
    id: "12", title: "گزارش فصل پاییز ۱۴۰۲ – صندوق‌های فراسود",
    cat: "گزارش فصلی", date: "۱۴۰۲/۱۱/۰۱",
    desc: "گزارش تفصیلی عملکرد شش صندوق فراسود در فصل پاییز ۱۴۰۲ با تحلیل دلایل بازدهی.", slug: "autumn-1402-report", pinned: false,
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 20) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return s;
}

function useReveal() {
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
function cn(...cs: (string | undefined | false | null)[]) {
  return cs.filter(Boolean).join(" ");
}

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
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

function BigNum({ n, className = "" }: { n: string; className?: string }) {
  return (
    <div
      className={cn("absolute -top-6 right-0 text-[140px] lg:text-[180px] font-black leading-none select-none pointer-events-none", className)}
      style={{ color: C.num }}
    >
      {n}
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
const NAV = [
  { label: "صفحه اصلی", href: "/" },
  {
    label: "صندوق‌های سرمایه‌گذاری", href: "/funds",
    mega: [
      { label: "اوج ملت", href: "/funds?fund=0", desc: "درآمد ثابت با پیش‌بینی سود" },
      { label: "اندوخته ملت", href: "/funds?fund=1", desc: "درآمد ثابت با پیش‌بینی سود" },
      { label: "طلای زرین ملت", href: "/funds?fund=2", desc: "صندوق طلا" },
      { label: "آتیه ملت", href: "/funds?fund=3", desc: "درآمد ثابت قابل معامله" },
      { label: "خزانه ملت", href: "/funds?fund=4", desc: "اوراق دولتی قابل معامله" },
      { label: "افق ملت", href: "/funds?fund=5", desc: "قابل معامله سهامی" },
    ],
  },
  { label: "مرکز دانش", href: "/knowledge" },
  { label: "اخبار و اطلاعیه‌ها", href: "/news" },
  { label: "گزارش‌ها", href: "/reports" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "درباره ما", href: "/about" },
];

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
type AuthMode = "login" | "register" | "forgot";
type UserType = "real" | "legal";

function LoginModal({ open, onClose, initMode }: { open: boolean; onClose: () => void; initMode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initMode ?? "login");

  useEffect(() => { if (open) setMode(initMode ?? "login"); }, [open, initMode]);
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
        <div className="bg-white px-6 pt-5 pb-6 flex-shrink-0 border-b border-[#E6E6E3]">
          <div className="flex items-center justify-end mb-3">
            <button onClick={() => { onClose(); resetAll(); }} className="w-8 h-8 rounded-full bg-[#F7F7F5] hover:bg-[#EEEEEB] flex items-center justify-center transition-colors">
              <X size={15} className="text-[#1B1E22]" />
            </button>
          </div>
          <div className="text-[#1B1E22] font-black text-xl leading-tight">
            {mode === "login" ? "ورود به سامانه فراسود" :
             mode === "register" ? (regStep === "id" ? "ثبت‌نام در فراسود" : regStep === "otp" ? "تأیید پیامک" : regStep === "newpass" ? "تعریف رمز عبور" : "ثبت‌نام موفق") :
             fgtStep === "id" ? "بازیابی رمز عبور" : fgtStep === "otp" ? "تأیید پیامک" : fgtStep === "newpass" ? "رمز عبور جدید" : "رمز عبور تغییر یافت"}
          </div>
          <div className="text-[#6F7378] text-xs mt-1">
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
                return <div key={s} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i <= idx ? "bg-[#F4512A]" : "bg-[#E6E6E3]")} />;
              })}
            </div>
          )}
        </div>


        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">

            {/* ════════ LOGIN ════════ */}
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="space-y-5 pt-2">

                <div>
                  <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">کد ملی / شناسه ملی</label>
                  <input type="text" inputMode="numeric" placeholder="کد ملی یا شناسه ملی خود را وارد کنید" value={loginId}
                    onChange={e => setLoginId(e.target.value.replace(/\D/g, ""))}
                    className={cn("w-full h-[52px] rounded-xl border px-4 text-sm outline-none transition-colors bg-white placeholder:text-[#B0B4BA]", loginErrs.id ? "border-[#C83A32]" : "border-[#E6E6E3] focus:border-[#1B1E22]")} dir="ltr" />
                  {loginErrs.id && <p className="text-[#C83A32] text-xs mt-1">{loginErrs.id}</p>}
                </div>

                <div>
                  <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">رمز عبور</label>
                  <div className="relative">
                    <input type={showLoginPw ? "text" : "password"} placeholder="رمز عبور خود را وارد کنید" value={loginPw}
                      onChange={e => setLoginPw(e.target.value)}
                      className={cn("w-full h-[52px] rounded-xl border px-4 pl-12 text-sm outline-none transition-colors bg-white placeholder:text-[#B0B4BA]", loginErrs.pw ? "border-[#C83A32]" : "border-[#E6E6E3] focus:border-[#1B1E22]")} dir="ltr" />
                    <button type="button" onClick={() => setShowLoginPw(v => !v)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F7378] hover:text-[#1B1E22]">
                      {showLoginPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {loginErrs.pw && <p className="text-[#C83A32] text-xs mt-1">{loginErrs.pw}</p>}
                </div>

                <div>
                  <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">کد امنیتی</label>
                  <div className="flex gap-2">
                    <input type="text" inputMode="numeric" placeholder="کد را وارد کنید" value={loginCaptcha}
                      onChange={e => setLoginCaptcha(e.target.value.replace(/\D/g, ""))}
                      className={cn("flex-1 h-[52px] rounded-xl border px-4 text-sm outline-none transition-colors bg-white placeholder:text-[#B0B4BA]", loginErrs.cap ? "border-[#C83A32]" : "border-[#E6E6E3] focus:border-[#1B1E22]")} dir="ltr" />
                    <div className="flex items-center gap-1.5">
                      <button type="button" title="کد جدید" onClick={() => { setCaptchaCode(Math.floor(Math.random() * 90000000 + 10000000).toString()); setLoginCaptcha(""); }}
                        className="text-[#9B9FA5] hover:text-[#1B1E22] transition-colors">
                        <RefreshCw size={15} />
                      </button>
                      <div className="h-[52px] px-4 rounded-xl flex items-center justify-center min-w-[80px] select-none" style={{ background: C.dark }}>
                        <span className="text-white font-black text-lg font-mono tracking-[3px]">{captchaCode}</span>
                      </div>
                    </div>
                  </div>
                  {loginErrs.cap && <p className="text-[#C83A32] text-xs mt-1">{loginErrs.cap}</p>}
                </div>

                <button type="button" onClick={() => switchMode("forgot")} className="block text-[#F4512A] text-xs font-semibold text-right hover:underline">
                  رمز عبور خود را فراموش کرده‌اید؟
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
                }} className={cn("w-full h-[52px] text-white font-bold text-[15px] rounded-full transition-colors duration-200 flex items-center justify-center gap-2", loading ? "bg-[#F4512A]/70 cursor-not-allowed" : "bg-[#F4512A] hover:bg-[#D94321]")}>
                  {loading ? <><RefreshCw size={15} className="animate-spin" />در حال ورود...</> : "ورود"}
                </button>

                <button type="button" onClick={() => switchMode("register")}
                  className="w-full h-[52px] border border-[#1B1E22] text-[#1B1E22] font-bold text-[15px] rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                  ثبت‌نام
                </button>
              </motion.div>
            )}

            {/* ════════ REGISTER ════════ */}
            {mode === "register" && (
              <motion.div key={`reg-${regStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="space-y-3">

                {/* ── Step 1: ID + Sajam check ── */}
                {regStep === "id" && (<>
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">{idLabel}</label>
                    <input type="text" inputMode="numeric" placeholder={idPlaceholder} value={regId}
                      onChange={e => setRegId(e.target.value.replace(/\D/g, ""))}
                      className={inp} dir="ltr" />
                  </div>
                  <div className="flex items-start gap-2 bg-[#DBEAFE] border border-[#1E40AF]/20 rounded-xl p-3">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1E40AF]">
                      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/></svg>
                    </div>
                    <p className="text-[#1E40AF] text-[11px] leading-relaxed">
                      برای ثبت‌نام، سجام شما بررسی می‌شود. در صورت وجود، پیامک یکبارمصرف ارسال خواهد شد.
                    </p>
                  </div>
                  <div className="h-[116px]" />
                  <button disabled={loading || regId.length < 10} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("otp"); setRegCountdown(120); }, 1200);
                  }} className={btn(loading || regId.length < 10)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال بررسی سجام...</> : "بررسی و ارسال کد"}
                  </button>
                  <button type="button" onClick={() => switchMode("login")}
                    className="w-full h-[50px] border border-[#1B1E22] text-[#1B1E22] font-bold text-sm rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                    بازگشت
                  </button>
                </>)}

                {/* ── Step 2: OTP ── */}
                {regStep === "otp" && (<>
                  <p className="text-[#6F7378] text-xs text-center">کد ۶ رقمی ارسال‌شده به موبایل ثبت‌شده در سجام را وارد کنید</p>
                  <div className="flex gap-2 justify-center" dir="ltr">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        id={`reg-otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={regOtp[i] || ""}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, "").slice(-1);
                          const arr = regOtp.split("");
                          arr[i] = val;
                          const next = arr.join("").slice(0, 6);
                          setRegOtp(next);
                          if (val && i < 5) (document.getElementById(`reg-otp-${i + 1}`) as HTMLInputElement)?.focus();
                        }}
                        onKeyDown={e => {
                          if (e.key === "Backspace" && !regOtp[i] && i > 0) (document.getElementById(`reg-otp-${i - 1}`) as HTMLInputElement)?.focus();
                        }}
                        onPaste={e => {
                          const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                          setRegOtp(pasted);
                          const focusIdx = Math.min(pasted.length, 5);
                          setTimeout(() => (document.getElementById(`reg-otp-${focusIdx}`) as HTMLInputElement)?.focus(), 0);
                          e.preventDefault();
                        }}
                        className="w-11 h-12 rounded-xl border border-[#E6E6E3] text-center text-lg font-black text-[#1B1E22] outline-none focus:border-[#F4512A] focus:ring-2 focus:ring-[#F4512A]/10 transition-all bg-white"
                      />
                    ))}
                  </div>
                  <div className="text-center text-xs text-[#6F7378]">
                    {regCountdown > 0
                      ? <span>ارسال مجدد تا <span className="text-[#F4512A] font-bold">{toFA(Math.floor(regCountdown/60))}:{String(regCountdown%60).padStart(2,"0").replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])}</span></span>
                      : <button onClick={() => { setRegCountdown(120); setRegOtp(""); }} className="text-[#F4512A] font-bold hover:underline">ارسال مجدد کد</button>}
                  </div>
                  <div className="h-[116px]" />
                  <button disabled={loading || regOtp.length < 6} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("newpass"); }, 1000);
                  }} className={btn(loading || regOtp.length < 6)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال تأیید...</> : "تأیید کد"}
                  </button>
                  <button type="button" onClick={() => setRegStep("id")}
                    className="w-full h-[50px] border border-[#1B1E22] text-[#1B1E22] font-bold text-sm rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                    بازگشت
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
                  <div className="h-[116px]" />
                  <button disabled={loading || !isStrongPassword(regPass) || regPass !== regPassConfirm} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setRegStep("done"); }, 1200);
                  }} className={btn(loading || !isStrongPassword(regPass) || regPass !== regPassConfirm)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال ثبت...</> : "تکمیل ثبت‌نام"}
                  </button>
                  <button type="button" onClick={() => setRegStep("otp")}
                    className="w-full h-[50px] border border-[#1B1E22] text-[#1B1E22] font-bold text-sm rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                    بازگشت
                  </button>
                </>)}

                {/* ── Done ── */}
                {regStep === "done" && (
                  <div className="flex flex-col items-center py-6 gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#16A34A]" />
                    </div>
                    <div>
                      <div className="text-[#1B1E22] font-black text-lg mb-1">ثبت‌نام موفق!</div>
                      <div className="text-[#6F7378] text-sm">به فراسود خوش آمدید</div>
                    </div>
                    <div className="h-[58px] w-full" />
                    <button onClick={() => { onClose(); resetAll(); }}
                      className="w-full h-[50px] bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-sm rounded-full transition-colors flex items-center justify-center">
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
                  <div>
                    <label className="block text-[#1B1E22] text-xs font-bold mb-1.5">{idLabel}</label>
                    <input type="text" inputMode="numeric" placeholder={idPlaceholder} value={fgtId}
                      onChange={e => setFgtId(e.target.value.replace(/\D/g, ""))}
                      className={inp} dir="ltr" />
                  </div>
                  <div className="flex items-start gap-2 bg-[#DBEAFE] border border-[#1E40AF]/20 rounded-xl p-3">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1E40AF]">
                      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/></svg>
                    </div>
                    <p className="text-[#1E40AF] text-[11px] leading-relaxed">در صورتی که قبلاً در سامانه ثبت‌نام کرده باشید، یک پیامک یکبارمصرف برای بازیابی رمز عبور ارسال می‌شود.</p>
                  </div>
                  <div className="h-[52px]" />
                  <button disabled={loading || fgtId.length < 10} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setFgtStep("otp"); setFgtCountdown(120); }, 1200);
                  }} className={btn(loading || fgtId.length < 10)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال بررسی...</> : "ارسال کد بازیابی"}
                  </button>
                  <button type="button" onClick={() => switchMode("login")}
                    className="w-full h-[50px] border border-[#1B1E22] text-[#1B1E22] font-bold text-sm rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                    بازگشت
                  </button>
                </>)}

                {/* ── Step 2: OTP ── */}
                {fgtStep === "otp" && (<>
                  <p className="text-[#6F7378] text-xs text-center">کد ۶ رقمی ارسال‌شده به موبایل ثبت‌شده را وارد کنید</p>
                  <div className="flex gap-2 justify-center" dir="ltr">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        id={`fgt-otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={fgtOtp[i] || ""}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, "").slice(-1);
                          const arr = fgtOtp.split("");
                          arr[i] = val;
                          const next = arr.join("").slice(0, 6);
                          setFgtOtp(next);
                          if (val && i < 5) (document.getElementById(`fgt-otp-${i + 1}`) as HTMLInputElement)?.focus();
                        }}
                        onKeyDown={e => {
                          if (e.key === "Backspace" && !fgtOtp[i] && i > 0) (document.getElementById(`fgt-otp-${i - 1}`) as HTMLInputElement)?.focus();
                        }}
                        onPaste={e => {
                          const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                          setFgtOtp(pasted);
                          const focusIdx = Math.min(pasted.length, 5);
                          setTimeout(() => (document.getElementById(`fgt-otp-${focusIdx}`) as HTMLInputElement)?.focus(), 0);
                          e.preventDefault();
                        }}
                        className="w-11 h-12 rounded-xl border border-[#E6E6E3] text-center text-lg font-black text-[#1B1E22] outline-none focus:border-[#F4512A] focus:ring-2 focus:ring-[#F4512A]/10 transition-all bg-white"
                      />
                    ))}
                  </div>
                  <div className="text-center text-xs text-[#6F7378]">
                    {fgtCountdown > 0
                      ? <span>ارسال مجدد تا <span className="text-[#F4512A] font-bold">{toFA(Math.floor(fgtCountdown/60))}:{String(fgtCountdown%60).padStart(2,"0").replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])}</span></span>
                      : <button onClick={() => { setFgtCountdown(120); setFgtOtp(""); }} className="text-[#F4512A] font-bold hover:underline">ارسال مجدد کد</button>}
                  </div>
                  <div className="h-[116px]" />
                  <button disabled={loading || fgtOtp.length < 6} onClick={() => {
                    setLoading(true);
                    setTimeout(() => { setLoading(false); setFgtStep("newpass"); }, 1000);
                  }} className={btn(loading || fgtOtp.length < 6)}>
                    {loading ? <><RefreshCw size={15} className="animate-spin" />در حال تأیید...</> : "تأیید کد"}
                  </button>
                  <button type="button" onClick={() => setFgtStep("id")}
                    className="w-full h-[50px] border border-[#1B1E22] text-[#1B1E22] font-bold text-sm rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center">
                    بازگشت
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
                    <div className="w-20 h-20 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#16A34A]" />
                    </div>
                    <div>
                      <div className="text-[#1B1E22] font-black text-lg mb-1">رمز عبور تغییر یافت!</div>
                      <div className="text-[#6F7378] text-sm">اکنون می‌توانید با رمز جدید وارد شوید</div>
                    </div>
                    <div className="h-[58px] w-full" />
                    <button onClick={() => { switchMode("login"); setFgtStep("id"); setFgtId(""); setFgtOtp(""); setFgtPass(""); setFgtPassConfirm(""); }}
                      className="w-full h-[50px] bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-sm rounded-full transition-colors flex items-center justify-center">
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
function Header() {
  const scrolled = useScrolled();
  const [mob, setMob] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => { setMob(false); setActive(null); }, [loc.pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pt-3 px-4 lg:px-10">
        <div className={cn(
          "max-w-[1280px] mx-auto transition-all duration-300 rounded-full",
          scrolled
            ? "bg-[#1B1E22]/95 backdrop-blur-md shadow-[0_8px_48px_rgba(0,0,0,0.28)] border border-white/8"
            : "bg-[#1B1E22]/85 backdrop-blur-sm border border-white/5"
        )}>
          <div className="flex items-center justify-between h-[60px] px-5 lg:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <svg width="120" height="49" viewBox="0 0 224 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#nav-logo-shadow)">
                  <path d="M33.5058 67.2638V67.6174C33.4514 68.1522 33.252 68.6054 32.9166 68.959C32.563 69.3034 32.146 69.4848 31.6656 69.4848H31.584C31.031 69.5391 30.7591 69.8201 30.7591 70.3368V72.313H32.0735V74.6427H30.7591V81.0244H27.3144V74.6427H26V72.313H27.3144V69.7386C27.3144 69.7386 27.3325 69.5754 27.3597 69.3941C27.5229 68.4513 28.239 67.7443 29.49 67.2548C29.8345 67.1732 30.1971 67.1279 30.605 67.1279H33.3607C33.3607 67.1279 33.4333 67.1369 33.4604 67.1641C33.4876 67.1913 33.4967 67.2185 33.4967 67.2638H33.5058ZM45.7525 80.9882H45.1995C44.4381 80.9156 43.8035 80.6256 43.305 80.1361C43.2053 80.0363 43.1237 79.9366 43.0421 79.8369C42.9424 80.0363 42.8155 80.2176 42.6523 80.3808C42.3078 80.7253 41.8908 80.9156 41.4104 80.97C41.3107 80.97 41.22 80.9791 41.1385 80.9791H36.4337C35.6723 80.9066 35.0377 80.6165 34.5392 80.127C34.0497 79.6284 33.7596 79.0392 33.6871 78.3684C33.6871 78.2234 33.678 78.0964 33.678 77.9786V75.3679C33.678 75.2501 33.678 75.1231 33.6871 74.9781C33.7596 74.3073 34.0497 73.7181 34.5392 73.2195C35.0377 72.73 35.6723 72.4399 36.4337 72.3674H43.1237C43.8851 72.4399 44.5197 72.73 45.0182 73.2195C45.5078 73.7181 45.7978 74.3073 45.8703 74.9781C45.8703 75.1231 45.8794 75.2501 45.8794 75.3679V80.8431C45.8794 80.8431 45.8704 80.9156 45.8432 80.9428C45.816 80.97 45.7888 80.9791 45.7434 80.9791L45.7525 80.9882ZM42.4347 78.5588V75.3951C42.4347 75.2319 42.3803 75.0959 42.2625 74.9872C42.1447 74.8693 42.0087 74.8149 41.8546 74.8149H37.7119C37.5487 74.8149 37.4128 74.8693 37.304 74.9872C37.1861 75.105 37.1317 75.241 37.1317 75.3951V77.9877C37.1317 78.1508 37.1861 78.2868 37.304 78.3956C37.4218 78.5134 37.5578 78.5678 37.7119 78.5678H42.4347V78.5588ZM48.0459 72.3674H48.5989C49.3604 72.4399 49.9949 72.73 50.4935 73.2195C50.6204 73.3464 50.7292 73.4733 50.8198 73.5821C51.1643 73.0926 51.7172 72.73 52.4787 72.5034C52.8232 72.4127 53.222 72.3674 53.6934 72.3674V74.5974C53.1404 74.7062 52.6509 74.9781 52.2249 75.4042C51.69 75.939 51.4 76.5826 51.3546 77.3259V81.0063H47.9009V72.5124C47.9009 72.5124 47.91 72.4399 47.9372 72.4127C47.9643 72.3855 47.9915 72.3765 48.0369 72.3765L48.0459 72.3674ZM67.7894 80.9882H67.2364C66.475 80.9156 65.8404 80.6256 65.3418 80.1361C65.2421 80.0363 65.1605 79.9366 65.079 79.8369C64.9792 80.0363 64.8523 80.2176 64.6892 80.3808C64.3447 80.7253 63.9277 80.9156 63.4473 80.97C63.3476 80.97 63.2569 80.9791 63.1753 80.9791H58.4706C57.7092 80.9066 57.0746 80.6165 56.576 80.127C56.0865 79.6284 55.7965 79.0392 55.7239 78.3684C55.7239 78.2234 55.7149 78.0964 55.7149 77.9786V75.3679C55.7149 75.2501 55.7149 75.1231 55.7239 74.9781C55.7965 74.3073 56.0865 73.7181 56.576 73.2195C57.0746 72.73 57.7092 72.4399 58.4706 72.3674H65.1605C65.922 72.4399 66.5565 72.73 67.0551 73.2195C67.5446 73.7181 67.8347 74.3073 67.9072 74.9781C67.9072 75.1231 67.9163 75.2501 67.9163 75.3679V80.8431C67.9163 80.8431 67.9072 80.9156 67.88 80.9428C67.8528 80.97 67.8256 80.9791 67.7803 80.9791L67.7894 80.9882ZM64.4716 78.5588V75.3951C64.4716 75.2319 64.4172 75.0959 64.2994 74.9872C64.1815 74.8693 64.0456 74.8149 63.8915 74.8149H59.7488C59.5856 74.8149 59.4496 74.8693 59.3409 74.9872C59.223 75.105 59.1686 75.241 59.1686 75.3951V77.9877C59.1686 78.1508 59.223 78.2868 59.3409 78.3956C59.4587 78.5134 59.5947 78.5678 59.7488 78.5678H64.4716V78.5588ZM70.5361 80.8703V80.7434C70.5904 80.2176 70.7899 79.7735 71.1343 79.429C71.4788 79.0845 71.8958 78.8942 72.3762 78.8398C72.476 78.8398 72.6391 78.8216 72.8748 78.8035H77.8787C78.0418 78.8035 78.1778 78.7491 78.2866 78.6494C78.3954 78.5497 78.4588 78.4137 78.4588 78.2596V78.1146C78.4588 77.8245 78.3228 77.6795 78.06 77.6795H72.6663L72.1587 77.6613C71.7417 77.5707 71.3972 77.3894 71.1253 77.1174C70.7808 76.773 70.5904 76.3832 70.5451 75.9209C70.5451 75.8755 70.5451 75.7939 70.5361 75.6852V75.0144L70.5814 74.7424C70.6992 74.1713 70.9712 73.6728 71.3972 73.2286C71.8595 72.7753 72.4397 72.5034 73.1377 72.4127L73.3915 72.3946H81.7856C81.7856 72.3946 81.8582 72.4037 81.8854 72.4309C81.9126 72.4581 81.9216 72.4943 81.9216 72.5306V72.6575C81.8672 73.1832 81.6678 73.6274 81.3233 73.9719C80.9789 74.3164 80.5619 74.5067 80.0814 74.5611C79.9817 74.5792 79.8911 74.5883 79.8095 74.5974H74.579C74.4159 74.5974 74.2799 74.6518 74.1711 74.7515C74.0532 74.8512 73.9989 74.9872 73.9989 75.1413V75.2863C73.9989 75.5764 74.1348 75.7214 74.3977 75.7214H79.882C80.1177 75.7396 80.2355 75.7486 80.2446 75.7577C80.6797 75.8302 81.0514 76.0115 81.3324 76.2925C81.6769 76.637 81.8672 77.0268 81.9126 77.4891C81.9126 77.5253 81.9126 77.6069 81.9216 77.7248V78.2777L81.9035 78.5044L81.8854 78.6675C81.7675 79.2386 81.4956 79.7372 81.0695 80.1814C80.6072 80.6346 80.0271 80.9066 79.329 80.9972L79.1931 81.0154H70.6902C70.6902 81.0154 70.6176 81.0063 70.5904 80.9791C70.5633 80.9519 70.5542 80.9247 70.5542 80.8794L70.5361 80.8703ZM83.4536 75.3498C83.4536 75.2319 83.4536 75.105 83.4627 74.96C83.5352 74.2892 83.8253 73.6999 84.3148 73.2014C84.8133 72.7119 85.4479 72.4218 86.2093 72.3493H92.863C93.6245 72.4218 94.259 72.7119 94.7576 73.2014C95.2471 73.6999 95.5372 74.2892 95.6097 74.96C95.6097 75.0234 95.6097 75.0778 95.6188 75.1322V78.3593H95.6097V78.3956C95.5372 79.0664 95.2471 79.6556 94.7576 80.1542C94.259 80.6437 93.6245 80.9338 92.863 81.0063H86.2093C85.4479 80.9338 84.8133 80.6437 84.3148 80.1542C83.8253 79.6556 83.5352 79.0664 83.4627 78.3956C83.4627 78.2505 83.4536 78.1236 83.4536 78.0058V75.3498ZM86.9073 77.9967C86.9073 78.1599 86.9617 78.2959 87.0796 78.4046C87.1974 78.5225 87.3334 78.5769 87.4875 78.5769H91.6121C91.7752 78.5769 91.9112 78.5225 92.02 78.4046C92.1378 78.2959 92.1922 78.1508 92.1922 77.9967V75.3588C92.1922 75.1957 92.1378 75.0597 92.02 74.9509C91.9021 74.8421 91.7662 74.7787 91.6121 74.7787H87.4875C87.3243 74.7787 87.1884 74.8331 87.0796 74.9509C86.9708 75.0688 86.9073 75.2047 86.9073 75.3588V77.9967ZM97.1689 75.3498C97.1689 75.2319 97.1689 75.105 97.1779 74.96C97.2504 74.2892 97.5405 73.6999 98.03 73.2014C98.5286 72.7119 99.1631 72.4218 99.9246 72.3493H106.578C107.34 72.4218 107.974 72.7119 108.473 73.2014C108.962 73.6999 109.252 74.2892 109.325 74.96C109.325 75.0234 109.325 75.0778 109.334 75.1322V78.3593H109.325V78.3956C109.252 79.0664 108.962 79.6556 108.473 80.1542C107.974 80.6437 107.34 80.9338 106.578 81.0063H99.9246C99.1631 80.9338 98.5286 80.6437 98.03 80.1542C97.5405 79.6556 97.2504 79.0664 97.1779 78.3956C97.1779 78.2505 97.1689 78.1236 97.1689 78.0058V75.3498ZM100.623 77.9967C100.623 78.1599 100.677 78.2959 100.795 78.4046C100.913 78.5225 101.049 78.5769 101.203 78.5769H105.327C105.491 78.5769 105.626 78.5225 105.735 78.4046C105.853 78.2959 105.908 78.1508 105.908 77.9967V75.3588C105.908 75.1957 105.853 75.0597 105.735 74.9509C105.617 74.8421 105.481 74.7787 105.327 74.7787H101.203C101.04 74.7787 100.904 74.8331 100.795 74.9509C100.686 75.0688 100.623 75.2047 100.623 75.3588V77.9967ZM119.994 67.146H120.547C121.309 67.2185 121.943 67.5086 122.442 67.9981C122.931 68.4967 123.221 69.0859 123.294 69.7567C123.294 69.9017 123.303 70.0286 123.303 70.1465V78.0149C123.303 78.1327 123.303 78.2596 123.294 78.4046C123.221 79.0755 122.931 79.6647 122.442 80.1633C121.943 80.6528 121.309 80.9428 120.547 81.0154H113.894C113.132 80.9428 112.498 80.6528 111.999 80.1633C111.51 79.6647 111.22 79.0755 111.147 78.4046V78.3865H111.138V75.1503C111.138 75.0959 111.147 75.0416 111.147 74.9781C111.22 74.3073 111.51 73.7181 111.999 73.2195C112.498 72.73 113.132 72.4399 113.894 72.3674H117.728C118.499 72.3674 119.206 72.6122 119.849 73.0926V67.291C119.849 67.291 119.858 67.2185 119.886 67.1913C119.913 67.1641 119.94 67.1551 119.985 67.1551L119.994 67.146ZM119.686 78.3956C119.804 78.2777 119.858 78.1418 119.858 77.9877V74.8421H115.154C114.991 74.8421 114.855 74.8965 114.746 75.0144C114.637 75.1322 114.574 75.2682 114.574 75.4223V77.9877C114.574 78.1508 114.628 78.2868 114.746 78.3956C114.864 78.5044 115 78.5678 115.154 78.5678H119.278C119.441 78.5678 119.577 78.5134 119.686 78.3956ZM191.58 76.8908V76.1656C191.58 75.9299 191.58 75.6761 191.58 75.4042C191.58 72.4399 188.616 72.4309 188.616 72.4309H188.344H187.138H183.712L182.225 72.4218H182.116C181.582 72.458 179.261 72.7572 179.252 75.377C179.252 76.1475 179.252 76.773 179.27 77.2897V78.1871C179.27 80.8884 181.718 81.1332 182.162 81.1604H182.216H182.234H183.721H186.323C186.54 81.1604 187.972 81.1695 188.725 80.1633C189.187 80.7797 190.012 81.1604 191.027 81.1695H191.58V77.1446V76.8817V76.8908ZM188.299 78.8851H186.286H183.195C182.969 78.8851 182.769 78.7673 182.651 78.586V78.5678C182.651 78.5678 182.633 78.5497 182.624 78.5406C182.624 78.5316 182.615 78.5225 182.606 78.5134C182.606 78.4953 182.588 78.4862 182.588 78.4681V78.45L182.579 78.4318V78.4137L182.57 78.3956V78.3775V78.3593V78.3412V78.3231V78.3049V78.2868V78.2687V78.2505V78.2324V78.2143V78.1962V77.7248V75.1775C182.624 74.8965 182.869 74.679 183.159 74.6518H183.177C183.177 74.6518 183.195 74.6518 183.204 74.6518H187.673C188.018 74.6608 188.299 74.9237 188.326 75.2591V75.6942V78.8398L188.299 78.8851ZM132.522 72.2949C132.522 75.2138 132.504 78.1236 132.504 81.0335H135.776V74.5792H139.366C139.702 74.6064 139.983 74.8784 139.983 75.2138V81.0426H143.246L143.264 75.105C143.264 74.9146 143.237 74.7424 143.21 74.5792H146.827C147.162 74.6064 147.434 74.8784 147.443 75.2138V79.3383C147.443 79.3383 147.434 79.3927 147.443 79.4199V81.0426H150.715L150.725 76.1022C150.725 75.8393 150.725 75.5673 150.725 75.2591C150.725 75.2047 150.725 75.1594 150.725 75.1141C150.643 72.8388 148.776 72.3946 148.05 72.313C147.933 72.3039 147.824 72.2949 147.706 72.2949H146.283H145.322H144.95C144.08 72.2768 143.173 72.6212 142.639 73.3101C141.768 72.2858 140.309 72.2858 140.309 72.2858H137.753C136.864 72.2586 135.94 72.6212 135.414 73.3283C134.961 72.6756 134.118 72.2677 133.075 72.2677H132.522V72.2949ZM194.399 72.4309H192.895V74.7062H194.399V74.7334V74.7877V74.8421V74.8965V74.9237V75.0416V75.0688V75.3226V75.4857V75.522V75.667V75.7577V75.8483V75.9571V76.0478V76.084V76.1565V76.365V76.5826V76.6279V76.6732V76.6914V76.7639V76.8092V78.0421V78.2052C194.399 81.1695 197.364 81.1785 197.364 81.1785H198.85H199.213V78.9032H198.325C197.971 78.9032 197.681 78.6131 197.681 78.2505V77.5707V74.7152H199.231V72.4399H197.699V72.0048C197.699 71.4609 197.581 70.9442 197.346 70.5997C196.901 69.9289 196.049 69.5119 194.98 69.5119H194.427V72.4309H194.399ZM173.568 66.9556L173.532 81.1241H176.804C176.813 77.2353 176.822 73.3464 176.832 69.4485C176.832 68.9046 176.714 68.3879 176.478 68.0434C176.034 67.3726 175.182 66.9556 174.121 66.9556H173.568ZM167.64 66.9375C167.631 71.6603 167.613 76.3832 167.603 81.106H170.876L170.903 69.4304C170.903 68.8865 170.785 68.3698 170.55 68.0253C170.105 67.3545 169.253 66.9375 168.184 66.9375H167.631H167.64ZM157.079 77.2443C157.342 77.3441 157.596 77.3984 158.004 77.3984C158.439 77.3984 163.814 77.4166 163.814 77.4166C164.721 77.4166 165.464 76.6914 165.482 75.7849V75.1866C165.428 73.4371 164.141 72.3855 162.527 72.3493L155.81 72.3311C155.375 72.3493 153.009 72.585 152.909 75.1322V78.0964C152.9 80.7978 155.348 81.0426 155.792 81.0697H155.846H155.864C158.974 81.0697 162.074 81.0879 165.183 81.0969C165.111 79.7191 163.95 78.9214 162.745 78.8216L156.834 78.7944C156.472 78.7944 156.182 78.4953 156.182 78.1418C156.182 78.1418 156.182 76.4919 156.182 76.356C156.272 76.7004 156.526 77.0358 157.088 77.2534L157.079 77.2443ZM156.182 75.2591C156.182 74.9146 156.454 74.6246 156.807 74.6064H161.757C162.001 74.6246 162.201 74.824 162.21 75.0688V75.5492C162.21 75.803 162.001 76.0115 161.747 76.0115C159.889 76.0115 158.04 76.0024 156.182 75.9934V75.2591Z" fill="white"/>
                  <path d="M54.6936 26.3906C56.0443 25.3662 57.8119 25.2393 59.4527 25.2937V44.9102C59.4527 45.5992 59.7246 46.2519 60.2051 46.7504C60.6765 47.249 61.3291 47.5391 62.009 47.5753H65.5806C65.9341 47.5572 66.2605 47.4122 66.5052 47.1584C66.75 46.9045 66.8859 46.5691 66.8859 46.2247V42.1545C66.8678 41.5562 66.8859 40.9579 66.9675 40.3687C67.0038 40.3234 67.031 40.269 67.0491 40.2146C67.0672 40.1602 67.0672 40.0968 67.0582 40.0424C67.2213 39.1631 67.6021 38.3472 68.155 37.6492C68.708 36.9512 69.4241 36.3983 70.249 36.0447C71.0196 35.7093 71.8445 35.5371 72.6875 35.5552H80.0029C81.0091 35.4918 82.0153 35.5552 83.0034 35.7456C84.0912 36.0357 85.0702 36.643 85.8135 37.4861C86.5569 38.3291 87.0282 39.3806 87.1733 40.4956C87.273 41.529 87.1733 42.5715 87.2277 43.614C87.2821 44.6564 87.2277 45.7533 87.2277 46.823C87.1733 47.7204 86.8923 48.5816 86.43 49.3521C85.9676 50.1226 85.324 50.7662 84.5535 51.2285C83.6561 51.7815 82.6227 52.0806 81.5711 52.0897H76.4132C75.6336 52.1169 74.854 51.99 74.1288 51.6999C73.4036 51.4189 72.7419 50.9838 72.1799 50.4399C71.7538 50.9566 71.228 51.3645 70.6298 51.6546C70.0315 51.9446 69.3697 52.0897 68.708 52.0987H60.2141C58.6912 52.1078 57.2227 51.5639 56.0805 50.5668C55.2738 51.2557 54.3129 51.7362 53.2795 51.9628C52.6812 52.0806 52.0648 52.1259 51.4483 52.0987H46.6711C45.2117 52.0716 43.8157 51.5277 42.7188 50.5758C41.6219 51.5458 40.2169 52.0806 38.7574 52.0987H15.66C14.7263 52.0987 13.8107 51.8721 12.9858 51.4279C12.2697 51.0382 11.6442 50.5033 11.1547 49.8506C10.6652 49.198 10.3207 48.4546 10.1485 47.6569V47.521C10.1575 47.4666 10.1575 47.4031 10.1485 47.3487C10.1303 47.2943 10.1031 47.2399 10.0578 47.1946C10.0034 46.7142 9.9853 46.2337 10.0125 45.7624V35.528C11.6986 35.4283 13.3756 35.9088 14.7625 36.8696C15.6509 37.5495 16.231 38.5467 16.3942 39.6526V43.9675C16.3852 44.3392 16.4123 44.7199 16.4758 45.0915C16.5393 45.7624 16.8384 46.3969 17.337 46.8501C17.8355 47.3125 18.4791 47.5753 19.159 47.5844H35.9201C36.319 47.6025 36.7178 47.5572 37.0985 47.4484C37.6152 47.2762 38.0594 46.9499 38.3858 46.5147C38.7121 46.0796 38.9025 45.5539 38.9206 45.019V41.9279C38.839 40.8038 38.9297 39.6798 39.2016 38.5829C39.4192 37.9756 39.7727 37.4226 40.235 36.9603C40.6973 36.498 41.2503 36.1626 41.8667 35.9541C43.0089 35.5824 44.2055 35.4374 45.402 35.519V43.7137C45.4383 45.0372 45.2117 46.3516 44.7584 47.5935H50.3877C51.0767 47.5663 51.7294 47.2671 52.2098 46.7686C52.6902 46.27 52.9622 45.6082 52.9713 44.9193V30.3429C52.9713 29.9803 52.9984 29.6177 53.0528 29.2642C53.0982 29.2188 53.1254 29.1735 53.1435 29.1101C53.1616 29.0557 53.1616 28.9922 53.1435 28.9378C53.2069 28.4302 53.3792 27.9316 53.6511 27.4965C53.9231 27.0614 54.2766 26.6807 54.7117 26.3906H54.6936ZM73.1045 41.0939V47.5844H79.6041C79.7854 47.5844 79.9576 47.5572 80.1298 47.4847C80.3021 47.4122 80.4471 47.3215 80.574 47.1946C80.7009 47.0677 80.8006 46.9136 80.8731 46.7504C80.9457 46.5873 80.9729 46.406 80.9729 46.2247V41.0848C80.9729 40.9035 80.9457 40.7313 80.8731 40.5591C80.8097 40.3959 80.7009 40.2418 80.574 40.1149C80.4471 39.988 80.293 39.8883 80.1298 39.8158C79.9667 39.7523 79.7854 39.716 79.6041 39.716H74.4552C74.2739 39.716 74.1016 39.7523 73.9385 39.8158C73.7753 39.8883 73.6212 39.988 73.5033 40.1149C73.3764 40.2418 73.2767 40.3959 73.2133 40.5591C73.1498 40.7222 73.1136 40.9035 73.1136 41.0758L73.1045 41.0939Z" fill="white"/>
                  <path d="M24.8546 29.9067C24.9452 29.7888 25.0631 29.6982 25.199 29.6257C25.335 29.5531 25.48 29.5169 25.6251 29.5078C25.7883 29.5259 25.9514 29.5803 26.0874 29.6619C26.2324 29.7435 26.3593 29.8523 26.4591 29.9883C27.2749 30.8222 28.127 31.629 28.9247 32.472C29.7224 31.7378 30.4567 30.9491 31.2363 30.1877C31.5173 29.9157 31.7802 29.5803 32.1972 29.5169C32.3513 29.5078 32.5054 29.535 32.6413 29.5894C32.7864 29.6529 32.9042 29.7435 33.0039 29.8613C33.9467 30.8041 34.8895 31.7378 35.8231 32.6805C35.9047 32.7621 35.9772 32.8618 36.0226 32.9706C36.0679 33.0794 36.0951 33.1972 36.0951 33.3151C36.0951 33.4329 36.0679 33.5508 36.0226 33.6596C35.9772 33.7683 35.9047 33.868 35.8231 33.9496C34.8441 34.9286 33.8742 35.9077 32.8861 36.8776C32.8045 36.9592 32.7048 37.0226 32.596 37.068C32.4872 37.1133 32.3694 37.1405 32.2516 37.1405C32.1337 37.1405 32.0159 37.1133 31.9071 37.068C31.7983 37.0226 31.6986 36.9592 31.617 36.8776C30.7558 36.0164 29.8675 35.1643 29.0335 34.276C29.0335 34.2306 28.97 34.1581 28.9519 34.1128C28.9157 34.1581 28.8703 34.2035 28.8341 34.2488C28.0636 35.1281 27.148 35.9621 26.2959 36.8323C26.2143 36.9229 26.1055 36.9955 25.9967 37.0498C25.8789 37.0952 25.7611 37.1224 25.6341 37.1224C25.5072 37.1224 25.3894 37.0952 25.2716 37.0498C25.1537 37.0045 25.054 36.932 24.9724 36.8323C24.0115 35.8714 23.0506 34.9196 22.0898 33.9587C21.9266 33.7955 21.8359 33.587 21.8359 33.3604C21.8359 33.1338 21.9085 32.9162 22.0535 32.744C22.9781 31.7831 23.9299 30.8585 24.8546 29.9157V29.9067Z" fill="white"/>
                  <path d="M135.293 41.7442C135.293 41.4359 135.293 41.1277 135.239 40.8105C135.194 40.7107 135.139 40.602 135.194 40.5023C134.931 38.7527 133.589 37.2026 131.985 36.4865C131.731 36.3233 131.414 36.2236 131.16 36.1692C130.951 36.1239 130.688 36.1239 130.489 36.0695H130.28C130.181 36.0695 130.072 36.0242 129.873 36.0242H127.851C126.002 35.9698 124.089 36.0242 122.24 36.0242C121.261 36.0242 120.218 35.9245 119.239 36.1692C119.209 36.1692 119.176 36.1873 119.14 36.2236C117.852 36.5318 116.765 37.3567 115.994 38.4354C115.541 39.1697 115.169 40.0399 115.07 40.9646C114.97 41.9889 115.024 43.0314 115.024 44.0557C115.024 45.1435 114.97 46.2222 115.024 47.31C115.024 47.5185 115.069 47.7179 115.124 47.9264C115.378 49.4765 116.357 50.8725 117.698 51.6975C118.106 51.9513 118.578 52.1507 119.031 52.3139C119.548 52.4589 120.119 52.5677 120.681 52.5677H128.93V62.0587C130.534 62.1131 132.338 62.0587 133.671 60.9709C135.121 59.7381 135.221 58.188 135.321 58.0882C135.375 57.7347 135.375 57.3721 135.375 57.0004C135.375 57.0004 135.321 41.9889 135.275 41.7442H135.293ZM129.102 48.0262H126.464C125.277 48.0805 124.968 48.0262 123.781 48.0262H122.593C121.877 48.0805 121.206 47.4097 121.261 46.6936C121.261 44.9985 121.206 43.2852 121.261 41.5357C121.206 40.9102 121.714 40.2938 122.349 40.2484C122.448 40.194 122.494 40.194 122.602 40.194H127.815C128.286 40.1487 128.739 40.4569 128.948 40.9102C129.048 41.1277 129.111 41.3362 129.111 41.5357V48.0262H129.102Z" fill="white"/>
                  <path d="M177.89 10.0111V47.0051C177.89 47.3677 177.89 47.7303 177.836 48.0839C177.736 48.1836 177.628 49.7881 176.186 50.9756C174.845 52.0543 173.041 52.1087 171.445 52.0543V15.0149C171.445 14.6523 171.445 14.2897 171.5 13.9362C171.599 13.8818 171.708 12.2864 173.15 11.0989C174.491 10.0111 176.295 9.96578 177.89 10.0111Z" fill="#FBB042"/>
                  <path d="M165.445 25.014V47.1869C165.445 47.5495 165.445 47.9121 165.391 48.2656C165.291 48.3653 165.182 49.9698 163.741 51.1573C162.399 52.2361 160.595 52.2905 159 52.2361V30.0088C159 29.6462 159 29.2836 159.054 28.9301C159.154 28.8757 159.263 27.2803 160.704 26.0928C162.046 25.014 163.85 24.9597 165.445 25.014Z" fill="#F89521"/>
                  <path d="M155.445 35.005V46.7713C155.445 47.1339 155.445 47.4965 155.391 47.85C155.291 47.9497 155.182 49.5542 153.741 50.7417C152.399 51.8204 150.595 51.8748 149 51.8204V40.0088C149 39.6462 149 39.2836 149.054 38.9301C149.154 38.8757 149.263 37.2803 150.704 36.0928C152.046 35.014 153.85 34.9597 155.445 35.014V35.005Z" fill="#F26822"/>
                  <path d="M145.445 42.014V47.1811C145.445 47.5437 145.445 47.9063 145.391 48.2598C145.291 48.3595 145.182 49.964 143.741 51.1515C142.399 52.2302 140.595 52.2846 139 52.2302V47.0088C139 46.6462 139 46.2836 139.054 45.9301C139.154 45.8757 139.263 44.2803 140.704 43.0928C142.046 42.014 143.85 41.9597 145.445 42.014Z" fill="#EF4237"/>
                  <path d="M213.491 40.3971C213.391 39.4725 213.029 38.5932 212.566 37.868C211.796 36.7893 210.708 35.9644 209.421 35.6471C209.385 35.6108 209.351 35.5927 209.321 35.5927C208.342 35.3389 207.309 35.4386 206.33 35.4386C204.471 35.4386 202.568 35.3842 200.709 35.4386H198.697C198.489 35.4386 198.389 35.493 198.28 35.493H198.226C197.655 35.5474 197.093 35.6471 196.576 35.91C194.98 36.6352 193.639 38.1762 193.376 39.9348C193.43 40.0345 193.376 40.1433 193.322 40.243C193.222 40.8594 193.222 41.4305 193.222 42.0469V46.1171C193.222 46.8423 192.651 47.4587 191.935 47.4587C190.901 47.5131 192.043 47.5131 190.965 47.4587H189.677C188.952 47.4587 188.336 46.8423 188.39 46.1171C188.336 45.7545 188.336 45.3919 188.336 44.984V34.2601C186.74 34.2058 184.936 34.2601 183.595 35.3389C182.154 36.5264 182.045 38.1218 181.945 38.1762C181.891 38.5388 181.891 38.9014 181.891 39.2549V61.4822C183.486 61.5366 185.29 61.4822 186.632 60.4034C188.073 59.2159 188.182 57.6205 188.281 57.5117C188.336 57.1491 188.336 56.7865 188.336 56.433V52.0002H207.871C208.442 52.0002 209.004 51.9005 209.521 51.7464C209.983 51.5923 210.445 51.3838 210.862 51.13C212.204 50.3051 213.183 48.9091 213.437 47.368C213.491 47.1596 213.536 46.9601 213.536 46.7516C213.591 45.6729 213.536 44.5851 213.536 43.5064C213.536 42.4277 213.591 41.4396 213.482 40.4152L213.491 40.3971ZM207.3 46.1171C207.354 46.8423 206.683 47.5131 205.958 47.4587H204.771C203.583 47.4587 203.275 47.5131 202.087 47.4587H199.458V40.9591C199.404 40.2339 200.075 39.5631 200.746 39.6175H205.958C206.058 39.6175 206.112 39.6175 206.212 39.6719C206.828 39.7263 207.345 40.3427 207.291 40.9591C207.345 42.7087 207.291 44.4129 207.291 46.1171H207.3Z" fill="white"/>
                  <path d="M202.759 24.6785C203.095 24.3159 203.72 24.325 204.046 24.6966C204.998 25.6484 205.95 26.5912 206.902 27.5521C207.273 27.8784 207.292 28.513 206.929 28.8574C206.004 29.8002 205.062 30.7248 204.128 31.6585C203.901 31.9032 203.575 32.0845 203.24 32.012C202.922 31.9667 202.705 31.7129 202.487 31.4953C201.599 30.5979 200.701 29.7186 199.813 28.8121C199.813 28.8121 199.804 28.794 199.795 28.794C199.469 28.4314 199.532 27.8512 199.886 27.543C200.837 26.5912 201.789 25.6303 202.741 24.6876L202.759 24.6785Z" fill="white"/>
                  <path d="M94.096 47.1108C94.0779 47.5821 94.0779 48.0716 94.1504 48.543C94.2411 49.232 94.4495 49.8756 94.939 50.4285C95.4829 51.0359 96.1447 51.3078 96.5889 51.4347C96.9061 51.5345 97.1237 51.5526 97.1509 51.5798C97.2959 51.607 97.4228 51.6251 97.5679 51.6251H105.3C105.454 51.6251 106.107 51.5526 106.279 51.5254C106.433 51.4982 106.597 51.471 106.751 51.4257C106.85 51.3985 106.95 51.3713 107.041 51.335C107.213 51.2897 107.385 51.2172 107.539 51.1447C107.594 51.1265 107.657 51.0993 107.712 51.0721C107.911 50.9724 108.101 50.8727 108.283 50.7549C108.473 50.637 108.654 50.5101 108.827 50.3651C108.981 50.2472 109.126 50.1203 109.271 49.9753C109.769 49.4858 110.177 48.8966 110.476 48.262C110.567 48.0626 110.649 47.8632 110.703 47.6456C110.748 47.5187 110.794 47.3827 110.803 47.2467C110.848 47.0745 110.893 46.9023 110.902 46.73C110.921 46.7028 110.948 46.4037 110.948 46.3312V46.0139C111.002 45.1799 110.966 44.346 110.975 43.5301C110.957 42.5511 110.993 41.5902 110.948 40.6112V40.2939C110.948 40.2214 110.921 39.9495 110.902 39.8951C110.884 39.7228 110.848 39.5506 110.803 39.3784C110.785 39.2333 110.748 39.1064 110.703 38.9795C110.649 38.7619 110.558 38.5625 110.476 38.3631C110.277 37.9461 110.041 37.5472 109.742 37.1847C109.624 37.0305 109.497 36.8855 109.37 36.7495C109.343 36.7042 109.298 36.677 109.271 36.6498C109.126 36.5048 108.981 36.3779 108.827 36.26C108.654 36.115 108.464 35.9881 108.283 35.8702C108.092 35.7524 107.911 35.6527 107.712 35.553C107.657 35.5258 107.594 35.4986 107.539 35.4804C107.367 35.4079 107.213 35.3354 107.041 35.2901C106.95 35.2629 106.85 35.2357 106.751 35.1994C106.597 35.145 106.433 35.1178 106.279 35.0997C106.107 35.0725 105.953 35.0453 105.79 35.0453H105.772C105.445 35 105.128 35 104.793 35H97.5679C97.4228 35 97.2959 35.0272 97.1509 35.0453C97.1237 35.0725 96.9061 35.0906 96.5889 35.1904C96.1447 35.3173 95.4829 35.5892 94.939 36.1966C94.4495 36.7314 94.232 37.3931 94.1504 38.0821C94.0779 38.5535 94.0779 39.0611 94.096 39.5325H103.378C104.113 39.4871 104.784 40.1489 104.747 40.8831C104.747 41.6899 104.765 42.5058 104.747 43.3126C104.747 43.5845 104.765 43.8474 104.747 44.1193V45.742C104.793 46.4762 104.113 47.138 103.378 47.0926C101.928 47.1108 100.46 47.0926 99.0092 47.1108H94.096Z" fill="white"/>
                </g>
                <defs>
                  <filter id="nav-logo-shadow" x="8" y="10" width="207.559" height="75.1785" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_54_13154"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_54_13154" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </Link>

            {/* Center nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega ? setActive(item.label) : setActive(null)}
                  onMouseLeave={() => setActive(null)}
                >
                  {item.mega ? (
                    <button
                      onClick={() => setActive(active === item.label ? null : item.label)}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-xl text-[15px] font-semibold transition-colors duration-150",
                        loc.pathname === item.href ? "text-[#F4512A]" : "text-white/75 hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={cn("transition-transform duration-200 opacity-60", active === item.label && "rotate-180")}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-xl text-[15px] font-semibold transition-colors duration-150",
                        loc.pathname === item.href ? "text-[#F4512A]" : "text-white/75 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.mega && active === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_16px_48px_rgba(27,30,34,0.12)] border border-[#E6E6E3] overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {item.mega.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className="flex flex-col p-3 rounded-xl hover:bg-[#F7F7F5] group transition-colors duration-100"
                            >
                              <span className="text-[#1B1E22] font-semibold text-sm group-hover:text-[#F4512A] transition-colors">
                                {sub.label}
                              </span>
                              {sub.desc && (
                                <span className="text-[#6F7378] text-xs mt-0.5">{sub.desc}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-[15px] px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                ورود / ثبت‌نام
              </button>
            </div>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMob(true)}
              aria-label="باز کردن منو"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1B1E22] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#30343A]">
              <Link to="/" onClick={() => setMob(false)} className="flex items-center flex-shrink-0">
                <img src={farasoodLogo} alt="فراسود ملت" className="h-10 w-auto object-contain" />
              </Link>
              <button onClick={() => setMob(false)} className="text-white p-2">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col flex-1 overflow-y-auto p-5 gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.mega ? (
                    <details className="border-b border-[#30343A] group">
                      <summary className="text-white text-xl font-bold py-3.5 cursor-pointer list-none flex items-center justify-between">
                        {item.label}
                        <ChevronDown size={18} className="transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="pb-4 flex flex-col gap-1 pr-2">
                        {item.mega.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={() => setMob(false)}
                            className="block text-white/70 hover:text-white text-base font-semibold py-2 pr-3 border-r-2 border-[#F4512A]/30 hover:border-[#F4512A] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-white text-xl font-bold py-3.5 border-b border-[#30343A]"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="p-5">
              <button
                onClick={() => { setMob(false); setLoginOpen(true); }}
                className="w-full bg-[#F4512A] hover:bg-[#D94321] text-white font-bold text-[15px] px-5 py-3 rounded-full transition-colors duration-200"
              >
                ورود / ثبت‌نام
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      title: "فراسود",
      links: [
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
        { label: "پشتیبانی", href: "/contact" },
      ],
    },
    {
      title: "لینک های مرتبط",
      links: [
        { label: "بانک ملت", href: "#" },
        { label: "تامین مالی جمعی (ملت کراد)", href: "#" },
        { label: "تأمین سرمایه بانک ملت", href: "#" },
      ],
    },
    {
      title: "همراهان ما",
      logos: [
        { src: relatedLogo1, alt: "لوگو همراه اول", href: "#" },
        { src: relatedLogo2, alt: "لوگو همراه دوم", href: "#" },
      ],
      links: [],
    },
  ];

  return (
    <footer className="bg-[#1B1E22] text-white pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#30343A]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <Link to="/">
                <svg width="120" height="49" viewBox="0 0 224 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#footer-logo-shadow)">
                    <path d="M33.5058 67.2638V67.6174C33.4514 68.1522 33.252 68.6054 32.9166 68.959C32.563 69.3034 32.146 69.4848 31.6656 69.4848H31.584C31.031 69.5391 30.7591 69.8201 30.7591 70.3368V72.313H32.0735V74.6427H30.7591V81.0244H27.3144V74.6427H26V72.313H27.3144V69.7386C27.3144 69.7386 27.3325 69.5754 27.3597 69.3941C27.5229 68.4513 28.239 67.7443 29.49 67.2548C29.8345 67.1732 30.1971 67.1279 30.605 67.1279H33.3607C33.3607 67.1279 33.4333 67.1369 33.4604 67.1641C33.4876 67.1913 33.4967 67.2185 33.4967 67.2638H33.5058ZM45.7525 80.9882H45.1995C44.4381 80.9156 43.8035 80.6256 43.305 80.1361C43.2053 80.0363 43.1237 79.9366 43.0421 79.8369C42.9424 80.0363 42.8155 80.2176 42.6523 80.3808C42.3078 80.7253 41.8908 80.9156 41.4104 80.97C41.3107 80.97 41.22 80.9791 41.1385 80.9791H36.4337C35.6723 80.9066 35.0377 80.6165 34.5392 80.127C34.0497 79.6284 33.7596 79.0392 33.6871 78.3684C33.6871 78.2234 33.678 78.0964 33.678 77.9786V75.3679C33.678 75.2501 33.678 75.1231 33.6871 74.9781C33.7596 74.3073 34.0497 73.7181 34.5392 73.2195C35.0377 72.73 35.6723 72.4399 36.4337 72.3674H43.1237C43.8851 72.4399 44.5197 72.73 45.0182 73.2195C45.5078 73.7181 45.7978 74.3073 45.8703 74.9781C45.8703 75.1231 45.8794 75.2501 45.8794 75.3679V80.8431C45.8794 80.8431 45.8704 80.9156 45.8432 80.9428C45.816 80.97 45.7888 80.9791 45.7434 80.9791L45.7525 80.9882ZM42.4347 78.5588V75.3951C42.4347 75.2319 42.3803 75.0959 42.2625 74.9872C42.1447 74.8693 42.0087 74.8149 41.8546 74.8149H37.7119C37.5487 74.8149 37.4128 74.8693 37.304 74.9872C37.1861 75.105 37.1317 75.241 37.1317 75.3951V77.9877C37.1317 78.1508 37.1861 78.2868 37.304 78.3956C37.4218 78.5134 37.5578 78.5678 37.7119 78.5678H42.4347V78.5588ZM48.0459 72.3674H48.5989C49.3604 72.4399 49.9949 72.73 50.4935 73.2195C50.6204 73.3464 50.7292 73.4733 50.8198 73.5821C51.1643 73.0926 51.7172 72.73 52.4787 72.5034C52.8232 72.4127 53.222 72.3674 53.6934 72.3674V74.5974C53.1404 74.7062 52.6509 74.9781 52.2249 75.4042C51.69 75.939 51.4 76.5826 51.3546 77.3259V81.0063H47.9009V72.5124C47.9009 72.5124 47.91 72.4399 47.9372 72.4127C47.9643 72.3855 47.9915 72.3765 48.0369 72.3765L48.0459 72.3674ZM67.7894 80.9882H67.2364C66.475 80.9156 65.8404 80.6256 65.3418 80.1361C65.2421 80.0363 65.1605 79.9366 65.079 79.8369C64.9792 80.0363 64.8523 80.2176 64.6892 80.3808C64.3447 80.7253 63.9277 80.9156 63.4473 80.97C63.3476 80.97 63.2569 80.9791 63.1753 80.9791H58.4706C57.7092 80.9066 57.0746 80.6165 56.576 80.127C56.0865 79.6284 55.7965 79.0392 55.7239 78.3684C55.7239 78.2234 55.7149 78.0964 55.7149 77.9786V75.3679C55.7149 75.2501 55.7149 75.1231 55.7239 74.9781C55.7965 74.3073 56.0865 73.7181 56.576 73.2195C57.0746 72.73 57.7092 72.4399 58.4706 72.3674H65.1605C65.922 72.4399 66.5565 72.73 67.0551 73.2195C67.5446 73.7181 67.8347 74.3073 67.9072 74.9781C67.9072 75.1231 67.9163 75.2501 67.9163 75.3679V80.8431C67.9163 80.8431 67.9072 80.9156 67.88 80.9428C67.8528 80.97 67.8256 80.9791 67.7803 80.9791L67.7894 80.9882ZM64.4716 78.5588V75.3951C64.4716 75.2319 64.4172 75.0959 64.2994 74.9872C64.1815 74.8693 64.0456 74.8149 63.8915 74.8149H59.7488C59.5856 74.8149 59.4496 74.8693 59.3409 74.9872C59.223 75.105 59.1686 75.241 59.1686 75.3951V77.9877C59.1686 78.1508 59.223 78.2868 59.3409 78.3956C59.4587 78.5134 59.5947 78.5678 59.7488 78.5678H64.4716V78.5588ZM70.5361 80.8703V80.7434C70.5904 80.2176 70.7899 79.7735 71.1343 79.429C71.4788 79.0845 71.8958 78.8942 72.3762 78.8398C72.476 78.8398 72.6391 78.8216 72.8748 78.8035H77.8787C78.0418 78.8035 78.1778 78.7491 78.2866 78.6494C78.3954 78.5497 78.4588 78.4137 78.4588 78.2596V78.1146C78.4588 77.8245 78.3228 77.6795 78.06 77.6795H72.6663L72.1587 77.6613C71.7417 77.5707 71.3972 77.3894 71.1253 77.1174C70.7808 76.773 70.5904 76.3832 70.5451 75.9209C70.5451 75.8755 70.5451 75.7939 70.5361 75.6852V75.0144L70.5814 74.7424C70.6992 74.1713 70.9712 73.6728 71.3972 73.2286C71.8595 72.7753 72.4397 72.5034 73.1377 72.4127L73.3915 72.3946H81.7856C81.7856 72.3946 81.8582 72.4037 81.8854 72.4309C81.9126 72.4581 81.9216 72.4943 81.9216 72.5306V72.6575C81.8672 73.1832 81.6678 73.6274 81.3233 73.9719C80.9789 74.3164 80.5619 74.5067 80.0814 74.5611C79.9817 74.5792 79.8911 74.5883 79.8095 74.5974H74.579C74.4159 74.5974 74.2799 74.6518 74.1711 74.7515C74.0532 74.8512 73.9989 74.9872 73.9989 75.1413V75.2863C73.9989 75.5764 74.1348 75.7214 74.3977 75.7214H79.882C80.1177 75.7396 80.2355 75.7486 80.2446 75.7577C80.6797 75.8302 81.0514 76.0115 81.3324 76.2925C81.6769 76.637 81.8672 77.0268 81.9126 77.4891C81.9126 77.5253 81.9126 77.6069 81.9216 77.7248V78.2777L81.9035 78.5044L81.8854 78.6675C81.7675 79.2386 81.4956 79.7372 81.0695 80.1814C80.6072 80.6346 80.0271 80.9066 79.329 80.9972L79.1931 81.0154H70.6902C70.6902 81.0154 70.6176 81.0063 70.5904 80.9791C70.5633 80.9519 70.5542 80.9247 70.5542 80.8794L70.5361 80.8703ZM83.4536 75.3498C83.4536 75.2319 83.4536 75.105 83.4627 74.96C83.5352 74.2892 83.8253 73.6999 84.3148 73.2014C84.8133 72.7119 85.4479 72.4218 86.2093 72.3493H92.863C93.6245 72.4218 94.259 72.7119 94.7576 73.2014C95.2471 73.6999 95.5372 74.2892 95.6097 74.96C95.6097 75.0234 95.6097 75.0778 95.6188 75.1322V78.3593H95.6097V78.3956C95.5372 79.0664 95.2471 79.6556 94.7576 80.1542C94.259 80.6437 93.6245 80.9338 92.863 81.0063H86.2093C85.4479 80.9338 84.8133 80.6437 84.3148 80.1542C83.8253 79.6556 83.5352 79.0664 83.4627 78.3956C83.4627 78.2505 83.4536 78.1236 83.4536 78.0058V75.3498ZM86.9073 77.9967C86.9073 78.1599 86.9617 78.2959 87.0796 78.4046C87.1974 78.5225 87.3334 78.5769 87.4875 78.5769H91.6121C91.7752 78.5769 91.9112 78.5225 92.02 78.4046C92.1378 78.2959 92.1922 78.1508 92.1922 77.9967V75.3588C92.1922 75.1957 92.1378 75.0597 92.02 74.9509C91.9021 74.8421 91.7662 74.7787 91.6121 74.7787H87.4875C87.3243 74.7787 87.1884 74.8331 87.0796 74.9509C86.9708 75.0688 86.9073 75.2047 86.9073 75.3588V77.9967ZM97.1689 75.3498C97.1689 75.2319 97.1689 75.105 97.1779 74.96C97.2504 74.2892 97.5405 73.6999 98.03 73.2014C98.5286 72.7119 99.1631 72.4218 99.9246 72.3493H106.578C107.34 72.4218 107.974 72.7119 108.473 73.2014C108.962 73.6999 109.252 74.2892 109.325 74.96C109.325 75.0234 109.325 75.0778 109.334 75.1322V78.3593H109.325V78.3956C109.252 79.0664 108.962 79.6556 108.473 80.1542C107.974 80.6437 107.34 80.9338 106.578 81.0063H99.9246C99.1631 80.9338 98.5286 80.6437 98.03 80.1542C97.5405 79.6556 97.2504 79.0664 97.1779 78.3956C97.1779 78.2505 97.1689 78.1236 97.1689 78.0058V75.3498ZM100.623 77.9967C100.623 78.1599 100.677 78.2959 100.795 78.4046C100.913 78.5225 101.049 78.5769 101.203 78.5769H105.327C105.491 78.5769 105.626 78.5225 105.735 78.4046C105.853 78.2959 105.908 78.1508 105.908 77.9967V75.3588C105.908 75.1957 105.853 75.0597 105.735 74.9509C105.617 74.8421 105.481 74.7787 105.327 74.7787H101.203C101.04 74.7787 100.904 74.8331 100.795 74.9509C100.686 75.0688 100.623 75.2047 100.623 75.3588V77.9967ZM119.994 67.146H120.547C121.309 67.2185 121.943 67.5086 122.442 67.9981C122.931 68.4967 123.221 69.0859 123.294 69.7567C123.294 69.9017 123.303 70.0286 123.303 70.1465V78.0149C123.303 78.1327 123.303 78.2596 123.294 78.4046C123.221 79.0755 122.931 79.6647 122.442 80.1633C121.943 80.6528 121.309 80.9428 120.547 81.0154H113.894C113.132 80.9428 112.498 80.6528 111.999 80.1633C111.51 79.6647 111.22 79.0755 111.147 78.4046V78.3865H111.138V75.1503C111.138 75.0959 111.147 75.0416 111.147 74.9781C111.22 74.3073 111.51 73.7181 111.999 73.2195C112.498 72.73 113.132 72.4399 113.894 72.3674H117.728C118.499 72.3674 119.206 72.6122 119.849 73.0926V67.291C119.849 67.291 119.858 67.2185 119.886 67.1913C119.913 67.1641 119.94 67.1551 119.985 67.1551L119.994 67.146ZM119.686 78.3956C119.804 78.2777 119.858 78.1418 119.858 77.9877V74.8421H115.154C114.991 74.8421 114.855 74.8965 114.746 75.0144C114.637 75.1322 114.574 75.2682 114.574 75.4223V77.9877C114.574 78.1508 114.628 78.2868 114.746 78.3956C114.864 78.5044 115 78.5678 115.154 78.5678H119.278C119.441 78.5678 119.577 78.5134 119.686 78.3956ZM191.58 76.8908V76.1656C191.58 75.9299 191.58 75.6761 191.58 75.4042C191.58 72.4399 188.616 72.4309 188.616 72.4309H188.344H187.138H183.712L182.225 72.4218H182.116C181.582 72.458 179.261 72.7572 179.252 75.377C179.252 76.1475 179.252 76.773 179.27 77.2897V78.1871C179.27 80.8884 181.718 81.1332 182.162 81.1604H182.216H182.234H183.721H186.323C186.54 81.1604 187.972 81.1695 188.725 80.1633C189.187 80.7797 190.012 81.1604 191.027 81.1695H191.58V77.1446V76.8817V76.8908ZM188.299 78.8851H186.286H183.195C182.969 78.8851 182.769 78.7673 182.651 78.586V78.5678C182.651 78.5678 182.633 78.5497 182.624 78.5406C182.624 78.5316 182.615 78.5225 182.606 78.5134C182.606 78.4953 182.588 78.4862 182.588 78.4681V78.45L182.579 78.4318V78.4137L182.57 78.3956V78.3775V78.3593V78.3412V78.3231V78.3049V78.2868V78.2687V78.2505V78.2324V78.2143V78.1962V77.7248V75.1775C182.624 74.8965 182.869 74.679 183.159 74.6518H183.177C183.177 74.6518 183.195 74.6518 183.204 74.6518H187.673C188.018 74.6608 188.299 74.9237 188.326 75.2591V75.6942V78.8398L188.299 78.8851ZM132.522 72.2949C132.522 75.2138 132.504 78.1236 132.504 81.0335H135.776V74.5792H139.366C139.702 74.6064 139.983 74.8784 139.983 75.2138V81.0426H143.246L143.264 75.105C143.264 74.9146 143.237 74.7424 143.21 74.5792H146.827C147.162 74.6064 147.434 74.8784 147.443 75.2138V79.3383C147.443 79.3383 147.434 79.3927 147.443 79.4199V81.0426H150.715L150.725 76.1022C150.725 75.8393 150.725 75.5673 150.725 75.2591C150.725 75.2047 150.725 75.1594 150.725 75.1141C150.643 72.8388 148.776 72.3946 148.05 72.313C147.933 72.3039 147.824 72.2949 147.706 72.2949H146.283H145.322H144.95C144.08 72.2768 143.173 72.6212 142.639 73.3101C141.768 72.2858 140.309 72.2858 140.309 72.2858H137.753C136.864 72.2586 135.94 72.6212 135.414 73.3283C134.961 72.6756 134.118 72.2677 133.075 72.2677H132.522V72.2949ZM194.399 72.4309H192.895V74.7062H194.399V74.7334V74.7877V74.8421V74.8965V74.9237V75.0416V75.0688V75.3226V75.4857V75.522V75.667V75.7577V75.8483V75.9571V76.0478V76.084V76.1565V76.365V76.5826V76.6279V76.6732V76.6914V76.7639V76.8092V78.0421V78.2052C194.399 81.1695 197.364 81.1785 197.364 81.1785H198.85H199.213V78.9032H198.325C197.971 78.9032 197.681 78.6131 197.681 78.2505V77.5707V74.7152H199.231V72.4399H197.699V72.0048C197.699 71.4609 197.581 70.9442 197.346 70.5997C196.901 69.9289 196.049 69.5119 194.98 69.5119H194.427V72.4309H194.399ZM173.568 66.9556L173.532 81.1241H176.804C176.813 77.2353 176.822 73.3464 176.832 69.4485C176.832 68.9046 176.714 68.3879 176.478 68.0434C176.034 67.3726 175.182 66.9556 174.121 66.9556H173.568ZM167.64 66.9375C167.631 71.6603 167.613 76.3832 167.603 81.106H170.876L170.903 69.4304C170.903 68.8865 170.785 68.3698 170.55 68.0253C170.105 67.3545 169.253 66.9375 168.184 66.9375H167.631H167.64ZM157.079 77.2443C157.342 77.3441 157.596 77.3984 158.004 77.3984C158.439 77.3984 163.814 77.4166 163.814 77.4166C164.721 77.4166 165.464 76.6914 165.482 75.7849V75.1866C165.428 73.4371 164.141 72.3855 162.527 72.3493L155.81 72.3311C155.375 72.3493 153.009 72.585 152.909 75.1322V78.0964C152.9 80.7978 155.348 81.0426 155.792 81.0697H155.846H155.864C158.974 81.0697 162.074 81.0879 165.183 81.0969C165.111 79.7191 163.95 78.9214 162.745 78.8216L156.834 78.7944C156.472 78.7944 156.182 78.4953 156.182 78.1418C156.182 78.1418 156.182 76.4919 156.182 76.356C156.272 76.7004 156.526 77.0358 157.088 77.2534L157.079 77.2443ZM156.182 75.2591C156.182 74.9146 156.454 74.6246 156.807 74.6064H161.757C162.001 74.6246 162.201 74.824 162.21 75.0688V75.5492C162.21 75.803 162.001 76.0115 161.747 76.0115C159.889 76.0115 158.04 76.0024 156.182 75.9934V75.2591Z" fill="white"/>
                    <path d="M54.6936 26.3906C56.0443 25.3662 57.8119 25.2393 59.4527 25.2937V44.9102C59.4527 45.5992 59.7246 46.2519 60.2051 46.7504C60.6765 47.249 61.3291 47.5391 62.009 47.5753H65.5806C65.9341 47.5572 66.2605 47.4122 66.5052 47.1584C66.75 46.9045 66.8859 46.5691 66.8859 46.2247V42.1545C66.8678 41.5562 66.8859 40.9579 66.9675 40.3687C67.0038 40.3234 67.031 40.269 67.0491 40.2146C67.0672 40.1602 67.0672 40.0968 67.0582 40.0424C67.2213 39.1631 67.6021 38.3472 68.155 37.6492C68.708 36.9512 69.4241 36.3983 70.249 36.0447C71.0196 35.7093 71.8445 35.5371 72.6875 35.5552H80.0029C81.0091 35.4918 82.0153 35.5552 83.0034 35.7456C84.0912 36.0357 85.0702 36.643 85.8135 37.4861C86.5569 38.3291 87.0282 39.3806 87.1733 40.4956C87.273 41.529 87.1733 42.5715 87.2277 43.614C87.2821 44.6564 87.2277 45.7533 87.2277 46.823C87.1733 47.7204 86.8923 48.5816 86.43 49.3521C85.9676 50.1226 85.324 50.7662 84.5535 51.2285C83.6561 51.7815 82.6227 52.0806 81.5711 52.0897H76.4132C75.6336 52.1169 74.854 51.99 74.1288 51.6999C73.4036 51.4189 72.7419 50.9838 72.1799 50.4399C71.7538 50.9566 71.228 51.3645 70.6298 51.6546C70.0315 51.9446 69.3697 52.0897 68.708 52.0987H60.2141C58.6912 52.1078 57.2227 51.5639 56.0805 50.5668C55.2738 51.2557 54.3129 51.7362 53.2795 51.9628C52.6812 52.0806 52.0648 52.1259 51.4483 52.0987H46.6711C45.2117 52.0716 43.8157 51.5277 42.7188 50.5758C41.6219 51.5458 40.2169 52.0806 38.7574 52.0987H15.66C14.7263 52.0987 13.8107 51.8721 12.9858 51.4279C12.2697 51.0382 11.6442 50.5033 11.1547 49.8506C10.6652 49.198 10.3207 48.4546 10.1485 47.6569V47.521C10.1575 47.4666 10.1575 47.4031 10.1485 47.3487C10.1303 47.2943 10.1031 47.2399 10.0578 47.1946C10.0034 46.7142 9.9853 46.2337 10.0125 45.7624V35.528C11.6986 35.4283 13.3756 35.9088 14.7625 36.8696C15.6509 37.5495 16.231 38.5467 16.3942 39.6526V43.9675C16.3852 44.3392 16.4123 44.7199 16.4758 45.0915C16.5393 45.7624 16.8384 46.3969 17.337 46.8501C17.8355 47.3125 18.4791 47.5753 19.159 47.5844H35.9201C36.319 47.6025 36.7178 47.5572 37.0985 47.4484C37.6152 47.2762 38.0594 46.9499 38.3858 46.5147C38.7121 46.0796 38.9025 45.5539 38.9206 45.019V41.9279C38.839 40.8038 38.9297 39.6798 39.2016 38.5829C39.4192 37.9756 39.7727 37.4226 40.235 36.9603C40.6973 36.498 41.2503 36.1626 41.8667 35.9541C43.0089 35.5824 44.2055 35.4374 45.402 35.519V43.7137C45.4383 45.0372 45.2117 46.3516 44.7584 47.5935H50.3877C51.0767 47.5663 51.7294 47.2671 52.2098 46.7686C52.6902 46.27 52.9622 45.6082 52.9713 44.9193V30.3429C52.9713 29.9803 52.9984 29.6177 53.0528 29.2642C53.0982 29.2188 53.1254 29.1735 53.1435 29.1101C53.1616 29.0557 53.1616 28.9922 53.1435 28.9378C53.2069 28.4302 53.3792 27.9316 53.6511 27.4965C53.9231 27.0614 54.2766 26.6807 54.7117 26.3906H54.6936ZM73.1045 41.0939V47.5844H79.6041C79.7854 47.5844 79.9576 47.5572 80.1298 47.4847C80.3021 47.4122 80.4471 47.3215 80.574 47.1946C80.7009 47.0677 80.8006 46.9136 80.8731 46.7504C80.9457 46.5873 80.9729 46.406 80.9729 46.2247V41.0848C80.9729 40.9035 80.9457 40.7313 80.8731 40.5591C80.8097 40.3959 80.7009 40.2418 80.574 40.1149C80.4471 39.988 80.293 39.8883 80.1298 39.8158C79.9667 39.7523 79.7854 39.716 79.6041 39.716H74.4552C74.2739 39.716 74.1016 39.7523 73.9385 39.8158C73.7753 39.8883 73.6212 39.988 73.5033 40.1149C73.3764 40.2418 73.2767 40.3959 73.2133 40.5591C73.1498 40.7222 73.1136 40.9035 73.1136 41.0758L73.1045 41.0939Z" fill="white"/>
                    <path d="M24.8546 29.9067C24.9452 29.7888 25.0631 29.6982 25.199 29.6257C25.335 29.5531 25.48 29.5169 25.6251 29.5078C25.7883 29.5259 25.9514 29.5803 26.0874 29.6619C26.2324 29.7435 26.3593 29.8523 26.4591 29.9883C27.2749 30.8222 28.127 31.629 28.9247 32.472C29.7224 31.7378 30.4567 30.9491 31.2363 30.1877C31.5173 29.9157 31.7802 29.5803 32.1972 29.5169C32.3513 29.5078 32.5054 29.535 32.6413 29.5894C32.7864 29.6529 32.9042 29.7435 33.0039 29.8613C33.9467 30.8041 34.8895 31.7378 35.8231 32.6805C35.9047 32.7621 35.9772 32.8618 36.0226 32.9706C36.0679 33.0794 36.0951 33.1972 36.0951 33.3151C36.0951 33.4329 36.0679 33.5508 36.0226 33.6596C35.9772 33.7683 35.9047 33.868 35.8231 33.9496C34.8441 34.9286 33.8742 35.9077 32.8861 36.8776C32.8045 36.9592 32.7048 37.0226 32.596 37.068C32.4872 37.1133 32.3694 37.1405 32.2516 37.1405C32.1337 37.1405 32.0159 37.1133 31.9071 37.068C31.7983 37.0226 31.6986 36.9592 31.617 36.8776C30.7558 36.0164 29.8675 35.1643 29.0335 34.276C29.0335 34.2306 28.97 34.1581 28.9519 34.1128C28.9157 34.1581 28.8703 34.2035 28.8341 34.2488C28.0636 35.1281 27.148 35.9621 26.2959 36.8323C26.2143 36.9229 26.1055 36.9955 25.9967 37.0498C25.8789 37.0952 25.7611 37.1224 25.6341 37.1224C25.5072 37.1224 25.3894 37.0952 25.2716 37.0498C25.1537 37.0045 25.054 36.932 24.9724 36.8323C24.0115 35.8714 23.0506 34.9196 22.0898 33.9587C21.9266 33.7955 21.8359 33.587 21.8359 33.3604C21.8359 33.1338 21.9085 32.9162 22.0535 32.744C22.9781 31.7831 23.9299 30.8585 24.8546 29.9157V29.9067Z" fill="white"/>
                    <path d="M135.293 41.7442C135.293 41.4359 135.293 41.1277 135.239 40.8105C135.194 40.7107 135.139 40.602 135.194 40.5023C134.931 38.7527 133.589 37.2026 131.985 36.4865C131.731 36.3233 131.414 36.2236 131.16 36.1692C130.951 36.1239 130.688 36.1239 130.489 36.0695H130.28C130.181 36.0695 130.072 36.0242 129.873 36.0242H127.851C126.002 35.9698 124.089 36.0242 122.24 36.0242C121.261 36.0242 120.218 35.9245 119.239 36.1692C119.209 36.1692 119.176 36.1873 119.14 36.2236C117.852 36.5318 116.765 37.3567 115.994 38.4354C115.541 39.1697 115.169 40.0399 115.07 40.9646C114.97 41.9889 115.024 43.0314 115.024 44.0557C115.024 45.1435 114.97 46.2222 115.024 47.31C115.024 47.5185 115.069 47.7179 115.124 47.9264C115.378 49.4765 116.357 50.8725 117.698 51.6975C118.106 51.9513 118.578 52.1507 119.031 52.3139C119.548 52.4589 120.119 52.5677 120.681 52.5677H128.93V62.0587C130.534 62.1131 132.338 62.0587 133.671 60.9709C135.121 59.7381 135.221 58.188 135.321 58.0882C135.375 57.7347 135.375 57.3721 135.375 57.0004C135.375 57.0004 135.321 41.9889 135.275 41.7442H135.293ZM129.102 48.0262H126.464C125.277 48.0805 124.968 48.0262 123.781 48.0262H122.593C121.877 48.0805 121.206 47.4097 121.261 46.6936C121.261 44.9985 121.206 43.2852 121.261 41.5357C121.206 40.9102 121.714 40.2938 122.349 40.2484C122.448 40.194 122.494 40.194 122.602 40.194H127.815C128.286 40.1487 128.739 40.4569 128.948 40.9102C129.048 41.1277 129.111 41.3362 129.111 41.5357V48.0262H129.102Z" fill="white"/>
                    <path d="M177.89 10.0111V47.0051C177.89 47.3677 177.89 47.7303 177.836 48.0839C177.736 48.1836 177.628 49.7881 176.186 50.9756C174.845 52.0543 173.041 52.1087 171.445 52.0543V15.0149C171.445 14.6523 171.445 14.2897 171.5 13.9362C171.599 13.8818 171.708 12.2864 173.15 11.0989C174.491 10.0111 176.295 9.96578 177.89 10.0111Z" fill="#FBB042"/>
                    <path d="M165.445 25.014V47.1869C165.445 47.5495 165.445 47.9121 165.391 48.2656C165.291 48.3653 165.182 49.9698 163.741 51.1573C162.399 52.2361 160.595 52.2905 159 52.2361V30.0088C159 29.6462 159 29.2836 159.054 28.9301C159.154 28.8757 159.263 27.2803 160.704 26.0928C162.046 25.014 163.85 24.9597 165.445 25.014Z" fill="#F89521"/>
                    <path d="M155.445 35.005V46.7713C155.445 47.1339 155.445 47.4965 155.391 47.85C155.291 47.9497 155.182 49.5542 153.741 50.7417C152.399 51.8204 150.595 51.8748 149 51.8204V40.0088C149 39.6462 149 39.2836 149.054 38.9301C149.154 38.8757 149.263 37.2803 150.704 36.0928C152.046 35.014 153.85 34.9597 155.445 35.014V35.005Z" fill="#F26822"/>
                    <path d="M145.445 42.014V47.1811C145.445 47.5437 145.445 47.9063 145.391 48.2598C145.291 48.3595 145.182 49.964 143.741 51.1515C142.399 52.2302 140.595 52.2846 139 52.2302V47.0088C139 46.6462 139 46.2836 139.054 45.9301C139.154 45.8757 139.263 44.2803 140.704 43.0928C142.046 42.014 143.85 41.9597 145.445 42.014Z" fill="#EF4237"/>
                    <path d="M213.491 40.3971C213.391 39.4725 213.029 38.5932 212.566 37.868C211.796 36.7893 210.708 35.9644 209.421 35.6471C209.385 35.6108 209.351 35.5927 209.321 35.5927C208.342 35.3389 207.309 35.4386 206.33 35.4386C204.471 35.4386 202.568 35.3842 200.709 35.4386H198.697C198.489 35.4386 198.389 35.493 198.28 35.493H198.226C197.655 35.5474 197.093 35.6471 196.576 35.91C194.98 36.6352 193.639 38.1762 193.376 39.9348C193.43 40.0345 193.376 40.1433 193.322 40.243C193.222 40.8594 193.222 41.4305 193.222 42.0469V46.1171C193.222 46.8423 192.651 47.4587 191.935 47.4587C190.901 47.5131 192.043 47.5131 190.965 47.4587H189.677C188.952 47.4587 188.336 46.8423 188.39 46.1171C188.336 45.7545 188.336 45.3919 188.336 44.984V34.2601C186.74 34.2058 184.936 34.2601 183.595 35.3389C182.154 36.5264 182.045 38.1218 181.945 38.1762C181.891 38.5388 181.891 38.9014 181.891 39.2549V61.4822C183.486 61.5366 185.29 61.4822 186.632 60.4034C188.073 59.2159 188.182 57.6205 188.281 57.5117C188.336 57.1491 188.336 56.7865 188.336 56.433V52.0002H207.871C208.442 52.0002 209.004 51.9005 209.521 51.7464C209.983 51.5923 210.445 51.3838 210.862 51.13C212.204 50.3051 213.183 48.9091 213.437 47.368C213.491 47.1596 213.536 46.9601 213.536 46.7516C213.591 45.6729 213.536 44.5851 213.536 43.5064C213.536 42.4277 213.591 41.4396 213.482 40.4152L213.491 40.3971ZM207.3 46.1171C207.354 46.8423 206.683 47.5131 205.958 47.4587H204.771C203.583 47.4587 203.275 47.5131 202.087 47.4587H199.458V40.9591C199.404 40.2339 200.075 39.5631 200.746 39.6175H205.958C206.058 39.6175 206.112 39.6175 206.212 39.6719C206.828 39.7263 207.345 40.3427 207.291 40.9591C207.345 42.7087 207.291 44.4129 207.291 46.1171H207.3Z" fill="white"/>
                    <path d="M202.759 24.6785C203.095 24.3159 203.72 24.325 204.046 24.6966C204.998 25.6484 205.95 26.5912 206.902 27.5521C207.273 27.8784 207.292 28.513 206.929 28.8574C206.004 29.8002 205.062 30.7248 204.128 31.6585C203.901 31.9032 203.575 32.0845 203.24 32.012C202.922 31.9667 202.705 31.7129 202.487 31.4953C201.599 30.5979 200.701 29.7186 199.813 28.8121C199.813 28.8121 199.804 28.794 199.795 28.794C199.469 28.4314 199.532 27.8512 199.886 27.543C200.837 26.5912 201.789 25.6303 202.741 24.6876L202.759 24.6785Z" fill="white"/>
                    <path d="M94.096 47.1108C94.0779 47.5821 94.0779 48.0716 94.1504 48.543C94.2411 49.232 94.4495 49.8756 94.939 50.4285C95.4829 51.0359 96.1447 51.3078 96.5889 51.4347C96.9061 51.5345 97.1237 51.5526 97.1509 51.5798C97.2959 51.607 97.4228 51.6251 97.5679 51.6251H105.3C105.454 51.6251 106.107 51.5526 106.279 51.5254C106.433 51.4982 106.597 51.471 106.751 51.4257C106.85 51.3985 106.95 51.3713 107.041 51.335C107.213 51.2897 107.385 51.2172 107.539 51.1447C107.594 51.1265 107.657 51.0993 107.712 51.0721C107.911 50.9724 108.101 50.8727 108.283 50.7549C108.473 50.637 108.654 50.5101 108.827 50.3651C108.981 50.2472 109.126 50.1203 109.271 49.9753C109.769 49.4858 110.177 48.8966 110.476 48.262C110.567 48.0626 110.649 47.8632 110.703 47.6456C110.748 47.5187 110.794 47.3827 110.803 47.2467C110.848 47.0745 110.893 46.9023 110.902 46.73C110.921 46.7028 110.948 46.4037 110.948 46.3312V46.0139C111.002 45.1799 110.966 44.346 110.975 43.5301C110.957 42.5511 110.993 41.5902 110.948 40.6112V40.2939C110.948 40.2214 110.921 39.9495 110.902 39.8951C110.884 39.7228 110.848 39.5506 110.803 39.3784C110.785 39.2333 110.748 39.1064 110.703 38.9795C110.649 38.7619 110.558 38.5625 110.476 38.3631C110.277 37.9461 110.041 37.5472 109.742 37.1847C109.624 37.0305 109.497 36.8855 109.37 36.7495C109.343 36.7042 109.298 36.677 109.271 36.6498C109.126 36.5048 108.981 36.3779 108.827 36.26C108.654 36.115 108.464 35.9881 108.283 35.8702C108.092 35.7524 107.911 35.6527 107.712 35.553C107.657 35.5258 107.594 35.4986 107.539 35.4804C107.367 35.4079 107.213 35.3354 107.041 35.2901C106.95 35.2629 106.85 35.2357 106.751 35.1994C106.597 35.145 106.433 35.1178 106.279 35.0997C106.107 35.0725 105.953 35.0453 105.79 35.0453H105.772C105.445 35 105.128 35 104.793 35H97.5679C97.4228 35 97.2959 35.0272 97.1509 35.0453C97.1237 35.0725 96.9061 35.0906 96.5889 35.1904C96.1447 35.3173 95.4829 35.5892 94.939 36.1966C94.4495 36.7314 94.232 37.3931 94.1504 38.0821C94.0779 38.5535 94.0779 39.0611 94.096 39.5325H103.378C104.113 39.4871 104.784 40.1489 104.747 40.8831C104.747 41.6899 104.765 42.5058 104.747 43.3126C104.747 43.5845 104.765 43.8474 104.747 44.1193V45.742C104.793 46.4762 104.113 47.138 103.378 47.0926C101.928 47.1108 100.46 47.0926 99.0092 47.1108H94.096Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="footer-logo-shadow" x="8" y="10" width="207.559" height="75.1785" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="2"/>
                      <feGaussianBlur stdDeviation="1"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </Link>
            </div>
            <p className="text-white/50 text-sm leading-loose mb-6">
              پلتفرم حرفه‌ای سرمایه‌گذاری هوشمند. با فراسود آینده مالی بهتری بسازید.
            </p>
            <div className="flex gap-2.5">
              {[
                { label: "تلگرام", icon: <Send size={14} className="text-white/70" /> },
                { label: "اینستاگرام", icon: <Instagram size={14} className="text-white/70" /> },
                { label: "لینکدین", icon: <Linkedin size={14} className="text-white/70" /> },
                { label: "بله", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 999.7" width="14" height="14" fill="currentColor" className="text-white/70"><g><path d="M514,1011.85q-23.87,0-49-2.42c-30.39-2.35-62.93-8.66-98.82-19.23l-22-6.47-.16-1.1C198,932.06,80.66,810.7,34.86,661,24,626.11,17.21,591.57,14.6,558.43c-2.82-25.29-2.57-50.07-2.32-74,.08-8,.16-15.94.12-23.9-.23-25.23-.23-50.7-.08-76.16-.15-25.61-.15-51.71,0-77.82-.11-16.34-.09-33.13-.08-49.9V239.94c0-8.12,0-16.15,0-24.17,0-14.3,0-28.62.15-42.9-.19-14.14-.17-28.28-.15-42.42q0-11.19,0-22.41C10.2,79.7,20.8,52.3,40.81,34.46c23-20.8,56.7-27.85,85.6-17.78,12.23,4.13,22.14,10.44,30.88,16l4.6,2.91c28.76,18.7,55.75,38.17,79.76,56.09,10.29-6.72,20.61-12.85,31.09-18.5a477.66,477.66,0,0,1,45.46-22c15.67-6.54,31.91-12.41,49.87-18l3.66-1c16.56-4.56,33.69-9.28,52.11-11.93a401.11,401.11,0,0,1,61.56-7.18,452.33,452.33,0,0,1,76.5,1.75A414.55,414.55,0,0,1,619.17,24C747.67,51.09,862.22,130.89,933.5,243A490.75,490.75,0,0,1,1000,402.84c5.46,24.22,8.56,44.62,9.72,63.9a418.71,418.71,0,0,1,.72,80.39c-.86,20-3.07,37.52-6.71,53.28-1.78,15.87-5.92,30.76-9.58,44L992.85,649c-5.36,20.35-13.31,40.5-19.68,56.69l-.45,1.07c-5.82,13.48-12.54,27.39-21.78,45.13l-.65,1.18c-8.38,14.71-16.23,27.45-24,39-9.31,13.69-19.52,27.23-30.43,40.38-10.23,12-22.19,25.66-35.56,38.34a502.07,502.07,0,0,1-50.93,43.19A453.61,453.61,0,0,1,761,945.46c-20.35,12.11-40.93,21.41-58.42,28.9a547.3,547.3,0,0,1-66.11,22l-9.19,2.09c-16.06,3.62-32.66,7.37-50.51,8.88A422.74,422.74,0,0,1,514,1011.85ZM408.37,927.42A380,380,0,0,0,471.25,938q52.22,5,95.87-1.73l2.68-.31c13.2-1,27-4.15,41.66-7.45l7.25-1.62a473.12,473.12,0,0,0,56.19-18.68c14.83-6.37,32.9-14.5,49.8-24.59l1-.56a382.18,382.18,0,0,0,41.11-26.83A428.3,428.3,0,0,0,810.65,819c11.28-10.7,21.65-22.54,30.36-32.77,9.17-11.06,18-22.78,26-34.49,6.56-9.72,13.36-20.77,20.72-33.64,8.12-15.62,14-27.79,19-39.31,5.93-15.05,12.61-32.05,16.94-48.5l1.41-5.1c3.38-12.16,6.57-23.64,7.56-34.17l.87-5.15c2.92-12,4.68-25.9,5.36-42.57l.11-1.67a347.17,347.17,0,0,0-.61-68l-.15-1.87c-.88-15.52-3.48-32.47-8.19-53.36A419.67,419.67,0,0,0,873.07,281.5C812.86,186.81,712.27,116.74,604,94l-.94-.21a345.57,345.57,0,0,0-48.23-7.67,383.17,383.17,0,0,0-65.33-1.5l-1,0a331,331,0,0,0-51.74,6.09l-2,.33c-14.19,2-28.67,6-44,10.19l-1.87.51c-15.6,4.9-29.63,10-42.87,15.49a411.55,411.55,0,0,0-38.88,18.79,361,361,0,0,0-36.39,22.44,110.18,110.18,0,0,1-13.63,8.57l-20.25,10.82L218.55,164c-27.61-21-60.5-45.43-95.08-67.93l-4.64-2.92c-5.84-3.72-11.35-7.22-15.68-8.69-4.57-1.57-10.65-.11-14.47,3.32-3.62,3.24-5.49,9.27-4.92,15.52l.15,3.13c0,8,0,16.08,0,24.13,0,13.94,0,27.87.15,41.81v1c-.19,14.09-.17,28.21-.15,42.31,0,8.14,0,16.28,0,24.4v16.6c0,16.61,0,33.21.08,49.82-.15,26.28-.15,52.1,0,77.85-.15,25.53-.15,50.63.08,75.67,0,8.47,0,16.79-.12,25.11-.24,23-.46,44.76,1.94,65.89l.12,1.28c2.16,28,8,57.47,17.35,87.6,40.53,132.48,151.57,242.73,282.94,281Z" transform="translate(-12 -12.15)"/><path d="M450.91,763.62h-1.64l-1.86-.07c-30.64-2-59-14.32-79.85-34.82L226.68,587.91c-15.23-15.06-26.55-35-32.59-57.67l-.52-2.24c-6.22-31.24-1.49-62.59,13.33-88.29,10.95-19.33,28.06-36.07,49.33-48.18l2.55-1.32a132.12,132.12,0,0,1,71.16-11.84l1.17.15c27.68,4.15,53,17,71.36,36.21l12.88,12.93q18.86,18.9,37.75,37.8c9.76-9.46,19.27-19,28.29-28.47l1.37-1.36c8.64-8.12,17.61-17.1,28.2-28.25l2.17-2.09c3.9-3.47,7.88-7.54,12.07-11.84,2.07-2.1,4.13-4.21,6.21-6.28,10.9-10.61,21.24-21.11,31.57-31.6,8.8-8.52,16.78-16.6,24.78-24.68l4.93-5c6.6-6.44,12.68-12.55,18.76-18.65,4.26-4.28,8.52-8.57,12.81-12.82a130.68,130.68,0,0,1,51.9-32.23l1.32-.41a131.24,131.24,0,0,1,76.76,1.55L756,264c31.37,12,57.4,36.8,71.4,68l1,2.41c10.69,29.28,11,60.73.82,88.56-7,18.68-18.81,35.75-35.25,51Q779.33,488.38,764.83,503l-10.22,10.19q-10.7,10.68-21.35,21.39l-10,10c-6.82,6.8-13.64,13.58-20.43,20.41L689.5,578.29q-9.88,9.87-19.74,19.77l-15.2,15.18q-11.25,11.21-22.47,22.47l-52.2,52.19q-9.74,9.69-19.41,19.41c-3.45,3.33-6.31,6.26-9.18,9.19-8.13,8.28-17.33,17.68-28.53,25.87l-2.1,1.42A130.77,130.77,0,0,1,450.91,763.62ZM263.63,512.87c2.8,9.84,7.48,18.19,13.56,24.21L418,677.82c8.07,7.91,20.14,13.11,33.07,14.13a59.34,59.34,0,0,0,30.42-8.18c6.11-4.66,12.21-10.87,18.64-17.44,3.32-3.38,6.64-6.77,10.05-10.06,6-6.06,12.56-12.59,19.1-19.11l52-52c7.5-7.56,15.08-15.11,22.66-22.67l15-15c6.56-6.61,13.22-13.26,19.88-19.92l13.2-13.2c6.83-6.86,13.74-13.74,20.65-20.63l9.73-9.7c7-7.12,14.32-14.38,21.59-21.64l10.06-10C724,442.45,734,432.46,744,422.54l.89-.85C753.24,414,759,406,762,398.07c4.14-11.36,4-24.87-.48-37.93a57.93,57.93,0,0,0-30.25-28.91,61.11,61.11,0,0,0-33.45-.7A59.47,59.47,0,0,0,675,345.06c-4.46,4.43-8.6,8.59-12.75,12.76-6.33,6.36-12.66,12.71-19.07,19l-4.45,4.51c-8.38,8.45-16.74,16.91-25.3,25.18-10.08,10.24-20.79,21.1-31.73,31.75-1.53,1.53-3.37,3.41-5.2,5.3-4.56,4.65-9.26,9.46-14.56,14.27-10.85,11.38-20.23,20.76-29.38,29.39-10.06,10.5-20.66,21.14-31.53,31.62l-1.24,1.28c-7,7.21-14.27,14.68-21.94,22L452.63,566l-24.69-24.45Q396.13,510,364.61,478.26l-13.83-13.9c-7.31-7.71-17.83-13-29.69-14.87a60.62,60.62,0,0,0-30.67,5.05c-9.44,5.62-16.79,12.76-21.31,20.72C263.1,485.7,261.17,499.27,263.63,512.87Z" transform="translate(-12 -12.15)"/></g></svg> },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F4512A] transition-colors duration-200 flex items-center justify-center border border-white/10"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {(cols as any[]).map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-5">{col.title}</h4>
              {col.logos ? (
                <div className="flex flex-row items-center gap-2">
                  {col.logos.map((logo: any) => (
                    <a key={logo.alt} href={logo.href} className="flex-1">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        style={{ width: "100%", height: 68, objectFit: "contain", objectPosition: "center", display: "block", opacity: 0.85 }}
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {col.links.map((l: any) => (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-white/50 hover:text-white text-sm transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-sm">© ۱۴۰۳ فراسود. تمام حقوق محفوظ است.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/35 hover:text-white text-sm transition-colors">قوانین و مقررات</a>
            <a href="#" className="text-white/35 hover:text-white text-sm transition-colors">حریم خصوصی</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <style>{`
        @keyframes hbOrbit1 {
          0%,100% { transform: rotate(0deg) translateX(0px) translateY(0px); }
          33% { transform: rotate(6deg) translateX(18px) translateY(-10px); }
          66% { transform: rotate(-4deg) translateX(-12px) translateY(8px); }
        }
        @keyframes hbOrbit2 {
          0%,100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          50% { transform: translateX(-20px) translateY(12px) rotate(-5deg); }
        }
        @keyframes hbGlow1 {
          0%,100% { opacity: 0.045; transform: scale(1) translate(0,0); }
          40% { opacity: 0.07; transform: scale(1.12) translate(30px,-20px); }
          70% { opacity: 0.035; transform: scale(0.92) translate(-15px,25px); }
        }
        @keyframes hbGlow2 {
          0%,100% { opacity: 0.03; transform: scale(1) translate(0,0); }
          35% { opacity: 0.055; transform: scale(1.1) translate(-25px,15px); }
          75% { opacity: 0.022; transform: scale(0.88) translate(20px,-18px); }
        }
        @keyframes hbGlow3 {
          0%,100% { opacity: 0.025; transform: scale(1); }
          50% { opacity: 0.05; transform: scale(1.15); }
        }
        @keyframes hbTrail1 {
          0% { stroke-dashoffset: 1200; opacity: 0; }
          8% { opacity: 1; }
          55% { opacity: 0.7; }
          85% { opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hbTrail2 {
          0% { stroke-dashoffset: 900; opacity: 0; }
          10% { opacity: 0.8; }
          60% { opacity: 0.5; }
          88% { opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hbTrail3 {
          0% { stroke-dashoffset: 600; opacity: 0; }
          12% { opacity: 0.6; }
          65% { opacity: 0.4; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hbMesh {
          0%,100% { opacity: 0.028; transform: translateX(0px) translateY(0px); }
          50% { opacity: 0.048; transform: translateX(20px) translateY(-14px); }
        }
        @keyframes hbBreath {
          0%,100% { opacity: 0.032; }
          50% { opacity: 0.06; }
        }
        @keyframes hbP1 { 0%,100%{transform:translate(0,0)} 30%{transform:translate(12px,-18px)} 70%{transform:translate(-8px,14px)} }
        @keyframes hbP2 { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-15px,10px)} 60%{transform:translate(10px,-12px)} }
        @keyframes hbP3 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(8px,16px)} 80%{transform:translate(-12px,-8px)} }
        @keyframes hbP4 { 0%,100%{transform:translate(0,0)} 35%{transform:translate(-10px,-14px)} 65%{transform:translate(14px,10px)} }
        @keyframes hbP5 { 0%,100%{transform:translate(0,0)} 45%{transform:translate(16px,8px)} 75%{transform:translate(-6px,-16px)} }
        @keyframes hbP6 { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-12px,14px)} 55%{transform:translate(10px,-10px)} }
        @keyframes hbFadeP { 0%,100%{opacity:0.18} 50%{opacity:0.55} }
      `}</style>

      {/* Animated radial glow */}
      <div style={{
        position:"absolute", top:"20%", left:"28%",
        width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle, #F4512A 0%, transparent 70%)",
        animation:"hbGlow1 18s ease-in-out infinite",
        filter:"blur(90px)", willChange:"transform,opacity"
      }}/>

      {/* Animated mesh gradient overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 80% 60% at 60% 40%, rgba(244,81,42,0.06) 0%, transparent 60%)",
        animation:"hbMesh 20s ease-in-out infinite",
        willChange:"opacity,transform"
      }}/>

      {/* Breathing ambient orange behind content */}
      <div style={{
        position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)",
        width:"60%", height:"40%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(244,81,42,0.08) 0%, transparent 70%)",
        animation:"hbBreath 14s ease-in-out infinite 2s",
        filter:"blur(40px)"
      }}/>

      {/* Curved lines SVG — animated with parallax drift */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 700 560"
        preserveAspectRatio="xMidYMid slice"
        style={{ animation:"hbOrbit1 20s ease-in-out infinite" }}
      >
        <defs>
          <linearGradient id="lt1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4512A" stopOpacity="0"/>
            <stop offset="30%" stopColor="#F4512A" stopOpacity="0.18"/>
            <stop offset="70%" stopColor="#F4512A" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#F4512A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lt2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4512A" stopOpacity="0"/>
            <stop offset="40%" stopColor="#F4512A" stopOpacity="0.1"/>
            <stop offset="80%" stopColor="#F4512A" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#F4512A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lt3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4512A" stopOpacity="0"/>
            <stop offset="50%" stopColor="#F4512A" stopOpacity="0.07"/>
            <stop offset="100%" stopColor="#F4512A" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Static base circles — always visible */}
        <circle cx="600" cy="500" r="350" stroke="#F4512A" strokeWidth="0.6" fill="none" opacity="0.025"/>
        <circle cx="600" cy="500" r="250" stroke="#F4512A" strokeWidth="0.3" fill="none" opacity="0.02"/>
        <circle cx="600" cy="500" r="150" stroke="#F4512A" strokeWidth="0.2" fill="none" opacity="0.015"/>

        {/* Static base curves */}
        <path d="M0 200 Q200 120 400 200 Q550 260 700 180" stroke="#F4512A" strokeWidth="0.5" fill="none" opacity="0.025"/>
        <path d="M0 320 Q200 240 400 320 Q550 380 700 300" stroke="#F4512A" strokeWidth="0.3" fill="none" opacity="0.02"/>
        <path d="M0 420 Q150 360 350 420 Q500 460 700 400" stroke="#F4512A" strokeWidth="0.2" fill="none" opacity="0.015"/>

        {/* Animated light trail 1 — bright moving streak */}
        <path
          d="M0 200 Q200 120 400 200 Q550 260 700 180"
          stroke="url(#lt1)" strokeWidth="1.5" fill="none"
          strokeDasharray="1200" strokeDashoffset="1200"
          style={{ animation:"hbTrail1 15s ease-in-out infinite 1s" }}
        />
        {/* Animated light trail 2 */}
        <path
          d="M0 320 Q200 240 400 320 Q550 380 700 300"
          stroke="url(#lt2)" strokeWidth="1" fill="none"
          strokeDasharray="900" strokeDashoffset="900"
          style={{ animation:"hbTrail2 18s ease-in-out infinite 5s" }}
        />
        {/* Animated light trail 3 — circle arc */}
        <path
          d="M350 150 A350 350 0 0 1 700 500"
          stroke="url(#lt3)" strokeWidth="0.8" fill="none"
          strokeDasharray="600" strokeDashoffset="600"
          style={{ animation:"hbTrail3 20s ease-in-out infinite 9s" }}
        />
      </svg>

      {/* Second SVG layer — slower parallax drift */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 700 560"
        preserveAspectRatio="xMidYMid slice"
        style={{ animation:"hbOrbit2 26s ease-in-out infinite 4s", opacity:0.6 }}
      >
        <defs>
          <linearGradient id="lt4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4512A" stopOpacity="0"/>
            <stop offset="45%" stopColor="#F4512A" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#F4512A" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M-50 440 Q150 380 300 440 Q450 490 700 430" stroke="#F4512A" strokeWidth="0.3" fill="none" opacity="0.04"/>
        <path
          d="M-50 440 Q150 380 300 440 Q450 490 700 430"
          stroke="url(#lt4)" strokeWidth="0.8" fill="none"
          strokeDasharray="800" strokeDashoffset="800"
          style={{ animation:"hbTrail2 22s ease-in-out infinite 12s" }}
        />
      </svg>

    </div>
  );
}

function LoginCard() {
  const [type, setType] = useState<"real" | "legal">("real");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(() => Math.floor(Math.random() * 9000 + 1000).toString());
  const refreshCaptcha = () => setCaptcha(Math.floor(Math.random() * 9000 + 1000).toString());
  const [form, setForm] = useState({ id: "", pw: "", cap: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitMode, setModalInitMode] = useState<AuthMode>("login");

  const openModal = (mode: AuthMode) => { setModalInitMode(mode); setModalOpen(true); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ne: Record<string, string> = {};
    if (!form.id) ne.id = "این فیلد الزامی است";
    if (!form.pw) ne.pw = "این فیلد الزامی است";
    if (form.cap !== captcha) ne.cap = "کد امنیتی اشتباه است";
    setErrs(ne);
    if (Object.keys(ne).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); openModal("login"); }, 800);
  };

  const inputCls = (hasErr: boolean) =>
    cn(
      "w-full h-[52px] rounded-xl border px-4 text-sm outline-none transition-colors bg-white",
      hasErr ? "border-[#C83A32]" : "border-[#E6E6E3] focus:border-[#1B1E22]"
    );

  return (
    <>
      <div className="w-full bg-white rounded-[32px] shadow-[0_24px_64px_rgba(27,30,34,0.12)] p-6">
        <h3 className="text-[#1B1E22] text-xl font-black mb-5">ورود به فراسود</h3>

        <form onSubmit={submit} className="space-y-5 pt-2">
          <div>
            <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">
              کد ملی / شناسه ملی
            </label>
            <input
              type="text"
              placeholder={type === "real" ? "کد ملی خود را وارد کنید" : "شناسه ملی شرکت را وارد کنید"}
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              className={inputCls(!!errs.id)}
            />
            {errs.id && <p className="text-[#C83A32] text-xs mt-1">{errs.id}</p>}
          </div>

          <div>
            <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">رمز عبور</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                value={form.pw}
                onChange={(e) => setForm((f) => ({ ...f, pw: e.target.value }))}
                className={cn(inputCls(!!errs.pw), "pl-12")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F7378] hover:text-[#1B1E22]"
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errs.pw && <p className="text-[#C83A32] text-xs mt-1">{errs.pw}</p>}
          </div>

          <div>
            <label className="block text-[#1B1E22] text-sm font-bold mb-1.5">کد امنیتی</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="کد را وارد کنید"
                value={form.cap}
                onChange={(e) => setForm((f) => ({ ...f, cap: e.target.value }))}
                className={cn(inputCls(!!errs.cap), "flex-1")}
              />
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-[#9B9FA5] hover:text-[#1B1E22] transition-colors"
                  title="کد جدید"
                >
                  <RefreshCw size={15} />
                </button>
                <div
                  className="h-[52px] px-4 rounded-xl flex items-center justify-center min-w-[80px] select-none"
                  style={{ background: C.dark }}
                >
                  <span className="text-white font-black text-lg font-mono tracking-[3px]">{captcha}</span>
                </div>
              </div>
            </div>
            {errs.cap && <p className="text-[#C83A32] text-xs mt-1">{errs.cap}</p>}
          </div>

          <button
            type="button"
            onClick={() => openModal("forgot")}
            className="block w-full text-[#F4512A] text-xs font-semibold text-right hover:underline"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </button>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full h-[52px] text-white font-bold text-[15px] rounded-full transition-colors duration-200 flex items-center justify-center gap-2",
              loading ? "bg-[#F4512A]/70 cursor-not-allowed" : "bg-[#F4512A] hover:bg-[#D94321]"
            )}
          >
            {loading && <RefreshCw size={15} className="animate-spin" />}
            {loading ? "در حال بررسی..." : "ورود"}
          </button>

          <button
            type="button"
            onClick={() => openModal("register")}
            className="w-full h-[52px] border border-[#1B1E22] text-[#1B1E22] font-bold text-[15px] rounded-full hover:bg-[#1B1E22] hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            ثبت‌نام
          </button>
        </form>
      </div>

      <LoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initMode={modalInitMode}
      />
    </>
  );
}

function HeroSection() {
  const [cur, setCur] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= 1024);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur((c) => (c + 1) % SLIDES.length), 5500);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardHeight(el.offsetHeight));
    ro.observe(el);
    setCardHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const go = (i: number) => { setCur(i); startTimer(); };
  const slide = SLIDES[cur];

  return (
    <section className="bg-[#1B1E22] pt-[76px] min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Decorative layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-[#F4512A] opacity-[0.04] blur-[120px]" />
      </div>
      <HeroBg />

      {/* Two-column content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start max-w-[1280px] mx-auto px-5 lg:px-10 py-10 lg:py-14 w-full gap-6 lg:gap-12">

        {/* Slide content */}
        <div
          className="w-full lg:flex-1 flex flex-col gap-1 lg:gap-4"
          style={isDesktop && cardHeight ? { height: cardHeight } : undefined}
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:flex-1 relative overflow-hidden" style={{ borderRadius: 32 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={[heroBanner1, heroBanner2, heroBanner3][cur]}
                  alt={`بنر ${cur + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => go((cur - 1 + SLIDES.length) % SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 z-10"
                  aria-label="قبلی"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => go((cur + 1) % SLIDES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 z-10"
                  aria-label="بعدی"
                >
                  <ChevronLeft size={20} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 flex-shrink-0 mt-3 lg:mt-0">
            {[heroBanner1, heroBanner2, heroBanner3].map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === cur ? "w-8 h-2 bg-[#F4512A]" : "w-2 h-2 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Login card */}
        <div ref={cardRef} className="w-full lg:w-1/3 flex-shrink-0">
          <LoginCard />
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────
function StatsSection() {
  const { ref, vis } = useReveal();

  const stats = [
    { label: "سرمایه‌گذار فعال", val: "+۱۲۰K", Icon: Users, color: C.orange, bg: "#FFF1EE" },
    { label: "دارایی تحت مدیریت", val: "۱۲ هزار میلیارد", Icon: BarChart2, color: C.success, bg: "#EDFAF3" },
    { label: "سال سابقه فعالیت", val: "۱۵+", Icon: Award, color: C.info, bg: "#EEF3FA" },
    { label: "صندوق سرمایه‌گذاری", val: "۶", Icon: Layers, color: C.warning, bg: "#FDF6E8" },
  ];

  return (
    <section className="py-28 bg-white border-b border-[#E6E6E3]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ label, val, Icon, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(27,30,34,0.07)" }}
              className="bg-[#F7F7F5] border border-[#E6E6E3] rounded-3xl p-6 flex flex-col items-start gap-4 transition-all duration-300 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <div className="text-[#1B1E22] font-black text-3xl leading-none mb-1.5" style={{ color }}>
                  {val}
                </div>
                <div className="text-[#6F7378] text-sm">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUST SECTION ────────────────────────────────────────────────────────────
function TrustSection() {
  const { ref, vis } = useReveal();

  const features = [
    { Icon: TrendingUp, title: "سرمایه‌گذاری آنلاین", desc: "بدون مراجعه حضوری، از هر مکان، سرمایه‌گذاری کنید.", color: C.orange, bg: "#FFF1EE" },
    { Icon: Layers, title: "دسترسی آسان به صندوق‌ها", desc: "با یک کلیک به انواع صندوق‌های سرمایه‌گذاری دسترسی داشته باشید.", color: C.success, bg: "#EDFAF3" },
    { Icon: Activity, title: "نقدشوندگی مناسب", desc: "سرمایه شما در مواقع نیاز به سرعت قابل تبدیل به وجه نقد است.", color: C.info, bg: "#EEF3FA" },
    { Icon: Shield, title: "همراهی و پشتیبانی", desc: "تیم متخصص فراسود در تمام مراحل سرمایه‌گذاری همراه شماست.", color: C.warning, bg: "#FDF6E8" },
  ];

  return (
    <section className="py-44 bg-[#F7F7F5] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-20 relative z-10"
          >
            <Pill>ارزش‌های فراسود</Pill>
            <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black mb-4 leading-tight">
              سرمایه‌گذاری، ساده‌تر از همیشه
            </h2>
            <p className="text-[#6F7378] text-lg max-w-md mx-auto leading-relaxed">
              فراسود تمام پیچیدگی‌های سرمایه‌گذاری را برای شما ساده می‌کند.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={vis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease: EASE }}
                whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(27,30,34,0.08)" }}
                className="bg-white rounded-3xl p-9 border border-[#E6E6E3] transition-all duration-250 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: f.bg }}>
                  <f.Icon size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-[#1B1E22] text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-[#6F7378] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FUNDS SECTION ────────────────────────────────────────────────────────────

function RiskDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((d) => (
        <div
          key={d}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{ background: d <= level ? (level === 1 ? "#2F8F5B" : level === 2 ? "#E8A020" : "#E53935") : "#E6E6E3" }}
        />
      ))}
    </div>
  );
}

function FundCard({ fund, i, vis }: { fund: typeof FUNDS[0]; i: number; vis: boolean }) {
  const logoSrc = fund.id === "owj" ? owjLogo
    : fund.id === "andookhte" ? andookhteLogoImg
    : fund.id === "talayi" ? talaLogoImg
    : fund.id === "atiyeh" ? atiehLogoImg
    : fund.id === "dolati" ? dolatiLogoImg
    : fund.id === "ofoq" ? ofoghLogoImg
    : fundLogo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 + i * 0.09, ease: EASE }}
      whileHover={{ y: -8, boxShadow: "0 32px 80px rgba(27,30,34,0.12)" }}
      className="bg-white rounded-[28px] border border-[#E6E6E3] overflow-hidden transition-all duration-300 group cursor-default flex flex-col"
    >
      {/* Card header – logo + badge + name */}
      <div className="px-7 pt-6 pb-6">
        {/* Logo + name row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F7F7F5] border border-[#E6E6E3] flex items-center justify-center shrink-0 overflow-hidden p-2">
            <ImageWithFallback
              src={logoSrc}
              alt={fund.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-1.5 bg-[#2563EB]/10 text-[#2563EB]">
              {fund.typeShort}
            </span>
            <h3 className="text-[#1B1E22] text-[17px] font-black leading-snug">{fund.name}</h3>
          </div>
        </div>

        {/* Return stats row */}
        <div className="flex gap-3">
          <div className="flex-1 bg-[#F7F7F5] rounded-2xl px-4 py-3.5">
            <div className="text-[#9B9FA5] text-[11px] mb-1">{fund.id === "talayi" ? "بازدهی ماه اخیر" : ["atiyeh","dolati","ofoq"].includes(fund.id) ? "بازدهی ماه قبل" : "بازدهی سالانه"}</div>
            <div className={`text-[#C58A24] font-black leading-snug ${fund.ret.length > 8 ? "text-[12px]" : "text-[22px] leading-none"}`}>{fund.ret}</div>
          </div>
          <div className="flex-1 bg-[#F7F7F5] rounded-2xl px-4 py-3.5">
            <div className="text-[#9B9FA5] text-[11px] mb-1">{["atiyeh","dolati","ofoq"].includes(fund.id) ? "بازدهی سالانه موثر" : fund.id === "talayi" ? "کارمزد" : ["owj","andookhte"].includes(fund.id) ? "بازدهی سالانه موثر" : "بازدهی ماهانه"}</div>
            <div className={`text-[#C58A24] font-black leading-snug ${fund.retMonthly.length > 8 ? "text-[12px]" : "text-[22px] leading-none"}`}>{fund.retMonthly}</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-7 h-px bg-[#F0F0EE]" />

      {/* Metrics */}
      <div className="px-7 py-6 flex flex-col flex-1 gap-5">
        <p className="text-[#6F7378] text-sm leading-relaxed">{fund.desc}</p>

        <div className="flex items-center gap-0 border border-[#F0F0EE] rounded-2xl overflow-hidden">
          <div className="flex-1 px-4 py-3 text-center">
            <div className="text-[#9B9FA5] text-[10px] mb-1">حداقل سرمایه</div>
            <div className="text-[#1B1E22] text-xs font-bold leading-snug">{fund.minInvest}</div>
          </div>
          <div className="w-px self-stretch bg-[#F0F0EE]" />
          <div className="flex-1 px-4 py-3 text-center">
            <div className="text-[#9B9FA5] text-[10px] mb-1">سطح ریسک</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#1B1E22] text-xs font-bold">{fund.risk}</span>
              <RiskDots level={fund.riskLevel} />
            </div>
          </div>
        </div>

        <Link
          to={`/funds/${fund.id}`}
          className="mt-auto w-full h-[50px] font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all duration-300 border-2 border-[#F4512A] text-[#F4512A] hover:bg-[#F4512A] hover:text-white"
        >
          مشاهده صندوق
          <ChevronLeft size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

const GROWTH_DATA = [
  { year: "۱۳۹۹", value: 12.7, label: "۱۲/۷" },
  { year: "۱۴۰۰", value: 14.3, label: "۱۴/۳" },
  { year: "۱۴۰۱", value: 21.1, label: "۲۱/۱" },
  { year: "۱۴۰۲", value: 37.8, label: "۳۷/۸" },
  { year: "۱۴۰۳", value: 61.7, label: "۶۱/۷" },
  { year: "۱۴۰۴", value: 113.9, label: "۱۱۳/۹" },
  { year: "۱۴۰۵", value: 161.3, label: "+۱۶۱/۳" },
];

function FundGrowthChart() {
  const data = GROWTH_DATA;
  const W = 520, H = 340;
  const padL = 44, padR = 20, padT = 50, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 180;
  const yTicks = [20, 40, 60, 80, 100, 120, 140, 160];
  const xStep = chartW / (data.length - 1);
  const pts = data.map((d, i) => ({
    x: padL + i * xStep,
    y: padT + chartH - (d.value / maxVal) * chartH,
    ...d,
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="w-full bg-[#F7F7F5] rounded-3xl p-4">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible", transform: "translateX(-24px)" }}>
        {/* Horizontal grid lines only */}
        {yTicks.map((t) => {
          const y = padT + chartH - (t / maxVal) * chartH;
          return <line key={t} x1={padL} x2={padL + chartW} y1={y} y2={y} stroke="#E6E6E0" strokeWidth={1} />;
        })}

        {/* Y axis line (starts just below arrow tip) */}
        <line x1={padL} x2={padL} y1={padT - 2} y2={padT + chartH} stroke="#B8B8B0" strokeWidth={1.5} />
        {/* X axis line */}
        <line x1={padL} x2={padL + chartW} y1={padT + chartH} y2={padT + chartH} stroke="#B8B8B0" strokeWidth={1.5} />

        {/* Y axis arrow — pointing up */}
        <polygon
          points={`${padL},${padT - 10} ${padL - 4.5},${padT + 2} ${padL + 4.5},${padT + 2}`}
          fill="#B8B8B0"
        />
        {/* X axis arrow — pointing right */}
        <polygon
          points={`${padL + chartW + 10},${padT + chartH} ${padL + chartW},${padT + chartH - 4.5} ${padL + chartW},${padT + chartH + 4.5}`}
          fill="#B8B8B0"
        />

        {/* "قیمت" — rotated vertically, left of Y axis near arrow */}
        <text
          x={padL - 26}
          y={padT + 12}
          textAnchor="middle"
          fill="#888"
          fontSize={9}
          transform={`rotate(-90, ${padL - 26}, ${padT + 12})`}
        >قیمت</text>

        {/* Y axis labels — Persian numerals, clear of axis line */}
        {yTicks.map((t) => {
          const y = padT + chartH - (t / maxVal) * chartH;
          const fa = t.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
          return (
            <text key={t} x={padL - 14} y={y + 4} textAnchor="end" fill="#888" fontSize={9}>{fa}</text>
          );
        })}

        {/* X axis labels */}
        {pts.map((p) => (
          <text key={p.year} x={p.x} y={padT + chartH + 22} textAnchor="middle" fill="#888" fontSize={9}>{p.year}</text>
        ))}

        {/* "سال" — after X axis arrow, below axis level */}
        <text
          x={padL + chartW + 48}
          y={padT + chartH + 22}
          textAnchor="start"
          fill="#888"
          fontSize={9}
        >سال</text>

        {/* Chart line */}
        <path d={pathD} fill="none" stroke="#2F8F5B" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots + badge labels */}
        {pts.map((p, i) => {
          const isLast = i === pts.length - 1;
          const lw = isLast ? 78 : 54;
          const lh = 22;
          const lx = p.x - lw / 2;
          const ly = p.y - lh - 9;
          return (
            <g key={p.year}>
              <rect x={lx} y={ly} width={lw} height={lh} rx={7} fill="#2F8F5B" />
              <text x={p.x} y={ly + 15} textAnchor="middle" fill="#fff" fontSize={isLast ? 12 : 11} fontWeight="bold">{p.label}</text>
              <circle cx={p.x} cy={p.y} r={5} fill="#2F8F5B" stroke="#fff" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ChartZoomable() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-right cursor-zoom-in group relative"
        title="برای بزرگنمایی کلیک کنید"
      >
        <FundGrowthChart />
        <div className="absolute inset-0 rounded-3xl bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-bold">
            بزرگنمایی
          </span>
        </div>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#F7F7F5] rounded-3xl p-6 w-full max-w-3xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1B1E22] font-black text-lg">رشد ارزش دارایی‌ها</span>
              <button onClick={() => setOpen(false)} className="text-[#6F7378] hover:text-[#1B1E22] transition-colors">
                <X size={20} />
              </button>
            </div>
            <FundGrowthChart />
          </div>
        </div>
      )}
    </>
  );
}

function FundsSection() {
  const { ref, vis } = useReveal();

  return (
    <section className="py-44 bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-18 relative z-10"
          >
            <div>
              <Pill>صندوق‌های سرمایه‌گذاری</Pill>
              <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black mb-3 leading-tight">
                فرصت‌های سرمایه‌گذاری فراسود
              </h2>
              <p className="text-[#6F7378] text-base max-w-lg leading-relaxed">
                متناسب با اهداف و میزان ریسک‌پذیری خود، بهترین صندوق را پیدا کنید.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FUNDS.map((f, i) => <FundCard key={f.id} fund={f} i={i} vis={vis} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE COMPARISON CAROUSEL ───────────────────────────────────────────────
const COMPARISON_FUNDS = [
  { name: "اوج ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
  { name: "اندوخته ملت", settlement: "برداشت آنی تا ۵۰ میلیون تومان", guarantor: "بانک ملت", earning: "دریافت سود ماهانه", note: "نقدشوندگی سریع" },
  { name: "آتیه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "دومین صندوق بزرگ بازارگردانی" },
  { name: "خزانه ملت", settlement: "یک روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "روز شمار", note: "کم ریسک‌ترین صندوق" },
  { name: "افق ملت", settlement: "دو روز کاری پس از فروش", guarantor: "صندوق اختصاصی بازارگردانی ملت", earning: "متناسب با بازدهی پورتفوی صندوق", note: "بازدهی حداقل معادل شاخص بازار" },
];

function MobileComparisonCarousel() {
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
function ComparisonSection() {
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
      {/* Same background animation as Hero */}
      <HeroBg />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref, vis } = useReveal();

  return (
    <section className="py-44 bg-[#F7F7F5] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <div className="relative z-10">
              <Pill>درباره فراسود</Pill>
              <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black mb-6 leading-tight">
                فراسود را بهتر بشناسید
              </h2>
              <p className="text-[#6F7378] text-lg leading-relaxed mb-4">
                فراسود یک پلتفرم سرمایه‌گذاری آنلاین است که با هدف ساده‌سازی دسترسی عموم مردم به ابزارهای مالی تخصصی ایجاد شده است.
              </p>
              <p className="text-[#6F7378] text-base leading-relaxed mb-8">
                ما باور داریم سرمایه‌گذاری باید برای همه قابل دسترس باشد. با فراسود می‌توانید با حداقل سرمایه و حداکثر اطمینان، آینده‌ای مطمئن‌تر بسازید.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { v: "+۱۴", l: "سال تجربه" },
                  { v: "+۱۶۱/۳", l: "همت دارایی" },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-white rounded-2xl p-4 border border-[#E6E6E3]">
                    <div className="text-[#F4512A] text-2xl font-black">{v}</div>
                    <div className="text-[#6F7378] text-sm mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-4 rounded-full transition-colors duration-300"
              >
                درباره فراسود <ChevronLeft size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <ChartZoomable />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INVESTMENT CALCULATOR ────────────────────────────────────────────────────
function CalculatorSection() {
  const { ref, vis } = useReveal();
  const [amount, setAmount] = useState<number>(100_000_000);
  const [selectedFund, setSelectedFund] = useState(FUNDS[1]);
  const [days, setDays] = useState(180);
  const [open, setOpen] = useState(false);

  const dailyRate = selectedFund.ret / 365 / 100;
  const profit = Math.round(amount * dailyRate * days);
  const final = amount + profit;
  const monthlyProfit = Math.round(amount * (selectedFund.retMonthly / 100));

  const fmt = (n: number) => n.toLocaleString("fa-IR");

  const durations = [
    { label: "۳۰ روز", val: 30 },
    { label: "۳ ماه", val: 90 },
    { label: "۶ ماه", val: 180 },
    { label: "۱ سال", val: 365 },
  ];

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Pill>ابزار محاسبه</Pill>
          <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black">ماشین حساب سرمایه‌گذاری</h2>
          <p className="text-[#6F7378] mt-3 text-base max-w-md mx-auto">سود تخمینی سرمایه‌گذاری خود را در صندوق‌های فراسود محاسبه کنید.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* ── form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E6E6E3]"
          >
            {/* amount */}
            <div className="mb-8">
              <label className="block text-[#1B1E22] font-bold text-sm mb-3">مبلغ سرمایه‌گذاری را وارد کنید</label>
              <div className="flex items-center bg-white rounded-2xl border border-[#E6E6E3] focus-within:border-[#F4512A] transition-colors px-4">
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount === 0 ? "" : amount.toLocaleString("fa-IR")}
                  onChange={e => {
                    const raw = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/,|،/g, "").replace(/[^0-9]/g, "");
                    setAmount(raw === "" ? 0 : Math.max(0, Number(raw)));
                  }}
                  placeholder="۰"
                  className="flex-1 min-w-0 py-4 text-right text-[#1B1E22] font-bold text-sm lg:text-lg bg-transparent outline-none"
                  dir="rtl"
                />
                <span className="text-[#6F7378] text-sm font-semibold shrink-0 pr-3 border-r border-[#E6E6E3] mr-3">تومان</span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {[50_000_000, 100_000_000, 500_000_000, 1_000_000_000].map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className={cn(
                      "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200",
                      amount === v
                        ? "bg-[#1B1E22] text-white border-[#1B1E22]"
                        : "bg-white text-[#6F7378] border-[#E6E6E3] hover:border-[#F4512A] hover:text-[#F4512A]"
                    )}
                  >
                    {fmt(v / 1_000_000)} میلیون
                  </button>
                ))}
              </div>
            </div>

            {/* fund selector */}
            <div className="mb-8">
              <label className="block text-[#1B1E22] font-bold text-sm mb-3">صندوق مورد نظر را انتخاب کنید</label>
              <div className="relative">
                <button
                  onClick={() => setOpen(o => !o)}
                  className="w-full flex items-center justify-between bg-white rounded-2xl border border-[#E6E6E3] px-5 py-4 hover:border-[#F4512A] transition-colors focus:outline-none"
                >
                  <span className="text-[#1B1E22] font-bold text-sm">{selectedFund.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#F4512A] text-xs font-bold">{selectedFund.ret}٪ سالانه</span>
                    <ChevronDown size={16} className={cn("text-[#6F7378] transition-transform duration-200", open && "rotate-180")} />
                  </div>
                </button>
                {open && (
                  <div className="absolute top-full mt-2 right-0 left-0 bg-white border border-[#E6E6E3] rounded-2xl shadow-xl z-30 overflow-hidden">
                    {FUNDS.map(f => (
                      <button
                        key={f.id}
                        onClick={() => { setSelectedFund(f); setOpen(false); }}
                        className={cn(
                          "w-full flex items-center justify-between px-5 py-3.5 text-sm transition-colors hover:bg-[#F7F7F5]",
                          selectedFund.id === f.id ? "bg-[#FFF5F2] text-[#F4512A] font-bold" : "text-[#1B1E22] font-semibold"
                        )}
                      >
                        <span>{f.name}</span>
                        <span className={selectedFund.id === f.id ? "text-[#F4512A]" : "text-[#6F7378]"}>{f.ret}٪</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* duration */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[#1B1E22] font-bold text-sm">مدت زمان سرمایه‌گذاری</label>
                <span className="text-[#F4512A] font-black text-sm">{days.toLocaleString("fa-IR")} روز</span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {durations.map(d => (
                  <button
                    key={d.val}
                    onClick={() => setDays(d.val)}
                    className={cn(
                      "text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200",
                      days === d.val
                        ? "bg-[#1B1E22] text-white border-[#1B1E22]"
                        : "bg-white text-[#6F7378] border-[#E6E6E3] hover:border-[#1B1E22] hover:text-[#1B1E22]"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full h-5 flex items-center">
                <div className="absolute inset-x-0 h-2 rounded-full bg-[#D9D9D9]" />
                <div
                  className="absolute h-2 rounded-full bg-[#F4512A]"
                  style={{ width: `${((days - 7) / (365 - 7)) * 100}%` }}
                />
                <input
                  type="range"
                  min={7}
                  max={365}
                  value={days}
                  onChange={e => setDays(Number(e.target.value))}
                  className="relative w-full h-2 rounded-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F4512A] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#F4512A] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[#6F7378] text-xs mt-1.5">
                <span>۳۰ روز</span>
                <span>۳۶۵ روز</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5"
          >
            <Link
              to={`/funds/${selectedFund.id}`}
              className="flex items-center justify-center gap-2 bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-4 rounded-full transition-colors w-full"
            >
              سرمایه‌گذاری در {selectedFund.name} <ChevronLeft size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const { ref, vis } = useReveal();

  const steps = [
    { n: "۰۱", title: "انتخاب صندوق", desc: "صندوقی که با اهداف و ریسک‌پذیری شما همخوانی دارد را انتخاب کنید." },
    { n: "۰۲", title: "ثبت‌نام و احراز هویت", desc: "فرآیند ثبت‌نام و احراز هویت آنلاین را در چند دقیقه تکمیل کنید." },
    { n: "۰۳", title: "سرمایه‌گذاری", desc: "مبلغ دلخواه خود را وارد کرده و سرمایه‌گذاری را آغاز کنید." },
    { n: "۰۴", title: "پیگیری سرمایه‌گذاری", desc: "در هر زمان وضعیت سرمایه‌گذاری خود را پیگیری کنید." },
  ];

  return (
    <section className="py-44 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Pill>فرآیند سرمایه‌گذاری</Pill>
            <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black">
              سرمایه‌گذاری در چند قدم ساده
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* connecting line */}
            <div className="absolute top-10 right-[calc(12.5%+20px)] left-[calc(12.5%+20px)] hidden lg:block" style={{ height: 2 }}>
              <div className="h-full rounded-full" style={{ background: `linear-gradient(to left, #F4512A, #F4512A44, #F4512A44, #F4512A)` }} />
            </div>

            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 28 }}
                animate={vis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="text-center relative px-6 pb-6"
              >
                {/* step circle */}
                <div className="relative inline-flex mb-7">
                  {/* outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-20 scale-[1.45]"
                    style={{ background: i === 0 || i === steps.length - 1 ? C.orange : "#1B1E22" }}
                  />
                  <div
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center relative z-10 shadow-lg"
                    style={{ background: "#fff", boxShadow: `0 8px 24px rgba(27,30,34,0.12)` }}
                  >
                    <span className="font-black text-lg leading-none" style={{ color: C.orange }}>{s.n}</span>
                  </div>
                </div>

                <h3 className="text-[#1B1E22] text-base font-black mb-2">{s.title}</h3>
                <p className="text-[#6F7378] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-center mt-14"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-10 py-4 rounded-full transition-colors"
            >
              همین حالا شروع کنید <ChevronLeft size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE SECTION ────────────────────────────────────────────────────────
function KnowledgeSection() {
  const { ref, vis } = useReveal();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= 1024);
  const containerRef = useRef<HTMLDivElement>(null);
  const GAP = 24;
  const VISIBLE = isDesktop ? 4 : 1;
  const CAROUSEL_ARTICLES = ARTICLES.slice(0, 8);
  const total = CAROUSEL_ARTICLES.length;
  const canPrev = carouselIdx > 0;
  const canNext = carouselIdx + VISIBLE < total;
  const cardWidth = containerWidth > 0 ? (containerWidth - (VISIBLE - 1) * GAP) / VISIBLE : 0;
  const shiftPx = carouselIdx * (cardWidth + GAP);

  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setCarouselIdx(0);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-44 bg-[#F7F7F5]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <Pill>آموزش و دانش</Pill>
              <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black mb-2">مرکز دانش فراسود</h2>
              <p className="text-[#6F7378] text-base max-w-md leading-relaxed">
                با مطالعه مقالات تخصصی، مسیر سرمایه‌گذاری خود را بهتر بشناسید.
              </p>
            </div>
            <Link to="/knowledge" className="mt-4 md:mt-0 flex items-center gap-2 text-[#F4512A] font-bold text-sm shrink-0">
              مشاهده همه مطالب <ChevronLeft size={16} />
            </Link>
          </motion.div>

          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex"
              style={{ gap: GAP, direction: "ltr" }}
              animate={{ x: -shiftPx }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {CAROUSEL_ARTICLES.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={vis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-[#E6E6E3] overflow-hidden group transition-all duration-300 cursor-default flex-shrink-0"
                  style={{ width: cardWidth > 0 ? cardWidth : `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`, direction: "rtl", flexShrink: 0 }}
                >
                  <div className="h-44 bg-[#1B1E22] relative overflow-hidden">
                    <img
                      src={a.thumb}
                      alt={a.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E22]/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#DBEAFE] text-[#1D4ED8] text-[11px] font-bold px-3 py-1 rounded-full">
                        {a.cat}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[#1B1E22] font-bold text-sm mb-2 leading-relaxed group-hover:text-[#F4512A] transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-[#6F7378] text-xs leading-relaxed mb-4 line-clamp-2">{a.desc}</p>
                    <div className="flex items-center justify-between text-[#6F7378] text-xs">
                      <span className="flex items-center gap-1"><Clock size={11} /> {a.time}</span>
                      <Link
                        to={`/article/${a.slug}`}
                        className="text-[#F4512A] font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200"
                      >
                        ادامه مطلب <ChevronLeft size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total - VISIBLE + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIdx(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    carouselIdx === i ? "w-6 h-2 bg-[#F4512A]" : "w-2 h-2 bg-[#D4D4D0] hover:bg-[#1B1E22]"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                disabled={!canPrev}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  canPrev
                    ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white"
                    : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setCarouselIdx(i => Math.min(total - VISIBLE, i + 1))}
                disabled={!canNext}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  canNext
                    ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white"
                    : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWS SECTION ─────────────────────────────────────────────────────────────
function NewsSection() {
  const { ref, vis } = useReveal();
  const [newsIdx, setNewsIdx] = useState(0);
  const [newsContainerWidth, setNewsContainerWidth] = useState(0);
  const newsContainerRef = useRef<HTMLDivElement>(null);
  const NEWS_VISIBLE = 4;
  const NEWS_GAP = 24;
  const CAROUSEL_NEWS = NEWS.slice(0, 8);
  const newsTotal = CAROUSEL_NEWS.length;
  const newsCanPrev = newsIdx > 0;
  const newsCanNext = newsIdx + NEWS_VISIBLE < newsTotal;
  const newsCardWidth = newsContainerWidth > 0 ? (newsContainerWidth - (NEWS_VISIBLE - 1) * NEWS_GAP) / NEWS_VISIBLE : 0;
  const newsShiftPx = newsIdx * (newsCardWidth + NEWS_GAP);

  useEffect(() => {
    const el = newsContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setNewsContainerWidth(el.offsetWidth));
    ro.observe(el);
    setNewsContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-44 bg-[#F2F2F0]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <Pill>اخبار</Pill>
              <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black">آخرین اخبار و اطلاعیه‌ها</h2>
            </div>
            <Link to="/news" className="mt-4 md:mt-0 flex items-center gap-2 text-[#F4512A] font-bold text-sm shrink-0">
              مشاهده همه اخبار <ChevronLeft size={16} />
            </Link>
          </motion.div>

          <div className="overflow-hidden" ref={newsContainerRef}>
            <motion.div
              className="flex"
              style={{ gap: NEWS_GAP, direction: "ltr" }}
              animate={{ x: -newsShiftPx }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {CAROUSEL_NEWS.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={vis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-[#E6E6E3] overflow-hidden transition-all duration-300 group cursor-default flex-shrink-0 flex flex-col"
                  style={{ width: typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : (newsCardWidth > 0 ? newsCardWidth : `calc((100% - ${(NEWS_VISIBLE - 1) * NEWS_GAP}px) / ${NEWS_VISIBLE})`), direction: "rtl" }}
                >
                  <div className="relative h-44 overflow-hidden bg-[#1B1E22]">
                    <img
                      src={n.thumb}
                      alt={n.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E22]/60 to-transparent" />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <span className="bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-bold px-3 py-1 rounded-full">
                        {n.cat}
                      </span>
                      {n.pinned && (
                        <span className="bg-[#FEF9C3] text-[#854D0E] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Award size={10} /> برگزیده
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[#1B1E22] font-bold text-sm mb-2 leading-relaxed group-hover:text-[#F4512A] transition-colors line-clamp-2 flex-1">
                      {n.title}
                    </h3>
                    <p className="text-[#6F7378] text-xs leading-relaxed mb-4 line-clamp-2">{n.excerpt}</p>
                    <div className="flex items-center justify-between text-[#6F7378] text-xs">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {n.date}</span>
                      <Link to={`/news/${n.slug}`} className="text-[#F4512A] font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200">
                        ادامه مطلب <ChevronLeft size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: newsTotal - NEWS_VISIBLE + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setNewsIdx(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    newsIdx === i ? "w-6 h-2 bg-[#F4512A]" : "w-2 h-2 bg-[#D4D4D0] hover:bg-[#1B1E22]"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNewsIdx(i => Math.max(0, i - 1))}
                disabled={!newsCanPrev}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  newsCanPrev ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white" : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setNewsIdx(i => Math.min(newsTotal - NEWS_VISIBLE, i + 1))}
                disabled={!newsCanNext}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  newsCanNext ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white" : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REPORTS SECTION ──────────────────────────────────────────────────────────
function ReportsSection() {
  const { ref, vis } = useReveal();
  const [rptIdx, setRptIdx] = useState(0);
  const [rptContainerWidth, setRptContainerWidth] = useState(0);
  const rptContainerRef = useRef<HTMLDivElement>(null);
  const RPT_VISIBLE = 4;
  const RPT_GAP = 24;
  const CAROUSEL_REPORTS = REPORTS.slice(0, 8);
  const rptTotal = CAROUSEL_REPORTS.length;
  const rptCanPrev = rptIdx > 0;
  const rptCanNext = rptIdx + RPT_VISIBLE < rptTotal;
  const rptCardWidth = rptContainerWidth > 0 ? (rptContainerWidth - (RPT_VISIBLE - 1) * RPT_GAP) / RPT_VISIBLE : 0;
  const rptShiftPx = rptIdx * (rptCardWidth + RPT_GAP);

  useEffect(() => {
    const el = rptContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setRptContainerWidth(el.offsetWidth));
    ro.observe(el);
    setRptContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-44 bg-[#F7F7F5]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <Pill>گزارش‌ها</Pill>
              <h2 className="text-[#1B1E22] text-4xl lg:text-5xl font-black">گزارش‌ها و تحلیل‌ها</h2>
            </div>
            <Link to="/reports" className="mt-4 md:mt-0 flex items-center gap-2 text-[#F4512A] font-bold text-sm shrink-0">
              مشاهده همه گزارش‌ها <ChevronLeft size={16} />
            </Link>
          </motion.div>

          <div className="overflow-hidden" ref={rptContainerRef}>
            <motion.div
              className="flex"
              style={{ gap: RPT_GAP, direction: "ltr" }}
              animate={{ x: -rptShiftPx }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {CAROUSEL_REPORTS.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={vis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-[#E6E6E3] p-6 transition-all duration-300 group cursor-default flex flex-col flex-shrink-0"
                  style={{ width: rptCardWidth > 0 ? rptCardWidth : `calc((100% - ${(RPT_VISIBLE - 1) * RPT_GAP}px) / ${RPT_VISIBLE})`, direction: "rtl" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] flex items-center justify-center mb-4">
                    <FileText size={20} style={{ color: C.orange }} />
                  </div>
                  <h3 className="text-[#1B1E22] font-bold text-sm mt-1 mb-2 leading-relaxed group-hover:text-[#F4512A] transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-[#6F7378] text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{r.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E6E6E3]">
                    <span className="text-[#6F7378] text-xs flex items-center gap-1">
                      <Calendar size={11} /> {r.date}
                    </span>
                    <Link to={`/reports/${r.slug}`} className="flex items-center gap-1 text-[#F4512A] text-xs font-bold">
                      <Download size={12} /> مشاهده
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: rptTotal - RPT_VISIBLE + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRptIdx(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    rptIdx === i ? "w-6 h-2 bg-[#F4512A]" : "w-2 h-2 bg-[#D4D4D0] hover:bg-[#1B1E22]"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRptIdx(i => Math.min(rptTotal - RPT_VISIBLE, i + 1))}
                disabled={!rptCanNext}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  rptCanNext ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white" : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setRptIdx(i => Math.max(0, i - 1))}
                disabled={!rptCanPrev}
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
                  rptCanPrev ? "border-[#1B1E22] text-[#1B1E22] hover:bg-[#1B1E22] hover:text-white" : "border-[#E6E6E3] text-[#C4C4C4] cursor-not-allowed"
                )}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SUPPORT SECTION ──────────────────────────────────────────────────────────
function SupportSection() {
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

// ─── INVESTMENT WIZARD MODAL ─────────────────────────────────────────────────
const WIZARD_STEPS = [
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

function InvestmentWizardModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
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

// ─── PAGE HERO ────────────────────────────────────────────────────────────────
function PageHero({ title, sub, tag }: { title: string; sub?: string; tag?: string }) {
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

// ─── PAGES ────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <FundsSection />
      <ComparisonSection />
      <CalculatorSection />
      <AboutSection />
      <HowItWorksSection />
      <KnowledgeSection />
      <SupportSection />
      <FinalCTA />
    </>
  );
}

import { AboutPage } from "@/app/pages/AboutPage";
import { FundsPage, FundDetailPage } from "@/app/pages/FundsPage";
import { KnowledgePage } from "@/app/pages/KnowledgePage";
import { NewsPage } from "@/app/pages/NewsPage";
import { ReportsPage } from "@/app/pages/ReportsPage";
import { ContactPage } from "@/app/pages/ContactPage";
import { ArticlePage } from "@/app/pages/ArticlePage";
import { FAQPage } from "@/app/pages/FAQPage";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center pt-[76px]">
      <div className="text-center">
        <div className="text-[160px] font-black leading-none" style={{ color: C.num }}>۴۰۴</div>
        <h2 className="text-[#1B1E22] text-3xl font-black mb-3">صفحه مورد نظر یافت نشد</h2>
        <p className="text-[#6F7378] mb-8">این صفحه وجود ندارد یا منتقل شده است.</p>
        <Link to="/" className="bg-[#F4512A] hover:bg-[#D94321] text-white font-bold px-8 py-4 rounded-full transition-colors inline-block">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

function ScrollTop() {
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  return null;
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
function Layout() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col" style={{ fontFamily: FONT }}>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/funds" element={<FundsPage />} />
          <Route path="/funds/:id" element={<Navigate to="/funds" replace />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/knowledge/:cat" element={<KnowledgePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:slug" element={<ReportsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <SupportFAB />
    </div>
  );
}

const SUPPORT_TOPICS = [
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

function SupportFAB() {
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
      <div className="fixed bottom-6 left-6 z-[100]">
        <motion.button
          onClick={() => { setOpen(o => !o); setHasNewMsg(false); }}
          whileTap={{ scale: 0.94 }}
          aria-label="پشتیبانی"
          className="relative"
        >
          <motion.div
            animate={open ? { backgroundColor: "#1B1E22" } : { backgroundColor: "#F4512A" }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 px-5 h-14 rounded-full shadow-[0_8px_32px_rgba(244,81,42,0.45)]"
          >
            <motion.div
              animate={open ? { rotate: 90 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {open ? <X size={20} className="text-white" /> : <MessageCircle size={20} className="text-white" />}
            </motion.div>
            {!open && (
              <span className="text-white text-sm font-bold hidden sm:block">پشتیبانی</span>
            )}
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
      </div>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <ScrollTop />
      <Layout />
    </Router>
  );
}
