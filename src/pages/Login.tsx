import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import SEO from "../components/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, googleLogin } = useAuth();
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    try {
      if (credentialResponse.credential) {
        await googleLogin(credentialResponse.credential);
        navigate(redirectPath, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Google login failed.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <SEO title="Login - Neti Academy" description="Log in to your account at Neti Academy." />
      
      {/* Left Column: Philosophy / Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-[var(--color-neti-dark-bg)] text-[var(--color-neti-dark-text)] p-16 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-neti-accent-amber)] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[var(--color-neti-accent)] opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <Link to="/">
            <img src="/Neti_logo.jpeg" alt="Neti Academy" className="h-12 w-12 rounded-full mb-8 shadow-lg border border-[var(--color-neti-border)]/20" />
          </Link>
          <h1 className="text-4xl font-lora font-bold leading-tight mb-6">
            Welcome to <br />Neti Academy
          </h1>
          <p className="text-lg text-[var(--color-neti-dark-text)]/80 max-w-md font-inter leading-relaxed">
            "We removed the noise. Now we help you own what matters — through science-backed active recall."
          </p>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="font-bold text-[var(--color-neti-accent-amber)] font-lora text-xl mb-2">नेति नेति (Neti Neti)</h3>
            <p className="text-sm text-[var(--color-neti-dark-text)]/70 leading-relaxed">
              Not this. Not this. You don’t find clarity by adding more. You find it by stripping away what doesn’t belong.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex items-center justify-center bg-[var(--color-neti-bg)] p-8">
        <div className="max-w-md w-full">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden mb-6 flex justify-center">
              <Link to="/">
                <img src="/Neti_logo.jpeg" alt="Neti Academy Logo" className="h-16 w-16 rounded-full border border-slate-200 shadow-sm" />
              </Link>
            </div>
            <h2 className="text-3xl font-lora font-bold text-[var(--color-neti-text)] mb-3">Welcome Back</h2>
            <p className="text-[var(--color-neti-text-muted)] font-inter">Please enter your credentials to log in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-sm font-bold shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[var(--color-neti-text-muted)] uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neti-border)] focus:outline-none focus:border-[var(--color-neti-accent)] text-sm font-medium bg-[var(--color-neti-surface)] shadow-sm transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-[var(--color-neti-text-muted)] uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-[var(--color-neti-accent)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neti-border)] focus:outline-none focus:border-[var(--color-neti-accent)] text-sm font-medium bg-[var(--color-neti-surface)] shadow-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[var(--color-neti-accent)] text-white rounded-xl font-bold text-sm shadow-lg shadow-[var(--color-neti-accent)]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between">
            <span className="w-1/5 border-b border-[var(--color-neti-border)] lg:w-1/4"></span>
            <span className="text-xs text-center text-[var(--color-neti-text-muted)] uppercase tracking-wider font-bold">or continue with</span>
            <span className="w-1/5 border-b border-[var(--color-neti-border)] lg:w-1/4"></span>
          </div>

          <div className="mt-8 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login was unsuccessful.")}
              useOneTap
            />
          </div>

          <p className="mt-10 text-center text-sm font-medium text-[var(--color-neti-text-muted)]">
            New to Neti Academy?{" "}
            <Link to="/register" className="text-[var(--color-neti-accent)] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
