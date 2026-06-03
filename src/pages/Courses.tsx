import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { SEO } from "../components/SEO";

const Courses = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <SEO 
        title="Premium Courses - Neti Academy" 
        description="Explore our curated collection of high-quality learning resources for UPSC and other competitive exams."
      />
      
      {/* Hero Section with Glassmorphism Effect */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(59,130,246,0.08)_0%,_transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 rounded-2xl shadow-sm">
             <span className="flex h-1.5 w-1.5 rounded-full bg-blue-900 animate-pulse"></span>
             <span className="text-[9px] font-bold tracking-[0.2em] text-blue-900 uppercase">Academy Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-slate-900 mb-6 tracking-tighter leading-[1.1]">
            Curated <span className="text-blue-900 underline decoration-blue-100 underline-offset-8">Excellence</span> <br />
            For Serious Aspirants
          </h1>
          
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-light">
            Beyond textbooks. A holistic learning ecosystem built to transform your preparation into clear results.
          </p>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Container 0: Free Polity Classes */}
          <div className="group relative bg-white rounded-[2rem] border border-blue-100 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 flex flex-col">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200" 
                alt="Free Polity Classes" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent"></div>
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="px-3 py-1 bg-blue-900/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10">
                  Live Classes
                </span>
                <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10 shadow-sm">
                  Free
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-[8px] font-black text-blue-900 uppercase tracking-[0.2em]">Live Program</span>
                 <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">65 Sessions</span>
              </div>
              
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors">
                Free Polity Classes <br />for UPSC Prelims
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-6 flex-1 font-inter text-xs font-light">
                A complete, free, live Polity course starting June. Built for recall with roadmap and teaching method.
              </p>
              
              <Link 
                to="/courses/free-polity-classes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-[9px] uppercase tracking-[0.2em] rounded-lg hover:bg-blue-900 transition-all shadow-lg active:scale-95 group/btn w-fit"
              >
                Open Details 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          {/* Container 1: Environment Magazine */}
          <div className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 flex flex-col">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200" 
                alt="Environment Magazine" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="px-3 py-1 bg-blue-900/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10">
                  New Release
                </span>
                <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10 shadow-sm">
                  Free
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-[8px] font-black text-blue-900 uppercase tracking-[0.2em]">Magazines</span>
                 <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest underline underline-offset-4 decoration-slate-100">70 Pages</span>
              </div>
              
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors">
                Environment & Ecology <br />Prelims Magazine
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-6 flex-1 font-inter text-xs font-light">
                Our most requested resource. A precision-engineered 18-month compilation tailored for the 2026 exam cycle.
              </p>
              
              <Link 
                to="/courses/neti-prelims-environment-ecology-magazine"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-[9px] uppercase tracking-[0.2em] rounded-lg hover:bg-blue-900 transition-all shadow-lg active:scale-95 group/btn w-fit"
              >
                Open Details 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Container 2: Revision Series */}
          <div className="group relative bg-[#FAFAFA] rounded-[2rem] border border-slate-200/60 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 flex flex-col">
            <div className="relative aspect-[21/9] overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
              <img 
                src="/images/revision_hero.png" 
                alt="Revision Series" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10">
                  Revision Hub
                </span>
                <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10 shadow-sm">
                  Free
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Neti Prelims</span>
                 <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                 <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Revision Series</span>
              </div>
              
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-3 leading-tight">
                Prelims <br />Revision Series
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-6 flex-1 font-inter text-xs font-light">
                Topic-specific modules designed for the final sprint. Concise, factual, and extremely exam-relevant.
              </p>
              
              <Link 
                to="/revision-series"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold text-[9px] uppercase tracking-[0.2em] rounded-lg hover:border-blue-900 hover:text-blue-900 transition-all shadow-sm active:scale-95 group/btn w-fit"
              >
                Explore Modules 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Other Academic Courses Section (Optional) */}
        <div className="pt-16 border-t border-slate-100 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 text-[8px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-900"></span>
            Educational Programs
          </div>
          
          <h2 className="text-5xl font-playfair font-bold text-slate-900 mb-8 leading-tight">
            Upcoming <span className="text-blue-900 italic">Prelims</span> and Polity
          </h2>
          
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
            Our full-length academic programs are engineered for depth. Experience structured learning modules covering core subjects with dedicated expert mentorship.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.filter(c => c.category !== "Magazine" && c.category !== "Revision Series").map((course) => (
              <div key={course.id} className="group bg-white text-left rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="aspect-video overflow-hidden">
                  <img src={course.previewImage} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors font-playfair">{course.title}</h4>
                  <p className="text-slate-500 text-xs mb-8 font-light line-clamp-2">{course.description}</p>
                  <Link to={`/courses/${course.id}`} className="text-blue-900 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quote with Rich Aesthetics */}
      <div className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-12 h-12 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-10 opacity-30">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <h2 className="text-4xl font-playfair font-bold text-white mb-10 leading-snug tracking-tight italic opacity-90">
            "Education is the most powerful weapon which you can use to change the world."
          </h2>
          <div className="flex items-center justify-center gap-12 pt-8">
             <div className="text-slate-600 font-bold text-[9px] uppercase tracking-[0.4em]">Integrated Learning</div>
             <div className="text-slate-600 font-bold text-[9px] uppercase tracking-[0.4em]">Expert Mentorship</div>
             <div className="text-slate-600 font-bold text-[9px] uppercase tracking-[0.4em]">Global Standards</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
