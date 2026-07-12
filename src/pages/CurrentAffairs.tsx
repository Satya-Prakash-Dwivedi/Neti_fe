import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { DailyDigest } from "../data/currentAffairs";
import { Search, Calendar, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";

/**
 * CurrentAffairs listing page
 * 
 * Shows a chronological list of Daily Current Affairs digests with pagination and search.
 */

const CurrentAffairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dailyDigests, setDailyDigests] = useState<DailyDigest[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/current-affairs/`)
      .then(res => {
        setDailyDigests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch current affairs:", err);
        setLoading(false);
      });
  }, []);

  // Filter and sort digests (already ordered newest first from backend)
  const filteredDigests = (Array.isArray(dailyDigests) ? [...dailyDigests] : [])
    .filter(digest => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        digest.id.includes(searchTerm) || 
        digest.date.toLowerCase().includes(searchLower) ||
        digest.tagline.toLowerCase().includes(searchLower) ||
        digest.topics.some(topic => 
          topic.title.toLowerCase().includes(searchLower) ||
          topic.subtitle.toLowerCase().includes(searchLower) ||
          topic.content.toLowerCase().includes(searchLower)
        )
      );
    });

  // Pagination logic
  const totalItems = filteredDigests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDigests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Daily Current Affairs for UPSC"
        description="Stay ahead with curated daily analysis of current affairs for UPSC Prelims and Mains. We filter the noise and provide only what matters."
      />
      {/* Premium Header Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <header className="mb-10 md:mb-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] md:text-sm font-bold text-[var(--color-neti-accent)] bg-white shadow-sm border border-blue-100 rounded-full uppercase tracking-widest">
            UPSC 2026 Daily Digest
          </div>
          <h1 className="text-3xl md:text-5xl font-lora font-bold text-slate-900 mb-6">Daily Current Affairs</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stay ahead with curated daily analysis. We filter the noise and provide only what matters for your Prelims and Mains.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-12 sticky top-24 z-10 px-1">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[var(--color-neti-accent)] transition-colors" />
              <input 
                type="text"
                placeholder="Search by topic, keyword, or any content..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-10 py-4 bg-slate-50/50 border-transparent focus:bg-white focus:ring-0 rounded-xl md:rounded-2xl transition-all text-sm font-medium"
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="relative md:w-60 group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none group-focus-within:text-[var(--color-neti-accent)] transition-colors" />
              <input 
                type="date"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-transparent focus:bg-white focus:ring-0 rounded-xl md:rounded-2xl transition-all text-sm font-bold cursor-pointer"
              />
            </div>
          </div>
          
          {searchTerm && (
            <div className="mt-4 flex items-center gap-2 px-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Found {totalItems} results for "{searchTerm}"
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8 md:space-y-10">
          {loading ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
                <div className="h-3 w-48 bg-slate-50 rounded"></div>
              </div>
            </div>
          ) : currentItems.length > 0 ? (
            currentItems.map((digest) => (
              <div 
                key={digest.id} 
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-neti-accent)]/10 group-hover:bg-[var(--color-neti-accent)] transition-colors" />
                
                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
                    <div>
                      <span className="text-[10px] md:text-xs font-bold text-[var(--color-neti-accent)] tracking-widest uppercase mb-1 block">
                        {digest.day}, {digest.date}
                      </span>
                      <h2 className="text-xl md:text-2xl font-lora font-bold text-slate-900 group-hover:text-[var(--color-neti-accent)] transition-colors">
                        {digest.tagline}
                      </h2>
                    </div>
                    <Link 
                      to={`/current-affairs/${digest.id}`}
                      className="px-6 py-3 bg-slate-900 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-slate-800 transition-all text-center active:scale-95 shadow-lg shadow-slate-900/5 group/btn"
                    >
                      Read Digest
                      <ArrowRight className="inline-block ml-1.5 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
                    {digest.topics.map((topic, idx) => (
                      <Link key={topic.id} to={`/current-affairs/${digest.id}`} className="group/topic">
                        <div className="flex gap-4 items-start">
                          <span className="text-slate-200 font-lora italic text-lg md:text-xl group-hover/topic:text-[var(--color-neti-accent)] transition-colors shrink-0">0{idx + 1}</span>
                          <div>
                            <h3 className="text-xs md:text-sm font-bold text-slate-800 group-hover/topic:text-[var(--color-neti-accent)] transition-colors leading-tight mb-1">
                              {topic.title}
                            </h3>
                            <p className="text-[10px] md:text-xs text-slate-400 line-clamp-1 uppercase tracking-tighter">{topic.subtitle}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 md:mt-10 flex items-center justify-between pt-6 border-t border-slate-50">

                     <div className="text-[9px] md:text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
                       {digest.topics.length} Primary Focus Areas
                     </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-lora font-bold text-slate-900 mb-2">No digests found</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">We couldn't find any current affairs for "{searchTerm}". Try another date or keyword.</p>
              <button 
                onClick={clearSearch}
                className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-200">
            <div className="text-xs md:text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{startIndex + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-slate-900 font-bold">{totalItems}</span> daily digests
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 hover:border-slate-900 disabled:opacity-30 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      currentPage === page 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 hover:border-slate-900 disabled:opacity-30 transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentAffairs;
