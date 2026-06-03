import { useParams, Link } from "react-router-dom";
import { monthlyMagazines } from "../data/monthlyMagazines";
import { SEO } from "../components/SEO";


const MonthlyMagazineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const magazine = monthlyMagazines.find((m) => m.id === id);

  if (!magazine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Magazine not found</h2>
          <Link to="/monthly-magazines" className="text-blue-600 hover:underline">Back to Magazines</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <SEO 
        title={`${magazine.title} ${magazine.month} ${magazine.year} | Neti Academy`}
        description={magazine.description}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-blue-900">Home</Link>
          <span>/</span>
          <Link to="/monthly-magazines" className="hover:text-blue-900">Monthly Magazines</Link>
          <span>/</span>
          <span className="text-blue-900 font-medium">{magazine.month} {magazine.year}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            {magazine.month} {magazine.year} Edition
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 mb-4">
            {magazine.title}
          </h1>
          <p className="text-2xl font-playfair italic text-blue-900/60 mb-6">
            {magazine.tagline}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {magazine.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* PDF Viewer Section */}
            <div className="mb-12 bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Digital Edition
              </h3>

              <div className="aspect-[3/4] bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden mb-6">
                <iframe 
                  src={`${magazine.pdfUrl}#toolbar=0`} 
                  className="w-full h-full"
                  title={`${magazine.title} PDF`}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={magazine.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
                >
                  Open PDF in New Tab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href={magazine.pdfUrl} 
                  download={`${magazine.title} - ${magazine.month} ${magazine.year}.pdf`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 border-2 border-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  Download PDF
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

            </div>

            {/* Benefits / Design Goal */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Every issue is designed to help you:</h3>
              <ul className="space-y-4">
                {magazine.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-1">
                      <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Inside Every Issue */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Inside every issue:</h4>
                <div className="space-y-3">
                  {magazine.insideIssue.map((item, index) => (
                    <div key={index} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10">
                <h4 className="text-lg font-bold mb-4">{magazine.month} {magazine.year} Highlights:</h4>
                <div className="space-y-3">
                  {magazine.highlights.map((item, index) => (
                    <div key={index} className="text-sm text-blue-100 flex items-start gap-2">
                      <span className="text-blue-300">•</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4">Read Smart. Stay Consistent.</h4>
                <div className="space-y-4">
                  <a href="https://t.me/netiacademy01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.206 16.561c-.19.317-.552.417-.869.227-1.397-.852-3.155-1.045-5.226-.572-.361.082-.722-.144-.804-.505-.082-.361.144-.722.505-.804 2.261-.518 4.2-.284 5.765.669.317.189.418.552.229.869zm1.385-3.119c-.239.387-.743.511-1.13.272-1.603-.985-4.047-1.27-5.942-.695-.438.133-.895-.116-1.028-.554-.133-.438.116-.895.554-1.028 2.164-.658 4.861-.334 6.674.777.387.239.511.744.272 1.13zm.12-3.257C15.302 8.188 10.503 8.027 7.73 8.869c-.518.157-1.066-.134-1.223-.652-.157-.518.134-1.066.652-1.223 3.19-.967 8.472-.782 12.26 1.467.466.277.617.881.34 1.347-.277.467-.881.618-1.348.341z"/></svg>
                    Telegram
                  </a>
                  <a href="/" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyMagazineDetail;
