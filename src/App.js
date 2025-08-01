// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Ct from "./Ct";
import Nav from "./components/Nav";
import Register from "./components/Reg";
import Login from "./components/Login";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import Landing from "./components/Landing";
import './App.css';

const App = () => {
  // On initial load, try to get token, name, platform from cookies
  const [store, setStore] = useState(() => ({
    token: Cookie.get("token") || "",
    name: Cookie.get("name") || "",
    platform: Cookie.get("platform") || ""
  }));

  // Update cookies whenever `store` changes
  useEffect(() => {
    if (store.token) {
      Cookie.set("token", store.token);
      Cookie.set("name", store.name);
      Cookie.set("platform", store.platform);
    } else {
      Cookie.remove("token");
      Cookie.remove("name");
      Cookie.remove("platform");
    }
  }, [store.token, store.name, store.platform]);

  const updstore = (obj) => setStore(s => ({ ...s, ...obj }));

  return (
    <Ct.Provider value={{ store, updstore }}>
      <BrowserRouter>
        <Nav /> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </Ct.Provider>
  );
};

export default App;
