export interface ParsedDigest {
  id: string;
  date: string;
  day: string;
  tagline: string;
  announcement: string;
  reviseSummary: string[];
  topics: {
    title: string;
    subtitle: string;
    content: string;
    whyItMatters: string;
    revise: string;
    pyqConnect: string;
  }[];
  practiceQuestions: {
    mcqs: {
      question: string;
      options: string[];
      answer: string;
      explanation: string;
    }[];
    mains: {
      question: string;
      context: string;
    }[];
  };
}

export const parseMarkdownDigest = (md: string): ParsedDigest => {
  const result: ParsedDigest = {
    id: "",
    date: "",
    day: "",
    tagline: "नेति नेति — Less noise. More clarity.",
    announcement: "",
    reviseSummary: [],
    topics: [],
    practiceQuestions: { mcqs: [], mains: [] }
  };

  try {
    // 1. Parse Date (e.g. 📅 **3rd June 2026**)
    const dateMatch = md.match(/📅\s*\*\*([^*]+)\*\*/);
    if (dateMatch) {
      result.date = dateMatch[1].trim(); // e.g. 3rd June 2026
      
      // Basic attempt to parse the date to get YYYY-MM-DD and Day
      try {
        const cleanDateStr = result.date.replace(/(st|nd|rd|th)/, '');
        const dateObj = new Date(cleanDateStr);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          result.id = `${year}-${month}-${day}`;
          result.day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        }
      } catch (e) {
        console.warn("Could not parse date accurately for ID and Day.", e);
      }
    }

    // 2. Parse Revise Summary (Today At a Glance)
    const summarySectionMatch = md.match(/## 📌 TODAY AT A GLANCE([\s\S]*?)(?:## TOPIC|---)/);
    if (summarySectionMatch) {
      const summaryLines = summarySectionMatch[1].split('\n');
      for (const line of summaryLines) {
        // Match lines like 🔴 **1. MAHA Water Mission launched** — India's...
        const pointMatch = line.match(/(?:🔴|🟡|🟢)\s*\*\*\d+\.\s*(.*?)\*\*\s*[—\-]\s*(.*)/);
        if (pointMatch) {
          result.reviseSummary.push(`${pointMatch[1]} — ${pointMatch[2]}`);
        }
      }
    }

    // 3. Parse Topics
    // Split by ## TOPIC
    const topicBlocks = md.split(/## TOPIC \d+:/i).slice(1); // skip the preamble
    for (const block of topicBlocks) {
      const topicEndIndex = block.search(/## 📝 EXAM PRACTICE|## ✍️ MAINS PRACTICE|## 🔮 TOMORROW'S PREVIEW/i);
      const topicContentRaw = topicEndIndex !== -1 ? block.substring(0, topicEndIndex) : block;
      
      const lines = topicContentRaw.trim().split('\n');
      const title = lines[0].replace(/—/g, '-').trim();
      
      // Try to find a subtitle tag e.g. 🏷️ **Science & Technology | Environment**
      const subtitleMatch = topicContentRaw.match(/🏷️\s*\*\*(.*?)\*\*/);
      const subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";

      // We will shove the rest of the content directly into the content box
      const contentIndex = topicContentRaw.search(/### 📌 QUICK TAKE/i);
      const content = contentIndex !== -1 ? topicContentRaw.substring(contentIndex).trim() : topicContentRaw.trim();

      result.topics.push({
        title,
        subtitle,
        content,
        whyItMatters: "", // Left blank for manual entry if needed
        revise: "",
        pyqConnect: ""
      });
    }

    // 4. Parse MCQs
    const mcqSectionMatch = md.match(/## 📝 EXAM PRACTICE[^\n]*([\s\S]*?)(?:## ✍️ MAINS PRACTICE|## 🔮 TOMORROW'S PREVIEW|$)/i);
    if (mcqSectionMatch) {
      const mcqBlocks = mcqSectionMatch[1].split(/\*\*Q\d+\.\*\*/).slice(1);
      for (const block of mcqBlocks) {
        const questionMatch = block.match(/([\s\S]*?)(?:\(a\)|A\.)/);
        const question = questionMatch ? questionMatch[1].trim() : "";

        const optionsMatch = block.match(/(?:\(a\)|A\.)(.*?)✅/s);
        let options = ["", "", "", ""];
        if (optionsMatch) {
          const optString = "(a)" + optionsMatch[1];
          const splitOpts = optString.split(/(?:\([a-d]\)|[A-D]\.)/).filter(o => o.trim().length > 0);
          for (let i = 0; i < Math.min(4, splitOpts.length); i++) {
            options[i] = splitOpts[i].trim();
          }
        }

        const answerMatch = block.match(/✅\s*Answer:\s*(?:\*)?\(([a-d])\)/i) || block.match(/✅\s*Answer:\s*(?:\*)?([A-D])/i);
        const answer = answerMatch ? answerMatch[1].toUpperCase() : "A";

        const explanationMatch = block.match(/✅\s*Answer:[^\n]*\n([\s\S]*)/);
        const explanation = explanationMatch ? explanationMatch[1].replace(/^\*|\*$/g, '').trim() : ""; // Remove surrounding italics

        result.practiceQuestions.mcqs.push({
          question,
          options,
          answer,
          explanation
        });
      }
    }

    // 5. Parse Mains
    const mainsSectionMatch = md.match(/## ✍️ MAINS PRACTICE([\s\S]*?)(?:## 🔮 TOMORROW'S PREVIEW|$)/i);
    if (mainsSectionMatch) {
      const mainsBlocks = mainsSectionMatch[1].split(/\*\*Question \d+\*\*/).slice(1);
      for (const block of mainsBlocks) {
        const contextMatch = block.match(/\*\((.*?)\)\*/); // *(GS Paper 3...)*
        const contextStr = contextMatch ? contextMatch[1].trim() : "";
        
        const guidanceMatch = block.match(/\*\*Guidance:\*\*([\s\S]*)/);
        const guidance = guidanceMatch ? guidanceMatch[1].trim() : "";

        // Question is between context and guidance
        let questionText = block;
        if (contextMatch) {
          questionText = questionText.replace(contextMatch[0], "");
        }
        if (guidanceMatch) {
          questionText = questionText.replace(guidanceMatch[0], "");
        }
        questionText = questionText.replace(/\*\*Guidance:\*\*/, "");
        const question = questionText.replace(/^"|"$/g, '').trim(); // remove surrounding quotes

        result.practiceQuestions.mains.push({
          question,
          context: `${contextStr}\n\nGuidance: ${guidance}`.trim()
        });
      }
    }

    // Ensure there is always at least one empty item if nothing was parsed
    if (result.topics.length === 0) result.topics.push({ title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" });
    if (result.practiceQuestions.mcqs.length === 0) result.practiceQuestions.mcqs.push({ question: "", options: ["", "", "", ""], answer: "A", explanation: "" });
    if (result.practiceQuestions.mains.length === 0) result.practiceQuestions.mains.push({ question: "", context: "" });

  } catch (err) {
    console.error("Error parsing markdown:", err);
  }

  return result;
};
