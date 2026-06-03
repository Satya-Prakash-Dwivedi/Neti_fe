import { Link } from "react-router-dom";
import { platformAnnouncements } from "../data/announcements";

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16">
        <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-4 text-center">Platform Announcements</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto text-center">
          News, updates, and releases directly from the Neti Academy team.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {platformAnnouncements.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <Link to={`/blogs/${post.id}`} className="block overflow-hidden">
               <img src={post.image} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            
            <div className="p-6 flex flex-col flex-1">
               <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {post.date}
                  </span>
               </div>
               
               <Link to={`/blogs/${post.id}`}>
                 <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                   {post.title}
                 </h2>
               </Link>
               
               <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                 {post.excerpt}
               </p>
               
               <Link to={`/blogs/${post.id}`} className="text-sm font-bold text-blue-900 underline underline-offset-4 hover:text-blue-700 transition-colors self-start">
                 Read Announcement
               </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
