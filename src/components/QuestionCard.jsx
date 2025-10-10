import "./QuestionCard.css";

function QuestionCard({ question, onAnswer }) {
  return (
    <div className="question-wrapper">
      <div className="question-card">
        <h2 className="question-text">{question.text}</h2>

        <div className="options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(opt.value)}
              className="option-btn"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
