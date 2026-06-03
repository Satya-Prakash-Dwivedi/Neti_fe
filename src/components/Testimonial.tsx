const Testimonial = () => {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-12">
          <svg className="h-12 w-12 text-blue-400 mx-auto opacity-40" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        
        <blockquote className="text-2xl md:text-4xl font-playfair font-medium leading-tight mb-10 italic">
          "This platform simplifies preparation. The structured approach and the minimalist interface 
          helped me retain more information in significantly less time."
        </blockquote>
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700"></div>
          <div className="text-left">
            <p className="font-bold text-lg">Aspirant (AIR Rank Holder)</p>
            <p className="text-slate-400 text-sm">UPSC CSE Class of 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
