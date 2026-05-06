import "./Stylesheets/App.css";
import { lazy, Suspense, useEffect } from "react";
import { initScrollReveal } from "./Utils/scrollReveal";
import Navbar from "./Navbar";
import Landing from "./Landing";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "./AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Below-fold main page sections — lazy loaded
const Schedule = lazy(() => import("./Schedule"));
const Pricing  = lazy(() => import("./Pricing"));
const FAQ      = lazy(() => import("./FAQ"));
const Contact  = lazy(() => import("./Contact"));
const Footer   = lazy(() => import("./Footer"));

// Separate routes — lazy loaded
const LeadForm    = lazy(() => import("./LeadForm"));
const Blog        = lazy(() => import("./Blog"));
const FullPost    = lazy(() => import("./Components/FullPost"));
const SuccessPage = lazy(() => import("./SuccessPage"));
const CancelPage  = lazy(() => import("./CancelPage"));
const SummerCamp  = lazy(() => import("./SummerCamp"));


function App() {
  const { showForm } = useAppContext();
  useEffect(() => initScrollReveal(), []);

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

          <Suspense fallback={null}>
            {showForm && <LeadForm closebutton={true} />}
          </Suspense>

          <Suspense fallback={null}>
            <Routes>
              <Route path="/freetrial" element={<LeadForm closebutton={false} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<FullPost />} />
              <Route path="/camp" element={<SummerCamp />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />

              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <Landing />
                    <Schedule />
                    <Pricing />
                    <FAQ />
                    <Contact />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
