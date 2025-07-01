import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Anecdotes from "./pages/Anecdotes";

export default function App() {
  const [view, setView] = useState("anecdotes");
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  if (!isAuth && view !== "register")
    return <Login onLogin={mode => {
      if (mode === "register") setView("register");
      else { setIsAuth(true); setView("anecdotes"); }
    }} />;
  if (!isAuth && view === "register")
    return <Register onRegister={mode => {
      if (mode === "login") setView("login");
      else { setIsAuth(true); setView("anecdotes"); }
    }} />;

  return (
    <div>
      <nav style={{ background: "#3D5AFE", padding: 14, color: "#fff", marginBottom: 28 }}>
        <span style={{ fontWeight: 600, fontSize: 21 }}>WOW</span>
        <button style={navBtn} onClick={() => setView("anecdotes")}>Anecdotes</button>
        <button style={navBtn} onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setIsAuth(false); setView("login");
        }}>Déconnexion</button>
      </nav>
      {view === "anecdotes" && <Anecdotes />}
    </div>
  );
}

const navBtn = {
  marginLeft: 20, background: "#fff", color: "#3D5AFE", border: "none", borderRadius: 6,
  fontWeight: 600, fontSize: 15, padding: "8px 15px", cursor: "pointer"
};
