import Hero from "../components/Hero";
import Ecosystem from "../components/Ecosystem";
import CTA from "../components/CTA";
import RecentHighlights from "../components/RecentHighlights";
import NotificationWidget from "../components/NotificationWidget";
import AnnouncementBar from "../components/AnnouncementBar";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Neti Academy | Less Noise, More Clarity"
        description="Premium UPSC study materials, daily current affairs, and comprehensive courses for civil services aspirants."
      />
      <AnnouncementBar />
      <Hero />
      <RecentHighlights />
      <Ecosystem />
      <CTA />
      <NotificationWidget />
    </div>
  );
};

export default Home;
