import React from "react";
import SEO from "../components/SEO";

const OurMethod = () => {
  return (
    <div className="bg-[var(--color-neti-bg)] min-h-screen py-16 px-6 font-inter text-[var(--color-neti-text)]">
      <SEO title="Our Philosophy - Neti Academy" description="Learn about the Neti Neti philosophy and our active recall method." />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-lora font-bold text-center mb-12 tracking-tight">
          Our Philosophy
        </h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-[var(--color-neti-text-muted)]">
          <p>
            Most aspirants don’t fail because they studied too little. They fail because they studied too much of the wrong things — too many books, too many notes, too many sources pulling them in different directions. The problem isn’t effort. It’s noise. And noise doesn’t just waste time. It breeds anxiety. When everything feels important, nothing feels clear. You read more, retain less, and slowly lose confidence in your own preparation.
          </p>
          
          <div className="p-8 my-10 bg-[var(--color-neti-dark-bg)] text-[var(--color-neti-dark-text)] rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-neti-accent-amber)] opacity-10 rounded-full blur-3xl"></div>
            <p className="relative z-10 font-lora italic text-2xl leading-relaxed">
              Neti Academy is built on a simple idea borrowed from one of the oldest philosophical traditions in the world. <span className="font-bold text-[var(--color-neti-accent-amber)]">“नेति नेति”</span> — Brihadaranyaka Upanishad. Not this. Not this.
            </p>
            <p className="relative z-10 mt-6">
              In Advaita Vedanta, Neti Neti is a method of arriving at truth by removing what is not essential. You don’t find clarity by adding more. You find it by stripping away what doesn’t belong.
            </p>
          </div>
          
          <p>
            We apply this directly to how you prepare. Not more PDFs. Not more optional readings. Not another YouTube playlist. Instead — fewer, better resources. Clear structure. Focused practice. A preparation path you can trust.
          </p>

          <p>
            When the clutter is gone, something else happens. The stress drops. You stop comparing your strategy with everyone else’s. You stop hoarding resources you’ll never read. Your mind gets quieter — and a quiet mind learns faster and thinks sharper.
          </p>

          <p className="font-bold text-[var(--color-neti-text)] text-xl mt-12 pb-4 border-b border-[var(--color-neti-border)]">
            Clarity, discipline, and emotional balance are not extras. They are the foundation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMethod;
