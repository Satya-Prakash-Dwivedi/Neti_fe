import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

interface Book {
  id: number;
  book_name: string;
  subject: string;
  class_name: string;
  cover_image: string;
  full_price: string;
  is_active: boolean;
}

const RecallClassPage = () => {
  const { bookName, subject } = useParams<{ bookName: string, subject: string }>();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/categories/${bookName}/${subject}/classes/`);
        setBooks(response.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      } finally {
        setLoading(false);
      }
    };
    if (bookName && subject) fetchBooks();
  }, [bookName, subject]);

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <SEO title={`${subject} - ${bookName} - Recall Hub`} description={`Select a class or book for ${subject} in ${bookName}.`} />
      
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(`/recall/${encodeURIComponent(bookName || '')}`)}
          className="flex items-center gap-2 text-sm font-bold text-emerald-900/80 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </button>

        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-playfair font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight mb-4">{bookName} - {subject}</h1>
          <p className="text-base md:text-lg text-slate-700 font-medium max-w-2xl leading-relaxed">
            Select a specific class or book to view available chapters.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-emerald-100 p-12 text-center text-emerald-900/60 italic text-sm">
                No classes or books found for this selection.
              </div>
            ) : (
              books.map((book) => (
                <Link 
                  key={book.id}
                  to={`/recall/book/${book.id}`}
                  className="bg-white rounded-2xl border border-emerald-100 p-4 flex flex-col items-center gap-4 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out group overflow-hidden"
                >
                  {book.cover_image ? (
                     <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2">
                       <img src={book.cover_image} alt={book.book_name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                     </div>
                  ) : (
                     <div className="w-full h-48 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-12 h-12 opacity-50" />
                     </div>
                  )}
                  <div className="text-center w-full">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                      {book.class_name ? `${book.class_name}` : `${book.book_name} - ${book.subject}`}
                    </h3>
                    <div className="mt-2 text-[10px] font-bold text-emerald-900/60 uppercase tracking-widest flex items-center justify-center gap-1 group-hover:text-emerald-600 transition-colors">
                      View Chapters <ChevronRight className="w-3 h-3" />
                    </div>
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

export default RecallClassPage;
