import '../Stylesheets/FAQ.css';

export default function QA({ faq, isExpanded, toggleExpand }) {
  return (
    <div className="faq-item-container animate">
      <div className="faq-item">
        <div className="faq-question">
          <p>{faq.question}</p>
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
            {faq.link && (
            <>
              {" "}
              <a href={faq.link.url} target="_blank" rel="noopener noreferrer">
                {faq.link.text}
              </a>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
