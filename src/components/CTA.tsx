import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
          {/* Subtle background decorative element */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -mr-40 -mt-40 group-hover:bg-blue-100/50 transition-colors"></div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-8 relative z-10 leading-tight">
            Want more perspective on <br className="hidden md:block" /> your strategy?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed relative z-10 italic">
            "Join our Plan B initiative and find the structural calm <br className="hidden md:block" /> you need for the UPSC marathon."
          </p>
          
          <div className="flex justify-center relative z-10">
            <Link 
              to="/plan-b" 
              className="w-full sm:w-auto px-12 py-5 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center gap-3 group/btn"
            >
              Explore Plan B Philosophy
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
