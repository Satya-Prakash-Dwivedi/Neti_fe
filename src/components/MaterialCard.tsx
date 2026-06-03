interface MaterialCardProps {
  title: string;
  subtitle: string;
  tag?: string;
  image?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
}

const MaterialCard = ({ 
  title, 
  subtitle, 
  tag, 
  image, 
  aspectRatio = "aspect-[16/10]",
  objectFit = "cover" 
}: MaterialCardProps) => {
  return (
    <div className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
      {/* Thumbnail */}
      <div className={`${aspectRatio} bg-slate-50 relative overflow-hidden flex items-center justify-center`}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className={`absolute inset-0 w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} transition-transform duration-500 group-hover:scale-110`}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 opacity-50"></div>
            <div className="text-slate-300 font-playfair italic text-lg opacity-40">
              Resource Card
            </div>
          </>
        )}
        {tag && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-bold text-blue-900 border border-slate-200 rounded-full z-10">
            {tag}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow">
        <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};



export default MaterialCard;
