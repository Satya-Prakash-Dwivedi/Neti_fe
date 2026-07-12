import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy, Target, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
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
  is_free_test: boolean;
  is_current_affairs?: boolean;
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
const renderSolution = (text: string) => {
  if (!text) return "No explanation provided.";
  if (!text.includes('|')) return <p className="whitespace-pre-line">{text}</p>;

  const parts = text.split('|').map(p => p.trim()).filter(Boolean);
  return (
    <div className="space-y-3 mt-2">
      {parts.map((part, index) => {
        const colonIndex = part.indexOf(':');
        if (colonIndex > -1 && colonIndex < 30) {
          const label = part.substring(0, colonIndex).trim();
          const content = part.substring(colonIndex + 1).trim();
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:gap-2 items-start">
              <span className="font-bold text-slate-950 shrink-0 min-w-max sm:min-w-28">{label}:</span>
              <span className="text-slate-700 whitespace-pre-line">{content}</span>
            </div>
          );
        }
        return <div key={index} className="text-slate-700 whitespace-pre-line">{part}</div>;
      })}
    </div>
  );
};

const QuestionTextFormatter = ({ text, className }: { text: string; className?: string }) => {
  if (!text) return null;

  let formatted = text;
  const lowerText = text.toLowerCase();
  const isMatch = lowerText.includes("match") || lowerText.includes("list i") || lowerText.includes("list 1");
  const isConsider = lowerText.includes("consider the following statement") || lowerText.includes("consider the following");

  if (isMatch) {
    formatted = formatted.replace(/(list\s*[i1]+\s*:?)/ig, '\n$1\n');
    formatted = formatted.replace(/(?:^|\s|, )(\(?[A-HP-S1-6][\.\-\)])(?=\s|\w)/ig, '\n$1');
  } else if (isConsider) {
    formatted = formatted.replace(/(?:^|\s|, )(\(?[1-6][\.\-\)])(?=\s|\w)/ig, '\n$1');
  } else {
    return <div className={`whitespace-pre-line ${className}`}>{text}</div>;
  }

  const lines = formatted.split('\n').map(l => l.trim()).filter(Boolean);
  const headerLines: string[] = [];
  const items: { marker: string; content: string }[] = [];

  lines.forEach(line => {
    const match = line.match(/^(\(?[A-HP-S1-6][\.\-\)])\s*(.*)/i);
    if (match) {
      items.push({ marker: match[1], content: line });
    } else {
      if (items.length === 0) {
        headerLines.push(line);
      } else {
        items[items.length - 1].content += " " + line;
      }
    }
  });

  if (items.length > 0 && isMatch) {
    const leftCol: string[] = [];
    const rightCol: string[] = [];

    let isAlternating = true;
    for (let i = 0; i < items.length - 1; i++) {
      const type1 = /[0-9]/.test(items[i].marker) ? 'num' : 'alpha';
      const type2 = /[0-9]/.test(items[i + 1].marker) ? 'num' : 'alpha';
      if (type1 === type2) {
        isAlternating = false;
        break;
      }
    }

    if (isAlternating && items.length % 2 === 0) {
      for (let i = 0; i < items.length; i += 2) {
        leftCol.push(items[i].content);
        rightCol.push(items[i + 1].content);
      }
    } else {
      const half = Math.ceil(items.length / 2);
      for (let i = 0; i < half; i++) leftCol.push(items[i].content);
      for (let i = half; i < items.length; i++) rightCol.push(items[i].content);
    }

    if (leftCol.length > 0 && rightCol.length > 0) {
      return (
        <div className={className}>
          {headerLines.length > 0 && <span className="block mb-4">{headerLines.join(" ")}</span>}
          <div className="w-full overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white/50 text-sm md:text-base my-2 font-medium">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                {Array.from({ length: Math.max(leftCol.length, rightCol.length) }).map((_, i) => (
                  <tr key={i} className="hover:bg-slate-100/50 transition-colors">
                    <td className="p-3 md:p-4 border-r border-slate-100 w-1/2 align-top text-slate-800">{leftCol[i] || ""}</td>
                    <td className="p-3 md:p-4 align-top text-slate-800">{rightCol[i] || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={className}>
      {headerLines.length > 0 && <span className="block mb-3">{headerLines.join(" ")}</span>}
      <div className="space-y-2 mt-2 font-medium text-slate-800 text-sm md:text-base">
        {items.map((item, i) => (
          <div key={i} className="pl-3 border-l-2 border-slate-400 py-0.5">{item.content}</div>
        ))}
      </div>
    </div>
  );
};

const RecallSession = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (id) {
      const saved = localStorage.getItem(`quiz_answers_${id}`);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [reviewQuestions, setReviewQuestions] = useState<Record<string, boolean>>(() => {
    if (id) {
      const saved = localStorage.getItem(`quiz_review_${id}`);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [isTimeUp, setIsTimeUp] = useState(false);

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
        const quizRes = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/${id}/`);
        
        if (user) {
          const attemptsRes = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/attempts/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
          });
          const hasAttempted = attemptsRes.data.some((a: any) => a.quiz === parseInt(id!));
          if (hasAttempted) {
            setAlreadyAttempted(true);
          }
        }
        
        setQuiz(quizRes.data);
      } catch (err) {
        console.error("Failed to load quiz details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, user]);

  // Auto-save answers and review state to localStorage
  useEffect(() => {
    if (id) {
      if (Object.keys(answers).length > 0) {
        localStorage.setItem(`quiz_answers_${id}`, JSON.stringify(answers));
      }
      if (Object.keys(reviewQuestions).length > 0) {
        localStorage.setItem(`quiz_review_${id}`, JSON.stringify(reviewQuestions));
      }
    }
  }, [answers, reviewQuestions, id]);

  // Timer logic
  useEffect(() => {
    if (loading || results) return;

    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }

    if (showSubmitModal || submitting) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, loading, results, showSubmitModal, submitting]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimeUp && !results && !submitting) {
      executeSubmit();
    }
  }, [isTimeUp, results, submitting]);

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
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const executeSubmit = async () => {
    setShowSubmitModal(false);
    setSubmitting(true);
    try {
      const config = user ? { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } } : {};
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/${id}/submit/`, {
        answers
      }, config);
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
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin text-slate-700"><RefreshCw className="w-8 h-8" /></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Quiz not found or not active.</h3>
          <Link to="/recall" className="text-slate-700 font-bold underline">Back to Recall Hub</Link>
        </div>
      </div>
    );
  }

  const questionCount = quiz.questions.length;

  const handleReattempt = () => {
    setResults(null);
    setAnswers({});
    setReviewQuestions({});
    setCurrentQuestionIndex(0);
    setTimeLeft(3600);
    setIsTimeUp(false);
    localStorage.removeItem(`quiz_answers_${id}`);
    localStorage.removeItem(`quiz_review_${id}`);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (alreadyAttempted && quiz) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-6">
        <SEO title="Quiz Completed" description="You have already taken this quiz." />
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-lora mb-3">Test Already Completed</h2>
          <p className="text-slate-600 mb-8 font-inter">You have already submitted this test. You can review your performance in your performance dashboard.</p>
          <Link to="/recall/test/history" className="px-8 py-4 bg-slate-700 text-white rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-colors inline-block">
            View Performance Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <SEO title={`${quiz.title} - Online Practice`} description={`Online test session for ${quiz.title}`} />

      <div className="max-w-7xl mx-auto">
        {quiz.is_current_affairs ? (
          <Link to="/ca-quiz" className="inline-flex items-center gap-2 text-slate-900/80 hover:text-slate-700 font-bold text-xs uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Current Affairs Quiz
          </Link>
        ) : (
          <Link to={`/recall/book/${(quiz as any).book?.id}`} className="inline-flex items-center gap-2 text-slate-900/80 hover:text-slate-700 font-bold text-xs uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Book
          </Link>
        )}

        {/* Quiz Completed Results Header */}
        {results ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-lg mb-8 text-center space-y-6">
            <div className="flex justify-center mb-2">
              {results.score / results.total_questions >= 0.8 ? (
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  <Trophy className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  <Target className="w-10 h-10" />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-lora font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent tracking-tight">Quiz Completed!</h2>
            <div className={`inline-flex flex-col items-center justify-center p-6 rounded-2xl border ${results.score / results.total_questions >= 0.8 ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-slate-100 border-slate-200'}`}>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Your Final Score</span>
              <span className={`text-5xl font-lora font-black ${results.score / results.total_questions >= 0.8 ? 'text-green-600' : 'text-slate-700'}`}>{results.score} / {results.total_questions}</span>
              <span className="text-xs font-bold text-slate-900/80 mt-2">({Math.round((results.score / results.total_questions) * 100)}% accuracy)</span>
            </div>
            <p className="text-sm text-slate-900/80 font-medium max-w-md mx-auto">
              Review your question breakdown below with option elimination logic, and the solutions database.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block mb-1">Live Examination</span>
              <h2 className="text-xl md:text-2xl font-lora font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent tracking-tight">{quiz.title}</h2>
            </div>

            {!quiz.is_current_affairs && (
              <div className="flex flex-col items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-inner w-full md:w-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Remaining</span>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
                  <Clock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}

            <div className="flex flex-col items-start md:items-end w-full md:w-1/3">
              <div className="text-xs font-bold text-slate-500 mb-2">
                Question {currentQuestionIndex + 1} of {questionCount}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-slate-400 to-slate-700 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${((currentQuestionIndex + 1) / questionCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Solving Interface */}
        {!results ? (
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
            {/* Left Sidebar: Question Navigator */}
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-6">
                <h3 className="font-lora font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">Questions</h3>
                <div className="flex flex-wrap gap-4 md:gap-5 justify-center sm:justify-start">
                  {quiz.questions.map((q, idx) => {
                    const isAnswered = !!answers[q.id.toString()];
                    const isCurrent = idx === currentQuestionIndex;

                    let btnClass = "w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all ";

                    if (isCurrent) {
                      btnClass += "bg-sky-500 text-white shadow-md transform scale-105";
                    } else if (reviewQuestions[q.id.toString()]) {
                      btnClass += "bg-orange-500 text-white shadow-sm hover:bg-orange-600";
                    } else if (isAnswered) {
                      btnClass += "bg-slate-1000 text-white shadow-sm hover:bg-slate-700";
                    } else {
                      btnClass += "bg-white border border-slate-200 text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentQuestionIndex(idx);
                          window.scrollTo(0, 0);
                        }}
                        className={btnClass}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center mb-4 bg-slate-100 rounded-lg p-3">
                    <span className="text-sm font-bold text-slate-700">Attempted:</span>
                    <span className="text-sm font-black text-slate-800">{Object.keys(answers).length} / {questionCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-slate-1000 shadow-sm" />
                      <span>Answered</span>
                    </div>
                    <span>{quiz.questions.filter((q) => !reviewQuestions[q.id.toString()] && !!answers[q.id.toString()]).length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-orange-500 shadow-sm" />
                      <span>Marked for Review</span>
                    </div>
                    <span>{quiz.questions.filter((q) => reviewQuestions[q.id.toString()]).length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-white border border-slate-200 shadow-sm" />
                      <span>Not Answered</span>
                    </div>
                    <span>{quiz.questions.filter((q) => !reviewQuestions[q.id.toString()] && !answers[q.id.toString()]).length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Area */}
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
              {quiz.questions[currentQuestionIndex] && (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-8">
                  {/* Question Text */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="font-lora font-black text-xl text-slate-950">Question : {currentQuestionIndex + 1}</span>
                    </div>
                    <QuestionTextFormatter
                      text={quiz.questions[currentQuestionIndex].question_text}
                      className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed"
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-4">
                    {([
                      { key: "A", val: quiz.questions[currentQuestionIndex].option_a },
                      { key: "B", val: quiz.questions[currentQuestionIndex].option_b },
                      { key: "C", val: quiz.questions[currentQuestionIndex].option_c },
                      { key: "D", val: quiz.questions[currentQuestionIndex].option_d }
                    ] as const).map((opt) => {
                      const isSelected = answers[quiz.questions[currentQuestionIndex].id.toString()] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => selectOption(quiz.questions[currentQuestionIndex].id, opt.key)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ease-out flex items-start gap-4 active:scale-95 ${isSelected ? "border-slate-1000 bg-slate-100/80 shadow-md ring-2 ring-slate-1000/20" : "border-slate-200 hover:border-slate-400 hover:shadow-sm bg-slate-100/20 hover:-translate-y-0.5"}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-200 ${isSelected ? "bg-slate-700 text-white shadow-sm" : "bg-slate-100 text-slate-700 font-medium"}`}>
                            {opt.key}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 leading-snug">{opt.val}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions (Clear, Mark Review) */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        const newAnswers = { ...answers };
                        delete newAnswers[quiz.questions[currentQuestionIndex].id.toString()];
                        setAnswers(newAnswers);
                      }}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors underline decoration-slate-300 underline-offset-4"
                    >
                      Clear Answer
                    </button>
                    
                    <button
                      onClick={() => {
                        const qId = quiz.questions[currentQuestionIndex].id.toString();
                        setReviewQuestions(prev => ({
                          ...prev,
                          [qId]: !prev[qId]
                        }));
                      }}
                      className={`text-xs font-bold px-4 py-2 rounded-xl border transition-colors flex items-center gap-2 ${reviewQuestions[quiz.questions[currentQuestionIndex].id.toString()] ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${reviewQuestions[quiz.questions[currentQuestionIndex].id.toString()] ? 'bg-orange-500' : 'bg-slate-300'}`} />
                      {reviewQuestions[quiz.questions[currentQuestionIndex].id.toString()] ? 'Marked for Review' : 'Mark for Review'}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 border border-slate-200 rounded-xl hover:border-slate-400 text-slate-700 font-medium hover:text-slate-800 font-bold text-xs disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === quiz.questions.length - 1}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold text-xs disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Submit Test */}
              <div className="flex justify-end pt-8 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={submitting}
                  className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold text-sm shadow-md active:scale-95 transition-all"
                >
                  {submitting ? "Submitting..." : "Submit Test"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Solutions & Review view
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Detailed Explanation & Solution Key</h3>
            {results.feedback.map((item, idx) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <span className="font-bold text-slate-800 text-sm">Question {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-slate-200 text-[var(--color-neti-accent)] text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Difficulty: {quiz.questions[idx].difficulty}
                    </span>
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

                <QuestionTextFormatter
                  text={item.question_text}
                  className="text-base md:text-lg font-bold text-slate-950 leading-relaxed"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-900/80">
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'A' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'A' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-100/20')}`}>
                    Option A: {quiz.questions[idx].option_a}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'B' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'B' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-100/20')}`}>
                    Option B: {quiz.questions[idx].option_b}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'C' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'C' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-100/20')}`}>
                    Option C: {quiz.questions[idx].option_c}
                  </div>
                  <div className={`p-4 rounded-xl border ${item.student_choice === 'D' ? (item.is_correct ? 'border-green-500 bg-green-50/20 text-green-800' : 'border-red-500 bg-red-50/20 text-red-800') : (item.correct_option === 'D' ? 'border-green-500 bg-green-50/10 text-green-850' : 'border-slate-100 bg-slate-100/20')}`}>
                    Option D: {quiz.questions[idx].option_d}
                  </div>
                </div>

                <div className="bg-slate-100 p-6 md:p-8 rounded-2xl border-l-4 border-[var(--color-neti-accent)] space-y-4">
                  <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Your Answer: <strong className={item.is_correct ? "text-green-700" : "text-red-700"}>{item.student_choice || "Skipped"}</strong></span>
                    <span>•</span>
                    <span>Correct Answer: <strong className="text-green-700">{item.correct_option}</strong></span>
                  </div>
                  <div className="text-sm text-slate-650 leading-relaxed font-medium">
                    {renderSolution(item.solution)}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-4 py-6">
              {/* Reattempt button removed */}
              {quiz.is_current_affairs ? (
                <Link to="/ca-quiz" className="px-8 py-4 bg-slate-700 text-white rounded-xl hover:bg-[var(--color-neti-accent-amber)] font-bold text-sm shadow-md active:scale-95 transition-all">
                  Back to Current Affairs Quizzes
                </Link>
              ) : (
                <Link to={`/recall/book/${(quiz as any).book?.id}`} className="px-8 py-4 bg-slate-700 text-white rounded-xl hover:bg-[var(--color-neti-accent-amber)] font-bold text-sm shadow-md active:scale-95 transition-all">
                  Return to Book
                </Link>
              )}
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
              <div className="w-14 h-14 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-50/50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-lora text-xl md:text-2xl text-slate-700 font-bold tracking-tight">
                Submit Your Answers?
              </h3>
              <p className="text-slate-900/80 text-sm mt-3 leading-relaxed">
                You have answered <strong className="text-slate-700">{Object.keys(answers).length}</strong> out of <strong className="text-slate-700">{questionCount}</strong> questions.
              </p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Once submitted, you cannot modify your answers. Your final grade and solutions key will be available immediately.
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm font-bold hover:bg-slate-100 active:scale-[0.98] transition-all"
              >
                Go Back
              </button>
              <button
                onClick={executeSubmit}
                className="flex-1 py-3 px-4 bg-slate-700 hover:bg-[var(--color-neti-accent-amber)] text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-all shadow-md shadow-[var(--color-neti-accent)]/10"
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
