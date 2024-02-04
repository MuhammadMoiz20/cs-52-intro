import React, { useEffect, useState } from 'react';
import api from './api';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  function load() { api.get('/notes').then(r => setNotes(r.data)).catch(() => {}); }
  useEffect(load, []);

  async function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post('/notes', { text });
    setText('');
    load();
  }

  return (
    <div>
      <h1>notes</h1>
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="new note" />
        <button>add</button>
      </form>
      <ul>
        {notes.map(n => <li key={n._id}>{n.text}</li>)}
      </ul>
    </div>
  );
}
