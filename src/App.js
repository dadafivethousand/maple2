import "./Stylesheets/App.css";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Coaches from "./Coaches";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";
import Pricing from "./Pricing";
import Schedule from "./Schedule";
import LeadForm from "./LeadForm";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "./AppContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import FullPost from "./Components/FullPost";
import SuccessPage from "./SuccessPage";
import CancelPage from "./CancelPage";
import GetStarted from "./Components/GetStarted";


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
             <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<FullPost />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />


            {/* Default route for the main app */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Landing />
                  <Schedule />
                  <Coaches />
                  <Pricing />
                  <FAQ />
                  <Contact />
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
