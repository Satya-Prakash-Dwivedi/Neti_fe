import { useParams, Link, Navigate } from "react-router-dom";
import { mindBlogs } from "../data/mindBlogs";
import { useState } from "react";
import { SEO } from "../components/SEO";

const renderContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    if (!line.trim()) return null;

    if (line.trim() === '---') {
       return <hr key={idx} className="my-12 border-t border-slate-200/60" />;
    }

    if (line.startsWith('###')) {
      const text = line.replace('###', '').trim();
      return (
        <h3 key={idx} className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 mt-10 mb-4 tracking-tight">
          {text}
        </h3>
      );
    }
    
    if (line.startsWith('*“') || line.startsWith('*"')) {
       return (
          <blockquote key={idx} className="my-8 py-6 px-6 md:px-8 border-l-4 border-[#FFAE96] bg-[#FFF5F2]/50 rounded-r-3xl relative overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
             {/* Subtle interior aesthetic (Lotus/Leaf) */}
             <div className="absolute -right-6 -bottom-6 w-32 h-32 text-[#FFAE96] opacity-[0.15] select-none pointer-events-none rotate-12">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 16 12 22 12 22Z" fill="currentColor"/>
                   <path d="M12 22C12 22 8 16 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 16 12 22 12 22Z" fill="#FFF5F2" opacity="0.8"/>
                </svg>
             </div>
             <p className="text-slate-700 italic text-lg md:text-xl font-playfair font-medium leading-relaxed relative z-10">
                "{line.replace(/^\*["“]|["”]\*$/g, '')}"
             </p>
          </blockquote>
       );
    }

    const renderInlineStyles = (text: string) => {
        const boldRegex = /\*\*(.*?)\*\*/g;
        let parts = text.split(boldRegex);
        let styled = parts.map((part, i) => {
           if (i % 2 === 1) return <strong key={`b-${i}`} className="text-slate-900 font-semibold">{part}</strong>;
           return part;
        });

        return styled.map((node, index) => {
            if (typeof node === 'string') {
                const italicRegex = /\*([^*]+)\*/g;
                const italicParts = node.split(italicRegex);
                return italicParts.map((ipart, j) => {
                     if (j % 2 === 1) return <em key={`i-${index}-${j}`} className="italic text-slate-500 font-medium">{ipart}</em>;
                     return <span key={`s-${index}-${j}`}>{ipart}</span>;
                });
            }
            return node;
        });
    }

    return (
       <p key={idx} className="text-slate-700 text-[17px] md:text-lg leading-[1.7] mb-6 font-inter">
          {renderInlineStyles(line)}
       </p>
    );
  });
};

