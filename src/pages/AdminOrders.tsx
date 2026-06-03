import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  IndianRupee,
  Calendar,
  User,
  BookOpen
} from "lucide-react";
import axios from "axios";

interface Order {
  id: number;
  user__name: string;
  user__email: string;
  quiz__title: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  razorpay_payment_id: string | null;
  created_at: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/admin/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      order.user__name?.toLowerCase().includes(searchStr) ||
      order.user__email?.toLowerCase().includes(searchStr) ||
      order.quiz__title?.toLowerCase().includes(searchStr) ||
      order.razorpay_payment_id?.toLowerCase().includes(searchStr)
    );
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate totals
  const totalRevenue = orders
    .filter(o => o.status === "Paid")
    .reduce((sum, order) => sum + parseFloat(order.amount), 0);
  const totalPaidOrders = orders.filter(o => o.status === "Paid").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Back Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-4">
            <Link 
              to="/admin/practice-tests"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-blue-900 tracking-tight">
                Order History
              </h1>
              <p className="text-slate-500 mt-1">
                View and track all student purchases across the platform.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <span className="text-sm font-medium text-slate-500 mb-1">Total Revenue</span>
              <div className="flex items-center gap-1.5 text-2xl font-bold text-emerald-600">
                <IndianRupee className="w-5 h-5" />
                {totalRevenue.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <span className="text-sm font-medium text-slate-500 mb-1">Successful Orders</span>
              <div className="flex items-center gap-2 text-2xl font-bold text-blue-900">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                {totalPaidOrders}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="relative w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by student, email, quiz or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm transition-all"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                          {formatDate(order.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-xs uppercase">
                            {order.user__name?.charAt(0) || <User className="w-4 h-4" />}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900">{order.user__name}</div>
                            <div className="text-xs text-slate-500">{order.user__email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-slate-900 font-medium">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-900/60" />
                          {order.quiz__title}
                        </div>
                        {order.razorpay_payment_id && (
                          <div className="text-[11px] text-slate-400 mt-0.5 ml-6 font-mono">
                            ID: {order.razorpay_payment_id}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-bold text-slate-700">
                          <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                          {parseFloat(order.amount).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-8 h-8 text-slate-300 mb-3" />
                        <p className="text-base font-medium text-slate-600">No orders found</p>
                        <p className="text-sm mt-1">Try adjusting your search query.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
