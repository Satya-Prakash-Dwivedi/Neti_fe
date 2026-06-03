import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Download, User, Calendar, Award, CheckCircle2, XCircle, RefreshCw, FileText, BarChart2 } from "lucide-react";
import SEO from "../components/SEO";

interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  difficulty: string;
  solution: string;
}

interface Quiz {
  id: number;
  title: string;
  question_count: number;
  questions: Question[];
}

interface Attempt {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
  };
  score: number;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
  answers_data: Record<string, string>;
}

const AdminQuizAttempts = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [quizRes, attemptsRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/quizzes/admin/detail/${quizId}/`),
        axios.get(`http://localhost:8000/api/quizzes/admin/attempts/${quizId}/`)
      ]);
      setQuiz(quizRes.data);
      setAttempts(attemptsRes.data);
    } catch (err) {
      console.error("Failed to fetch attempts data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) {
      fetchData();
    }
  }, [quizId]);

  const downloadCSVReport = () => {
    if (!attempts.length || !quiz) return;
    
    const headers = [
      "Student Name", 
      "Student Email", 
      "Score Obtained", 
      "Total Questions", 
      "Accuracy (%)", 
      "Date Taken"
    ];
    
    const rows = attempts.map(att => [
      att.student.name,
      att.student.email,
      att.score,
      att.total_questions,
      `${Math.round((att.score / att.total_questions) * 100)}%`,
      new Date(att.completed_at).toLocaleString()
    ]);
    
    // Construct CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Attempts_Report_${quiz.title.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close details sheet on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAttempt(null);
    };
    if (selectedAttempt) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedAttempt]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin text-blue-900"><RefreshCw className="w-8 h-8" /></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Test not found.</h3>
          <Link to="/admin/practice-tests" className="text-blue-900 font-bold underline">Back to Test Engine</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title={`Attempts: ${quiz.title} - Admin`} description="Audit student test results and generate analytics reports." />
      
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/admin/practice-tests" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-900 font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Test Dashboard
        </Link>

        {/* Dashboard Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-50 text-blue-900 border border-blue-100/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Auditing Dashboard
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {quiz.question_count} Questions
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 leading-snug">
              {quiz.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={downloadCSVReport}
              disabled={attempts.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-950/10 hover:bg-blue-850 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Download CSV Report
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-slate-950">Student Completion Ledger</h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {attempts.length} Attempts Total
            </span>
          </div>

          {attempts.length === 0 ? (
            <div className="text-center py-20 text-slate-400 italic text-sm">
              No students have completed this practice test yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Questions Answered</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Score</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Accuracy</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Taken</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Worksheet</th>
                  </tr>
                </thead>
                <tr className="hidden"><td colSpan={7}></td></tr>
                <tbody className="divide-y divide-slate-100">
                  {attempts.map((attempt) => {
                    const answeredCount = Object.keys(attempt.answers_data || {}).length;
                    const accuracy = Math.round((attempt.score / attempt.total_questions) * 100);
                    return (
                      <tr 
                        key={attempt.id} 
                        className="hover:bg-slate-50/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedAttempt(attempt)}
                      >
                        <td className="px-6 py-4.5 text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                          {attempt.student.name}
                        </td>
                        <td className="px-6 py-4.5 text-sm text-slate-500 font-medium">
                          {attempt.student.email}
                        </td>
                        <td className="px-6 py-4.5 text-sm font-semibold text-slate-700">
                          {answeredCount} / {attempt.total_questions}
                        </td>
                        <td className="px-6 py-4.5 text-sm font-bold text-[#1E3A8A] text-center">
                          <span className="bg-blue-50 px-2.5 py-1 rounded-lg">
                            {attempt.score} / {attempt.total_questions}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-sm font-bold text-center">
                          <span className={`px-2.5 py-1 rounded-lg ${
                            accuracy >= 80 ? "text-green-700 bg-green-50" : accuracy >= 50 ? "text-amber-700 bg-amber-50" : "text-red-700 bg-red-50"
                          }`}>
                            {accuracy}%
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-xs text-slate-500 font-semibold">
                          {new Date(attempt.completed_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAttempt(attempt);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 px-3.5 py-2 rounded-xl transition-all"
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Answer Sheet Detailed Audit Modal Overlay */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop with premium blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedAttempt(null)}
          />
          
          {/* Audit Sheet Sidebar Panel */}
          <div className="relative bg-white h-full w-full max-w-2xl shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right">
            {/* Header info */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-widest block mb-1">
                  Student Audit Review
                </span>
                <h4 className="font-playfair text-xl font-bold text-slate-900">
                  {selectedAttempt.student.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {selectedAttempt.student.email} • {new Date(selectedAttempt.completed_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAttempt(null)}
                className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors text-xs font-bold"
              >
                Close Audit
              </button>
            </div>

            {/* Overall Score Banner */}
            <div className="p-6 border-b border-slate-100 bg-[#1E3A8A] text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Audited Test</p>
                <p className="font-bold text-sm md:text-base mt-1 line-clamp-1">{quiz.title}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Final Grade</p>
                <p className="text-2xl font-playfair font-black text-[#C8A951] mt-0.5">
                  {selectedAttempt.score} / {selectedAttempt.total_questions}
                </p>
              </div>
            </div>

            {/* Scrollable Questions List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {quiz.questions && quiz.questions.map((question, qIdx) => {
                const studentAnswer = selectedAttempt.answers_data[String(question.id)] || "";
                const isCorrect = studentAnswer === question.correct_option;
                return (
                  <div key={question.id} className="bg-slate-50/30 border border-slate-200 rounded-3xl p-5 md:p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                      <span className="text-xs font-bold text-slate-400">
                        Question {qIdx + 1}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}>
                        {isCorrect ? "Correct" : studentAnswer ? "Incorrect" : "Skipped"}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {question.question_text}
                    </p>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className={`p-3 rounded-xl border font-medium ${
                        studentAnswer === "A" 
                          ? (isCorrect ? "border-green-500 bg-green-50/20 text-green-800 font-bold" : "border-red-500 bg-red-50/20 text-red-800 font-bold")
                          : (question.correct_option === "A" ? "border-green-500 bg-green-50/10 text-green-850 font-bold" : "border-slate-100 bg-white text-slate-650")
                      }`}>
                        A: {question.option_a}
                      </div>
                      <div className={`p-3 rounded-xl border font-medium ${
                        studentAnswer === "B" 
                          ? (isCorrect ? "border-green-500 bg-green-50/20 text-green-800 font-bold" : "border-red-500 bg-red-50/20 text-red-800 font-bold")
                          : (question.correct_option === "B" ? "border-green-500 bg-green-50/10 text-green-850 font-bold" : "border-slate-100 bg-white text-slate-650")
                      }`}>
                        B: {question.option_b}
                      </div>
                      <div className={`p-3 rounded-xl border font-medium ${
                        studentAnswer === "C" 
                          ? (isCorrect ? "border-green-500 bg-green-50/20 text-green-800 font-bold" : "border-red-500 bg-red-50/20 text-red-800 font-bold")
                          : (question.correct_option === "C" ? "border-green-500 bg-green-50/10 text-green-850 font-bold" : "border-slate-100 bg-white text-slate-650")
                      }`}>
                        C: {question.option_c}
                      </div>
                      <div className={`p-3 rounded-xl border font-medium ${
                        studentAnswer === "D" 
                          ? (isCorrect ? "border-green-500 bg-green-50/20 text-green-800 font-bold" : "border-red-500 bg-red-50/20 text-red-800 font-bold")
                          : (question.correct_option === "D" ? "border-green-500 bg-green-50/10 text-green-850 font-bold" : "border-slate-100 bg-white text-slate-650")
                      }`}>
                        D: {question.option_d}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border-l-4 border-blue-900 border border-slate-200/50 space-y-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Correct Option: <strong className="text-green-700">{question.correct_option}</strong> 
                        {studentAnswer && <span> | Student Choice: <strong className={isCorrect ? "text-green-700" : "text-red-700"}>{studentAnswer}</strong></span>}
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                        {question.solution || "No explanation provided."}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuizAttempts;
