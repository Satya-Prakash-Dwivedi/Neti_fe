import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState(() => localStorage.getItem('referralCode') || "");
  const [referralConfig, setReferralConfig] = useState<{ discount_percentage: number } | null>(null);
  const [isValidReferral, setIsValidReferral] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/orders/referral-config/`)
      .then(res => setReferralConfig(res.data))
      .catch(err => console.error("Failed to fetch referral config", err));
  }, []);

  useEffect(() => {
    if (referralCode.length > 2) {
      const delayFn = setTimeout(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/orders/validate-referral/?code=${referralCode}`, {
          headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
          .then(res => {
            setIsValidReferral(res.data.valid);
          })
          .catch(err => {
            console.error("Failed to validate referral code", err);
            setIsValidReferral(false);
          });
      }, 500);
      return () => clearTimeout(delayFn);
    } else {
      setIsValidReferral(false);
    }
  }, [referralCode]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBuyNow = async () => {
    try {
      const payload: any = {
        amount: product.price,
        currency: "INR",
        product_id: product.id
      };
      if (referralCode) {
        payload.referral_code = referralCode;
      }

      // 1. Create order on the backend
      const { data: order } = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create/`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // ensure auth
      });

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Netiedu.com",
        description: `Purchase: ${product.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          // 3. Verify payment on the backend
          const result = await axios.post(`${import.meta.env.VITE_API_URL}/orders/verify/`, response);
          if (result.data.status === "success") {
            alert("Payment Successful! Your PDF will download shortly.");
            if (result.data.pdf_file) {
              window.open(result.data.pdf_file, "_blank");
            }
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
        },
        theme: {
          color: "#1E3A8A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-20 text-center">Product Not Found</div>;
  }

  const getDisplayPrice = () => {
    let price = parseFloat(product.price);
    if (referralConfig && isValidReferral) {
      price = price - (price * referralConfig.discount_percentage / 100);
    }
    return Math.max(price, 0).toFixed(2);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Product Image/Thumbnail */}
        <div className="w-full md:w-1/2 aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
           <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
           <span className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-4 inline-block">
             {product.subject}
           </span>
           <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-6 font-primary">
             {product.title}
           </h1>
           <p className="text-3xl font-bold text-slate-900 mb-8">
             ₹{product.price}
           </p>
           
           <div className="prose prose-slate max-w-none mb-10">
             <p className="text-slate-600 leading-relaxed text-lg">
               {product.description}
             </p>
           </div>

           <div className="space-y-4">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Referral Code (Optional)" 
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="px-4 py-3 border border-slate-200 rounded-l-xl text-sm w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                />
                <div className="bg-slate-50 border-y border-r border-slate-200 rounded-r-xl px-4 py-3 min-w-[80px] flex items-center justify-center">
                  {referralConfig && isValidReferral ? (
                    <span className="text-xs text-blue-600 font-bold whitespace-nowrap">
                      -{referralConfig.discount_percentage}% Off
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">—</span>
                  )}
                </div>
              </div>
              <button 
                onClick={handleBuyNow}
                className="w-full py-5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Buy Now & Download PDF (₹{getDisplayPrice()})
              </button>
              <p className="text-center text-xs text-slate-400">
                Secure transaction powered by Razorpay.
              </p>
           </div>

           {/* Features/Highlights */}
           <div className="mt-12 grid grid-cols-2 gap-6 pt-12 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Chapter Wise</h4>
                <p className="text-xs text-slate-500">Structured categorized content.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Detailed Answers</h4>
                <p className="text-xs text-slate-500">Step-by-step conceptual clarity.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
