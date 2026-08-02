import { Link, useParams } from "react-router";
import { Clock, Calendar, Award, BookOpen, ChevronLeft } from "lucide-react";
import { cn } from "@/app/shared";
import { FinalCTA } from "@/app/components/PageLayout";
import { ARTICLES } from "@/app/data";
import { ArticleCard } from "@/app/pages/KnowledgePage";

function ArticleBodyRenderer({ body }: { body: string }) {
  const paragraphs = body.trim().split("\n\n");
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="text-[#1B1E22] text-xl font-black mt-4 mb-1 leading-snug border-r-4 border-[#F4512A] pr-4">
              {block.replace("## ", "")}
            </h2>
          );
        }
        if (block.startsWith("| ")) {
          const rows = block.split("\n").filter(r => !r.match(/^\|[-\s|]+\|$/));
          const [header, ...body] = rows;
          const cols = header.split("|").filter(Boolean).map(c => c.trim());
          return (
            <div key={i} className="overflow-x-auto rounded-2xl border border-[#E6E6E3]">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F5]">
                  <tr>{cols.map((c, ci) => <th key={ci} className="text-right px-4 py-3 text-[#1B1E22] font-bold text-xs">{c}</th>)}</tr>
                </thead>
                <tbody>
                  {body.map((row, ri) => {
                    const cells = row.split("|").filter(Boolean).map(c => c.trim());
                    return (
                      <tr key={ri} className="border-t border-[#E6E6E3]">
                        {cells.map((cell, ci) => <td key={ci} className="px-4 py-3 text-[#6F7378] text-xs">{cell}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={i} className="text-[#4A4E55] text-base leading-8">{block}</p>
        );
      })}
    </div>
  );
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);
  const related = ARTICLES.filter(a => a.slug !== slug && a.cat === article?.cat).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6F7378] text-lg font-semibold mb-4">مقاله‌ای یافت نشد</p>
          <Link to="/knowledge" className="text-[#F4512A] font-bold flex items-center gap-1 justify-center">
            <ChevronLeft size={14} className="rotate-180" /> بازگشت به مرکز دانش
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[420px] bg-[#1B1E22] overflow-hidden">
        <img
          src={article.thumb}
          alt={article.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E22] via-[#1B1E22]/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[860px] mx-auto w-full px-5 lg:px-10 pb-12">
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ChevronLeft size={14} className="rotate-180" /> مرکز دانش
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#F4512A] text-white text-xs font-bold px-3 py-1 rounded-full">{article.cat}</span>
              {article.featured && (
                <span className="bg-[#C58A24] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Award size={11} /> برگزیده
                </span>
              )}
            </div>
            <h1 className="text-white text-3xl lg:text-4xl font-black leading-snug mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {article.time} مطالعه</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-[#F7F7F5]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-12">
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-8 mb-8">
                <p className="text-[#1B1E22] text-lg leading-8 font-medium">{article.desc}</p>
              </div>
              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-8 mb-8">
                <ArticleBodyRenderer body={article.body} />
              </div>
              <div className="flex items-center gap-3 flex-wrap mb-12">
                <span className="text-[#9B9FA5] text-sm">دسته‌بندی:</span>
                <span className="bg-[#F4512A]/10 text-[#F4512A] text-xs font-bold px-3 py-1.5 rounded-full">{article.cat}</span>
              </div>
              {related.length > 0 && (
                <div>
                  <h3 className="text-[#1B1E22] font-black text-xl mb-6">مطالب مرتبط</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {related.map((a, i) => <ArticleCard key={a.id} a={a} i={i} />)}
                  </div>
                </div>
              )}
            </article>

            <aside className="w-full lg:w-[260px] shrink-0">
              <div className="bg-white rounded-3xl border border-[#E6E6E3] p-6 mb-6 sticky top-24">
                <h3 className="text-[#1B1E22] font-black text-sm mb-4 flex items-center gap-2">
                  <BookOpen size={15} className="text-[#F4512A]" /> مطالب همین دسته
                </h3>
                <ul className="flex flex-col gap-3">
                  {ARTICLES.filter(a => a.cat === article.cat && a.slug !== slug).slice(0, 5).map(a => (
                    <li key={a.id}>
                      <Link
                        to={`/article/${a.slug}`}
                        className="flex items-start gap-2 group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F4512A] mt-1.5 shrink-0" />
                        <span className={cn("text-[#1B1E22] text-xs leading-relaxed font-semibold group-hover:text-[#F4512A] transition-colors line-clamp-2")}>
                          {a.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/knowledge"
                  className="mt-5 w-full h-10 rounded-xl border-2 border-[#F4512A] text-[#F4512A] text-sm font-bold flex items-center justify-center gap-1 hover:bg-[#F4512A] hover:text-white transition-all duration-200"
                >
                  همه مطالب <ChevronLeft size={13} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
