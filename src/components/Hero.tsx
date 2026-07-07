import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
  const latestDigest = recentDigests.length > 0 ? recentDigests[0] : null;

  const handleDailyQuizClick = () => {
    navigate('/ca-quiz');
  };

  return (
    <section className="pt-4 md:pt-8 pb-12 md:pb-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-blue-900 mb-6 md:mb-8">
          Our Philosophy
        </h1>

        <div className="text-slate-600 leading-relaxed md:leading-loose text-sm md:text-base font-inter">
          {/* Right Floated Content - Recall Hub Feature Card (Compact & Shifted Up to Eliminate Left Gap) */}
          <div className="w-full md:w-[380px] lg:w-[420px] md:float-right md:ml-8 md:-mt-16 lg:-mt-20 md:mb-6 mb-8">
            <div className="bg-white text-slate-900 p-6 md:p-7 rounded-[2rem] md:rounded-[2.5rem] shadow-lg relative overflow-hidden group border border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              {/* Soft subtle glow matching theme accents */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl group-hover:bg-blue-200/60 transition-all duration-700"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50/80 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-all duration-700"></div>

              <div className="relative z-10 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-blue-900 font-inter">Active Recall Engine</span>
                </div>

                <h2 className="text-xl md:text-2xl font-playfair font-bold leading-tight tracking-tight text-slate-900">
                  Recall Hub: Test Memory, Not Just Recognition
                </h2>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter">
                  Practice structured, chapter-wise MCQs designed specifically for competitive examinations. Get instant review analytics and comprehensive solution breakdowns before exam day.
                </p>

                {/* Feature pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-slate-50/80 border border-blue-900/15 rounded-xl p-2.5 group-hover:border-blue-900/30 transition-colors shadow-sm">
                    <p className="text-[9px] font-bold text-blue-900 uppercase tracking-wider">Chapter-Wise</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">Structured MCQs</p>
                  </div>
                  <div className="bg-slate-50/80 border border-blue-900/15 rounded-xl p-2.5 group-hover:border-blue-900/30 transition-colors shadow-sm">
                    <p className="text-[9px] font-bold text-blue-900 uppercase tracking-wider">Instant Review</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">Detailed Explanations</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block font-inter">Ready to practice?</span>
                  <span className="text-xs font-bold text-slate-900 font-inter">Enter practice arena</span>
                </div>
                <Link
                  to="/recall"
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-blue-900/15 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 shrink-0"
                >
                  Launch Hub <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <p className="first-letter:text-5xl first-letter:font-playfair first-letter:font-bold first-letter:text-blue-900 first-letter:mr-3 first-letter:float-left mb-8 md:mb-12">
            Most aspirants don’t fail because they studied too little. They fail because they studied too much of the wrong things — too many books, too many notes, too many sources pulling them in different directions. The problem isn’t effort. It’s <span className="text-slate-900 font-bold accent-slate-900 italic">noise</span>. And noise doesn’t just waste time. It breeds anxiety. When everything feels important, nothing feels clear. You read more, retain less, and slowly lose confidence in your own preparation.
          </p>

          <p className="mb-8 md:mb-12">
            Neti Academy is built on a simple idea borrowed from one of the oldest philosophical traditions in the world. <span className="text-blue-900 font-bold">“नेति नेति”</span> — Brihadaranyaka Upanishad. Not this. Not this. In Advaita Vedanta, Neti Neti is a method of arriving at truth by removing what is not essential. You don’t find clarity by adding more. You find it by stripping away what doesn’t belong.
          </p>

          <div className="clear-both bg-slate-50 p-6 md:p-10 rounded-3xl border-l-4 border-blue-900 italic text-slate-700 leading-relaxed mt-6">
            We apply this directly to how you prepare. Not more PDFs. Not more optional readings. Not another YouTube playlist. Instead — fewer, better resources. Clear structure. Focused practice. A preparation path you can trust. When the clutter is gone, something else happens. The stress drops. You stop comparing your strategy with everyone else’s. You stop hoarding resources you’ll never read. Your mind gets quieter — and a quiet mind learns faster and thinks sharper. <span className="text-blue-900 font-bold not-italic font-inter block mt-4 text-base md:text-lg">Clarity, discipline, and emotional balance are not extras. They are the foundation.</span>
          </div>
        </div>

        {/* DO NOT DELETE: Temporarily commented out Current Affairs widget for future release */}
        {/*
        <div className="flex-1 w-full max-w-2xl mx-auto md:mx-0">
          <div className="bg-slate-50 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden group">
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
        */}

        {/* Daily Quiz Banner */}
        <div 
          onClick={handleDailyQuizClick}
          className="clear-both mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-blue-50 text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10 shadow-sm">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                 Daily Challenge
               </div>
               <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
                 Today's Quiz
               </h3>
               <p className="text-blue-100 text-sm md:text-base max-w-xl font-inter">
                 Test your knowledge with high-yield MCQs handpicked for today. Instant results and crisp explanations included.
               </p>
             </div>
             <button className="shrink-0 bg-white text-blue-900 font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-lg group-hover:bg-blue-50 group-hover:scale-105 transition-all font-inter">
               Explore Quizzes →
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
