import { useState, useMemo } from 'react';
import { mindBlogs } from '../data/mindBlogs';
import { dailyDigests } from '../data/currentAffairs';
import { analyzeSEO } from '../utils/seoAnalyzer';

export default function SEODashboard() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Combine and analyze all items
  const analyzedContent = useMemo(() => {
    const blogs = mindBlogs.map(blog => {
      const result = analyzeSEO({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
      });
      return { ...blog, type: 'Mind Blog', seo: result };
    });

    const affairs = dailyDigests.flatMap(digest => 
      digest.topics.map(topic => {
        const result = analyzeSEO({
          title: topic.title,
          excerpt: topic.whyItMatters,
          content: topic.content
        });
        return { 
          id: topic.id, 
          title: topic.title, 
          type: `Current Affairs (${digest.date})`, 
          seo: result 
        };
      })
    );

    return [...blogs, ...affairs].sort((a, b) => b.seo.score - a.seo.score);
  }, []);

  const overallAvg = useMemo(() => {
    if (analyzedContent.length === 0) return 0;
    const sum = analyzedContent.reduce((acc, curr) => acc + curr.seo.score, 0);
    return Math.round(sum / analyzedContent.length);
  }, [analyzedContent]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SEO Content Dashboard</h1>
            <p className="text-sm text-slate-500 mt-2">Analyze and optimize static content files for search engines.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-6 py-3 rounded-2xl border ${getScoreColor(overallAvg)} shadow-sm flex flex-col items-center`}>
              <span className="text-3xl font-black">{overallAvg}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Avg Score</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Overview ({analyzedContent.length} Items)</span>
              <span>Score</span>
            </div>
            
            <div className="overflow-y-auto flex-1 p-2">
              <ul className="space-y-1">
                {analyzedContent.map((item) => (
                  <li 
                    key={`${item.type}-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className={`block hover:bg-slate-50 cursor-pointer transition-colors rounded-xl border border-transparent ${selectedItem?.id === item.id ? 'bg-blue-50/50 border-blue-100 shadow-sm' : ''}`}
                  >
                    <div className="px-5 py-3 flex items-center justify-between">
                      <div className="pr-4">
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.type}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold border shadow-sm ${getScoreColor(item.seo.score)}`}>
                          {item.seo.score}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Detail View */}
          <div className="lg:col-span-1">
            {selectedItem ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="pr-4 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{selectedItem.title}</h3>
                    <span className="text-xs text-slate-500">{selectedItem.type}</span>
                  </div>
                  <span className={`inline-flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-xl text-lg font-bold border shadow-sm ${getScoreColor(selectedItem.seo.score)}`}>
                    {selectedItem.seo.score}
                  </span>
                </div>
                
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Analysis Results</h4>
                
                <ul className="space-y-4">
                  {selectedItem.seo.feedback.map((f: any) => (
                    <li key={f.id} className="flex items-start gap-3">
                      {f.type === 'success' && (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-[10px] font-bold">✓</span>
                        </div>
                      )}
                      {f.type === 'warning' && (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs font-bold">!</span>
                        </div>
                      )}
                      {f.type === 'error' && (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-xs font-bold">✕</span>
                        </div>
                      )}
                      <p className={`text-sm leading-relaxed ${f.type === 'success' ? 'text-slate-600' : 'text-slate-800 font-medium'}`}>
                        {f.message}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 border-dashed h-64 flex flex-col items-center justify-center text-slate-400 p-6 text-center shadow-sm">
                <svg className="w-10 h-10 mb-4 opacity-50 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-sm font-medium">Select an item from the list to view its detailed SEO analysis report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
