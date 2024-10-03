import ImageReveal from "./ImageReveal.js";
import Schedule from "./Schedule.js";
import useScrollAnimation from "./useScrollAnimation";
import './Stylesheets/App.css'


function App() {
  useScrollAnimation();
  return (
    <div className="App">
   <ImageReveal />


 
    </div>
  );
}

export default App;

