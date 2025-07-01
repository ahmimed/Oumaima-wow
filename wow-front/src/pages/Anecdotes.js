import React, { useEffect, useState, useRef } from "react";
import apiInstance from "../apiInstance";
import AnecdoteCard from "./AnecdoteCard";
import NewAnecdote from "./NewAnecdote";

export default function Anecdotes() {
  const [anecdotes, setAnecdotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const page = useRef(1);
  const userId = 1; // ou à récupérer dynamiquement
  const userRole = localStorage.getItem("role");

  const fetchMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await apiInstance().get("/anecdotes?offset=" + (page.current - 1) * 10 + "&limit=10");
    const data = res.data.data || res.data;
    setAnecdotes(prev => [...prev, ...data]);
    if (!data.length) setHasMore(false);
    page.current++;
    setLoading(false);
  };

  useEffect(() => { fetchMore(); }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 180 && hasMore
      ) {
        fetchMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleVote = async (id, type) => {
    await apiInstance().post(`/anecdotes/${id}/vote`, { type });
    setAnecdotes([]);
    page.current = 1;
    setHasMore(true);
    fetchMore();
  };

  const handleDelete = async id => {
    await apiInstance().delete(`/anecdotes/${id}`);
    setAnecdotes([]);
    page.current = 1;
    setHasMore(true);
    fetchMore();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
        <button style={btnStyle} onClick={() => setShowNew(true)}>Ajouter une anecdote</button>
      </div>
      {showNew && <NewAnecdote onCreated={() => {
        setAnecdotes([]);
        page.current = 1;
        setHasMore(true);
        fetchMore();
      }} onClose={() => setShowNew(false)} />}
      {anecdotes.map(a =>
        <AnecdoteCard key={a.id} a={a} onVote={handleVote} onDelete={handleDelete} userId={userId} userRole={userRole} />
      )}
      {loading && <div>Chargement...</div>}
      {!hasMore && <div style={{ color: "#888", textAlign: "center" }}>Fin des anecdotes.</div>}
    </div>
  );
}

const btnStyle = {
  background: "#3D5AFE", color: "#fff", border: "none", borderRadius: 8,
  padding: "10px 24px", fontWeight: 600, fontSize: 15, cursor: "pointer"
};
