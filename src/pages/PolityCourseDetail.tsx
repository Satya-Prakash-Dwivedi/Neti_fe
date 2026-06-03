import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { ArrowLeft, Share2, CheckCircle2, Calendar, Clock, BookOpen, Users } from "lucide-react";

const PolityCourseDetail = () => {
  const shareUrl = window.location.href;

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard! You can now share this course.");
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Free Polity Classes for UPSC Prelims | Neti Academy" 
        description="Join our complete, free, live Polity course for UPSC Prelims. 65 sessions covering 10 strategic modules with active recall and PYQ integration."
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <Link 
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <header className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-white text-[8px] font-bold tracking-[0.3em] uppercase rounded-full mb-6">
                <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                Live Announcement
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 mb-6 leading-tight">
                Free Polity Classes <br /> Starting in June
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                A complete, free, live Polity course for UPSC Prelims, open to everyone. No fees. No registration cost. Just show up.
              </p>
            </header>

            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-slate-100 group relative">
               <img 
                 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
                 alt="Polity Class" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Status</p>
                      <p className="text-sm font-bold">Upcoming June</p>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Seats</p>
                      <p className="text-sm font-bold">Open to All</p>
                    </div>
                  </div>
               </div>
            </div>

            <article className="space-y-16">
              <section className="space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-900 flex items-center gap-3">
                   <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                   Why Polity, and Why Now?
                </h3>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    If you're starting UPSC preparation and don't know where to begin, Polity is the right answer. It appears in every single Prelims paper, averaging around 16 questions per year. It is the backbone of the GS paper and the most logical starting point for any serious aspirant.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {["Structured results for beginners", "Clear articles & judgments", "Connects all GS subjects", "High return on investment"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-800 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-900 flex items-center gap-3">
                   <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                   The Course Roadmap
                </h3>
                <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">10 Strategic Modules</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      "Historical Background", "FR & DPSP", "The Union Executive", "Parliament of India",
                      "The Judiciary", "Federal Structure", "Local Governance", "Constitutional Bodies",
                      "Governance Issues", "Final Revision"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-4 group/item">
                        <span className="text-xs font-mono text-slate-500 group-hover/item:text-blue-400 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                        <span className="text-sm font-medium tracking-tight group-hover/item:translate-x-1 transition-transform">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-2xl font-playfair font-bold text-slate-900 flex items-center gap-3">
                   <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                   Teaching Philosophy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { t: "Visual-first", d: "Flowcharts, tables, and mind maps to make complex articles unforgettable.", icon: <BookOpen className="text-blue-900" /> },
                    { t: "PYQ Integration", d: "Built into every lecture. We don't just teach; we show you how UPSC tests it.", icon: <Users className="text-blue-900" /> },
                    { t: "Active Recall", d: "3–5 MCQs at the end of every session to lock in what you've learned.", icon: <Clock className="text-blue-900" /> },
                    { t: "Priority Tagging", d: "We tag every concept as Must, Should, or Good-to-know to optimize your time.", icon: <Calendar className="text-blue-900" /> }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-xl transition-all duration-500 group">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">{item.t}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-light">{item.d}</p>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-12 space-y-8">
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10">
                <div className="space-y-8 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                      <Calendar className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-sm font-bold text-slate-900">6 Months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                      <BookOpen className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lectures</p>
                      <p className="text-sm font-bold text-slate-900">65 Sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                      <Users className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Frequency</p>
                      <p className="text-sm font-bold text-slate-900">2–3 per Week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Timing</p>
                      <p className="text-sm font-bold text-slate-900">6–7 AM Live</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <a 
                    href="https://forms.gle/ZV7oUdM9513CWegg9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-blue-900 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group mb-4 active:scale-95"
                  >
                    Join Priority List
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <button 
                    onClick={handleShare}
                    className="w-full py-5 bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
                    Share Resource
                  </button>
                </div>
              </div>

              <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 italic">The Neti Neti Principle</p>
                <p className="text-sm text-blue-100 leading-relaxed font-light">
                  Remove noise. Focus only on what moves you closer to clearing Prelims. Zero fees. Zero motivation fluff. Pure academic consistency.
                </p>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem]">
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">What You Need</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    A notebook (non-negotiable)
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    Bare Act of the Constitution
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 py-20 mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-3xl font-playfair font-bold text-white mb-8 leading-snug italic opacity-90">
             "Starting the first week of June, we're running a complete, free, live Polity course for UPSC Prelims."
           </h2>
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">Integrated Learning · Expert Mentorship</p>
        </div>
      </footer>
    </div>
  );
};

export default PolityCourseDetail;
