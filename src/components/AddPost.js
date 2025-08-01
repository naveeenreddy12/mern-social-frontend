import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Ct from "../Ct";

const AddPost = () => {
  const [data, setData] = useState({ content: "" });
  const { store } = useContext(Ct);
  const navigate = useNavigate();

  const fun = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const add = () => {
    if (!data.content.trim()) return;
    axios.post(`http://localhost:5000/addpost`, data, {
      headers: { Authorization: store.token }
    }).then(() => navigate("/home"));
  };

  if (!store.token) return <div>Please login to add post.</div>;

  return (
    <div style={{ maxWidth: 440, margin: "40px auto", padding: 22, borderRadius: 14, background: "#f9faff", boxShadow: "0 1px 6px #f1f1f1" }}>
      <h2>Add a new post</h2>
      <textarea
        name="content"
        rows={4}
        maxLength={280}
        required
        placeholder="What's happening?"
        value={data.content}
        onChange={fun}
        style={{ width: "100%", padding: 9, borderRadius: 7, marginBottom: 15, border: "1px solid #ddd" }}
      />
      <button onClick={add} style={{ padding: "8px 30px", background: "#007bff", color: "white", border: "none", borderRadius: 9 }}>Post</button>
    </div>
  );
};
export default AddPost;
