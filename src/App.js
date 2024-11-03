import './Stylesheets/App.css';
import Navbar from "./Navbar.js";
import About from "./About.js";
import Landing from "./Landing.js";
import Coaches from "./Coaches.js";
import FAQ from "./FAQ.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Pricing from "./Pricing.js";
import Programs from "./Programs.js";
import Schedule from "./Schedule.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
    <div className="App">
      {/* Set up general meta tags */}
      <Helmet>
        <title>Maple Jiu-Jitsu Academy</title>
        <meta name="description" content="Join Maple Jiu-Jitsu Academy and embark on your Brazilian Jiu-Jitsu journey. Learn from skilled instructors in a supportive environment." />
        <meta name="keywords" content="Brazilian Jiu-Jitsu, Maple Jiu-Jitsu Academy, BJJ, martial arts, self-defense, Jiu-Jitsu classes" />
      </Helmet>

      {/* Render all components */}
      <>
        <Navbar />
        <Landing />
        <About />
        <Programs />
        <Pricing />
        <Coaches />
        <Schedule />
        <FAQ />
        <Contact />
        <Footer />
      </>
    </div>
      </HelmetProvider>
  );
}

export default App;
