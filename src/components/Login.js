import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Ct from "../Ct";

const Login = () => {
  let [data, setData] = useState({ uid: "", password: "" });
  let [msg, setMsg] = useState("");
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let fun = (e) => setData({ ...data, [e.target.name]: e.target.value });

  let login = () => {
    if (!data.uid || !data.password) {
      setMsg("All fields required"); return;
    }
    axios.post(`process.env.BACKEND_URL/login`, data).then((res) => {
      if (res.data.token) {
        obj.updstore(res.data);
        navigate("/home");
      } else {
        setMsg(typeof res.data === "string" ? res.data : "login error");
      }
    });
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", padding: 24, background: "#fcfdff", borderRadius: 10, boxShadow: "0 1px 6px #eee" }}>
      <h2 style={{ textAlign: "center" }}>Sign In</h2>
      <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{msg}</div>
      <input type="text" name="uid" placeholder="Enter email" value={data.uid} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 10 }} />
      <input type="password" name="password" placeholder="Password" value={data.password} onChange={fun} style={{ width: "100%", padding: 6, marginBottom: 10 }} />
      <button onClick={login} style={{ width: "100%", padding: 8, background: "#1da1f2", color: "white", border: "none", borderRadius: 8 }}>Login</button>
    </div>
  );
};
export default Login;
