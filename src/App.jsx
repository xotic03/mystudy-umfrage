import { useEffect, useState } from "react";
import Survey from "./pages/Survey";
import Start from "./pages/Start";
import "./Splash.css";
import Logo from "./assets/logo.svg";

// Fonts (automatisch von npm geladen)
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false); // ✅ Zustand für Startseite

  // Simuliert Ladebildschirm (Splash)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Kein Syntaxfehler mehr, korrekter Renderflow
  return (
    <>
      {loading ? (
        // ---------- Splash Screen ----------
        <div className="splash-screen">
          <div className="splash-content">
            <img src={Logo} alt="myStudy Logo" />
            <h1>
              <span className="logo-dark">my</span>
              <span className="logo-blue">Study</span>
            </h1>
            <div className="loading-ring"></div>
          </div>
        </div>
      ) : started ? (
        // ---------- Wenn gestartet: Umfrage ----------
        <Survey />
      ) : (
        // ---------- Sonst: Startseite ----------
        <Start onStart={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;
