const PlanB = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header - Redesigned Phase 2: Visual Dual-Anchor */}
      <header className="pt-16 pb-12 md:pt-32 md:pb-32 relative overflow-hidden">
        {/* Abstract background decorative blobs */}
        <div className="absolute top-0 right-0 w-64 md:96 h-64 md:h-96 bg-emerald-50/50 rounded-full blur-3xl -mr-32 md:-mr-48 -mt-32 md:-mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 md:64 h-48 md:h-64 bg-slate-100 rounded-full blur-3xl -ml-24 md:-ml-32 -mb-24 md:-mb-32 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20">
            
            {/* Left Column: Philosophical Core */}
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
              <div className="inline-block">
                <span className="px-3 md:px-4 py-1.5 text-[9px] md:text-xs font-bold text-emerald-900 bg-emerald-50/50 rounded-full border border-emerald-100 uppercase tracking-[0.2em] backdrop-blur-sm">
                  नेति नेति — Less Noise. More Clarity.
                </span>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <p className="text-emerald-900/40 font-bold italic tracking-wide text-base md:text-xl">
                  Perspective is the Real Practice.
                </p>
                <h1 className="text-4xl md:text-7xl font-playfair font-bold text-slate-900 leading-tight">
                  Plan B
                </h1>
              </div>

              {/* Redesigned Quote Card with Glassmorphism */}
              <div className="bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 max-w-xl mx-auto lg:mx-0 relative group">
                <div className="absolute top-0 left-10 w-12 h-1 bg-emerald-900/20 rounded-full"></div>
                <p className="text-base md:text-xl text-slate-700 font-medium leading-relaxed italic font-inter relative z-10">
                  "You are preparing seriously. <br className="hidden md:block" /> We have no doubts about that."
                </p>
                <div className="mt-6 md:mt-8 flex items-center justify-center lg:justify-start gap-4">
                   <div className="h-px bg-slate-200 w-12"></div>
                   <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-900/40 transition-colors group-hover:bg-emerald-900"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-900/60"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-900/80"></span>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Anchor */}
            <div className="flex-1 w-full max-w-2xl animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
               <div className="relative group">
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100/20 to-slate-200/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative bg-white p-3 md:p-4 rounded-3xl md:rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
                    <img 
                      src="/images/plan_b_paths.png" 
                      alt="Multiple career paths and choices" 
                      className="w-full h-full object-cover rounded-2xl md:rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Floating highlight badge - Adjusted for responsiveness */}
                  <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white text-slate-900 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl hidden sm:block max-w-[150px] md:max-w-[180px] border border-emerald-100 backdrop-blur-xl">
                    <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Status Check</p>
                    <p className="text-[11px] md:text-sm font-medium text-slate-700 leading-snug italic">Structure brings the calm you need for UPSC.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="prose prose-slate max-w-none">
          
          <section className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-slate-900 border-b-2 border-emerald-900 inline-block pb-2 mb-6 md:mb-8">The Reality</h2>
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              UPSC is uncertain. Not because you lack ability, but because the exam is designed in such a way that 99.99% of candidates will fail. Lakhs of serious, hard-working people appear every year. Very few seats are available. The outcome is never fully in your control.
            </p>
          </section>

          <section className="mb-12 md:mb-16 bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-playfair font-bold text-slate-900 mb-4 md:mb-6">Why Are We Here?</h2>
            <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed">
              Most aspirants avoid the Plan B conversation entirely. Not because they don’t think about it, but because from childhood, we have been taught to focus on just one goal.
            </p>
            <p className="text-sm md:text-base text-slate-600 italic border-l-4 border-emerald-900 pl-4 bg-slate-50 py-4 md:py-5 leading-relaxed rounded-r-xl">
              "Therefore, contemplating Plan B feels like betrayal. Like admitting defeat before the fight is over."
            </p>
            <p className="text-sm md:text-base text-slate-600 mt-6 leading-relaxed">
              It doesn’t go away, though. Instead, it sits quietly, creating low-level anxiety that makes preparation harder, not easier. We are here to make that clear and offer a practical solution.
            </p>
          </section>

          <section className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-playfair font-bold text-slate-900 mb-4 md:mb-6">What a Plan B Actually Does</h2>
            <p className="text-sm md:text-base text-slate-700 font-bold mb-4">A Plan B does not pull you away from UPSC.</p>
            <p className="text-sm md:text-base text-slate-700 mb-8 leading-relaxed">
              Instead, it gives what most people lack: <span className="text-emerald-900 underline font-bold decoration-emerald-200 underline-offset-4">CLARITY</span>. It gives the mind a place to stand. When you know you have options – even if you never use them – the fear of failure decreases. And when that fear reduces, you prepare with CONFIDENCE.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
              {['Giving up', 'Hedging your bet', 'Losing focus', 'Preparing for failure'].map((item) => (
                <div key={item} className="flex flex-col items-center justify-center p-5 md:p-6 bg-rose-50 rounded-2xl text-rose-800 font-semibold text-xs md:text-sm text-center line-through decoration-rose-400/60 opacity-80 shadow-sm">
                   {item}
                </div>
              ))}
              <div className="col-span-full text-center text-[10px] md:text-xs text-slate-400 mt-4 italic font-medium uppercase tracking-widest leading-loose">What Plan B is NOT</div>
            </div>
          </section>

          <section className="mb-12 md:mb-16 p-8 md:p-14 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 rounded-3xl md:rounded-[3rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110 pointer-events-none"></div>
            
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <div className="h-px bg-emerald-900/10 flex-1"></div>
                <h2 className="text-2xl md:text-3xl font-playfair font-black text-emerald-900 tracking-tight">How NETI Can Help</h2>
                <div className="h-px bg-emerald-900/10 flex-1"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { 
                    title: 'Resume Building', 
                    desc: 'Turning your academic and UPSC preparation into something legible to other opportunities.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    )
                  },
                  { 
                    title: 'LinkedIn Profile Setup', 
                    desc: 'Most aspirants have no professional presence online; this matters.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                      </svg>
                    )
                  },
                  { 
                    title: 'Interview Preparation', 
                    desc: 'For jobs, fellowships, or other competitive processes.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                      </svg>
                    )
                  },
                  { 
                    title: 'Real-world Matching', 
                    desc: 'Identifying what makes sense for you based on your background and timeline.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-5.492-1.59-1.59" />
                      </svg>
                    )
                  }
                ].map((service) => (
                  <div key={service.title} className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-emerald-50 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 group/card relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity transform group-hover/card:scale-110 duration-500 pointer-events-none text-emerald-900">
                      {service.icon}
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5 box-border border border-emerald-100 group-hover/card:bg-emerald-600 group-hover/card:text-white transition-colors duration-300 shadow-sm relative z-10">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg md:text-xl mb-2 relative z-10">{service.title}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10">{service.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 md:mt-14 p-4 md:p-5 bg-emerald-900/5 rounded-xl border border-emerald-900/10 flex gap-3 md:gap-4 items-start md:items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1 md:mt-0 text-emerald-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-slate-700 italic font-medium leading-relaxed pr-2">
                  <span className="font-bold border-b border-emerald-900/30 pb-0.5 text-emerald-900">Note:</span> We are not a placement firm. We simply sit with you, understand where you are, and help you think clearly.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 mb-8 md:mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
              {[
                'Fill a short Google Form — and tell us about your background.',
                'A free 15-minute call — no sales, no pressure; just a real conversation.',
                'Structured guidance if you want it — only if it makes sense for your situation.',
                'Minimal charges depending on what is needed – stated clearly upfront.'
              ].map((step, idx) => (
                <div key={idx} className="p-5 md:p-6 bg-white rounded-xl md:rounded-2xl border border-slate-200 flex gap-4 items-start shadow-sm hover:border-emerald-900 transition-all hover:shadow-md active:scale-95 cursor-default">
                   <span className="w-6 h-6 bg-emerald-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{idx+1}</span>
                   <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Start Here / CTA */}
          <section className="bg-emerald-50/50 border border-emerald-100 p-8 md:p-16 rounded-2xl md:rounded-[3rem] text-center text-slate-900 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold mb-4 relative z-10 text-emerald-950">Start Here</h2>
            <p className="text-slate-600 mb-8 md:mb-10 max-w-sm md:max-w-md mx-auto relative z-10 text-sm md:text-base leading-relaxed">
              It takes three minutes. The first conversation is free. Clarity is about knowing you have options.
            </p>
            <a 
              href="https://forms.gle/pWMoT3kxNz3XUULJ8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-emerald-900 text-white font-bold rounded-xl md:rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10 active:scale-95 relative z-10 text-sm md:text-base group"
            >
              Fill the Google Form
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlanB;
