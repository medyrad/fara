import { useState } from "react";
import { motion } from "motion/react";
import {
  Globe, BarChart2, Users, MessageCircle, TrendingUp,
  Calendar, Award, ChevronLeft, ChevronRight, Search, X,
} from "lucide-react";
import { FONT, cn, toFA } from "@/app/shared";
import { PageHero, FinalCTA } from "@/app/components/PageLayout";
import { NEWS } from "@/app/data";
import { cardImg } from "@/assets/cards/cardImages";

const NEWS_CATS = ["همه", "اخبار صندوق", "اخبار شرکت", "اطلاعیه", "تحلیل بازار"];
const NEWS_PER_PAGE = 9;

const NEWS_CAT_ICONS: Record<string, React.ReactNode> = {
  "همه": <Globe size={14} />,
  "اخبار صندوق": <BarChart2 size={14} />,
  "اخبار شرکت": <Users size={14} />,
  "اطلاعیه": <MessageCircle size={14} />,
  "تحلیل بازار": <TrendingUp size={14} />,
};

function NewsCard({ n, i }: { n: typeof NEWS[0]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl border border-[#E6E6E3] overflow-hidden group transition-all duration-300 flex flex-col cursor-default"
    >
      <div className="relative h-44 overflow-hidden bg-[#1B1E22]">
        <img
          src={cardImg(n.thumb)}
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
        <div className="flex items-center justify-between">
          <span className="text-[#9B9FA5] text-xs flex items-center gap-1">
            <Calendar size={11} /> {n.date}
          </span>
          <span className="text-[#F4512A] text-xs font-bold flex items-center gap-1">
            ادامه مطلب <ChevronLeft size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function NewsPage() {
  const [activeCat, setActiveCat] = useState("همه");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const pinned = NEWS.filter(n => n.pinned);

  const filtered = NEWS.filter(n => {
    const matchCat = activeCat === "همه" || n.cat === activeCat;
    const matchQ = query.trim() === "" || n.title.includes(query) || n.excerpt.includes(query);
    return matchCat && matchQ;
  });

  const totalPages = Math.ceil(filtered.length / NEWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * NEWS_PER_PAGE, page * NEWS_PER_PAGE);

  const handleCat = (cat: string) => { setActiveCat(cat); setPage(1); };
  const handleQuery = (q: string) => { setQuery(q); setPage(1); };

  const newsCatCounts = NEWS_CATS.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "همه" ? NEWS.length : NEWS.filter(n => n.cat === cat).length;
    return acc;
  }, {});

  return (
    <>
      <PageHero tag="اخبار و اطلاعیه‌ها" title="آخرین اخبار فراسود" sub="جدیدترین اخبار بازار سرمایه، اطلاعیه‌ها و فعالیت‌های فراسود." />

      <section className="py-20 bg-[#F7F7F5] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-5">
                <h3 className="text-[#1B1E22] font-black text-sm mb-3">جستجو در اخبار</h3>
                <div className="relative">
                  <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B9FA5]" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => handleQuery(e.target.value)}
                    placeholder="عنوان یا کلیدواژه..."
                    className="w-full h-10 pr-9 pl-4 rounded-xl border border-[#E6E6E3] text-sm text-[#1B1E22] placeholder:text-[#9B9FA5] focus:outline-none focus:border-[#F4512A] transition-colors"
                    style={{ fontFamily: FONT }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-5">
                <h3 className="text-[#1B1E22] font-black text-sm mb-4">دسته‌بندی‌ها</h3>
                <ul className="flex flex-col gap-1">
                  {NEWS_CATS.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCat(cat)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-right",
                          activeCat === cat
                            ? "bg-[#F4512A] text-white"
                            : "text-[#6F7378] hover:bg-[#F7F7F5] hover:text-[#1B1E22]"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {NEWS_CAT_ICONS[cat]}
                          {cat}
                        </span>
                        <span className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-full",
                          activeCat === cat ? "bg-white/20 text-white" : "bg-[#F7F7F5] text-[#9B9FA5]"
                        )}>
                          {newsCatCounts[cat]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={15} className="text-[#C58A24]" />
                  <h3 className="text-[#1B1E22] font-black text-sm">اخبار مهم</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {pinned.map(n => (
                    <li key={n.id} className="group cursor-default">
                      <div className="flex gap-3">
                        <img
                          src={cardImg(n.thumb)}
                          alt={n.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#F7F7F5]"
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                        <div className="min-w-0">
                          <p className="text-[#1B1E22] text-xs leading-relaxed font-semibold group-hover:text-[#F4512A] transition-colors line-clamp-2">
                            {n.title}
                          </p>
                          <span className="text-[#9B9FA5] text-[10px] mt-0.5 block">{n.cat} · {n.date}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#6F7378] text-sm">
                  {toFA(filtered.length)} خبر یافت شد
                  {activeCat !== "همه" && <span className="text-[#1B1E22] font-bold"> در «{activeCat}»</span>}
                </p>
                {query && (
                  <button
                    onClick={() => handleQuery("")}
                    className="text-xs text-[#F4512A] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <X size={12} /> پاک کردن جستجو
                  </button>
                )}
              </div>

              {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((n, i) => <NewsCard key={n.id} n={n} i={i} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Search size={40} className="text-[#E6E6E3] mb-4" />
                  <p className="text-[#6F7378] font-semibold">خبری یافت نشد</p>
                  <p className="text-[#9B9FA5] text-sm mt-1">عبارت دیگری امتحان کنید یا فیلتر را تغییر دهید</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-xl border border-[#E6E6E3] bg-white text-[#6F7378] flex items-center justify-center hover:border-[#F4512A] hover:text-[#F4512A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                        p === page
                          ? "bg-[#F4512A] text-white"
                          : "border border-[#E6E6E3] bg-white text-[#6F7378] hover:border-[#F4512A] hover:text-[#F4512A]"
                      )}
                    >
                      {toFA(p)}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-xl border border-[#E6E6E3] bg-white text-[#6F7378] flex items-center justify-center hover:border-[#F4512A] hover:text-[#F4512A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
