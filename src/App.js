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
import Parallax3 from "./Parallax3";
import KidsForm from "./Components/KidsForm";
 import Purchase from "./Components/Purchase";
import Blog from "./Blog";
import FullPost from "./Components/FullPost";
import SuccessPage from "./SuccessPage";
import CancelPage from "./CancelPage";
import BJJWhiteBelt from "./Components/BJJWhiteBelt";
import GetStarted from "./Components/GetStarted";
import ArturImage from "./Components/ArturImage";
 
function App() {
  const { showForm, showKidForm, showPurchase } = useAppContext();

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
          {showKidForm && <KidsForm />}
          {showPurchase && <Purchase />}
        {/*  {showKidForm && <KidsForm />}*/}

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

         
  {/*   <KidsForm />*/} 
   
                 {/*     <Purchase /> */} 
                  <Landing />
                  <GetStarted size='large' />
          
            
                  <Schedule />
                  {/*     <BJJWhiteBelt /> */} 
                  <About />
                 
                 {/*     <Parallax1 /> */} 
                  <Coaches />
          
                  <Programs />
                
                   {/*     <Parallax3 />*/} 
          
                   <Pricing /> 
             
                
                 {/*     <Parallax />*/} 
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
