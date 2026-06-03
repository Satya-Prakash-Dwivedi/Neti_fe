import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { SEO } from "../components/SEO";
import { ArrowLeft, BookOpen, Clock, Target } from "lucide-react";

const RevisionSeries = () => {
  const revisionModules = courses.filter(c => c.category === "Revision Series");

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <SEO 
        title="Prelims Revision Series - Neti Academy" 
        description="High-yield revision modules for UPSC Prelims. Focused content for the final 30 days."
      />
      
      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/revision_hero.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-50%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] mb-12"
          >
            <ArrowLeft size={14} /> Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-8 leading-tight">
                Prelims <span className="text-blue-400 italic">Revision</span> Series
              </h1>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">
                The final sprint requires focus, not more information. We have compressed massive themes into high-yield modules designed for rapid revision and maximum recall.
              </p>
              
              <div className="flex flex-wrap gap-8 py-4">
                 {[
                   { icon: <Target className="text-blue-400" size={18} />, text: "Exam Centric" },
                   { icon: <Clock className="text-blue-400" size={18} />, text: "Rapid Recall" },
                   { icon: <BookOpen className="text-blue-400" size={18} />, text: "Curated Facts" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                     {item.icon}
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.text}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
               <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
               <img 
                 src="/images/revision_hero.png" 
                 alt="Revision Concept" 
                 className="relative z-10 rounded-[2.5rem] border border-white/10 shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
               />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {revisionModules.map((course) => (
            <div key={course.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-700 flex flex-col">
              {/* Image Preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={course.previewImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="px-4 py-2 bg-white text-slate-900 text-[10px] font-bold tracking-widest uppercase rounded-xl">
                    Open Module
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[9px] font-black text-blue-900 uppercase tracking-[0.2em]">Module 0{revisionModules.indexOf(course) + 1}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{course.duration}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors font-playfair leading-snug">
                  {course.title}
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-1 font-light line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                  <Link 
                    to={`/courses/${course.id}`}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] group/link hover:text-blue-900 transition-colors"
                  >
                    Enter Module 
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Free Access</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {revisionModules.length === 0 && (
          <div className="text-center py-32">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <BookOpen size={32} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-playfair font-bold text-slate-300">New modules are being prepared...</h3>
          </div>
        )}
      </div>

      {/* Philosophy Section */}
      <div className="bg-[#F8FAFC] py-32">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] mb-12">The Neti Method</h2>
            <p className="text-2xl font-playfair font-bold text-slate-800 leading-relaxed italic mb-8">
              "It is not about how much you can read, but how much you can recall under pressure. Our revision modules are built for that moment."
            </p>
            <div className="w-10 h-1 bg-blue-900/10 mx-auto"></div>
         </div>
      </div>
    </div>
  );
};

export default RevisionSeries;
