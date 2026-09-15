import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import TeamsSection from "./components/TeamsSection";
import FixturesSection from "./components/FixturesSection";

function App() {
  return (
    <div className="site">
      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <TeamsSection />
        <FixturesSection />
      </main>
    </div>
  );
}

export default App;
