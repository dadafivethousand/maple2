import About from "./About";
import Coaches from "./Coaches";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Navbar from "./Navbar";
 
import Schedule from "./Schedule";
import Parallax from "./Parallax";
import "./Stylesheets/App.css"
import Parallax2 from "./Parallax2";
import Parallax3 from "./Parallax3";
import Landing from "./Landing";
import Jocko from "./Jocko";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
    
      <About />
     
   <Parallax3 />
      <Coaches />
 <Parallax2 />
      <Schedule />
      <Parallax />
      <FAQ />
      <Contact />

 
    </div>
  );
}

export default App;

