import "./Stylesheets/App.css";
import Navbar from "./Navbar";
import About from "./About";
import Landing from "./Landing";
import Coaches from "./Coaches";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";
import Pricing from "./Pricing";
import Programs from "./Programs";
import Schedule from "./Schedule";
import LeadForm from "./LeadForm";
 import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "./AppContext";
import Parallax from "./Parallax";
import Parallax1 from "./Parallax1";
  
function App() {
  const { showForm } = useAppContext();
  return (
    <HelmetProvider>
    
        <div className="App">
          <Helmet>
            <title>Maple Jiu-Jitsu Academy</title>
            <meta
              name="description"
              content="Join Maple Jiu-Jitsu Academy and embark on your Brazilian Jiu-Jitsu journey."
            />
          </Helmet>
          <>
      {showForm && <LeadForm />}
      <Navbar />
      <Landing />
      <About />
      <Programs />
      <Parallax1 />
      <Coaches />
      <Schedule />
      
   
      <Parallax />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </>
      
        </div>
     
    </HelmetProvider>
  );
}

export default App;
