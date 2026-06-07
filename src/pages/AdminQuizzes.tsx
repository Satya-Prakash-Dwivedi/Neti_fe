import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, Trash, Edit, Plus, FileText, CheckCircle } from "lucide-react";
import SEO from "../components/SEO";

interface Question {
  id?: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  difficulty: string;
  solution: string;
}

interface QuizSummary {
  id: number;
  title: string;
  book?: {
    id: number;
    book_name: string;
    subject: string;
    class_name: string;
  };
  is_live: boolean;
  is_free_test: boolean;
  question_count: number;
  created_at: string;
  questions?: Question[];
}

const AdminQuizzes = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState<number | "">("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [publishedQuizzes, setPublishedQuizzes] = useState<QuizSummary[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState<"upload" | "list">("upload");

  const [listFilterSubject, setListFilterSubject] = useState("");
  const [listFilterBookName, setListFilterBookName] = useState("");
  const [listFilterClassName, setListFilterClassName] = useState("");

  const uniqueListSubjects = Array.from(new Set(publishedQuizzes.map(q => q.book?.subject).filter(Boolean))) as string[];
  const uniqueListBookNames = Array.from(new Set(publishedQuizzes.map(q => q.book?.book_name).filter(Boolean))) as string[];
  const uniqueListClassNames = Array.from(new Set(publishedQuizzes.map(q => q.book?.class_name).filter(Boolean))) as string[];

  const filteredQuizzesToDisplay = publishedQuizzes.filter(quiz => {
    if (listFilterSubject && quiz.book?.subject !== listFilterSubject) return false;
    if (listFilterBookName && quiz.book?.book_name !== listFilterBookName) return false;
    if (listFilterClassName && quiz.book?.class_name !== listFilterClassName) return false;
    return true;
  });

  // Fetch published quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/admin/list/`);
      setPublishedQuizzes(response.data);
    } catch (err) {
      console.error("Failed to fetch quizzes list:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/admin/books/`);
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchBooks();
  }, []);

  const [selectedSubject, setSelectedSubject] = useState("");

  const uniqueSubjects = Array.from(new Set(books.map(b => b.subject)));
  const filteredBooks = selectedSubject ? books.filter(b => b.subject === selectedSubject) : books;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatusMsg({ text: "", type: "" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/admin/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTitle(response.data.title);
      setQuestions(response.data.questions);
      setStatusMsg({ text: "CSV parsed successfully. Review the questions below.", type: "success" });
    } catch (err: any) {
      setStatusMsg({ text: err.response?.data?.error || "Failed to parse CSV file.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      setStatusMsg({ text: "Chapter Name is required.", type: "error" });
      return;
    }
    if (!bookId) {
      setStatusMsg({ text: "Please select a Book.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/admin/create/`, {
        title,
        book_id: bookId,
        questions
      });
      setStatusMsg({ text: `Chapter "${title}" has been published and is now live!`, type: "success" });
      // Reset upload state
      setFile(null);
      setTitle("");
      setBookId("");
      setSelectedSubject("");
      setQuestions([]);
      fetchQuizzes();
      setActiveTab("list");
    } catch (err: any) {
      setStatusMsg({ text: err.response?.data?.error || "Failed to publish chapter.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId: number) => {
    if (!window.confirm("Are you sure you want to delete this chapter? This action is permanent and will delete all student attempts.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/admin/delete/${quizId}/`);
      fetchQuizzes();
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  const handleToggleFreeTest = async (quizId: number, currentStatus: boolean) => {
    if (currentStatus) return; // Already free, no need to toggle
    
    if (!window.confirm("Set this chapter as the free test for its book? Other chapters in the same book will become paid.")) return;
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/admin/toggle-free/${quizId}/`, {
        is_free_test: true
      });
      fetchQuizzes();
      setStatusMsg({ text: "Free test chapter updated successfully.", type: "success" });
    } catch (err) {
      console.error("Failed to toggle free test:", err);
      setStatusMsg({ text: "Failed to update free test chapter.", type: "error" });
    }
  };


  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title="Admin Test Panel - Neti Academy" description="Manage online practice tests and upload CSV questions." />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-2">Practice Test Engine</h1>
            <p className="text-sm text-slate-500 font-medium">Create online tests by uploading question banks, previewing, and publishing.</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${activeTab === "upload" ? "bg-blue-900 text-white" : "text-slate-500 hover:text-blue-900"}`}
            >
              Upload & Generate
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${activeTab === "list" ? "bg-blue-900 text-white" : "text-slate-500 hover:text-blue-900"}`}
            >
              Live Tests ({publishedQuizzes.length})
            </button>
            <button
              onClick={() => navigate("/admin/books")}
              className="px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider text-slate-500 hover:text-blue-900"
            >
              Manage Books
            </button>
          </div>
        </header>

        {statusMsg.text && (
          <div className={`mb-8 p-4 border-l-4 rounded-xl text-xs font-bold ${statusMsg.type === "success" ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"}`}>
            {statusMsg.text}
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-10">
            {/* Upload Area */}
            {questions.length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-900">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Question CSV</h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  Upload a standard question bank CSV. Make sure it contains columns for: <br />
                  <code className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">question, option_a, option_b, option_c, option_d, correct_option, difficulty, solution</code>
                </p>

                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-900/50 rounded-2xl p-6 transition-all bg-slate-50/50 cursor-pointer relative group">
                    <input
                      type="file"
                      accept=".csv"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FileText className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-900 transition-colors" />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-blue-900 transition-colors">
                      {file ? file.name : "Select CSV File"}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="px-8 py-3.5 bg-blue-900 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-950/10 hover:bg-blue-850 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                  >
                    {loading ? "Processing..." : "Generate Test Preview"}
                  </button>
                </form>
              </div>
            )}

            {/* Questions Live Preview & Inline Edits */}
            {questions.length > 0 && (
              <div className="space-y-8">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Chapter Name</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-2xl font-bold border-b border-transparent focus:border-slate-300 focus:outline-none py-1"
                        placeholder="e.g. Fundamental Rights"
                      />
                    </div>
                    <button
                      onClick={handlePublish}
                      disabled={loading}
                      className="w-full md:w-auto px-8 py-4 bg-green-700 hover:bg-green-850 text-white font-bold rounded-2xl text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Publish Test Live
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-50 mt-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</label>
                      <select 
                        value={selectedSubject} 
                        onChange={e => { setSelectedSubject(e.target.value); setBookId(""); }} 
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                      >
                        <option value="">All Subjects</option>
                        {uniqueSubjects.map((sub: string) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Book / Source</label>
                      <select 
                        value={bookId} 
                        onChange={e => setBookId(Number(e.target.value))} 
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                      >
                        <option value="">Select a Book...</option>
                        {filteredBooks.map((b: any) => (
                          <option key={b.id} value={b.id}>{b.book_name} {b.class_name ? `- ${b.class_name}` : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Questions Preview & Editor ({questions.length} total)</h3>
                  {questions.map((q, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-xs">
                          {idx + 1}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Difficulty:</label>
                          <select
                            value={q.difficulty}
                            onChange={(e) => handleQuestionChange(idx, "difficulty", e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-900"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Question Text</label>
                          <textarea
                            value={q.question_text}
                            onChange={(e) => handleQuestionChange(idx, "question_text", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Option A</label>
                            <input
                              type="text"
                              value={q.option_a}
                              onChange={(e) => handleQuestionChange(idx, "option_a", e.target.value)}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Option B</label>
                            <input
                              type="text"
                              value={q.option_b}
                              onChange={(e) => handleQuestionChange(idx, "option_b", e.target.value)}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Option C</label>
                            <input
                              type="text"
                              value={q.option_c}
                              onChange={(e) => handleQuestionChange(idx, "option_c", e.target.value)}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Option D</label>
                            <input
                              type="text"
                              value={q.option_d}
                              onChange={(e) => handleQuestionChange(idx, "option_d", e.target.value)}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          <div className="md:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Correct Answer Option</label>
                            <select
                              value={q.correct_option}
                              onChange={(e) => handleQuestionChange(idx, "correct_option", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-900 cursor-pointer"
                            >
                              <option value="A">Option A</option>
                              <option value="B">Option B</option>
                              <option value="C">Option C</option>
                              <option value="D">Option D</option>
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Solution / Explanation</label>
                            <textarea
                              value={q.solution}
                              onChange={(e) => handleQuestionChange(idx, "solution", e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-900 bg-slate-50/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 py-6">
                  <button
                    onClick={() => {
                      if (window.confirm("Discard draft? All parsing edits will be lost.")) {
                        setQuestions([]);
                        setFile(null);
                      }
                    }}
                    className="px-6 py-3 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 font-bold text-xs"
                  >
                    Discard Draft
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl text-xs shadow-md active:scale-95 transition-all"
                  >
                    Publish Test Live
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "list" && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h3 className="text-xl font-playfair font-bold text-slate-900">Published Tests</h3>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={listFilterSubject}
                  onChange={e => setListFilterSubject(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-900 bg-slate-50"
                >
                  <option value="">All Subjects</option>
                  {uniqueListSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>

                <select
                  value={listFilterBookName}
                  onChange={e => setListFilterBookName(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-900 bg-slate-50"
                >
                  <option value="">All Books</option>
                  {uniqueListBookNames.map(name => <option key={name} value={name}>{name}</option>)}
                </select>

                <select
                  value={listFilterClassName}
                  onChange={e => setListFilterClassName(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-900 bg-slate-50"
                >
                  <option value="">All Classes</option>
                  {uniqueListClassNames.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>

                {(listFilterSubject || listFilterBookName || listFilterClassName) && (
                  <button
                    onClick={() => {
                      setListFilterSubject("");
                      setListFilterBookName("");
                      setListFilterClassName("");
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {filteredQuizzesToDisplay.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic text-sm">
                No online tests found matching criteria.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredQuizzesToDisplay.map((quiz) => (
                  <div key={quiz.id} className="py-6 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div 
                      className="flex-1 cursor-pointer group"
                      onClick={() => navigate(`/admin/practice-tests/${quiz.id}/attempts`)}
                    >
                      <h4 className="font-bold text-slate-800 text-base md:text-lg group-hover:text-blue-900 transition-colors">
                        {quiz.title}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 mt-2">
                        <span>{quiz.book ? `${quiz.book.book_name} / ${quiz.book.subject} ${quiz.book.class_name ? `/ ${quiz.book.class_name}` : ''}` : "Unknown Book"}</span>
                        <span>•</span>
                        <span>{quiz.question_count} Questions</span>
                        <span>•</span>
                        <span>Published: {new Date(quiz.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Click to view Student Attempts
                        </span>
                        {quiz.is_free_test && (
                          <span className="text-emerald-700 bg-emerald-100 ring-1 ring-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
                            <CheckCircle className="w-3 h-3" /> Free Test
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!quiz.is_free_test && (
                        <button
                          onClick={() => handleToggleFreeTest(quiz.id, quiz.is_free_test)}
                          className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all active:scale-95 border border-emerald-200"
                          title="Set as Free Test for this Book"
                        >
                          Set Free
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(quiz.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                        aria-label="Delete test"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuizzes;
