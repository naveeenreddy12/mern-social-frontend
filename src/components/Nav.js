// src/components/Nav.js
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Ct from "../Ct";

const Nav = () => {
  const { store, updstore } = useContext(Ct);
  const navigate = useNavigate();

  const handleLogout = () => {
    updstore({ token: "", name: "", platform: "" }); // This triggers cookie removal too (see App.js)
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex", gap: "20px", alignItems: "center",
      padding: "14px 22px", borderBottom: "1px solid #e2e2e2", marginBottom: 12
    }}>
      <span style={{ fontWeight: "bold", fontSize: 20, color: "#444" }}>Mini-Social</span>
      <span style={{ flex: 1 }} />
      {store.token === "" &&
        <>
          <Link to="/reg">Register</Link>
          <Link to="/login">Login</Link>
        </>
      }
      {store.token !== "" &&
        <>
          <Link to="/home">Home</Link>
          <Link to="/addpost">Add Post</Link>
          <button style={{
            background: "#e54f4f",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 20px",
            marginLeft: 18,
            cursor: "pointer"
          }} onClick={handleLogout}>Logout</button>
        </>
      }
    </nav>
  );
};
export default Nav;
