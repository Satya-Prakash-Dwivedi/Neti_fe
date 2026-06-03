import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookOpen, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

interface Category {
  book_name: string;
  cover_image: string | null;
}

const RecallSubjects = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/categories/`);
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title="Recall Hub - Neti Academy" description="Choose a subject to practice." />
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center md:text-left flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">Recall Hub</h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Select a book or source category to view available subjects.
            </p>
          </div>
          <Link to="/recall/history" className="px-6 py-2.5 bg-blue-900 text-white font-bold rounded-full text-xs shadow-md hover:bg-blue-800 transition-colors">
            View History
          </Link>
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
            {categories.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic text-sm">
                No categories are currently available. Check back soon!
              </div>
            ) : (
              categories.map((category, idx) => (
                <Link 
                  key={idx}
                  to={`/recall/${encodeURIComponent(category.book_name)}`}
                  className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  {category.cover_image ? (
                    <img src={category.cover_image.startsWith('http') ? category.cover_image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${category.cover_image}`} alt={category.book_name} className="h-40 object-contain rounded-md shadow-sm group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-800 text-center">{category.book_name}</h3>
                  <div className="mt-2 text-xs font-bold text-slate-400 flex items-center gap-1 group-hover:text-blue-900 transition-colors">
                    View Subjects <ChevronRight className="w-3 h-3" />
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

export default RecallSubjects;
