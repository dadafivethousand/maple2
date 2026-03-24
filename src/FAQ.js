import { useState } from "react";
import { Helmet } from "react-helmet-async";
import QA from "./Components/QA"; // Import the QA component
import "./Stylesheets/FAQ.css";
import "./Stylesheets/SectionHeading.css";
import faqList from './Objects/FAQList';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqList.map(({ question, answer }) => ({
    "@type": "Question",
    "name": question,
    "acceptedAnswer": { "@type": "Answer", "text": answer }
  }))
};
{/*import Jocko from "./Components/Jocko";*/}

export default function FAQ() {
  const [expandedFaqs, setExpandedFaqs] = useState({}); // Store expanded state for all items
  
  const handleExpandAll = () => {
    const allExpanded = faqList.reduce((acc, _, idx) => {
      acc[idx] = true;
      return acc;
    }, {});
    setExpandedFaqs(allExpanded);
  };

  const handleMinimizeAll = () => {
    setExpandedFaqs({});
  };

  const toggleExpand = (index) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div id="FAQ" className="FAQContainer">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
       
          <p className="section-heading">
            <span className="sh-kicker">Common Questions, Straight Answers</span>
            <span className="sh-main">FAQ</span>
          </p>
 
    
      
      <div className="FAQ-and-video">
        <div className="FAQ">
          <div className="faq-controls animate">
            <button onClick={handleExpandAll}>Expand All</button>
            <button onClick={handleMinimizeAll}>Minimize All</button>
          </div>
          {faqList.map((faq, index) => (
            <QA
              key={index}
              faq={faq}
              isExpanded={!!expandedFaqs[index]}
              toggleExpand={() => toggleExpand(index)}
            />
          ))}
        </div>
 
      </div>
    </div>
  );
}
