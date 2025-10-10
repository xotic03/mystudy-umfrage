import { useEffect } from "react";
import "../Start.css";
import Logo from "../assets/logo.svg";

function Start({ onStart }) {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="start-wrapper">
      <div className="start-card">
        <img src={Logo} alt="myStudy Logo" className="start-logo" />

        <h1 className="start-title">
          Willkommen bei <span className="highlight">myStudy</span>
        </h1>

        <p className="start-subtitle">Von Schülern, für Schüler.</p>

        <p className="start-text">
          Wir entwickeln eine moderne Schulplattform, die Systeme wie{" "}
          <strong>IServ</strong>, <strong>Moodle</strong> und <strong>Untis</strong> 
          {" "}in einem zentralen System vereint – alles in einer App.  
          <br />
          <br />
          Deine Meinung zählt! Hilf uns, myStudy zu gestalten, indem du an
          unserer kurzen Umfrage teilnimmst.
        </p>

        <button className="start-btn" onClick={onStart}>
          🚀 Umfrage starten
        </button>
      </div>
    </div>
  );
}

export default Start;
