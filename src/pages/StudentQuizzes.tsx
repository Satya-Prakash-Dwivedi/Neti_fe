import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, ChevronRight, Award, PlayCircle, History } from "lucide-react";
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

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesRes, attemptsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/list/`),
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
      <SEO title="Practice Tests - Neti Academy" description="Challenge yourself with UPSC standard daily and weekly quizzes." />
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">Practice Tests</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Strengthen your conceptual command. Attend live test series calibrating core UPSC prelims questions.
          </p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Active Tests List */}
            <div className="lg:col-span-2 space-y-6">
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
                      className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex items-center justify-between gap-6 hover:shadow-md transition-shadow group relative"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900/10 group-hover:bg-blue-900 transition-colors" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-base md:text-lg group-hover:text-blue-900 transition-colors mb-2">
                          {quiz.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {quiz.question_count} MCQs
                        </span>
                      </div>
                      
                      <Link 
                        to={`/practice-tests/${quiz.id}`}
                        className="px-5 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shrink-0 active:scale-95 shadow-sm shadow-slate-950/10"
                      >
                        Start Test
                        <PlayCircle className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attempts History */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Attempt History</h3>
              
              {attempts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400 italic text-xs">
                  You haven't attempted any tests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {attempts.map((attempt) => (
                    <div key={attempt.id} className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{attempt.quiz_title}</h5>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {new Date(attempt.completed_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full text-green-700 font-bold text-xs">
                          <Award className="w-3.5 h-3.5" />
                          <span>{attempt.score}/{attempt.total_questions}</span>
                        </div>
                      </div>
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

export default StudentQuizzes;
