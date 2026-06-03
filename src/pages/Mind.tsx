import { Link } from "react-router-dom";
import { mindBlogs } from "../data/mindBlogs";

const Mind = () => {
  return (
    <div className="min-h-screen bg-[#FCF9F6] relative overflow-hidden py-16 px-6">

      {/* Peace / Calm Vector Aesthetic - Bottom Left */}
      <div className="absolute -left-20 bottom-10 w-[30rem] h-[30rem] text-[#F3E7E1] pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Ripples of peace */}
          <circle cx="100" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,5" />
          <circle cx="100" cy="150" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="150" r="20" fill="currentColor" opacity="0.3" />

          {/* Flowing Water / Balance Lines */}
          <path d="M -20 150 Q 50 110 100 150 T 220 150" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
          <path d="M -20 170 Q 50 140 100 170 T 220 170" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Focus / Mind / Work Vector Aesthetic - Top Right */}
      <div className="absolute -right-24 -top-10 w-[35rem] h-[35rem] text-[#F3E7E1] pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Expanding layers of focus */}
          <path d="M 150 50 A 100 100 0 0 0 50 150" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M 170 30 A 140 140 0 0 0 30 170" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,8" />
          <path d="M 190 10 A 180 180 0 0 0 10 190" fill="none" stroke="currentColor" strokeWidth="0.5" />

          {/* Core Idea / Nucleus */}
          <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.5" />

          {/* Alignment / Structure Rays (Work) */}
          <path d="M 100 100 L 150 50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <path d="M 100 100 L 170 30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M 100 100 L 190 10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-800 mb-6">
            The <span className="text-[#E07A5F]">Mind</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Not generic motivation. Real frameworks to understand why you do the things you do, think the things you think, and feel the things you feel during exam preparation.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mindBlogs.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#F4E3D7] group flex flex-col">
              <Link to={`/mind/${post.id}`} className="block overflow-hidden relative">
                <div className="absolute inset-0 bg-[#E07A5F]/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={post.image} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
              </Link>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-1.5 bg-[#FFF0EA] text-[#E07A5F] text-xs font-bold uppercase tracking-wider rounded-full flex-shrink-0">
                    Mental Health
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {post.readTime}
                  </span>
                </div>

                <Link to={`/mind/${post.id}`}>
                  <h2 className="text-2xl font-playfair font-bold text-slate-800 mb-4 group-hover:text-[#E07A5F] transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <Link to={`/mind/${post.id}`} className="text-sm font-bold text-[#E07A5F] group-hover:text-[#C8664D] transition-colors self-start flex items-center gap-2">
                  Read Full Concept
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mind;
