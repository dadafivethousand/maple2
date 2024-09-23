import { useState, useEffect, useRef } from "react";
import './Stylesheets/QA.css'

export default function QA({ faq, expandAll, minimizeAll }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null); // Ref to measure the height of the answer content

  useEffect(() => {
    if (expandAll) {
      setIsExpanded(true);
    } else if (minimizeAll) {
      setIsExpanded(false);
    }
  }, [expandAll, minimizeAll]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="faq-item-container">
    <div className="faq-item">
      <div className="faq-question" >
     <h2>{faq.question}</h2>
     <button onClick={toggleExpand}>  {isExpanded ? <i class="fa fa-chevron-up"></i> : <i class="fa fa-chevron-down"></i>}</button>
      </div>
      <div
          className="faq-answer-wrapper"
          style={{
            maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : "0px",
            transition: "max-height 0.5s ease", // Smooth transition for height
          }}
        >
    
        <div className="faq-answer" ref={contentRef}>
          <p>{faq.answer}</p>
        </div>
        </div>
    </div>
   
    </div>
  );
}
