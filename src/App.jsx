import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import TeamsSection from "./components/TeamsSection";
import FixturesSection from "./components/FixturesSection";
import NewsSection from "./components/NewsSection";
import SponsorsSection from "./components/SponsorsSection";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="site">
      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <TeamsSection />
        <FixturesSection />
        <NewsSection />
        <GallerySection />
        <SponsorsSection />
        <JoinSection />
        <Footer />
        <BackToTop />
      </main>
    </div>
  );
}

export default App;
