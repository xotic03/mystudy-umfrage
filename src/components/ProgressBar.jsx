import "./ProgressBar.css";

function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>
        Frage {current + 1} von {total}
      </p>
    </div>
  );
}

export default ProgressBar;
