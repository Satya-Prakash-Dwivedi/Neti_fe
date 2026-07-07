import { SEO } from "../components/SEO";
import { BookOpen, Bell, ArrowRight } from "lucide-react";

export const CAMagazine = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <SEO title="Monthly Magazine - Current Affairs" description="Monthly Current Affairs Magazine - Coming Soon" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-10 md:p-16 text-center relative overflow-hidden group max-w-xl mx-auto">
          
          {/* Accent Border */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-900"></div>

          {/* Icon */}
          <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform duration-500">
            <BookOpen className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            In Development
          </div>

          <h1 className="text-3xl md:text-4xl font-playfair font-black text-slate-900 mb-4 tracking-tight">
            Monthly Magazine
          </h1>
          
          <p className="text-sm md:text-base text-slate-600 font-inter mb-6 leading-relaxed">
            We are meticulously curating the most important current affairs into a comprehensive, high-yield digital magazine. Perfect for your final revisions.
          </p>

          <div className="inline-block px-6 py-2.5 bg-slate-100 text-slate-500 font-bold rounded-full text-xs uppercase tracking-wider">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};
