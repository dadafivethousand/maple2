import About from "./About";
import Coaches from "./Coaches";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Navbar from "./Navbar";
import Pricing from "./Pricing";
import Schedule from "./Schedule";
import Parallax from "./Parallax";
import "./Stylesheets/App.css"
import Parallax2 from "./Parallax2";
import Parallax3 from "./Parallax3";
import Landing from "./Landing";
import Jocko from "./Jocko";
import Footer from "./Footer";
import useScrollAnimation from "./useScrollAnimation.js";
import Login from "./Login.js";


function App() {
  useScrollAnimation();
  return (
    <div className="App">
      <Navbar />
       
      <Landing />
    
      <About />
      <Pricing />
   <Parallax3 />
 
      <Coaches />
 <Parallax2 />
      <Schedule />
      <Parallax />
      <FAQ />
      <Contact />
      <Footer />

 
    </div>
  );
}

export default App;

