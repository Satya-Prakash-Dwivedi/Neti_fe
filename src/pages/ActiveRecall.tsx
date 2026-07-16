import React from "react";
import SEO from "../components/SEO";

const ActiveRecall = () => {
  return (
    <div className="bg-[var(--color-neti-bg)] min-h-screen py-16 px-6 font-inter text-[var(--color-neti-text)]">
      <SEO title="The Science of Active Recall - Neti Academy" description="Learn why active recall is the most effective way to study and how Neti Academy uses it." />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-lora font-bold text-center mb-12 tracking-tight">
          The Science of Active Recall
        </h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-[var(--color-neti-text-muted)]">
          <p>
            Have you ever read a chapter of Laxmikanth, highlighted the important parts, and felt like you understood it perfectly—only to go blank during a mock test two weeks later?
          </p>
          <p>
            You aren't alone. And it isn't a lack of intelligence. It is a flaw in how we were taught to study.
          </p>
          
          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            The Illusion of Knowing
          </h2>
          <p>
            For decades, the standard advice for studying has been: read the textbook, make notes, highlight key points, and read them again.
          </p>
          <p>
            Cognitive psychologists call this passive review. When you re-read a chapter, the text feels familiar. Your brain says, "Ah, I know this." But science—specifically the research detailed in Peter C. Brown's gold-standard book Make It Stick—proves that this feeling is a trap.
          </p>
          <p>
            Familiarity is not the same as mastery. Passive reading creates an "illusion of knowing." You recognize the information while it is right in front of you, but you haven't actually built the neural pathways required to retrieve it when the book is closed.
          </p>

          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            The Solution: Active Retrieval
          </h2>
          <p>
            If you want to build a memory that lasts until exam day, you have to do the exact opposite of passive reading. You have to struggle.
          </p>
          <p className="font-semibold text-[var(--color-neti-text)]">
            Real learning happens at the exact moment you force your brain to pull information out, not when you try to push it in.
          </p>
          <p>
            This is Active Recall. It is the simple, powerful practice of testing yourself. Every time you try to remember a fact without looking at the answer, you are physically strengthening the neural connection to that memory. It feels harder because it is harder. But that mental friction is the actual biological process of learning.
          </p>
          
          <div className="p-8 my-10 bg-[var(--color-neti-dark-bg)] text-[var(--color-neti-dark-text)] rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-neti-accent-amber)] opacity-10 rounded-full blur-3xl"></div>
            <p className="relative z-10 font-lora italic text-xl leading-relaxed">
              As Make It Stick notes: <br/><br/>
              "Retrieval practice—recalling facts or concepts or events from memory—is a more effective learning strategy than review by re-reading."
            </p>
          </div>

          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            Beating the Forgetting Curve
          </h2>
          <p>
            In the late 19th century, a psychologist named Hermann Ebbinghaus discovered the "Forgetting Curve." He proved that if you learn something today, you will forget over 70% of it within a week unless you actively interrupt that forgetting process.
          </p>
          <p>
            How do you interrupt it? By testing yourself right as your brain is starting to forget it.
          </p>

          <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-text)] mt-12 mb-4">
            How Neti Academy Uses This Science
          </h2>
          <p>
            We didn't just build another test series. We built an entire ecosystem around cognitive science to ensure you don't waste your time.
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong className="text-[var(--color-neti-text)]">The Recall Hub:</strong> Instead of giving you PDF summaries of NCERTs to read passively, we give you rigorous chapter-wise MCQs based on those books. We force you to retrieve the information, cementing it in your brain.
            </li>
            <li>
              <strong className="text-[var(--color-neti-text)]">The Question Bank:</strong> We categorize previous year papers so you can actively test your knowledge immediately after finishing a topic, proving to yourself that you own the material.
            </li>
            <li>
              <strong className="text-[var(--color-neti-text)]">Daily CA Quiz:</strong> Reading the newspaper is passive. Taking our daily quiz ensures the current affairs actually stick in your long-term memory.
            </li>
          </ul>

          <p className="font-bold text-[var(--color-neti-text)] text-2xl mt-12 pb-4 border-b border-[var(--color-neti-border)]">
            Stop re-reading. Stop highlighting. Start recalling.
          </p>
          <p className="font-medium text-[var(--color-neti-text-muted)] text-xl italic">
            That is the Neti method.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveRecall;
