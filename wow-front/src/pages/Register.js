import React, { useState } from "react";
import apiInstance from "../apiInstance";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await apiInstance().post("/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      onRegister();
    } catch {
      setError("Erreur lors de la création du compte");
    }
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #dfdfdf",
      maxWidth: 400, margin: "40px auto", padding: 40, fontFamily: "Inter, sans-serif"
    }}>
      <h2 style={{ color: "#3D5AFE" }}>Créer un compte</h2>
      {error && <div style={{ color: "#e74c3c", marginBottom: 12 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} placeholder="Nom" value={name} onChange={e => setName(e.target.value)} /><br />
        <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input style={inputStyle} placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button style={btnStyle} type="submit">Créer</button>
      </form>
      <p>
        <button onClick={() => onRegister("login")} style={linkBtnStyle}>Se connecter</button>
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 8,
  border: "1px solid #b0b6f7", fontSize: 16, marginBottom: 20
};
const btnStyle = {
  background: "#3D5AFE", color: "#fff", border: "none", borderRadius: 8,
  padding: "12px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8
};
const linkBtnStyle = {
  background: "none", border: "none", color: "#3D5AFE", fontWeight: 600, cursor: "pointer"
};