const MindDetail = () => {
  const { id } = useParams();
  const post = mindBlogs.find(b => b.id === id);
  const [showFallbackShare, setShowFallbackShare] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return <Navigate to="/mind" replace />;
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      // navigator.share explicitly relies on a secure HTTPS context. Local IPs disable it.
      if (navigator.share && window.isSecureContext) {
        await navigator.share(shareData);
      } else {
        // Trigger our beautiful custom fallback menu for WhatsApp, Telegram, etc.
        setShowFallbackShare(!showFallbackShare);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFBF9] py-12 md:py-20 px-4 sm:px-6 selection:bg-[#FFE3D8] selection:text-slate-900">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article" 
        canonical={window.location.href}
        ogImage={post.image}
      />
      
      {/* Side Aesthetic Vector Graphics */}
      <div className="hidden lg:block absolute -left-12 top-[15%] w-[26rem] h-[40rem] select-none pointer-events-none text-[#F4DCD5] z-0 transition-transform duration-1000 ease-in-out">
         {/* Minimalist Zen Wave Line Art */}
         <svg viewBox="0 0 200 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Wavy waves going down */}
            <path d="M -50 50 Q 80 150 200 50 T 400 50" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M -50 80 Q 80 180 200 80 T 400 80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
            <path d="M -50 110 Q 80 210 200 110 T 400 110" fill="none" stroke="currentColor" strokeWidth="0.5" />
            
            {/* Focus/Balance circles */}
            <circle cx="120" cy="220" r="70" fill="currentColor" opacity="0.3" />
            <circle cx="120" cy="220" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="120" cy="220" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Grounding line */}
            <path d="M 120 0 L 120 400" stroke="currentColor" strokeWidth="1" opacity="0.6" />
         </svg>
      </div>
      
      <div className="hidden lg:block absolute -right-16 top-[45%] w-[24rem] h-[40rem] select-none pointer-events-none text-[#F4DCD5] z-0 transition-transform duration-1000 ease-in-out">
         {/* Symbolic Cognitive/Network Graphic */}
         <svg viewBox="0 0 200 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Flowing mind structures */}
            <path d="M 50 100 C 150 50, 180 150, 100 250 C 20 350, 100 380, 250 300" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
            
            {/* Neural connection nodes */}
            <circle cx="110" cy="160" r="50" fill="currentColor" opacity="0.2" />
            <circle cx="160" cy="280" r="35" fill="currentColor" opacity="0.3" />
            <circle cx="60" cy="310" r="25" fill="currentColor" opacity="0.4" />
            
            {/* Constellation connection lines */}
            <path d="M 110 160 L 160 280 L 60 310 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            
            <circle cx="110" cy="160" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="12,12" />
         </svg>
      </div>

      {/* Very subtle top gradient for a happy feel without being overwhelming */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#FFF0EA]/40 to-transparent pointer-events-none z-0"></div>

      <article className="max-w-2xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link to="/mind" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#E88D72] mb-10 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Mind Series
        </Link>
        
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6 flex-wrap">
             <span className="px-4 py-1 bg-[#FFE3D8]/60 text-[#D06245] text-[11px] font-bold uppercase tracking-widest rounded-full">
               Mental Health
             </span>
             <span className="text-sm text-slate-400 font-medium">{post.date}</span>
             <span className="text-sm text-slate-300 hidden sm:inline">•</span>
             <span className="text-sm text-slate-400 hidden sm:inline">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 leading-[1.15] mb-8">
            {post.title}
          </h1>
          
          {/* Author Block */}
          <div className="flex items-center justify-center md:justify-start gap-4 pb-10 border-b border-slate-200/60">
             <div className="h-12 w-12 rounded-full bg-[#FFE3D8] flex items-center justify-center text-[#D06245] font-playfair font-bold text-lg">
                 N
             </div>
             <div className="text-left">
                <p className="font-semibold text-slate-800 text-sm">{post.author}</p>
                <p className="text-xs text-slate-500 font-medium">{post.readTime}</p>
             </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/50 aspect-video relative group">
           <div className="absolute inset-0 bg-[#E88D72]/5 group-hover:bg-transparent transition-colors duration-500"></div>
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out" 
           />
        </div>

        {/* Article Content */}
        <div className="post-content">
            {renderContent(post.content)}
        </div>
        
        {/* Article Footer & Actions */}
        <footer className="mt-16 pt-10 border-t border-slate-200/60 flex flex-col items-center">
            
            <p className="text-slate-500 font-medium italic text-center mb-8 text-lg font-playfair">
              "For one who has conquered the mind, the mind is the best of friends."
            </p>
            
            <div className="relative">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 bg-white hover:bg-[#FDFBF9] border border-slate-200 text-slate-700 hover:text-[#D06245] hover:border-[#FFE3D8] font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-sm"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Link copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Share this article
                  </>
                )}
              </button>

              {/* Secure Context Fallback Modal (Triggered on Local IP HTTP) */}
              {showFallbackShare && (
                <div className="absolute bottom-full right-0 mb-4 bg-white border border-slate-100 rounded-2xl shadow-xl w-48 p-2 flex flex-col z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                   <button 
                     onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - ' + post.excerpt + ' ' + window.location.href)}`)}
                     className="flex items-center gap-3 p-3 text-sm font-semibold text-slate-700 hover:bg-[#E8F5E9] hover:text-[#25D366] rounded-xl transition-colors text-left"
                   >
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                     </svg>
                     WhatsApp
                   </button>

                   <button 
                     onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`)}
                     className="flex items-center gap-3 p-3 text-sm font-semibold text-slate-700 hover:bg-[#E1F5FE] hover:text-[#0088CC] rounded-xl transition-colors text-left mt-1"
                   >
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.309-.346-.111l-6.4 4.024-2.76-.86c-.6-.188-.616-.605.126-.894l10.785-4.156c.5-.188.943.107.775.832z"/>
                     </svg>
                     Telegram
                   </button>
                   
                   <div className="h-px w-full bg-slate-100 my-2"></div>

                   <button 
                     onClick={() => {
                       navigator.clipboard.writeText(window.location.href);
                       setCopied(true);
                       setShowFallbackShare(false);
                       setTimeout(() => setCopied(false), 2000);
                     }}
                     className="flex items-center gap-3 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors text-left"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                     </svg>
                     Copy URL
                   </button>
                </div>
              )}
            </div>
            
        </footer>
      </article>
    </div>
  );
};

export default MindDetail;
