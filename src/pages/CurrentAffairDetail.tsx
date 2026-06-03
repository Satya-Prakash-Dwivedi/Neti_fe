import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { DailyDigest } from "../data/currentAffairs";
import SEO from "../components/SEO";

const formatText = (text: string) => {
  if (!text) return null;
  
  // First, handle markdown links: [text](url)
  let parts: (string | React.ReactNode)[] = [text];
  
  // Handle Links
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return part;
    const segments = part.split(/(\[.*?\]\(.*?\))/g);
    return segments.map((seg, i) => {
      const match = seg.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a 
            key={`link-${i}`} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors font-medium decoration-blue-300 underline-offset-4"
          >
            {match[1]}
          </a>
        );
      }
      return seg;
    });
  });

  // Handle Bold: **text**
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return part;
    const segments = part.split(/(\*\*.*?\*\*)/g);
    return segments.map((seg, i) => {
      const match = seg.match(/\*\*(.*?)\*\*/);
      if (match) {
        return <strong key={`bold-${i}`} className="font-bold text-slate-900">{match[1]}</strong>;
      }
      return seg;
    });
  });

  // Handle Italic: _text_
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return part;
    const segments = part.split(/(_.*?_)/g);
    return segments.map((seg, i) => {
      const match = seg.match(/_(.*?)_/);
      if (match) {
        return <em key={`italic-${i}`} className="italic">{match[1]}</em>;
      }
      return seg;
    });
  });

  return parts;
};



