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
        const response = await axios.get(`http://localhost:8000/api/quizzes/categories/${bookName}/${subject}/classes/`);
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
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title={`${subject} - ${bookName} - Recall Hub`} description={`Select a class or book for ${subject} in ${bookName}.`} />
      
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(`/recall/${encodeURIComponent(bookName || '')}`)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </button>

        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">{bookName} - {subject}</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Select a specific class or book to view available chapters.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic text-sm">
                No classes or books found for this selection.
              </div>
            ) : (
              books.map((book) => (
                <Link 
                  key={book.id}
                  to={`/recall/book/${book.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center gap-4 hover:border-blue-900 hover:shadow-md transition-all group overflow-hidden"
                >
                  {book.cover_image ? (
                     <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                       <img src={book.cover_image} alt={book.book_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                     </div>
                  ) : (
                     <div className="w-full h-48 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-12 h-12 opacity-50" />
                     </div>
                  )}
                  <div className="text-center w-full">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                      {book.class_name ? `${book.class_name}` : `${book.book_name} - ${book.subject}`}
                    </h3>
                    <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 group-hover:text-blue-900 transition-colors">
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
