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
            You already have what it takes to succeed: the dedication, the drive, and the intelligence.
          </p>
          <p>
            But often, the journey to your goal gets clouded. Not by a lack of effort, but by too much noise. Too many books, endless PDFs, and the overwhelming, unspoken pressure to be perfect.
          </p>
          <p>
            Neti Academy was created to clear that path for you. We believe that true success requires supporting the whole student. Our philosophy is built on three core pillars: how you study, how you feel, and how you view your future.
          </p>
          
          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            1. The Prep: Neti Neti & Active Recall
          </h2>
          <p>
            We are built on a simple, powerful idea from the Upanishads: “नेति नेति” (Neti Neti). Not this. Not this. It’s the beautiful practice of finding truth by removing what isn't essential. We apply this by giving you fewer, better resources so you can study with a quiet, focused mind.
          </p>
          <p>
            But clearing the noise is only step one. Once you have the right material, we train you to master it through Active Recall. Real learning happens not when you passively read, but when you challenge your brain to pull information out. Our platform tests your knowledge actively, locking in your memory and building unshakeable confidence.
          </p>

          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            2. The Mind: Mental Health is the Foundation
          </h2>
          <p>
            Competitive exams can be exhausting, and we believe your mental health is just as important as your mock scores. A stressed, anxious mind cannot learn effectively. We fiercely advocate for emotional balance. Taking breaks, prioritizing sleep, and managing anxiety are not signs of weakness; they are the absolute requirements of a high-performing student. Your peace of mind is paramount.
          </p>

          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            3. The Pragmatism: The Power of a Plan B
          </h2>
          <p>
            In our society, we often romanticize the idea of "do or die." We disagree. Your life and your worth are far bigger than any single exam. Embracing a "Plan B" doesn't mean you lack dedication to your Plan A. It means you are smart, pragmatic, and secure. Knowing you have other excellent paths forward actually reduces exam anxiety, allowing you to study for your primary goal with a free, fearless mind.
          </p>

          <div className="p-8 my-10 bg-[var(--color-neti-dark-bg)] text-[var(--color-neti-dark-text)] rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-neti-accent-amber)] opacity-10 rounded-full blur-3xl"></div>
            <p className="relative z-10 font-lora italic text-xl leading-relaxed">
              When the noise is gone, anxiety is replaced by calm. When you practice actively, your memory locks in. And when you protect your mental health and broaden your horizons, you become unstoppable.
            </p>
          </div>

          <p className="font-bold text-[var(--color-neti-text)] text-xl mt-12 pb-4 border-b border-[var(--color-neti-border)]">
            Clarity to know what matters. The discipline to practice it. The wisdom to protect your peace.
          </p>
          <p className="font-medium text-[var(--color-neti-text-muted)] text-lg">
            You have the potential. We provide the path. That is the Neti foundation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMethod;
