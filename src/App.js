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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51QC8E5084Gm12R98aHC2ubs3JtU7MyqTW7KSs3GLxDVDqg3IMDECbYjlVvoS7xIh1rEOMYrvWMhB44Ms0QE690Ra00wecf11fI'); // Replace with your actual Stripe public key
function App() {
 // useScrollAnimation();

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
    return(
    <Elements stripe={stripePromise}>
    <Purchase />
    </Elements>
    )
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
