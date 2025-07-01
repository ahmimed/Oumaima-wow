// src/pages/AnecdoteCard.js

import React from "react";

export default function AnecdoteCard({ a, onVote, onDelete, userId, userRole }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontWeight: 700, fontSize: 18, color: "#3D5AFE" }}>{a.title}</div>
      <div style={{ fontSize: 13, color: "#858585", marginBottom: 4 }}>{a.category}</div>
      <div style={{ margin: "10px 0 6px" }}>{a.content}</div>
      <div style={{ fontSize: 14, margin: "6px 0" }}>
        <strong>Votes :</strong>
        <span style={{ marginLeft: 12 }}>
          <VoteBtn label="Wow" count={a.votes?.Wow || 0} onClick={() => onVote(a.id, "Wow")} />
          <VoteBtn label="Excellent" count={a.votes?.Excellent || 0} onClick={() => onVote(a.id, "Excellent")} />
          <VoteBtn label="Technique" count={a.votes?.Technique || 0} onClick={() => onVote(a.id, "Technique")} />
          <VoteBtn label="Bof" count={a.votes?.Bof || 0} onClick={() => onVote(a.id, "Bof")} />
        </span>
      </div>
      {(userRole === "admin" || userId === a.user_id) &&
        <button onClick={() => onDelete(a.id)} style={btnDeleteStyle}>Supprimer</button>
      }
    </div>
  );
}

// Composant pour chaque bouton de vote
function VoteBtn({ label, count, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginRight: 8,
        background: "#f1f3fa",
        border: "none",
        borderRadius: 5,
        color: "#3D5AFE",
        fontWeight: 600,
        cursor: "pointer",
        padding: "3px 9px",
      }}>
      {label} {count}
    </button>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 2px 12px #e6e7f8",
  marginBottom: 22,
  padding: 18,
};

const btnDeleteStyle = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "7px 15px",
  marginTop: 7,
  fontWeight: 500,
  cursor: "pointer",
};
