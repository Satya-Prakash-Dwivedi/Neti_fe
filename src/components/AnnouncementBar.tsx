import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <div className="bg-[#0F172A] text-white overflow-hidden py-3 border-y border-slate-800 shadow-sm relative z-40">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#C8A951] rounded-full animate-pulse shadow-[0_0_8px_rgba(200,169,81,0.5)]"></span>
              <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#C8A951] font-inter">Upcoming Course</span>
            </span>
            <Link
              to="/courses/free-polity-classes"
              className="text-sm font-medium hover:text-[#C8A951] transition-colors font-inter flex items-center gap-4 group"
            >
              <span className="text-slate-100 group-hover:text-white transition-colors">
                A complete, free, live Polity course starting June.
              </span>
              <span className="bg-[#1E3A8A] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider group-hover:bg-[#C8A951] group-hover:text-[#0F172A] transition-all duration-300">
                VIEW COURSE →
              </span>
            </Link>
          </div>
        ))}

      </div>

      {/* CSS for the marquee effect */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
