export interface MonthlyMagazine {
  id: string;
  title: string;
  month: string;
  year: string;
  tagline: string;
  description: string;
  benefits: string[];
  insideIssue: string[];
  highlights: string[];
  pdfUrl: string;
  coverImage?: string;
  date: string;
}

export const monthlyMagazines: MonthlyMagazine[] = [
  {
    id: "april-2026",
    title: "NETI MONTHLY",
    month: "April",
    year: "2026",
    date: "April 2026",
    tagline: "Clarity, Not Clutter.",
    description: "A focused monthly current affairs magazine for UPSC aspirants who want clarity, not overload. Every issue is designed to help you understand important topics deeply, revise faster, and focus on what actually matters for the exam.",
    benefits: [
      "Understand important topics deeply",
      "Revise faster",
      "Focus on what actually matters for the exam"
    ],
    insideIssue: [
      "Deep Dives",
      "Prelims + Mains focus",
      "MCQs",
      "Quick Revision Facts",
      "Neti Neti Skip List",
      "Monthly Reflection Corner"
    ],
    highlights: [
      "Lok Sabha Expansion Bill",
      "Census 2026",
      "India–New Zealand FTA",
      "UAE & OPEC+",
      "Ganga Expressway",
      "IBCA",
      "DPI@2047",
      "UCC developments"
    ],
    pdfUrl: "/Magazines/neti monthly april 2026.pdf",
    coverImage: "/images/magazines/april_2026_cover.png"
  }
];

