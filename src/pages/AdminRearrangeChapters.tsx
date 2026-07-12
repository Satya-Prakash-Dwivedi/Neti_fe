import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, GripVertical, ChevronUp, ChevronDown, Save } from "lucide-react";
import SEO from "../components/SEO";

interface Chapter {
  id: number;
  title: string;
  is_free_test: boolean;
  question_count: number;
  order: number;
}

interface Book {
  id: number;
  book_name: string;
  subject: string;
  class_name: string;
}

const AdminRearrangeChapters = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchBookAndChapters = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        // Fetch book details
        const bookResponse = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/${bookId}/`, config);
        setBook(bookResponse.data);

        // Fetch all chapters (we filter by bookId later if the endpoint returns all, 
        // or we use the admin/list and filter it locally)
        const quizzesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/admin/list/`, config);
        
        // Filter quizzes belonging to this book
        const bookQuizzes = quizzesResponse.data.filter((q: any) => q.book?.id === Number(bookId));
        
        // Initialize order if not set
        const initializedChapters = bookQuizzes.map((q: any, index: number) => ({
          ...q,
          order: q.order !== undefined && q.order !== null ? q.order : index
        }));

        // Sort by order initially
        initializedChapters.sort((a: Chapter, b: Chapter) => a.order - b.order);
        
        setChapters(initializedChapters);
      } catch (err) {
        console.error("Failed to load data:", err);
        setStatusMsg({ text: "Failed to load book data.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndChapters();
  }, [bookId]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newChapters = [...chapters];
    const temp = newChapters[index - 1];
    newChapters[index - 1] = newChapters[index];
    newChapters[index] = temp;
    setChapters(newChapters);
  };

  const moveDown = (index: number) => {
    if (index === chapters.length - 1) return;
    const newChapters = [...chapters];
    const temp = newChapters[index + 1];
    newChapters[index + 1] = newChapters[index];
    newChapters[index] = temp;
    setChapters(newChapters);
  };

  const handleDragStart = (index: number) => {
    setDraggedIdx(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIdx === null || draggedIdx === index) return;
    
    // Reorder array dynamically
    const newChapters = [...chapters];
    const draggedItem = newChapters[draggedIdx];
    newChapters.splice(draggedIdx, 1);
    newChapters.splice(index, 0, draggedItem);
    
    setDraggedIdx(index); // update index to follow the item
    setChapters(newChapters);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMsg({ text: "", type: "" });
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const payload = {
        chapter_orders: chapters.map((c, idx) => ({ id: c.id, order: idx }))
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/quizzes/admin/books/${bookId}/reorder-chapters/`,
        payload,
        config
      );

      setStatusMsg({ text: "Chapters reordered successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to save reorder:", err);
      setStatusMsg({ text: "Failed to save the new order.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading chapters...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title="Rearrange Chapters - Neti Academy" description="Rearrange chapters for a book." />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-col gap-4">
          <Link to="/admin/books" className="inline-flex items-center gap-2 text-[var(--color-neti-accent)]/80 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </Link>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-lora font-bold text-slate-900 mb-2">Rearrange Chapters</h1>
            <p className="text-sm text-slate-500 font-medium">
              Book: <strong className="text-[var(--color-neti-accent)]">{book?.book_name} {book?.class_name ? `- ${book?.class_name}` : ""}</strong>
            </p>
          </div>
        </header>

        {statusMsg.text && (
          <div className={`mb-8 p-4 border-l-4 rounded-xl text-xs font-bold ${statusMsg.type === "success" ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"}`}>
            {statusMsg.text}
          </div>
        )}

        {chapters.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <p className="text-slate-500 italic">No chapters found for this book yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Drag and drop to reorder</span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-[var(--color-neti-accent)] hover:bg-[var(--color-neti-accent)] text-white font-bold rounded-xl text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save New Order"}
              </button>
            </div>

            <div className="space-y-3">
              {chapters.map((chapter, index) => (
                <div 
                  key={chapter.id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all hover:border-blue-300 hover:shadow-sm cursor-grab active:cursor-grabbing ${draggedIdx === index ? 'opacity-50 ring-2 ring-blue-500 scale-[0.99]' : ''}`}
                >
                  <div className="flex flex-col gap-1 items-center justify-center p-1 text-slate-300 hover:text-blue-500 transition-colors">
                    <GripVertical className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 pointer-events-none">
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{chapter.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {chapter.question_count} Questions
                        {chapter.is_free_test && <span className="ml-3 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-200">Free Test</span>}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-slate-300">
                      ID: {chapter.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRearrangeChapters;
