import { useNavigate } from "react-router-dom";
import Ct from "../Ct";
import { useContext } from "react";

const socialPlatforms = [
  { name: "Twitter", icon: "🐦" },
  { name: "Instagram", icon: "📸" },
  { name: "Facebook", icon: "📘" },
];

export default function Landing() {
  const { updstore } = useContext(Ct);
  const navigate = useNavigate();

  const selectPlatform = (platform) => {
    updstore({ platform });
    navigate("/login");
  };

  return (
    <div className="landing" style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Select your preferred platform</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 30 }}>
        {socialPlatforms.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => selectPlatform(name)}
            style={{
              border: "2px solid #eee", borderRadius: "20%", padding: 30, cursor: "pointer",
              background: "#f7f7f7"
            }}
          >
            <span style={{ fontSize: 52 }}>{icon}</span>
            <div>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
