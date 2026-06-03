import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

// Removed Book interface, using strings for subjects

const RecallSubjectPage = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/categories/${bookName}/subjects/`);
        setSubjects(response.data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };
    if (bookName) fetchSubjects();
  }, [bookName]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title={`${bookName} Subjects - Recall Hub`} description={`Select a subject for ${bookName}.`} />
      
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/recall')}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </button>

        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">{bookName}</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Select a subject to view available classes or chapters.
          </p>
        </header>

        {loading ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subjects.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic text-sm">
                No subjects found for this book.
              </div>
            ) : (
              subjects.map((sub, idx) => (
                <Link 
                  key={idx}
                  to={`/recall/${encodeURIComponent(bookName || '')}/${encodeURIComponent(sub)}`}
                  className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 text-center">{sub}</h3>
                  <div className="mt-2 text-xs font-bold text-slate-400 flex items-center gap-1 group-hover:text-blue-900 transition-colors">
                    View Contents <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecallSubjectPage;
