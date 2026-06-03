import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { courses, type Course } from "../data/courses";
import { SEO } from "../components/SEO";
import { FileDown, ShieldAlert, ArrowLeft, Share2 } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const found = courses.find((c) => c.id === id);
    setCourse(found || null);
  }, [id]);

  // Anti-copy handler for premium material
  const handleCopy = (e: React.ClipboardEvent) => {
    if (course?.category === "Magazine" || course?.category === "Revision Series") {
      e.preventDefault();
      alert("Copying content is disabled to protect our intellectual property. You can share the link instead.");
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Loading Material...</p>
        </div>
      </div>
    );
  }

  // Article-style layout for Magazines and Revision Series
  if (course.category === "Magazine" || course.category === "Revision Series") {
    return (
      <div 
        className="min-h-screen bg-white" 
        onCopy={handleCopy} 
        onContextMenu={(e) => (course.category === "Magazine" || course.category === "Revision Series") && e.preventDefault()}
      >
        <SEO 
          title={`${course.title} | Neti Academy`} 
          description={course.description}
          ogType="article"
          canonical={window.location.href}
          ogImage={course.previewImage}
        />
        
        <div className="max-w-4xl mx-auto px-6 py-16">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {course.category}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {course.duration} • {course.level}
              </span>
            </div>
            <h1 className="text-5xl font-playfair font-bold text-slate-900 mb-8 leading-tight">
              {course.title}
            </h1>
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-slate-100">
               <img src={course.previewImage} alt={course.title} className="w-full h-full object-cover" />
            </div>
          </header>

          <article className="prose prose-lg prose-slate max-w-none select-none">
             <div className="text-slate-700 leading-relaxed font-inter space-y-8">
                {course.content?.split('\n').map((para, idx) => {
                   if (!para.trim()) return null;

                   const parseInline = (text: string) => {
                     let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#1E3A8A] font-bold underline decoration-blue-200 underline-offset-4 hover:text-blue-700 transition-colors">$1</a>');
                     return { __html: html };
                   };

                   if (para.startsWith('### ')) {
                       return <h3 key={idx} className="text-2xl font-bold font-playfair text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-2" dangerouslySetInnerHTML={parseInline(para.replace('### ', ''))} />
                   }
                   
                   if (para.startsWith('- ') || /^\d+\. /.test(para)) {
                       return <p key={idx} className="ml-4 flex items-start gap-3">
                          <span className="text-blue-900 font-bold">•</span>
                          <span dangerouslySetInnerHTML={parseInline(para.replace(/^- |^\d+\. /, ''))} />
                       </p>
                   }
                   return <p key={idx} className="text-lg" dangerouslySetInnerHTML={parseInline(para)} />
                })}
             </div>

             {/* Secure Download Section */}
             <div className="mt-20 p-12 bg-gradient-to-br from-slate-900 to-[#1E3A8A] rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-700 group-hover:scale-110">
                  <FileDown size={180} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-blue-300 mb-6">
                    <ShieldAlert size={24} />
                    <span className="text-xs font-bold tracking-[0.3em] uppercase">Secure Student Access</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 font-playfair">Download Material</h3>
                  <p className="text-slate-300 mb-10 text-base max-w-xl leading-relaxed">
                    This premium PDF is prepared for offline revision. Text copying and editing have been restricted to maintain the integrity of our research.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={course.pdfUrl}
                      download
                      className="flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                      <FileDown size={20} />
                      Download PDF
                    </a>
                  </div>
                </div>
             </div>
          </article>

          <div className="mt-20 pt-12 border-t border-slate-100 flex items-center justify-between">
             <Link 
               to="/courses"
               className="text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors flex items-center gap-2"
             >
               <ArrowLeft size={18} />
               Back to Courses
             </Link>
             <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors flex items-center gap-2 group"
             >
                <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                Share Resource
             </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Split-View Layout for other courses
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <SEO 
        title={`${course.title} | Neti Academy`} 
        description={course.description}
        ogType="article"
        canonical={window.location.href}
        ogImage={course.previewImage}
      />

      {/* Left Side: PDF Viewer */}
      <div className="w-full lg:w-2/3 h-[60vh] lg:h-screen bg-slate-100 border-r border-slate-200 sticky top-0">
        <iframe
          src={`${course.pdfUrl}#toolbar=0`}
          className="w-full h-full"
          title={course.title}
        ></iframe>
      </div>

      {/* Right Side: Course Details */}
      <div className="w-full lg:w-1/3 flex flex-col h-full lg:min-h-screen">
        <div className="p-8 lg:p-12 flex-1 overflow-y-auto">
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors mb-12 uppercase tracking-widest"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Go Back
          </button>

          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {course.category}
              </span>
              <h1 className="text-4xl font-playfair font-bold text-slate-900 leading-tight mb-4">
                {course.title}
              </h1>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                <span>{course.level}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">About this course</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {course.description}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Lifetime Access</p>
                    <p className="text-3xl font-bold text-slate-900">₹{course.price}</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <ShieldAlert className="text-blue-900" />
                  </div>
                </div>

                <button className="w-full py-5 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group">
                  Enroll Now
                  <FileDown className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="p-8 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between opacity-50">
            <span className="text-[10px] font-bold tracking-tighter text-blue-900">NETI ACADEMY</span>
            <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-blue-900"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CourseDetail;
