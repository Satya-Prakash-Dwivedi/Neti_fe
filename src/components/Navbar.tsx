import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar Component
 * 
 * A minimalist header navigation for Neti Academy.
 * Now featuring authentication and dynamic links based on user role.
 */

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
];

const currentAffairsItems = [
  { name: "Daily Current Affairs", path: "/current-affairs" },
  { name: "Monthly Magazine", path: "/monthly-magazines" },
];

const dropdownItems = [
  { name: "Mind", path: "/mind" },
  { name: "Plan B", path: "/plan-b" },
  { name: "Announcements", path: "/blogs" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCADropdownOpen, setIsCADropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const caDropdownRef = useRef<HTMLLIElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setShowLogoutModal(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (caDropdownRef.current && !caDropdownRef.current.contains(event.target as Node)) {
        setIsCADropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isCADropdownOpen || isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isCADropdownOpen, isProfileDropdownOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowLogoutModal(false);
      }
    };
    if (showLogoutModal) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal]);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Brand Section */}
          <div className="flex-shrink-0">
            <NavLink to={isAdmin ? "/admin/practice-tests" : "/"} className="flex items-center gap-4 md:gap-6 group">
              <img
                src="/Neti_logo.jpeg"
                alt="Neti Academy Logo"
                className="h-14 w-14 md:h-20 md:w-20 rounded-full object-cover shadow-md transition-transform group-hover:scale-105 ring-2 ring-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-blue-900 font-playfair text-base md:text-2xl font-bold tracking-tight leading-none">
                  NETI ACADEMY
                </span>
                <span className="text-blue-900/60 font-playfair italic text-[9px] md:text-xs font-medium tracking-wide mt-1">
                  नेति नेति — not this, not this
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/practice-tests"
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Admin Tests
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/current-affairs"
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Admin Current Affairs
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/orders"
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Admin Orders
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li key={mainNavItems[0].name}>
                    <NavLink
                      to={mainNavItems[0].path}
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {mainNavItems[0].name}
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/recall"
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Recall Hub
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>

                  {/* Current Affairs Dropdown */}
                  <li className="relative" ref={caDropdownRef}>
                    <button 
                      onClick={() => setIsCADropdownOpen(!isCADropdownOpen)}
                      className={`flex items-center gap-1 text-sm font-bold transition-colors ${isCADropdownOpen ? 'text-blue-900' : 'text-slate-600 hover:text-blue-900'}`}
                    >
                      Current Affairs
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isCADropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-left ${isCADropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="py-2">
                        {currentAffairsItems.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsCADropdownOpen(false)}
                            className={({ isActive }) =>
                              `block px-6 py-3 text-sm font-bold transition-colors ${isActive ? 'text-blue-900 bg-blue-50' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'}`
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </li>

                  {mainNavItems.slice(1).map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                            ? "text-blue-900"
                            : "text-slate-600 hover:text-blue-900"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}


                  {/* Insights Dropdown */}
                  <li className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-1 text-sm font-bold transition-colors ${isDropdownOpen ? 'text-blue-900' : 'text-slate-600 hover:text-blue-900'}`}
                    >
                      Insights
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="py-2">
                        {dropdownItems.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsDropdownOpen(false)}
                            className={({ isActive }) =>
                              `block px-6 py-3 text-sm font-bold transition-colors ${isActive ? 'text-blue-900 bg-blue-50' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'}`
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </li>

                  {/* Contact */}
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                          ? "text-blue-900"
                          : "text-slate-600 hover:text-blue-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Contact
                          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Desktop Authentication Buttons */}
            <div className="border-l border-slate-200 pl-8 flex items-center gap-4 relative" ref={profileDropdownRef}>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-700">
                      {user?.name}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  <div className={`absolute top-full right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right ${isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="p-5 border-b border-slate-50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Refer & Earn</p>
                      <p className="text-sm text-slate-600 mb-4 leading-snug">Give friends a discount and earn points when they purchase!</p>
                      
                      <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Your Code</span>
                          <span className="text-xs font-black text-emerald-600">{user?.referral_points || 0} pts</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-slate-800 tracking-widest">
                          {user?.referral_code || "---"}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const link = `${window.location.origin}/recall?ref=${user?.referral_code}`;
                          navigator.clipboard.writeText(link);
                          alert("Referral link copied to clipboard!");
                        }}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        Copy Referral Link
                      </button>
                    </div>
                    
                    <div className="p-2 bg-slate-50">
                      {!isAdmin && (
                        <Link 
                          to="/recall/history"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:text-blue-900 hover:bg-white rounded-xl transition-all w-full text-left"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Test History
                        </Link>
                      )}
                      <button
                        onClick={() => { setIsProfileDropdownOpen(false); setShowLogoutModal(true); }}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all w-full text-left"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors uppercase tracking-wider"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-850 active:scale-95 transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 hover:text-blue-900 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 border-t border-slate-100 mt-4 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <ul className="flex flex-col py-6 gap-2">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/admin/practice-tests"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    Admin Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/current-affairs"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    Admin Current Affairs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    Admin Orders
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li key={mainNavItems[0].name}>
                  <NavLink
                    to={mainNavItems[0].path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    {mainNavItems[0].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/recall"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    Recall Hub
                  </NavLink>
                </li>

                {/* Mobile Current Affairs Section */}
                <li className="px-6 py-3">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Affairs</p>
                   <div className="grid grid-cols-2 gap-4">
                      {currentAffairsItems.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `text-sm font-bold p-4 rounded-2xl border transition-colors ${isActive 
                              ? 'text-blue-900 bg-blue-50 border-blue-100' 
                              : 'text-slate-600 bg-white border-slate-100 hover:border-blue-100'}`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                   </div>
                </li>

                {mainNavItems.slice(1).map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                          ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                          : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}


                {/* Mobile Dropdown Section */}
                <li className="px-6 py-3">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Insights & Updates</p>
                   <div className="grid grid-cols-2 gap-4">
                      {dropdownItems.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `text-sm font-bold p-4 rounded-2xl border transition-colors ${isActive 
                              ? 'text-blue-900 bg-blue-50 border-blue-100' 
                              : 'text-slate-600 bg-white border-slate-100 hover:border-blue-100'}`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                   </div>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                        ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </>
            )}

            {/* Mobile Auth Actions */}
            <li className="border-t border-slate-100 pt-6 px-6 flex flex-col gap-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Refer & Earn</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-mono font-bold text-slate-800 tracking-widest">{user?.referral_code}</span>
                      <span className="text-xs font-black text-emerald-600">{user?.referral_points || 0} pts</span>
                    </div>
                    <button 
                      onClick={() => {
                        const link = `${window.location.origin}/recall?ref=${user?.referral_code}`;
                        navigator.clipboard.writeText(link);
                        alert("Referral link copied to clipboard!");
                      }}
                      className="w-full mt-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                    >
                      Copy Shareable Link
                    </button>
                  </div>
                  {!isAdmin && (
                    <Link
                      to="/recall/history"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-3 bg-white border border-slate-200 text-slate-700 hover:text-blue-900 rounded-xl text-sm font-bold active:scale-95 transition-all text-center"
                    >
                      Test History
                    </Link>
                  )}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="py-3 bg-red-50 text-red-650 hover:bg-red-100 rounded-xl text-sm font-bold active:scale-95 transition-all text-center"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 border border-slate-200 text-slate-700 hover:text-blue-900 rounded-xl text-sm font-bold active:scale-95 transition-all text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 bg-blue-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with premium blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowLogoutModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 md:p-8 shadow-2xl border border-slate-100 transform scale-100 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
            {/* Header / Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-50 text-red-650 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-50/50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl md:text-2xl text-blue-900 font-bold tracking-tight">
                Confirm Log Out
              </h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Are you sure you want to log out of Neti Academy? You will need to log back in to access your practice tests.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-all shadow-md shadow-red-600/10"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
