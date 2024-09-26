import './Stylesheets/QA.css';

export default function QA({ faq, isExpanded, toggleExpand }) {
  return (
    <div className="faq-item-container animate">
      <div className="faq-item">
        <div className="faq-question">
          <h2>{faq.question}</h2>
          <button onClick={toggleExpand}>
            {isExpanded ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
          </button>
        </div>
        <div
          className="faq-answer-wrapper"
          style={{
            maxHeight: isExpanded ? "1000px" : "0px", // Adjust height based on expanded state
            transition: "max-height 0.5s ease",
          }}
        >
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
