import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import SEO from "../components/SEO";

interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  difficulty: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

interface FeedbackItem {
  id: number;
  question_text: string;
  student_choice: string;
  correct_option: string;
  is_correct: boolean;
  solution: string;
}

const RecallSession = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (id) {
      const saved = localStorage.getItem(`quiz_answers_${id}`);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Submission feedback
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    total_questions: number;
    correct_answers: number;
    feedback: FeedbackItem[];
  } | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/${id}/`);
        setQuiz(response.data);
      } catch (err) {
        console.error("Failed to load quiz details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // Auto-save answers to localStorage
  useEffect(() => {
    if (id && Object.keys(answers).length > 0) {
      localStorage.setItem(`quiz_answers_${id}`, JSON.stringify(answers));
    }
  }, [answers, id]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSubmitModal(false);
      }
    };
    if (showSubmitModal) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSubmitModal]);

  const selectOption = (qId: number, option: string) => {
    if (results) return; // Prevent editing after submission
    setAnswers({
      ...answers,
      [qId.toString()]: option
    });
  };

  const handleNext = () => {
    if (quiz && activeIdx < quiz.questions.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const executeSubmit = async () => {
    setShowSubmitModal(false);
    setSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/${id}/submit/`, {
        answers
      });
      setResults(response.data);
      if (id) {
        localStorage.removeItem(`quiz_answers_${id}`);
      }
    } catch (err) {
      console.error("Failed to submit answers:", err);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h3 className="text-xl font-bold text-slate-800 mb-4">Quiz not found or not active.</h3>
          <Link to="/recall" className="text-blue-900 font-bold underline">Back to Recall Hub</Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[activeIdx];
  const questionCount = quiz.questions.length;
  
  const handleReattempt = () => {
    setResults(null);
    setAnswers({});
    setActiveIdx(0);
    localStorage.removeItem(`quiz_answers_${id}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title={`${quiz.title} - Online Practice`} description={`Online test session for ${quiz.title}`} />
      
      <div className="max-w-4xl mx-auto">
        <Link to={`/recall/book/${(quiz as any).book?.id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-900 font-bold text-xs uppercase tracking-widest mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Book
        </Link>

        {/* Quiz Completed Results Header */}
        {results ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-lg mb-8 text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-slate-900">Quiz Completed!</h2>
            <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Final Score</span>
              <span className="text-5xl font-playfair font-black text-blue-900">{results.score} / {results.total_questions}</span>
              <span className="text-xs font-bold text-slate-500 mt-2">({Math.round((results.score / results.total_questions) * 100)}% accuracy)</span>
            </div>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
              Review your question breakdown below with option elimination logic, UPSC alignment, and the solutions database.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8 flex items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest block mb-1">Live Examination</span>
              <h2 className="text-xl md:text-2xl font-playfair font-bold text-slate-900">{quiz.title}</h2>
            </div>
            <div className="text-xs font-bold text-slate-400">
              Question {activeIdx + 1} of {questionCount}
            </div>
          </div>
        )}

        {/* Solving Interface */}
        {!results ? (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-8">
              {/* Question Text */}
              <div className="space-y-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Difficulty: {currentQuestion.difficulty}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.question_text}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4">
                {([
                  { key: "A", val: currentQuestion.option_a },
                  { key: "B", val: currentQuestion.option_b },
                  { key: "C", val: currentQuestion.option_c },
                  { key: "D", val: currentQuestion.option_d }
                ] as const).map((opt) => {
                  const isSelected = answers[currentQuestion.id.toString()] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => selectOption(currentQuestion.id, opt.key)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${isSelected ? "border-blue-900 bg-blue-50/50 shadow-sm" : "border-slate-200 hover:border-slate-400 bg-slate-50/20"}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                        {opt.key}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 leading-snug">{opt.val}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="px-6 py-3 border border-slate-200 rounded-xl hover:border-slate-400 text-slate-600 hover:text-slate-800 font-bold text-xs disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Question
              </button>

              {activeIdx < questionCount - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold text-xs active:scale-95 transition-all flex items-center gap-2"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={submitting}
                  className="px-8 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-850 font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  {submitting ? "Submitting..." : "Submit All Answers"}
                </button>
              )}
            </div>
          </div>
        ) : (
          // Solutions & Review view
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Detailed Explanation & Solution Key</h3>
            {results.feedback.map((item, idx) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <span className="font-bold text-slate-800 text-sm">Question {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    {item.is_correct ? (
                      <span className="flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs font-bold">
                        <XCircle className="w-4 h-4" />
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                  {item.question_text}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'A' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'A' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-50/20')}`}>
                    Option A: {quiz.questions[idx].option_a}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'B' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'B' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-50/20')}`}>
                    Option B: {quiz.questions[idx].option_b}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'C' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'C' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-50/20')}`}>
                    Option C: {quiz.questions[idx].option_c}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'D' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'D' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-50/20')}`}>
                    Option D: {quiz.questions[idx].option_d}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border-l-4 border-blue-900 space-y-4">
                  <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Your Answer: <strong className={item.is_correct ? "text-green-700" : "text-red-700"}>{item.student_choice || "Skipped"}</strong></span>
                    <span>•</span>
                    <span>Correct Answer: <strong className="text-green-700">{item.correct_option}</strong></span>
                  </div>
                  <div className="text-sm text-slate-650 leading-relaxed whitespace-pre-line font-medium">
                    {item.solution}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-4 py-6">
              <button onClick={handleReattempt} className="px-8 py-4 border border-blue-900 text-blue-900 rounded-xl hover:bg-blue-50 font-bold text-sm shadow-sm active:scale-95 transition-all">
                Reattempt Test
              </button>
              <Link to={`/recall/book/${(quiz as any).book?.id}`} className="px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-blue-850 font-bold text-sm shadow-md active:scale-95 transition-all">
                Return to Book
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowSubmitModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100 transform scale-100 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-50/50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-playfair text-xl md:text-2xl text-blue-900 font-bold tracking-tight">
                Submit Your Answers?
              </h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                You have answered <strong className="text-blue-900">{Object.keys(answers).length}</strong> out of <strong className="text-blue-900">{questionCount}</strong> questions.
              </p>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Once submitted, you cannot modify your answers. Your final grade and solutions key will be available immediately.
              </p>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                Go Back
              </button>
              <button
                onClick={executeSubmit}
                className="flex-1 py-3 px-4 bg-blue-900 hover:bg-blue-850 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-all shadow-md shadow-blue-900/10"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecallSession;
