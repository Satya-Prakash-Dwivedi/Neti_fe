import { monthlyMagazines } from "../data/monthlyMagazines";
import { Link } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";
import { SEO } from "../components/SEO";


const MonthlyMagazines = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <SEO 
        title="Monthly Current Affairs Magazine | Neti Academy"
        description="Focused monthly current affairs magazines for UPSC aspirants. Clarity, not clutter."
      />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-blue-900 mb-4">
            Monthly Magazines
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            A focused monthly current affairs magazine for UPSC aspirants who want clarity, not overload.
          </p>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monthlyMagazines.map((mag) => (
            <Link key={mag.id} to={`/monthly-magazines/${mag.id}`}>
              <MaterialCard 
                title={mag.title}
                subtitle={`${mag.month} ${mag.year} Edition`}
                tag="Magazine"
                image={mag.coverImage}
                aspectRatio="aspect-[3/4]"
                objectFit="contain"
              />

            </Link>

          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyMagazines;
