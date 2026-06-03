import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, name, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your entries.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-6">
      <SEO title="Sign Up - Neti Academy" description="Register a new student account at Neti Academy." />
      
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <img
            src="/Neti_logo.jpeg"
            alt="Neti Academy Logo"
            className="h-16 w-16 rounded-full mx-auto mb-4 border border-slate-100 shadow-md"
          />
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-2">Create Account</h2>
          <p className="text-sm text-slate-500 font-medium">Join Neti Academy as a serious UPSC aspirant.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 text-sm font-medium bg-slate-50/50"
              placeholder="Your Name"
            />
          </div>

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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 text-sm font-medium bg-slate-50/50"
              placeholder="Min. 8 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-950/15 hover:bg-blue-850 active:scale-95 transition-all mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-medium text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-bold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
