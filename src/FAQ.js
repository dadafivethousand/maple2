import { useState } from "react";
import QA from "./QA"; // Import the QA component
import "./Stylesheets/FAQ.css";
import faqList from './FAQList'
import Jocko from "./Jocko";


export default function FAQ() {
  const [expandAll, setExpandAll] = useState(false);
  const [minimizeAll, setMinimizeAll] = useState(false);
 

  const handleExpandAll = () => {
    setExpandAll(true);
    setMinimizeAll(false);
  };

  const handleMinimizeAll = () => {
    setMinimizeAll(true);
    setExpandAll(false);
  };

  return (
    <div className="FAQContainer">
  
 
        <div className="FAQFlexbox">
        <div className="Staircase">
      <h1  > <span className="Crimson"> F</span>requently   <span className="Crimson"> A</span>sked   <span className="Crimson"> Q</span>uestions</h1>
      </div>

   
      </div>
     
      <div className="FAQ-and-video">
      <div className="FAQ">
      <div className="faq-controls">
        <button onClick={handleExpandAll}>Expand All</button>
        <button onClick={handleMinimizeAll}>Minimize All</button>
      </div>
        {faqList.map((faq, index) => (
          <QA key={index} faq={faq} expandAll={expandAll} minimizeAll={minimizeAll} />
        ))}
      </div>
      <div className="VideoContainer">
      <Jocko />
      </div>
      </div>
   
    </div>
  );
}
