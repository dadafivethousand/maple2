import Schedule from "./Schedule.js";
import useScrollAnimation from "./useScrollAnimation";
import './Stylesheets/App.css';
import Navbar from "./Navbar.js";
import { useAppContext, AppProvider } from "./AppContext";
import About from "./About.js";
import Landing from "./Landing.js";
import Coaches from "./Coaches.js";
import FAQ from "./FAQ.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Pricing from "./Pricing.js";
import Programs from "./Programs.js";
import Purchase from "./Components/Purchase.js";

function App() {
  useScrollAnimation();

  return (
    <AppProvider>
      <div className="App">
    

        {/* Conditionally render the components only if selectedPrice is not null */}
        <MainContent />

      
      </div>
    </AppProvider>
  );
}

function MainContent() {
  const { price } = useAppContext();

  // Render the main components only if selectedPrice is not null
  if (price !== null) {
    return <Purchase />;  // Don't render anything if selectedPrice is null
  }

  return (
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
  );
}

export default App;
