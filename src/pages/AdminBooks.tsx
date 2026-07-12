import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash, Edit, BookOpen, Save, X, Upload } from "lucide-react";
import SEO from "../components/SEO";

interface Book {
  id: number;
  book_name: string;
  subject: string;
  class_name: string;
  cover_image: string;
  source_image: string;
  full_price: string;
  is_active: boolean;
  created_at: string;
}

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [bookName, setBookName] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string>("");
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [existingSourceUrl, setExistingSourceUrl] = useState<string>("");
  const [fullPrice, setFullPrice] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/`);
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const resetForm = () => {
    setBookName("");
    setSubject("");
    setClassName("");
    setCoverImage(null);
    setExistingCoverUrl("");
    setSourceImage(null);
    setExistingSourceUrl("");
    setFullPrice("0");
    setIsActive(true);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (book: Book) => {
    setBookName(book.book_name);
    setSubject(book.subject);
    setClassName(book.class_name || "");
    setCoverImage(null);
    setExistingCoverUrl(book.cover_image || "");
    setSourceImage(null);
    setExistingSourceUrl(book.source_image || "");
    setFullPrice(book.full_price);
    setIsActive(book.is_active);
    setIsEditing(true);
    setEditId(book.id);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName.trim() || !subject.trim()) {
      setStatusMsg({ text: "Book Name and Subject are required.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("book_name", bookName);
      formData.append("subject", subject);
      formData.append("class_name", className);
      formData.append("full_price", fullPrice);
      formData.append("is_active", String(isActive));
      
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }
      
      if (sourceImage) {
        formData.append("source_image", sourceImage);
      }
      
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      };
      
      if (isEditing && editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/${editId}/`, formData, config);
        setStatusMsg({ text: "Book updated successfully.", type: "success" });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/`, formData, config);
        setStatusMsg({ text: "Book created successfully.", type: "success" });
      }
      resetForm();
      fetchBooks();
    } catch (err: any) {
      setStatusMsg({ text: err.response?.data?.error || JSON.stringify(err.response?.data) || "Failed to save book.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg({ text: "", type: "" }), 5000);
    }
  };

  const handleDelete = async (bookId: number) => {
    if (!window.confirm("Are you sure you want to delete this book? This might break associated tests/chapters.")) return;
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      await axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/${bookId}/`, config);
      fetchBooks();
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title="Manage Books - Neti Academy" description="Admin page to manage books and sources." />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-lora font-bold text-slate-900 mb-2">Manage Books</h1>
          <p className="text-sm text-slate-500 font-medium">Create and edit books before uploading chapter test CSVs to them.</p>
        </header>

        {statusMsg.text && (
          <div className={`mb-8 p-4 border-l-4 rounded-xl text-xs font-bold ${statusMsg.type === "success" ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"}`}>
            {statusMsg.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm self-start">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--color-neti-accent)]" />
              {isEditing ? "Edit Book" : "Create New Book"}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4" encType="multipart/form-data">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Book Name</label>
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20"
                  placeholder="e.g. NCERT"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20"
                  placeholder="e.g. History"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class / Level (Optional)</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20"
                  placeholder="e.g. Class 6th"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Book / Source Image</label>
                {existingSourceUrl && !sourceImage && (
                  <div className="mb-2 relative w-16 h-20 rounded-md overflow-hidden border border-slate-200 shadow-sm">
                    <img src={existingSourceUrl.startsWith('http') ? existingSourceUrl : `${import.meta.env.VITE_API_URL.replace('/api', '')}${existingSourceUrl}`} alt="source" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setSourceImage(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full px-4 py-2 border border-slate-200 border-dashed rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20 flex items-center justify-between text-slate-500">
                    <span className="truncate">{sourceImage ? sourceImage.name : "Choose an image file..."}</span>
                    <Upload className="w-4 h-4 text-[var(--color-neti-accent)]" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class Cover Image</label>
                {existingCoverUrl && !coverImage && (
                  <div className="mb-2 relative w-16 h-20 rounded-md overflow-hidden border border-slate-200 shadow-sm">
                    <img src={existingCoverUrl.startsWith('http') ? existingCoverUrl : `${import.meta.env.VITE_API_URL.replace('/api', '')}${existingCoverUrl}`} alt="cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setCoverImage(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full px-4 py-2 border border-slate-200 border-dashed rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20 flex items-center justify-between text-slate-500">
                    <span className="truncate">{coverImage ? coverImage.name : "Choose an image file..."}</span>
                    <Upload className="w-4 h-4 text-[var(--color-neti-accent)]" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Book Price (₹)</label>
                <input
                  type="number"
                  value={fullPrice}
                  onChange={(e) => setFullPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[var(--color-neti-accent)] bg-slate-50/20"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[var(--color-neti-accent)] rounded focus:ring-blue-900"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-slate-600 cursor-pointer">
                  Active (Visible to Students)
                </label>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-[var(--color-neti-accent)] hover:bg-[var(--color-neti-accent)] text-white font-bold rounded-xl text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isEditing ? "Update" : "Create"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6">
            <h3 className="text-xl font-lora font-bold text-slate-900 mb-6">Existing Books</h3>
            {books.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic text-sm">
                No books created yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {books.map((book) => (
                  <div key={book.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      {book.source_image ? (
                         <img src={book.source_image.startsWith('http') ? book.source_image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${book.source_image}`} alt="source" className="w-12 h-16 object-cover rounded-md border border-slate-200" />
                      ) : book.cover_image ? (
                         <img src={book.cover_image.startsWith('http') ? book.cover_image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${book.cover_image}`} alt="cover" className="w-12 h-16 object-cover rounded-md border border-slate-200" />
                      ) : (
                         <div className="w-12 h-16 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-slate-300" />
                         </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">{book.book_name} - {book.subject} {book.class_name ? `- ${book.class_name}` : ''}</h4>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-400 mt-1">
                          <span className="text-[var(--color-neti-accent)]">₹{book.full_price}</span>
                          <span>•</span>
                          <span>{book.subject}</span>
                          <span>•</span>
                          <span className={book.is_active ? "text-green-600" : "text-slate-400"}>
                            {book.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/admin/books/${book.id}/rearrange`, '_blank')}
                        className="px-3 py-1.5 bg-blue-50 text-[var(--color-neti-accent)] font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-blue-100 transition-colors mr-2"
                        title="Rearrange Chapters"
                      >
                        Rearrange Chapters
                      </button>
                      <button
                        onClick={() => handleEdit(book)}
                        className="p-2 text-[var(--color-neti-accent)] hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Book"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Book"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
