import { Link } from "react-router-dom";
import { mindBlogs } from "../data/mindBlogs";
import { platformAnnouncements } from "../data/announcements";

const RecentHighlights = () => {
  const recentMind = mindBlogs[mindBlogs.length - 1];
  const recentAnnouncement = platformAnnouncements[platformAnnouncements.length - 1];

  return (
    <section className="py-20 px-6 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-4">Recent Highlights</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover our latest thinking and platform updates.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mind Blog Container */}
          {recentMind && (
            <article className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col sm:flex-row">
              <div className="sm:w-2/5 overflow-hidden">
                <Link to={`/mind/${recentMind.id}`} className="block h-full">
                  <img src={recentMind.image} alt={recentMind.title} className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-[#475569] text-[10px] font-bold uppercase tracking-wider rounded-md">
                      Mind Series
                    </span>
                  </div>
                  <Link to={`/mind/${recentMind.id}`}>
                    <h3 className="text-xl font-playfair font-bold text-slate-900 mb-2 group-hover:text-[#1E3A8A] transition-colors leading-tight">
                      {recentMind.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                    {recentMind.excerpt}
                  </p>
                </div>
                <Link to={`/mind/${recentMind.id}`} className="text-xs font-bold text-[#C8A951] uppercase tracking-wider hover:text-yellow-600 transition-colors flex items-center gap-1">
                  Read Article →
                </Link>
              </div>
            </article>
          )}

          {/* Announcement Container */}
          {recentAnnouncement && (
            <article className="bg-blue-50/50 border border-blue-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col sm:flex-row">
              <div className="p-8 sm:w-full flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-100/50 text-[#1E3A8A] text-[10px] font-bold uppercase tracking-wider rounded-md">
                      Platform Update
                    </span>
                  </div>
                  <Link to={`/blogs/${recentAnnouncement.id}`}>
                    <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-3 group-hover:text-[#1E3A8A] transition-colors leading-tight">
                      {recentAnnouncement.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                    {recentAnnouncement.excerpt}
                  </p>
                </div>
                <Link to={`/blogs/${recentAnnouncement.id}`} className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider hover:text-[#C8A951] transition-colors flex items-center gap-1 mt-auto">
                  View Announcement →
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentHighlights;
