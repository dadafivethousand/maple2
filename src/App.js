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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Testimonials from "./Components/Testimonials";
 
function App() {
  const { showForm } = useAppContext();

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>Maple Jiu-Jitsu Academy</title>
            <meta
              name="description"
              content="Join Maple Jiu-Jitsu Academy and embark on your Brazilian Jiu-Jitsu journey."
            />
          </Helmet>

          {showForm && <LeadForm closebutton={true} />}

          <Routes>
            {/* Route for /freetrial showing only LeadForm */}
            <Route path="/freetrial" element={<LeadForm  closebutton={false}/>} />

            {/* Default route for the main app */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Landing />
                  <Testimonials />
                  <About />
        
                  <Coaches />
                  <Parallax1 />
                  <Programs />
                
                
                  <Schedule />
                  <Parallax />
                  <Pricing />
                  <Contact />
                   <FAQ />
             
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
