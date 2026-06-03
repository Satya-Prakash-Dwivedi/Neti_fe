import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dailyDigests } from "../data/currentAffairs";
import { mindBlogs } from "../data/mindBlogs";
import { platformAnnouncements } from "../data/announcements";
import { courses } from "../data/courses";
import { monthlyMagazines } from "../data/monthlyMagazines";
import { useAuth } from "../context/AuthContext";


const NotificationWidget = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [latestRelease, setLatestRelease] = useState<any>(null);

  // Helper to parse dates into comparable numbers (Consistent Local Time)
  const parseDateToTime = (dateStr: string) => {
    let date: Date;
    // Handle "2026-04-12"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split("-").map(Number);
      date = new Date(y, m - 1, d);
    } else {
      // Handle "12th April 2026" or "April 12, 2026"
      const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
      date = new Date(cleanDateStr);
    }
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  };

  useEffect(() => {
    // Determine the latest release across categories
    const items: any[] = [];
    
    if (platformAnnouncements.length > 0) {
      const item = platformAnnouncements[platformAnnouncements.length - 1];
      items.push({
        ...item,
        type: "Announcement",
        path: `/blogs/${item.id}`,
        btnText: item.category === "Magazine" ? "Download Magazine" : item.category === "Mock Test" ? "Register Now" : "Read Announcement",
        timestamp: parseDateToTime(item.date),
        displayTitle: item.title,
        priority: item.category === "Magazine" ? 10 : item.category === "Mock Test" ? 8 : 3 // Magazines and Mock Tests get priority
      });
    }

    if (mindBlogs.length > 0) {
      const item = mindBlogs[mindBlogs.length - 1];
      items.push({
        ...item,
        type: "Mind Blog",
        path: `/mind/${item.id}`,
        btnText: "Read Mind Blog",
        timestamp: parseDateToTime(item.date),
        displayTitle: item.title,
        priority: 2
      });
    }

    if (dailyDigests.length > 0) {
      const item = dailyDigests[dailyDigests.length - 1];
      items.push({
        ...item,
        type: "Current Affairs",
        path: `/current-affairs/${item.id}`,
        btnText: "Read Daily Digest",
        timestamp: parseDateToTime(item.id),
        displayTitle: item.date,
        priority: 1
      });
    }

    if (courses.length > 0) {
      const item = courses[courses.length - 1];
      items.push({
        ...item,
        type: item.category,
        path: "/courses", // Redirect to courses page
        btnText: item.category === "Revision Series" ? "Start Revision" : "View Course",
        timestamp: parseDateToTime(item.date),
        displayTitle: item.title,
        priority: item.category === "Revision Series" ? 5 : 4
      });
    }

    if (monthlyMagazines.length > 0) {
      const item = monthlyMagazines[monthlyMagazines.length - 1];
      items.push({
        ...item,
        type: "Monthly Magazine",
        path: `/monthly-magazines/${item.id}`,
        btnText: "Read Magazine",
        timestamp: parseDateToTime(`01 ${item.month} ${item.year}`),
        displayTitle: `${item.title} - ${item.month} ${item.year}`,
        priority: 15 // High priority for new magazines
      });
    }


    if (items.length > 0) {
      // Sort by priority first (Magazines, Mock Tests, etc.), then by timestamp descending
      const sortedItems = items.sort((a, b) => {
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        return b.timestamp - a.timestamp;
      });

      setLatestRelease(sortedItems[0]);

      const timer = setTimeout(() => {
        const isDismissed = sessionStorage.getItem("notification_dismissed") === "true";
        if (!isDismissed) {
          setIsOpen(true);
        }
      }, 1500);

      setIsRendered(true);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("notification_dismissed", "true");
  };

  if (!isAuthenticated || !isRendered || !latestRelease) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Expanded Window */}
      <div
        className={`bg-white w-80 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 translate-x-0 mb-4"
            : "scale-0 opacity-0 translate-y-10 translate-x-10 absolute bottom-0 right-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white px-5 py-4 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="20" r="40" stroke="currentColor" strokeWidth="8"/>
              <circle cx="80" cy="20" r="20" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <svg className="w-5 h-5 text-[#C8A951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h4 className="font-playfair font-bold text-lg tracking-wide">Latest Release</h4>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors relative z-10"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#F8F9FB]">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-blue-100/50 text-[#1E3A8A] text-[10px] font-bold uppercase tracking-wider rounded border border-blue-200">
              {latestRelease.type}
            </span>
          </div>
          <h5 className="font-playfair font-bold text-[#0F172A] text-xl mb-2">
            {latestRelease.displayTitle}
          </h5>
          <p className="text-sm font-inter text-[#475569] leading-relaxed mb-6 line-clamp-3">
            {latestRelease.type === "Current Affairs" 
              ? latestRelease.tagline 
              : latestRelease.type === "Monthly Magazine"
              ? latestRelease.description
              : latestRelease.excerpt}
          </p>

          <Link
            to={latestRelease.path}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full bg-[#1E3A8A] text-white font-inter font-bold py-3 rounded-lg shadow-md hover:bg-[#152865] hover:shadow-lg transition-all duration-300"
          >
            {latestRelease.btnText}
          </Link>
        </div>
      </div>

      {/* Persistent Icon Button (Visible when closed) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#1E3A8A] text-white p-4 rounded-full shadow-xl hover:scale-105 hover:bg-blue-900 transition-all duration-300 flex items-center justify-center relative ${
          isOpen ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100"
        }`}
        aria-label="Open notifications"
      >
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#C8A951] rounded-full ring-2 ring-white animate-pulse"></span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationWidget;
