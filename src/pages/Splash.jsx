import Logo from "../assets/logo.svg";
import "../Splash.css";

function Splash() {
  return (
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
  );
}

export default Splash;
