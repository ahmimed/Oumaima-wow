import React, { useState } from "react";
import apiInstance from "../apiInstance";

export default function NewAnecdote({ onCreated, onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Humour");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await apiInstance().post("/anecdotes", { title, category, content });
      setTitle(""); setCategory("Humour"); setContent("");
      onCreated();
      onClose();
    } catch {
      setError("Erreur lors de la création");
    }
  };

  return (
    <div style={popupOverlay}>
      <div style={popupContent}>
        <h3 style={{ color: "#3D5AFE" }}>Ajouter une anecdote</h3>
        {error && <div style={{ color: "#e74c3c" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} /><br />
          <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
            <option>Humour</option>
            <option>Histoire</option>
            <option>Vie quotidienne</option>
            <option>Échec</option>
            <option>Succès</option>
          </select><br />
          <textarea style={inputStyle} placeholder="Contenu" value={content} onChange={e => setContent(e.target.value)} maxLength={500} /><br />
          <button style={btnStyle} type="submit">Publier</button>
          <button type="button" onClick={onClose} style={btnCancel}>Annuler</button>
        </form>
      </div>
    </div>
  );
}

const popupOverlay = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(61,90,254,0.16)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center"
};
const popupContent = {
  background: "#fff", borderRadius: 15, padding: 30, boxShadow: "0 8px 32px #b5bff8", minWidth: 350
};
const inputStyle = {
  width: "100%", padding: "8px 12px", borderRadius: 8,
  border: "1px solid #b0b6f7", fontSize: 16, marginBottom: 15
};
const btnStyle = {
  background: "#3D5AFE", color: "#fff", border: "none", borderRadius: 8,
  padding: "10px 22px", fontWeight: 600, fontSize: 16, cursor: "pointer", marginRight: 10
};
const btnCancel = {
  background: "#f1f2f6", color: "#3D5AFE", border: "none", borderRadius: 8,
  padding: "10px 22px", fontWeight: 600, fontSize: 16, cursor: "pointer"
};
