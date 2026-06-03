import MaterialCard from "./MaterialCard";

const materials = [
  {
    title: "Polity Question Bank",
    subtitle: "2500+ MCQs with detailed constitutional references.",
    tag: "Core Subject"
  },
  {
    title: "Economy Digest",
    subtitle: "Budget 2024-25 and Economic Survey Simplified.",
    tag: "Current Trends"
  },
  {
    title: "History Mindmaps",
    subtitle: "Visual timeline of Modern Indian History for quick revision.",
    tag: "Visual Learning"
  },
  {
    title: "Ethics Case Studies",
    subtitle: "Real-world scenarios and solved Mains answers.",
    tag: "Mains Special"
  }
];

const FeaturedMaterials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900">
              Featured Study Materials
            </h2>
            <p className="mt-4 text-slate-600">
              Carefully curated academic resources designed for focus.
            </p>
          </div>
          <button className="hidden md:block text-blue-900 font-semibold hover:underline mt-4 md:mt-0">
            View All Materials →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.title} {...material} />
          ))}
        </div>
        
        <button className="md:hidden w-full py-4 mt-8 border border-slate-200 rounded-lg text-blue-900 font-semibold">
          View All Materials
        </button>
      </div>
    </section>
  );
};

export default FeaturedMaterials;
