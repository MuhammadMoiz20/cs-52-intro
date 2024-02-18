import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import NoteItem from '../components/NoteItem';

export default function Notes() {
  const nav = useNavigate();
  function logout() { localStorage.removeItem('token'); nav('/login'); }

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [q, setQ] = useState('');

  function load() {
    setLoading(true);
    api.get('/notes', { params: q ? { q } : {} })
      .then(r => setNotes(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }
  useEffect(load, [q]);

  async function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post('/notes', { text });
    setText('');
    load();
  }
  async function del(id) { await api.delete('/notes/' + id); load(); }
  async function save(id, t) { await api.put('/notes/' + id, { text: t }); load(); }

  return (
    <div>
      <h1>notes</h1>
      <button onClick={logout}>logout</button>
      <input placeholder="search" value={q} onChange={e => setQ(e.target.value)} style={{marginBottom:8, display:'block', marginTop:8}} />
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="new note" />
        <button>add</button>
      </form>
      {loading && <p>loading...</p>}
      <ul>
        {notes.map(n => <NoteItem key={n._id} note={n} onDelete={del} onSave={save} />)}
      </ul>
    </div>
  );
}
