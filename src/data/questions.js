const questions = [
  {
    text: "Wie fändest du es, wenn IServ, Moodle und Untis in einem System zusammengefasst wären?",
    options: [
      { label: "👍 Sehr gut", value: "positiv" },
      { label: "🤷‍♂️ Neutral", value: "neutral" },
      { label: "👎 Eher nicht", value: "negativ" },
    ],
  },
  {
    text: "Wie wichtig wäre dir, deinen aktuellen Notenstand jederzeit im System zu sehen?",
    options: [
      { label: "Sehr wichtig", value: "wichtig" },
      { label: "Ganz nett", value: "mittel" },
      { label: "Unwichtig", value: "unwichtig" },
    ],
  },
  {
    text: "Wie fändest du eine KI, die dir nach Klassenarbeiten hilft, Fehler zu verstehen und zu verbessern?",
    options: [
      { label: "Mega Idee!", value: "pro_ki" },
      { label: "Kann man ausprobieren", value: "neutral_ki" },
      { label: "Lieber nicht", value: "contra_ki" },
    ],
  },
  {
    text: "Wie würdest du es finden, wenn du Aufgaben und Materialien aus allen Fächern zentral findest?",
    options: [
      { label: "Sehr praktisch", value: "pro_zentral" },
      { label: "Ist mir egal", value: "neutral_zentral" },
      { label: "Zu unübersichtlich", value: "contra_zentral" },
    ],
  },
];

export default questions;
