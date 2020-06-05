import React from "react";
import { useLocation } from "react-router-dom";
import { useQuestions } from "../../context/questions/QuestionsState";

const Footer = () => {
  const location = useLocation();
  const currentLoc = location.pathname.slice(1);
  const [questionsState] = useQuestions();
  const { questions, loading } = questionsState;

  const progress = (currentLoc / questions.length) * 100;

  if (loading || !Number.isInteger(parseInt(currentLoc)) || progress === 100) {
    return null;
  }

  return (
    <footer className="footer bg-hu-grey">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-7 col-lg-4 offset-lg-8 mt-3 mb-3">
            <div className="text-white">{progress.toFixed(2)}%</div>
            <div className="progress" style={{ height: "16px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
