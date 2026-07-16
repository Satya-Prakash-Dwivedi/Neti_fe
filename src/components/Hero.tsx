import { Link, useNavigate } from "react-router-dom";
import { Brain, Layers, CalendarCheck } from "lucide-react";

/**
 * Hero Component - Redesigned
 * 
 * Featuring the "Academic Calm" palette, a 3-column feature section, 
 * the Neti Neti philosophy strip, and a PYP teaser.
 */
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-neti-bg)] font-inter w-full">
      
      {/* SECTION 1 - Hero / Above the Fold */}
      <section className="pt-16 md:pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold text-[var(--color-neti-text)] mb-6 tracking-tight">
            India's Premier Active Learning Platform
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-neti-text-muted)] max-w-3xl mx-auto mb-10 leading-relaxed">
            Built on the ancient wisdom of Neti Neti — we don't just remove the noise.<br className="hidden md:block"/>
            We train your brain to own what remains.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/recall')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-neti-accent)] hover:opacity-90 text-white font-semibold rounded-full shadow-md transition-all flex justify-center items-center gap-2"
            >
              Start Practising Free <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/our-method')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[var(--color-neti-accent-amber)] text-[var(--color-neti-text)] font-semibold rounded-full hover:bg-[var(--color-neti-accent-amber)] hover:text-white transition-all flex justify-center items-center gap-2"
            >
              Learn our philosophy
            </button>
          </div>
          
          <p className="text-xs uppercase tracking-widest text-[var(--color-neti-text-muted)] font-medium">
            Built for serious aspirants. Backed by cognitive science. | UPSC · Banking · SSC · State PSC
          </p>
        </div>
      </section>

      {/* SECTION 2 - Two-Column Layout for Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column 1: Our Method */}
          <div className="bg-[var(--color-neti-surface)] rounded-xl p-8 lg:p-10 border border-[var(--color-neti-border)] shadow-sm hover:shadow-md transition-shadow relative flex flex-col group h-full">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-neti-accent)]"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#F0F5F2] rounded-lg text-[var(--color-neti-accent)]">
                <Brain size={28} strokeWidth={2} />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--color-neti-accent)]">Our Method</span>
            </div>
            <h3 className="text-3xl font-lora font-bold text-[var(--color-neti-text)] mb-6">
              The Science of Active Recall
            </h3>
            <div className="text-[var(--color-neti-text-muted)] text-base mb-8 leading-relaxed space-y-4 flex-grow">
              <p>We are taught to study by reading our notes over and over. But cognitive science—as explained in books like Make It Stick—shows this is a trap. Re-reading creates an "illusion of knowing." You recognize the words on the page, but you haven't actually memorized them.</p>
              <p>True memory is built through effort. You have to close the book and force your brain to retrieve the answer. That is Active Recall.</p>
              <p>At Neti Academy, every tool we build is designed to make you practice retrieval. We shift your prep from passive reading to active remembering. It feels harder, but it is how you actually own the facts.</p>
            </div>
            <div className="bg-[#FDFBFA] border-l-4 border-[var(--color-neti-accent-amber)] p-4 mb-8">
               <p className="text-sm italic text-[var(--color-neti-accent-amber)] font-medium leading-relaxed">
                 "Retrieval practice makes learning stick far better than re-exposure to the original material." — Make It Stick
               </p>
            </div>
            <div className="mt-auto">
              <Link to="/active-recall" className="inline-flex items-center text-base font-semibold text-[var(--color-neti-text)] group-hover:text-[var(--color-neti-accent)] transition-colors">
                Read the science <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Stacked Cards (Recall Hub & Daily CA Quiz) */}
          <div className="flex flex-col gap-8 h-full">
            
            {/* Card 2: Recall Hub (Highlighted) */}
            <div className="bg-[var(--color-neti-accent)] rounded-xl p-8 border border-[var(--color-neti-accent)] shadow-xl relative flex flex-col group z-10 overflow-hidden flex-1">
               {/* Glow effect */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="flex items-center gap-3 mb-6 mt-2 relative z-10">
                <div className="p-2.5 bg-white rounded-lg text-[var(--color-neti-accent)] shadow-sm">
                  <Layers size={24} strokeWidth={2} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Practice Arena</span>
              </div>
              <h3 className="text-2xl font-lora font-bold text-white mb-4 relative z-10">
                Recall Hub
              </h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed relative z-10 font-medium">
                Chapter-wise MCQs covering all NCERTs and standard books (Laxmikanth, DD Basu, Spectrum). Designed to test your memory, not your recognition. Attempt. Evaluate. Review. Repeat. Track your accuracy and identify your weak zones in real time.
              </p>
              <div className="mt-auto pt-6 relative z-10">
                <Link to="/recall" className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-[var(--color-neti-accent)] text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-md active:scale-95">
                  Enter Recall Hub <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Daily CA Quiz */}
            <div className="bg-[var(--color-neti-surface)] rounded-xl p-8 border border-[var(--color-neti-border)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col group flex-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-neti-accent-amber)]"></div>
               <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#FCFAEF] rounded-lg text-[var(--color-neti-accent-amber)]">
                  <CalendarCheck size={24} strokeWidth={2} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-neti-accent-amber)]">Daily Current Affairs</span>
              </div>
              <h3 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
                Daily CA Quiz
              </h3>
              <p className="text-[var(--color-neti-text-muted)] text-sm mb-6 leading-relaxed">
                10–15 high-quality questions. Every day. No filler, no noise.
                Curated from The Hindu, PIB, and official sources — then tested through
                active recall so you don't just read the news. You remember it.
              </p>
              <div className="flex items-center gap-2 mb-6 mt-auto">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Today's quiz is live</span>
              </div>
              <div>
                <Link to="/ca-quiz" className="inline-flex items-center text-sm font-semibold text-[var(--color-neti-text)] group-hover:text-[var(--color-neti-accent-amber)] transition-colors">
                  Take Today's Quiz <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3 - Philosophy Strip */}
      <section className="bg-[var(--color-neti-dark-bg)] py-20 px-6 text-center">
         <div className="max-w-4xl mx-auto">
            <p className="text-[var(--color-neti-accent-amber)] text-xs uppercase tracking-[0.2em] font-bold mb-8">
              Built on 3,000 years of wisdom
            </p>
            <h2 className="text-3xl md:text-4xl font-lora italic text-[var(--color-neti-dark-text)] mb-8 leading-snug font-medium">
              "Neti, Neti — Not this, not this."<br/>
              The Upanishads taught us to remove what is false to find what is true.<br/>
              We removed the noise from exam prep. Now we help you recall the truth.
            </h2>
            <p className="text-[var(--color-neti-text-muted)] text-sm md:text-base max-w-2xl mx-auto font-inter">
              Active Recall · Spaced Repetition · Deliberate Practice<br/>
              India's most focused exam preparation ecosystem.
            </p>
         </div>
      </section>

      {/* SECTION 4 - Coming Soon Teasers */}
      <section className="py-16 px-6 bg-[var(--color-neti-bg)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Monthly Magazine Teaser */}
          <div className="bg-gradient-to-br from-[var(--color-neti-surface)] to-[#FDFBFA] rounded-2xl p-8 md:p-12 border border-[var(--color-neti-border)] text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FCFAEF] rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-[#FCFAEF] text-[var(--color-neti-accent-amber)] border border-[var(--color-neti-accent-amber)]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                Coming Soon
              </div>
              <h3 className="text-2xl md:text-3xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
                Monthly Magazine
              </h3>
              <p className="text-[var(--color-neti-text-muted)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                A meticulously curated compilation of current affairs. Stripped of noise, focused on relevance, and designed for active retention.
              </p>
            </div>
          </div>

          {/* Live Classes Teaser */}
          <div className="bg-gradient-to-br from-[var(--color-neti-surface)] to-[#F8F9FB] rounded-2xl p-8 md:p-12 border border-[var(--color-neti-border)] text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-blue-50 text-[var(--color-neti-accent)] border border-[var(--color-neti-accent)]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                Coming Soon
              </div>
              <h3 className="text-2xl md:text-3xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
                Live Classes
              </h3>
              <p className="text-[var(--color-neti-text-muted)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Interactive morning sessions designed to test your knowledge live. Problem-solving and concept clarity driven by the Neti Neti method.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Hero;
