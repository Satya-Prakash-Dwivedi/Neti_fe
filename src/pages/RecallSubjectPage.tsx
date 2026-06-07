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
    <div className="bg-white min-h-screen py-12 px-6">
      <SEO title={`${bookName} Subjects - Recall Hub`} description={`Select a subject for ${bookName}.`} />
      
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/recall')}
          className="flex items-center gap-2 text-sm font-bold text-emerald-900/80 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </button>

        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-playfair font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight mb-4">{bookName}</h1>
          <p className="text-base md:text-lg text-slate-700 font-medium max-w-2xl leading-relaxed">
            Select a subject to view available classes or chapters.
          </p>
        </header>

        {loading ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-emerald-100">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subjects.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-emerald-100 p-12 text-center text-emerald-900/60 italic text-sm">
                No subjects found for this book.
              </div>
            ) : (
              subjects.map((sub, idx) => (
                <Link 
                  key={idx}
                  to={`/recall/${encodeURIComponent(bookName || '')}/${encodeURIComponent(sub)}`}
                  className="bg-white rounded-3xl border border-emerald-100 p-8 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:-translate-y-2 hover:border-emerald-300 transition-all duration-300 ease-out group"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 text-center">{sub}</h3>
                  <div className="mt-2 text-xs font-bold text-emerald-900/60 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
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
