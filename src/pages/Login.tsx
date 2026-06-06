import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-6">
      <SEO title="Login - Neti Academy" description="Log in to your account at Neti Academy." />
      
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <img
            src="/Neti_logo.jpeg"
            alt="Neti Academy Logo"
            className="h-16 w-16 rounded-full mx-auto mb-4 border border-slate-100 shadow-md"
          />
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 font-medium">Please enter your credentials to log in.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 text-sm font-medium bg-slate-50/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-blue-900 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 text-sm font-medium bg-slate-50/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-950/15 hover:bg-blue-850 active:scale-95 transition-all"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-medium text-slate-500">
          New to Neti Academy?{" "}
          <Link to="/register" className="text-blue-900 font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
