import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Clock, CheckCircle2, TrendingUp, History } from "lucide-react";
import SEO from "../components/SEO";
import { useToast } from "../context/ToastContext";

interface QuizAttempt {
  id: number;
  quiz: number;
  quiz_title: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
  is_current_affairs?: boolean;
}

const RecallHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const isCaOnly = searchParams.get('type') === 'ca';

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/attempts/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        let fetchedAttempts = response.data;
        if (isCaOnly) {
          fetchedAttempts = fetchedAttempts.filter((a: QuizAttempt) => a.is_current_affairs);
        }
        
        setAttempts(fetchedAttempts);
      } catch (err) {
        console.error("Failed to load history:", err);
        showToast("Failed to load test history", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAccuracy = (score: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <SEO title={isCaOnly ? "Current Affairs Dashboard - Neti Academy" : "Performance Dashboard - Neti Academy"} description="Track your practice test scores and history." />
      
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(isCaOnly ? '/ca-quiz' : '/recall')}
          className="flex items-center gap-2 text-sm font-bold text-slate-900/80 hover:text-slate-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {isCaOnly ? 'Current Affairs' : 'Recall Hub'}
        </button>

        <header className="mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              <History className="w-4 h-4" />
              <span>Performance Tracking</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-lora font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent tracking-tight mb-2">
              {isCaOnly ? 'Current Affairs Dashboard' : 'Performance Dashboard'}
            </h1>
            <p className="text-base text-slate-700 font-medium leading-relaxed">
              Track your progress and review past {isCaOnly ? 'current affairs' : ''} attempts.
            </p>
          </div>
          
          <div className="bg-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center min-w-[150px]">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1">Total Tests Taken</span>
            <span className="text-4xl font-lora font-black text-slate-700">{attempts.length}</span>
          </div>
        </header>

        {loading ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
            </div>
          </div>
        ) : attempts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-lora">No Tests Taken Yet</h3>
            <p className="text-slate-900/80 text-sm max-w-sm">
              You haven't attempted any tests. Start practicing to see your history here.
            </p>
            <button 
              onClick={() => navigate(isCaOnly ? '/ca-quiz' : '/recall')}
              className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 font-bold text-sm shadow-md transition-all mt-4"
            >
              Start Practice
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => {
              const accuracy = calculateAccuracy(attempt.score, attempt.total_questions);
              return (
                <div key={attempt.id} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 ease-out">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {attempt.quiz_title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-900/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(attempt.completed_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 w-full md:w-auto">
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Score</div>
                      <div className="text-2xl font-black text-slate-800 font-lora">
                        {attempt.score} <span className="text-sm text-slate-500 font-bold">/ {attempt.total_questions}</span>
                      </div>
                    </div>

                    <div className="text-center pl-6 border-l border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</div>
                      <div className={`text-xl font-black ${accuracy >= 80 ? 'text-green-600' : accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'} flex items-center justify-center gap-1`}>
                        {accuracy}%
                      </div>
                    </div>
                    
                    {/* Reattempt button removed */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecallHistory;
