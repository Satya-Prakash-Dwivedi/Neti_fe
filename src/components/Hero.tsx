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
              onClick={() => navigate('/ca-quiz')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-neti-accent)] hover:opacity-90 text-white font-semibold rounded-full shadow-md transition-all flex justify-center items-center gap-2"
            >
              Start Practising Free <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/our-method')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[var(--color-neti-accent-amber)] text-[var(--color-neti-text)] font-semibold rounded-full hover:bg-[var(--color-neti-accent-amber)] hover:text-white transition-all flex justify-center items-center gap-2"
            >
              Explore Our Method
            </button>
          </div>
          
          <p className="text-xs uppercase tracking-widest text-[var(--color-neti-text-muted)] font-medium">
            Trusted by 10,000+ serious aspirants | UPSC · Banking · SSC · State PSC
          </p>
        </div>
      </section>

      {/* SECTION 2 - Three-Column Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Active Hub */}
          <div className="bg-[var(--color-neti-surface)] rounded-xl p-8 border border-[var(--color-neti-border)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-neti-accent)]"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#F0F5F2] rounded-lg text-[var(--color-neti-accent)]">
                <Brain size={24} strokeWidth={2} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-neti-accent)]">Our Method</span>
            </div>
            <h3 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
              The Active Recall Difference
            </h3>
            <p className="text-[var(--color-neti-text-muted)] text-sm mb-6 leading-relaxed line-clamp-3">
              Science confirms it: Testing yourself beats re-reading every time.
              At Neti Academy, we've built every tool around active retrieval —
              so your brain doesn't just recognise facts. It owns them.
            </p>
            <div className="bg-[#FDFBFA] border-l-2 border-[var(--color-neti-accent-amber)] p-3 mb-6">
               <p className="text-xs italic text-[var(--color-neti-accent-amber)] font-medium">
                 "Students using active recall retain 40–60% more than passive readers."
               </p>
            </div>
            <div className="mt-auto">
              <Link to="/our-method" className="inline-flex items-center text-sm font-semibold text-[var(--color-neti-text)] group-hover:text-[var(--color-neti-accent)] transition-colors">
                Learn our philosophy <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Recall Hub */}
          <div className="bg-[var(--color-neti-surface)] rounded-xl p-8 border border-[var(--color-neti-border)] shadow-sm hover:shadow-md transition-shadow relative flex flex-col group">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700">
                <Layers size={24} strokeWidth={2} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-neti-accent)]">Practice Arena</span>
            </div>
            <h3 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
              Recall Hub
            </h3>
            <p className="text-[var(--color-neti-text-muted)] text-sm mb-6 leading-relaxed line-clamp-3">
              Chapter-wise MCQs designed to test your memory — not your recognition.
              Attempt. Evaluate. Review. Repeat. That's the Neti method.
              Track your accuracy and identify your weak zones in real time.
            </p>
            <div className="mt-auto pt-6">
              <Link to="/recall" className="inline-flex items-center text-sm font-semibold text-[var(--color-neti-text)] group-hover:text-[var(--color-neti-accent)] transition-colors">
                Enter Recall Hub <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Daily CA Quiz */}
          <div className="bg-[var(--color-neti-surface)] rounded-xl p-8 border border-[var(--color-neti-border)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col group">
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
            <p className="text-[var(--color-neti-text-muted)] text-sm mb-6 leading-relaxed line-clamp-3">
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

      {/* SECTION 4 - PYP Teaser */}
      <section className="py-16 px-6 bg-[var(--color-neti-bg)]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--color-neti-surface)] to-[#FDFBFA] rounded-2xl p-8 md:p-12 border border-[var(--color-neti-border)] text-center shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF] rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center bg-[#FCFAEF] text-[var(--color-neti-accent-amber)] border border-[var(--color-neti-accent-amber)]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              Coming Soon
            </div>
            <h3 className="text-2xl md:text-3xl font-lora font-bold text-[var(--color-neti-text)] mb-4">
              Previous Year Papers — The Ultimate Test
            </h3>
            <p className="text-[var(--color-neti-text-muted)] text-sm md:text-base max-w-2xl mx-auto mb-2 leading-relaxed">
              Real exams. Real pressure. Real insight.<br/>
              Practice complete PYP tests mapped to our active recall system<br className="hidden md:block"/>
              — so each paper becomes a diagnostic, not just a drill.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
