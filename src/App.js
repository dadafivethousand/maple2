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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function MainLayout() {
  const { showForm } = useAppContext();

  return (
    <>
      {showForm && <LeadForm FreeTrial={true} />}
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

function App() {
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
          <Routes>
            {/* Main SPA Layout */}
            <Route path="/" element={<MainLayout />} />
            {/* Separate Info Form Route */}
            <Route path="/info" element={<LeadForm FreeTrial={false} />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
