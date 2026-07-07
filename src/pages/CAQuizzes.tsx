import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, ChevronRight, Award, PlayCircle, History } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

interface Quiz {
  id: number;
  title: string;
  question_count: number;
}

interface Attempt {
  id: number;
  quiz: number;
  quiz_title: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
}

const CAQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesRes, attemptsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/ca-quizzes/`),
          axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/attempts/`)
        ]);
        setQuizzes(quizzesRes.data);
        setAttempts(attemptsRes.data);
      } catch (err) {
        console.error("Failed to fetch quizzes or attempts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title="Current Affairs Quizzes - Neti Academy" description="Challenge yourself with UPSC standard daily current affairs quizzes." />
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-blue-900 mb-3">Current Affairs Quizzes</h1>
            <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed font-inter">
              Test your knowledge with our meticulously curated daily and weekly current affairs. High-yield MCQs designed for serious competitive exam preparation.
            </p>
          </div>
          <Link
            to="/recall/test/history?type=ca"
            className="px-6 py-3 bg-white text-blue-900 border border-blue-200 hover:border-blue-900 hover:bg-blue-50 font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all whitespace-nowrap text-sm"
          >
            <History className="w-4 h-4" />
            Performance Dashboard
          </Link>
        </header>

        {loading ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
              <div className="h-3 w-48 bg-slate-50 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            
            {/* Active Tests List */}
            <div className="w-full max-w-4xl space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Available Live Tests</h3>
              
              {quizzes.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic text-sm">
                  No online tests are live at this moment. Check back soon!
                </div>
              ) : (
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div 
                      key={quiz.id} 
                      className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex items-center justify-between gap-6 hover:shadow-md transition-shadow group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-blue-900 group-hover:bg-blue-800 transition-colors" />
                      <div>
                        <h4 className="font-playfair font-bold text-slate-900 text-lg md:text-xl group-hover:text-blue-900 transition-colors mb-2">
                          {quiz.title}
                        </h4>
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          {quiz.question_count} MCQs
                        </span>
                      </div>
                      
                      {(() => {
                        const hasAttempted = attempts.some(a => a.quiz === quiz.id);
                        if (hasAttempted) {
                          return (
                            <div className="px-5 py-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 border border-emerald-100 cursor-not-allowed">
                              <CheckCircle2 className="w-4 h-4" />
                              Completed
                            </div>
                          );
                        }
                        return (
                          <Link 
                            to={`/recall/session/${quiz.id}`}
                            target="_blank"
                            className="px-5 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shrink-0 active:scale-95 shadow-sm shadow-slate-950/10"
                          >
                            Start Test
                            <PlayCircle className="w-4 h-4" />
                          </Link>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CAQuizzes;
