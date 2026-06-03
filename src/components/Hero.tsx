import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { DailyDigest } from "../data/currentAffairs";

/**
 * Hero Component
 * 
 * Featuring the Neti Neti philosophy on the left and a dynamic 
 * Daily Current Affairs feed on the right (descending order).
 */

const Hero = () => {
  const [dailyDigests, setDailyDigests] = useState<DailyDigest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/current-affairs/`)
      .then(res => {
        setDailyDigests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recent current affairs:", err);
        setLoading(false);
      });
  }, []);

  // Django returns results sorted newest-first, so we simply take the first 7
  const recentDigests = Array.isArray(dailyDigests) ? dailyDigests.slice(0, 7) : [];

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-10 md:gap-16 px-6">

        {/* Left Content - Philosophy */}
        <div className="flex-1 flex flex-col justify-center py-6 md:py-0">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-8 md:mb-12">
            Our Philosophy
          </h1>

          <div className="space-y-8 md:space-y-12 text-slate-600 leading-relaxed md:leading-loose text-sm md:text-base font-inter max-w-xl mx-auto md:mx-0">
            <p className="first-letter:text-5xl first-letter:font-playfair first-letter:font-bold first-letter:text-blue-900 first-letter:mr-3 first-letter:float-left">
              Most aspirants don’t fail because they studied too little. They fail because they studied too much of the wrong things — too many books, too many notes, too many sources pulling them in different directions. The problem isn’t effort. It’s <span className="text-slate-900 font-bold accent-slate-900 italic">noise</span>. And noise doesn’t just waste time. It breeds anxiety. When everything feels important, nothing feels clear. You read more, retain less, and slowly lose confidence in your own preparation.
            </p>

            <p>
              Neti Academy is built on a simple idea borrowed from one of the oldest philosophical traditions in the world. <span className="text-blue-900 font-bold">“नेति नेति”</span> — Brihadaranyaka Upanishad. Not this. Not this. In Advaita Vedanta, Neti Neti is a method of arriving at truth by removing what is not essential. You don’t find clarity by adding more. You find it by stripping away what doesn’t belong.
            </p>

            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border-l-4 border-blue-900 italic text-slate-700 leading-relaxed">
              We apply this directly to how you prepare. Not more PDFs. Not more optional readings. Not another YouTube playlist. Instead — fewer, better resources. Clear structure. Focused practice. A preparation path you can trust. When the clutter is gone, something else happens. The stress drops. You stop comparing your strategy with everyone else’s. You stop hoarding resources you’ll never read. Your mind gets quieter — and a quiet mind learns faster and thinks sharper. <span className="text-blue-900 font-bold not-italic font-inter block mt-4 text-base md:text-lg">Clarity, discipline, and emotional balance are not extras. They are the foundation.</span>
            </div>
          </div>
        </div>

        {/* Right Content - Daily Dynamic Update (7 Days) */}
        <div className="flex-1 w-full max-w-2xl mx-auto md:mx-0">
          <div className="bg-slate-50 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden group">
            {/* Soft decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl group-hover:bg-blue-100/60 transition-colors duration-700"></div>

            <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-slate-200 pb-6 md:pb-8 relative z-10">
              <div>
                <h3 className="text-xl md:text-3xl font-playfair font-bold text-slate-900 leading-tight">Daily Analysis</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                  </span>
                  <p className="text-[9px] md:text-[10px] text-blue-600 font-bold tracking-[0.2em] uppercase">
                    New Update Daily at 9 PM
                  </p>
                </div>
              </div>
              <Link to="/current-affairs" className="text-[9px] md:text-[10px] font-bold text-slate-400 hover:text-blue-900 transition-colors border border-slate-200 px-3 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-white flex items-center gap-2 uppercase tracking-widest whitespace-nowrap">
                All Updates <span>→</span>
              </Link>
            </div>

            <div className="space-y-8 md:space-y-10 flex-1 relative z-10">
              {loading ? (
                <div className="animate-pulse flex flex-col items-center py-10">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mb-3"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-36 bg-slate-100 rounded"></div>
                </div>
              ) : recentDigests.length > 0 ? (
                recentDigests.map((digest) => (
                  <Link key={digest.id} to={`/current-affairs/${digest.id}`} className="block group/item">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex flex-col items-center min-w-[3rem] md:min-w-[3.5rem]">
                        <span className="text-[8px] md:text-[9px] text-blue-600 font-bold tracking-[0.2em] uppercase opacity-60 group-hover/item:opacity-100 transition-opacity">
                          {(digest.day || "").slice(0, 3)}
                        </span>
                        <span className="text-2xl md:text-3xl font-playfair font-bold leading-none mt-2 text-slate-900">
                          {(digest.date || "01").split(' ')[0]}
                        </span>
                      </div>
                      <div className="border-l border-slate-200 pl-4 md:pl-6 space-y-2 md:space-y-3">
                        <h4 className="text-sm md:text-base font-bold text-slate-800 group-hover/item:text-blue-900 transition-colors leading-snug line-clamp-2">
                          {digest.topics?.[0]?.title || "Daily Analysis Update"}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-600/30 rounded-full group-hover/item:scale-125 transition-transform group-hover/item:bg-blue-600"></span>
                          <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            {digest.topics?.length || 0} Critical Focus Areas
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-slate-400 italic text-sm py-10 text-center">
                  Library is being updated with today's digests.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
