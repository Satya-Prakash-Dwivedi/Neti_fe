import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Option {
  [key: string]: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Result {
  questionId: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  crispSolution: string;
}

export default function DailyCAQuizPage() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Result[] | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/current-affairs/daily-quiz/?date=${date}`);
        setQuestions(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load quiz for this date.');
      } finally {
        setLoading(false);
      }
    };
    if (date) fetchQuestions();
  }, [date]);

  const handleOptionSelect = (qId: number, option: string) => {
    if (results) return; // prevent changing after submission
    setAnswers(prev => ({ ...prev, [qId.toString()]: option }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please login to submit the quiz and track your progress.");
      return;
    }
    setSubmitting(true);
    const answersPayload = Object.entries(answers).map(([qId, opt]) => ({
      questionId: parseInt(qId),
      selectedOption: opt
    }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/current-affairs/daily-quiz/submit/`, {
        date,
        answers: answersPayload
      }, {
        headers: {
          'Authorization': axios.defaults.headers.common['Authorization']
        }
      });
      setResults(response.data.results);
      setScore(response.data.score);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading quiz...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (questions.length === 0) return <div className="p-10 text-center">No questions found for this date.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-slate-900 mb-6">
        Daily Quiz - {date}
      </h1>
      
      {results && (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-800">Your Score: {score} / {questions.length}</h2>
          <p className="text-slate-600 mt-2">Review your detailed breakdown below.</p>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, index) => {
          const result = results?.find(r => r.questionId === q.id.toString());
          const selected = answers[q.id.toString()];
          
          return (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {index + 1}. {q.question}
              </h3>
              
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let optClass = "p-4 rounded-lg border cursor-pointer transition-colors ";
                  
                  if (results) {
                    if (opt === result?.correctOption) {
                      optClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (opt === selected && !result?.isCorrect) {
                      optClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      optClass += "border-slate-200 bg-slate-50 text-slate-500 opacity-50";
                    }
                  } else {
                    if (selected === opt) {
                      optClass += "border-blue-500 bg-blue-50 text-blue-800";
                    } else {
                      optClass += "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700";
                    }
                  }
                  
                  return (
                    <div 
                      key={i} 
                      className={optClass}
                      onClick={() => handleOptionSelect(q.id, opt)}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
              
              {result && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Explanation:</p>
                  <p className="text-sm text-slate-600">{result.crispSolution || "No explanation provided."}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {!results && (
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length !== questions.length}
            className="px-8 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
