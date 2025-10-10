import { useState } from "react";
import questions from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import "../Survey.css";

function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, { question: questions[step].text, answer: value }];
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setStep("done");
      console.log("Umfrage beendet:", newAnswers);
    }
  };

  if (step === "done") {
    return (
      <div className="survey-wrapper">
        <div className="survey-card">
          <h2>🎉 Danke für deine Meinung!</h2>
          <p>Deine Antworten helfen uns, die Zukunft von Schul-Apps zu gestalten.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-wrapper">
      <div className="survey-card">
        <ProgressBar current={step} total={questions.length} />
        <QuestionCard question={questions[step]} onAnswer={handleAnswer} />
      </div>
    </div>
  );
}

export default Survey;
