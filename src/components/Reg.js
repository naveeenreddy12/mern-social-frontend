import { useState, useContext } from "react";
import axios from "axios";
import Ct from "../Ct";
import { useNavigate } from "react-router-dom";

const platforms = ["Twitter", "Instagram", "Facebook"];
const Reg = () => {
  let [data, setData] = useState({ uid: "", name: "", password: "", platform: "" });
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();
  let { updstore } = useContext(Ct);

  let fun = (e) => setData({ ...data, [e.target.name]: e.target.value });

  let reg = () => {
    if (!data.uid || !data.name || !data.password || !data.platform) {
      setMsg("All fields required");
      return;
    }
    axios.post(`process.env.BACKEND_URL/reg`, data).then((res) => {
      setMsg(res.data);
      if (res.data === "acc created") {
        updstore({ platform: data.platform });
        setTimeout(() => navigate("/login"), 900);
      }
    });
  };

  return (
    <div className="reg" style={{ maxWidth: 370, margin: "40px auto", padding: 24, background: "#fafaff", borderRadius: 12, boxShadow: "0 1px 6px #eee" }}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{msg}</div>
      <input type="text" name="uid" placeholder="Enter email" value={data.uid} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 9 }} />
      <input type="text" name="name" placeholder="Enter name" value={data.name} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 9 }} />
      <input type="password" name="password" placeholder="Password" value={data.password} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 9 }} />
      <select name="platform" value={data.platform} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 9 }}>
        <option value="">Select Platform</option>
        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <button onClick={reg} style={{ width: "100%", padding: 8, background: "#007bff", color: "white", border: "none", borderRadius: 8 }}>Register</button>
    </div>
  );
};
export default Reg;
