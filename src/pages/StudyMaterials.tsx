import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MaterialCard from "../components/MaterialCard";

interface Product {
  id: number;
  title: string;
  description: string;
  subject: string;
  chapter: string;
  price: string;
  thumbnail: string;
  pdf_file: string | null;
}

const StudyMaterials = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Group products by subject
  const subjectsMap: { [key: string]: Product[] } = {};
  products.forEach((product) => {
    if (!subjectsMap[product.subject]) {
      subjectsMap[product.subject] = [];
    }
    subjectsMap[product.subject].push(product);
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-lora font-bold text-slate-900 mb-4">Question Bank & Study Materials</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Structured, high-quality question banks designed for deep conceptual clarity and rigorous practice.
        </p>
      </header>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-slate-100 rounded mb-2"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.keys(subjectsMap).map((subjectName) => (
            <section key={subjectName}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-lora font-bold text-[var(--color-neti-accent)]">{subjectName}</h2>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjectsMap[subjectName].map((product) => (
                  <div key={product.id} className="relative group">
                    <Link to={`/study-materials/${product.id}`}>
                      <MaterialCard 
                       title={product.title} 
                       subtitle={product.description} 
                       tag={`₹${product.price}`}
                      />
                    </Link>
                    <div className="mt-4 flex items-center justify-between px-2">
                      <span className="text-sm font-semibold text-slate-900">₹{product.price}</span>
                      <Link 
                        to={`/study-materials/${product.id}`} 
                        className="text-xs font-bold uppercase tracking-widest text-[var(--color-neti-accent)] hover:text-blue-700 transition-colors"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
