import '../Stylesheets/FAQ.css';
import { useAppContext } from "../AppContext";

export default function QA({ faq, isExpanded, toggleExpand }) {
  const { setShowForm } = useAppContext();

  return (
    <div className="faq-item-container animate">
      {/* add is-open here */}
      <div className={`faq-item ${isExpanded ? 'is-open' : ''}`}>
        <div
          className="faq-question"
          role="button"
          aria-expanded={isExpanded}
          onClick={toggleExpand}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleExpand()}
        >
          {/* use h2 to match your CSS selector */}
          <h2>{faq.question}</h2>
          <button aria-label={isExpanded ? 'Collapse' : 'Expand'}>
            <span className="faq-toggle" />
          </button>
        </div>

        <div className="faq-answer-wrapper">
          <div className="faq-answer">
            <p>{faq.answer}</p>

            {faq.link && (
              <div className="faq-free-trial" onClick={() => setShowForm(true)}>
                Click here to get started
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
