import ImageReveal from "./ImageReveal.js";
import Schedule from "./Schedule.js";
import useScrollAnimation from "./useScrollAnimation";
import './Stylesheets/App.css'
import Navbar from "./Navbar.js";
import FoundersForm from "./FoundersForm.js";
import About from "./About.js";
import Landing from "./Landing.js";
import Coaches from "./Coaches.js";
import FAQ from "./FAQ.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Pricing from "./Pricing.js";
import Programs from "./Programs.js";
 

function App() {
  useScrollAnimation();
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

