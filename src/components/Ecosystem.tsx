import { Link } from "react-router-dom";
import { courses } from "../data/courses";

const Ecosystem = () => {
  const latestRevision = courses.filter(c => c.category === "Revision Series").pop();
  const environmentMagazine = courses.find(c => c.id === "neti-prelims-environment-ecology-magazine");
  
  const items = [
    {
      title: "Environment & Ecology Prelims Magazine",
      text: "Our most requested resource. A precision-engineered 18-month compilation tailored for the 2026 exam cycle.",
      icon: "🌿",
      status: "Active",
      path: environmentMagazine ? environmentMagazine.pdfUrl : "/courses",
      btnText: "Download Magazine",
      isInternal: false
    },
    {
      title: latestRevision ? latestRevision.title : "Revision Series",
      text: latestRevision 
        ? `Latest specialized revision module: ${latestRevision.description}`
        : "Quick-read revision modules covering high-yield topics for UPSC Prelims.",
      icon: "📥",
      status: "Active",
      path: latestRevision ? latestRevision.pdfUrl : "/courses",
      btnText: "Download PDF",
      isInternal: !latestRevision?.pdfUrl
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900">
            Comprehensive Study Ecosystem
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto italic font-medium">
            "Everything you need to crack Prelims and Mains in one focused platform."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div 
              key={item.title} 
              className="p-8 md:p-12 rounded-3xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:shadow-xl transition-all group relative flex flex-col h-full"
            >
              <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110 duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 mb-4 leading-tight">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8 flex-1">
                {item.text}
              </p>

              {item.isInternal ? (
                <Link 
                  to={item.path} 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                >
                  {item.btnText} <span>→</span>
                </Link>
              ) : (
                <a 
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                >
                  {item.btnText} <span>↓</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;