const renderContent = (text: string) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let currentTable: string[][] = [];

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      result.push(<ul key={`list-${key}`} className="list-disc pl-6 mb-8 space-y-3">{currentList}</ul>);
      currentList = [];
    }
  };

  const flushTable = (key: number) => {
    if (currentTable.length > 0) {
      result.push(
        <div key={`table-wrapper-${key}`} className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="bg-slate-50">
              <tr>
                {currentTable[0].map((cell, i) => (
                  <th key={i} className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    {formatText(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.slice(2).map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100 leading-relaxed">
                      {formatText(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmedLine = line.trim();
    
    // Table handling
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      flushList(idx);
      const cells = trimmedLine.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1);
      currentTable.push(cells);
      return;
    } else {
      flushTable(idx);
    }

    // Callout boxes (detected by specific emojis or markers)
    const calloutMatch = trimmedLine.match(/^(📌|⚠️|🔗|📝|📰|📊|⏱️|📋)\s*(.*)/);
    if (calloutMatch) {
      flushList(idx);
      const [_, emoji, content] = calloutMatch;
      let bgColor = "bg-slate-50";
      let borderColor = "border-slate-200";
      let textColor = "text-slate-800";
      let iconBg = "bg-slate-200";

      if (emoji === '📌') { bgColor = "bg-blue-50/40"; borderColor = "border-blue-100"; textColor = "text-blue-900"; iconBg = "bg-blue-100"; }
      if (emoji === '⚠️') { bgColor = "bg-amber-50/40"; borderColor = "border-amber-100"; textColor = "text-amber-900"; iconBg = "bg-amber-100"; }
      if (emoji === '🔗') { bgColor = "bg-indigo-50/40"; borderColor = "border-indigo-100"; textColor = "text-indigo-900"; iconBg = "bg-indigo-100"; }
      if (emoji === '📝') { bgColor = "bg-slate-50"; borderColor = "border-slate-200"; textColor = "text-slate-800"; iconBg = "bg-slate-200"; }
      if (emoji === '📊') { bgColor = "bg-emerald-50/40"; borderColor = "border-emerald-100"; textColor = "text-emerald-900"; iconBg = "bg-emerald-100"; }

      result.push(
        <div key={idx} className={`${bgColor} ${borderColor} border p-6 rounded-2xl mb-8 shadow-sm transition-all hover:shadow-md`}>
          <div className="flex gap-4">
            <span className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl shadow-sm`}>{emoji}</span>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 block">
                {emoji === '📌' ? 'Quick Take' : emoji === '⚠️' ? 'The UPSC Trap' : emoji === '🔗' ? 'Static Connections' : emoji === '📊' ? 'Key Data' : emoji === '📰' ? 'Detailed Analysis' : emoji === '📝' ? 'Exam Angles' : 'Section'}
              </span>
              <div className={`${textColor} font-inter text-[15px] md:text-[16px] leading-relaxed`}>
                {formatText(content)}
              </div>
            </div>
          </div>
        </div>
      );
      return;
    }

    // Headers
    if (trimmedLine.startsWith('###')) {
      flushList(idx);
      result.push(
        <h3 key={idx} className="text-xl font-playfair font-bold text-slate-900 mt-10 mb-6 pb-2 border-b border-slate-100 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          {formatText(trimmedLine.replace(/^###\s*/, ''))}
        </h3>
      );
    } else if (trimmedLine.startsWith('##')) {
      flushList(idx);
      result.push(
        <h2 key={idx} className="text-2xl font-playfair font-bold text-slate-900 mt-12 mb-8">
          {formatText(trimmedLine.replace(/^##\s*/, ''))}
        </h2>
      );
    }
    // Bullet points
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('— ')) {
      currentList.push(
        <li key={idx} className="text-slate-700 leading-relaxed font-inter">
          {formatText(trimmedLine.replace(/^([-*]|—)\s*/, ''))}
        </li>
      );
    }
    // Empty lines
    else if (trimmedLine === '') {
      flushList(idx);
    }
    // Regular paragraphs
    else {
      flushList(idx);
      result.push(
        <p key={idx} className="mb-6 leading-relaxed text-slate-700 font-inter text-[16px] md:text-[17px]">
          {formatText(trimmedLine)}
        </p>
      );
    }
  });

  flushList(lines.length);
  flushTable(lines.length);
  return result;
};

const renderTextInChunks = renderContent; // For backwards compatibility

/**
 * CurrentAffairDetail Component
 * 
 * Renders the detailed view of a Daily Current Affairs digest.
 * Hardened for full mobile responsiveness and static-only frontend.
 */

const CurrentAffairDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [digest, setDigest] = useState<DailyDigest | null | undefined>(undefined);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/current-affairs/${id}/`)
      .then(res => {
        setDigest(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch current affairs detail:", err);
        setDigest(null);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (digest === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (digest === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 max-w-lg shadow-sm">
          <span className="text-4xl mb-6 block grayscale">🔍</span>
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-4">Digest Not Found</h2>
          <p className="text-slate-600 mb-10 leading-relaxed font-inter">
            The Daily Current Affairs for this date isn't in our library yet, or the link may have expired.
          </p>
          <Link
            to="/current-affairs"
            className="px-10 py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg active:scale-95"
          >
            Explore Recent Updates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-4 md:pt-8">
      <SEO 
        title={`${digest.date} | Daily Current Affairs`} 
        description={digest.tagline} 
        ogType="article"
      />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <header className="mb-10 md:mb-16 text-center">
          <Link to="/current-affairs" className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-blue-900 uppercase tracking-[0.2em] inline-block mb-6 md:mb-8 transition-colors">
            ← Back to Daily Listing
          </Link>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <span className="text-[10px] md:text-sm font-bold text-blue-900 tracking-widest uppercase py-1 border-y border-blue-900/10">
              DAY {digest.dayIndex || 1} | {digest.day}, {digest.date}
            </span>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 leading-tight">
              {digest.tagline}
            </h1>
          </div>
        </header>

        {digest.announcement && (
          <section className="mb-12 md:mb-16 bg-gradient-to-br from-blue-50 to-white border border-blue-200/60 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 rounded-l-3xl"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-5">
              {renderContent(digest.announcement)}
            </div>
          </section>
        )}

        <div className="space-y-12 md:space-y-16">
          {(digest.topics || []).map((topic, idx) => (
            <article key={topic.id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-12 shadow-sm relative overflow-hidden group">
              <span className="absolute top-0 right-0 p-6 md:p-8 text-4xl md:text-6xl font-playfair italic font-bold text-slate-50 z-0 select-none group-hover:text-blue-50/50 transition-colors">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>

              <div className="relative z-10">
                <span className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 md:mb-4 inline-block px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                  {topic.subtitle}
                </span>

                <h2 className="text-xl md:text-3xl font-playfair font-bold text-slate-900 mb-6 md:mb-8 border-b border-slate-100 pb-4 leading-snug">
                  {topic.title}
                </h2>

                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed md:leading-[1.9] text-[15px] md:text-[17px] font-inter mb-10 space-y-6">
                    {renderTextInChunks(topic.content)}
                  </div>

                  <div className="flex flex-col gap-6 mt-10 md:mt-14">
                    <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group/matter">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-800 transition-colors group-hover/matter:bg-blue-900"></div>
                      <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
                        Why it matters for UPSC
                      </h4>
                      <div className="text-sm md:text-base text-slate-700 leading-relaxed font-inter space-y-4">
                        {renderTextInChunks(topic.whyItMatters)}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 md:p-10 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group/revise">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 transition-colors group-hover/revise:bg-blue-800"></div>
                      <h4 className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-widest mb-4">
                        REVISE
                      </h4>
                      <div className="text-sm md:text-base text-slate-800 leading-relaxed font-inter space-y-4">
                        {renderTextInChunks(topic.revise)}
                      </div>
                    </div>
                  </div>

                  {topic.pyqConnect && (
                    <div className="mt-6 md:mt-8 p-4 md:p-5 bg-blue-50/50 rounded-xl border border-blue-100/50 flex items-start gap-3">
                      <span className="bg-blue-900 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase mt-1 shrink-0 italic">PYQ</span>
                      <p className="text-[11px] md:text-sm text-blue-900 font-medium leading-relaxed">
                        {topic.pyqConnect}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Daily Summary Section (Revise Today) */}
        {digest.reviseSummary && digest.reviseSummary.length > 0 && (
          <section className="mt-12 md:mt-16 bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-12 shadow-sm">
            <h3 className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-3">
              <span className="w-6 md:w-8 h-px bg-blue-900"></span>
              REVISE TODAY
            </h3>
            <ul className="space-y-4 md:space-y-5">
              {digest.reviseSummary.map((point, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 text-slate-700 font-inter text-sm md:text-base leading-relaxed">
                  <span className="text-blue-900 mt-1 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Practice Questions Section */}
        {digest.practiceQuestions && (
          <section className="mt-16 md:mt-24 space-y-12">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-blue-900 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4">Assessment Module</span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900">Practice & Mastery</h2>
              <div className="w-12 h-1 bg-blue-900 mt-6 rounded-full"></div>
            </div>

            {/* MCQs */}
            {digest.practiceQuestions.mcqs && digest.practiceQuestions.mcqs.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-900 text-white text-[10px] rounded-lg font-black tracking-widest uppercase italic">MCQs</span>
                  Daily Prelims Check
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {digest.practiceQuestions.mcqs.map((mcq, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow group/mcq">
                      <div className="flex gap-4 mb-6">
                        <span className="text-slate-300 font-playfair font-bold text-3xl group-hover/mcq:text-blue-100 transition-colors">Q{idx + 1}</span>
                        <p className="text-slate-800 font-inter font-medium leading-relaxed whitespace-pre-line">{mcq.question}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12 mb-8">
                        {mcq.options.map((opt, oIdx) => (
                          <div key={oIdx} className="px-5 py-3 border border-slate-100 rounded-xl text-sm text-slate-600 font-inter hover:bg-slate-50 transition-colors">
                            {opt}
                          </div>
                        ))}
                      </div>
                      <details className="pl-12 group/details">
                        <summary className="cursor-pointer text-blue-900 font-bold text-xs uppercase tracking-widest list-none flex items-center gap-2 hover:text-blue-800 transition-colors">
                          <span className="p-1 rounded-full bg-blue-50 group-hover/details:bg-blue-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-open/details:rotate-180 transition-transform"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </span>
                          Check Answer & Explanation
                        </summary>
                        <div className="mt-6 p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[8px] font-black rounded uppercase">Correct Answer: {mcq.answer}</span>
                          </div>
                          <p className="text-sm text-emerald-900 leading-relaxed font-inter">{mcq.explanation}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mains */}
            {digest.practiceQuestions.mains && digest.practiceQuestions.mains.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="px-3 py-1 bg-slate-900 text-white text-[10px] rounded-lg font-black tracking-widest uppercase italic">Mains</span>
                  Answer Writing Practice
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {digest.practiceQuestions.mains.map((main, idx) => (
                    <div key={idx} className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group/mains">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </div>
                      <span className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Question {idx + 1}</span>
                      <h4 className="text-lg md:text-xl font-playfair font-bold mb-8 leading-relaxed italic pr-12">
                        "{main.question}"
                      </h4>
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/10">
                        <span>Context: {main.context}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <nav className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
            {(() => {
              const prevDigest = digest.prevDigest;
              const nextDigest = digest.nextDigest;

              return (
                <>
                  <div className="flex flex-col">
                    {prevDigest && (
                      <Link 
                        to={`/current-affairs/${prevDigest.id}`}
                        className="group bg-white border border-slate-200 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-blue-900 transition-all flex flex-col items-start gap-2 shadow-sm hover:shadow-md active:scale-95"
                      >
                         <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-900">← Previous Day</span>
                         <span className="text-xs md:text-sm font-playfair font-bold text-slate-900">{prevDigest.date}</span>
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {nextDigest && (
                      <Link 
                        to={`/current-affairs/${nextDigest.id}`}
                        className="group bg-white border border-slate-200 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-blue-900 transition-all flex flex-col items-start md:items-end gap-2 text-left md:text-right shadow-sm hover:shadow-md active:scale-95"
                      >
                         <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-900">Next Day →</span>
                         <span className="text-xs md:text-sm font-playfair font-bold text-slate-900">{nextDigest.date}</span>
                      </Link>
                    )}
                  </div>
                </>
              )
            })()}
        </nav>


      </div>
    </div>
  );
};

export default CurrentAffairDetail;
