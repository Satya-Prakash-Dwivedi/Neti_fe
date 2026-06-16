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
    if (md.includes("Date ID (YYYY-MM-DD)")) {
      // NEW PLAIN-TEXT FORMAT (Line-by-Line State Machine)
      const lines = md.split('\n');
      let currentSection = "";
      let currentObj: any = null;
      let currentKey = "";

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const rawLine = lines[i];

        if (line === "```markdown" || line === "```") continue;

        if (!line) {
          // Allow empty lines for multi-line content fields
          if (currentObj && currentKey && ["content", "explanation", "revise", "whyItMatters", "pyqConnect", "guidance"].includes(currentKey)) {
            currentObj[currentKey] += "\n";
          }
          continue;
        }

        if (line === "Date ID (YYYY-MM-DD)") { currentSection = "DateID"; continue; }
        if (line === "Display Date") { currentSection = "Date"; continue; }
        if (line === "Day") { currentSection = "Day"; continue; }
        if (line === "Tagline") { currentSection = "Tagline"; continue; }
        if (line === "Announcement") { currentSection = "Announcement"; continue; }
        if (line === "Summary Highlights") { currentSection = "Summary"; continue; }

        if (line.match(/^Topic #\d+$/)) {
          currentObj = { title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" };
          result.topics.push(currentObj);
          currentSection = "Topic";
          currentKey = "";
          continue;
        }

        if (currentSection === "Topic" || (currentObj && 'whyItMatters' in currentObj)) {
          if (line === "Topic Title") { currentKey = "title"; continue; }
          if (line === "Subtitle") { currentKey = "subtitle"; continue; }
          if (line === "Content") { currentKey = "content"; continue; }
          if (line === "Why It Matters") { currentKey = "whyItMatters"; continue; }
          if (line === "Revise Points") { currentKey = "revise"; continue; }
          if (line === "PYQ Connection") { currentKey = "pyqConnect"; continue; }
        }

        if (line.match(/^MCQ #\d+ Question$/)) {
          currentObj = { question: "", options: ["", "", "", ""], answer: "A", explanation: "" };
          result.practiceQuestions.mcqs.push(currentObj);
          currentSection = "MCQ";
          currentKey = "question";
          continue;
        }

        if (currentSection === "MCQ" || (currentObj && 'options' in currentObj)) {
          if (line.match(/^MCQ #\d+ Option A$/)) { currentKey = "optA"; continue; }
          if (line.match(/^MCQ #\d+ Option B$/)) { currentKey = "optB"; continue; }
          if (line.match(/^MCQ #\d+ Option C$/)) { currentKey = "optC"; continue; }
          if (line.match(/^MCQ #\d+ Option D$/)) { currentKey = "optD"; continue; }
          if (line.match(/^MCQ #\d+ Correct Answer$/)) { currentKey = "answer"; continue; }
          if (line.match(/^MCQ #\d+ Explanation$/)) { currentKey = "explanation"; continue; }
        }

        if (line.match(/^Mains Prompt \d+ Question$/)) {
          currentObj = { question: "", context: "", guidance: "" };
          result.practiceQuestions.mains.push(currentObj);
          currentSection = "Mains";
          currentKey = "question";
          continue;
        }

        if (currentSection === "Mains" || (currentObj && 'guidance' in currentObj)) {
          if (line.match(/^Mains Prompt \d+ Context Tag$/)) { currentKey = "context"; continue; }
          if (line.match(/^Mains Prompt \d+ Guidance$/)) { currentKey = "guidance"; continue; }
        }

        // Assign values
        if (currentSection === "DateID" && line) { result.id = line; currentSection = ""; }
        else if (currentSection === "Date" && line) { result.date = line; currentSection = ""; }
        else if (currentSection === "Day" && line) { result.day = line; currentSection = ""; }
        else if (currentSection === "Tagline" && line) { result.tagline = line; currentSection = ""; }
        else if (currentSection === "Announcement" && line) { result.announcement = line; currentSection = ""; }
        else if (currentSection === "Summary" && line.startsWith("-")) {
          result.reviseSummary.push(line.replace(/^-\s*/, '').trim());
        }
        else if (currentObj) {
          if (currentKey === "optA") currentObj.options[0] = (currentObj.options[0] ? currentObj.options[0] + "\n" : "") + line.replace(/^\([a-d]\)\s*/i, '');
          else if (currentKey === "optB") currentObj.options[1] = (currentObj.options[1] ? currentObj.options[1] + "\n" : "") + line.replace(/^\([a-d]\)\s*/i, '');
          else if (currentKey === "optC") currentObj.options[2] = (currentObj.options[2] ? currentObj.options[2] + "\n" : "") + line.replace(/^\([a-d]\)\s*/i, '');
          else if (currentKey === "optD") currentObj.options[3] = (currentObj.options[3] ? currentObj.options[3] + "\n" : "") + line.replace(/^\([a-d]\)\s*/i, '');
          else if (currentKey === "answer") currentObj.answer = line.trim();
          else if (currentKey) {
            currentObj[currentKey] = currentObj[currentKey] ? currentObj[currentKey] + "\n" + rawLine : rawLine;
          }
        }
      }

      // Final processing & trimming
      result.practiceQuestions.mains = result.practiceQuestions.mains.map((m: any) => ({
        question: m.question.trim(),
        context: (m.context.trim() + (m.guidance ? `\n\nGuidance: ${m.guidance.trim()}` : "")).trim()
      }));

      result.topics = result.topics.map(t => ({
        ...t,
        title: t.title.trim(),
        subtitle: t.subtitle.trim(),
        content: t.content.trim(),
        whyItMatters: t.whyItMatters.trim(),
        revise: t.revise.trim(),
        pyqConnect: t.pyqConnect.trim()
      }));

      result.practiceQuestions.mcqs = result.practiceQuestions.mcqs.map(m => ({
        ...m,
        question: m.question.trim(),
        options: m.options.map(o => o.trim()),
        answer: m.answer.trim(),
        explanation: m.explanation.trim()
      }));

    } else {
      // OLD FORMAT LOGIC (Regex-based)
      // 1. Parse Date (e.g. 📅 **3rd June 2026**)
      const dateMatch = md.match(/📅\s*\*\*([^*]+)\*\*/);
      if (dateMatch) {
        result.date = dateMatch[1].trim();
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

      // 2. Parse Revise Summary
      const summarySectionMatch = md.match(/## 📌 TODAY AT A GLANCE([\s\S]*?)(?:## TOPIC|---)/);
      if (summarySectionMatch) {
        const summaryLines = summarySectionMatch[1].split('\n');
        for (const line of summaryLines) {
          const pointMatch = line.match(/(?:🔴|🟡|🟢)\s*\*\*\d+\.\s*(.*?)\*\*\s*[—\-]\s*(.*)/);
          if (pointMatch) {
            result.reviseSummary.push(`${pointMatch[1]} — ${pointMatch[2]}`);
          }
        }
      }

      // 3. Parse Topics
      const topicBlocks = md.split(/## TOPIC \d+:/i).slice(1);
      for (const block of topicBlocks) {
        const topicEndIndex = block.search(/## 📝 EXAM PRACTICE|## ✍️ MAINS PRACTICE|## 🔮 TOMORROW'S PREVIEW/i);
        const topicContentRaw = topicEndIndex !== -1 ? block.substring(0, topicEndIndex) : block;
        
        const lines = topicContentRaw.trim().split('\n');
        const title = lines[0].replace(/—/g, '-').trim();
        
        const subtitleMatch = topicContentRaw.match(/🏷️\s*\*\*(.*?)\*\*/);
        const subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";

        const contentIndex = topicContentRaw.search(/### 📌 QUICK TAKE/i);
        const content = contentIndex !== -1 ? topicContentRaw.substring(contentIndex).trim() : topicContentRaw.trim();

        result.topics.push({
          title, subtitle, content, whyItMatters: "", revise: "", pyqConnect: ""
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
          const explanation = explanationMatch ? explanationMatch[1].replace(/^\*|\*$/g, '').trim() : "";

          result.practiceQuestions.mcqs.push({ question, options, answer, explanation });
        }
      }

      // 5. Parse Mains
      const mainsSectionMatch = md.match(/## ✍️ MAINS PRACTICE([\s\S]*?)(?:## 🔮 TOMORROW'S PREVIEW|$)/i);
      if (mainsSectionMatch) {
        const mainsBlocks = mainsSectionMatch[1].split(/\*\*Question \d+\*\*/).slice(1);
        for (const block of mainsBlocks) {
          const contextMatch = block.match(/\*\((.*?)\)\*/);
          const contextStr = contextMatch ? contextMatch[1].trim() : "";
          
          const guidanceMatch = block.match(/\*\*Guidance:\*\*([\s\S]*)/);
          const guidance = guidanceMatch ? guidanceMatch[1].trim() : "";

          let questionText = block;
          if (contextMatch) questionText = questionText.replace(contextMatch[0], "");
          if (guidanceMatch) questionText = questionText.replace(guidanceMatch[0], "");
          questionText = questionText.replace(/\*\*Guidance:\*\*/, "");
          const question = questionText.replace(/^"|"$/g, '').trim();

          result.practiceQuestions.mains.push({
            question,
            context: `${contextStr}\n\nGuidance: ${guidance}`.trim()
          });
        }
      }
    }

    // Ensure there is always at least one empty item
    if (result.topics.length === 0) result.topics.push({ title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" });
    if (result.practiceQuestions.mcqs.length === 0) result.practiceQuestions.mcqs.push({ question: "", options: ["", "", "", ""], answer: "A", explanation: "" });
    if (result.practiceQuestions.mains.length === 0) result.practiceQuestions.mains.push({ question: "", context: "" });

  } catch (err) {
    console.error("Error parsing markdown:", err);
  }

  return result;
};

