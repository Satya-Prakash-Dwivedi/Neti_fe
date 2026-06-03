import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, PlayCircle, Lock, Download, CheckCircle, ChevronRight, BookOpen } from "lucide-react";
import { useToast } from "../context/ToastContext";
import SEO from "../components/SEO";

interface Quiz {
  id: number;
  title: string;
  question_count: number;
}

interface Book {
  id: number;
  title: string;
  subject: string;
  cover_image: string;
  full_price: string;
  is_active: boolean;
}

interface Order {
  id: number;
  quiz_id?: number;
  book_id?: number;
  amount: string;
}

const RecallBookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<number | null>(null);
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [bookRes, quizzesRes, ordersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/quizzes/books/${bookId}/`),
        axios.get(`${import.meta.env.VITE_API_URL}/quizzes/student/list/`),
        axios.get(`${import.meta.env.VITE_API_URL}/orders/user/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setBook(bookRes.data);
      const filteredQuizzes = quizzesRes.data.filter((q: any) => q.book && q.book.id === Number(bookId));
      setQuizzes(filteredQuizzes);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async (id: number) => {
    setPurchasingId(id);
    try {
      const token = localStorage.getItem('token');
      const payload = { book_id: id };
      
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create/`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Neti Academy",
        description: `${data.quiz_title}`,
        order_id: data.razorpay_order_id,
        handler: async function (response: any) {
          try {
            await axios.post(`${import.meta.env.VITE_API_URL}/orders/verify/`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            showToast("Payment successful! The content is now unlocked.", "success");
            fetchData();
          } catch (err) {
            console.error("Payment verification failed", err);
            showToast("Payment verification failed. Please contact support.", "error");
          }
        },
        prefill: {
          name: data.user_name,
          email: data.user_email,
        },
        theme: {
          color: "#1E3A8A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        showToast("Payment failed: " + response.error.description, "error");
      });
      rzp.open();

    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.error || "Failed to initialize payment", "error");
    } finally {
      setPurchasingId(null);
    }
  };

  const handleDownloadInvoice = async (orderId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}/invoice/`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_Neti_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast("Invoice downloaded successfully", "success");
    } catch (err) {
      console.error("Failed to download invoice:", err);
      showToast("Failed to download invoice", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return <div className="bg-slate-50 min-h-screen flex items-center justify-center font-bold text-slate-500">Book not found.</div>;
  }

  const isFullBookPurchased = orders.some(o => o.book_id === book.id);
  const fullBookOrder = orders.find(o => o.book_id === book.id);
  const isBookFree = parseFloat(book.full_price) === 0;
  const isBookUnlocked = isFullBookPurchased || isBookFree;

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <SEO title={`${book.title} - Question Bank`} description={`Practice tests for ${book.title}.`} />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/recall/${encodeURIComponent(book.subject)}`)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {book.subject}
        </button>

        <header className="mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {book.cover_image ? (
            <img src={book.cover_image} alt="cover" className="w-32 md:w-48 rounded-xl shadow-md border border-slate-200" />
          ) : (
            <div className="w-32 md:w-48 h-48 md:h-64 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              <span>{book.subject}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-4">{book.title}</h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Complete question bank for {book.title}. Unlock individual chapters or purchase the entire book at a discount.
            </p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
                {quizzes.length} Chapters Available
              </span>
              
              {isBookUnlocked ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl font-bold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Full Book Unlocked
                  {fullBookOrder && (
                    <button onClick={() => handleDownloadInvoice(fullBookOrder.id)} className="ml-2 underline text-xs">
                      Invoice
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handlePurchase(book.id)}
                  disabled={purchasingId === book.id}
                  className="px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {purchasingId === book.id ? "Processing..." : `Unlock Full Book (₹${book.full_price})`}
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-playfair">Chapters</h3>
          {quizzes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic text-sm">
              No chapters available for this book yet.
            </div>
          ) : (
            quizzes.map((quiz, idx) => {
              const isUnlocked = isBookUnlocked;

              return (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-3xl border ${isUnlocked ? 'border-green-200 shadow-sm' : 'border-slate-200'} p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden`}
                >
                  {isUnlocked && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
                  )}

                  <div className="flex-1 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-800 text-lg">
                          {quiz.title}
                        </h4>
                        {isUnlocked && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3" /> Unlocked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span className="text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {quiz.question_count} MCQs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pl-14 md:pl-0">
                    {isUnlocked ? (
                      <Link
                        to={`/recall/session/${quiz.id}`}
                        className="flex-1 md:flex-none px-6 py-3 bg-green-700 text-white text-xs font-bold rounded-xl hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        Start Session
                        <PlayCircle className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" /> Locked
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RecallBookDetail;
