import React, { useEffect, useState } from 'react';
import api from './api';

export default function Notes() {
  const nav = useNavigate();
  function logout() { localStorage.removeItem('token'); nav('/login'); }
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  function load() { setLoading(true); api.get('/notes').then(r => setNotes(r.data)).catch(() => {}).finally(() => setLoading(false)); }
  useEffect(load, []);

  async function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post('/notes', { text });
    setText('');
    load();
  }

  async function del(id) {
    await api.delete('/notes/' + id);
    load();
  }

  async function save(id) {
    await api.put('/notes/' + id, { text: editText });
    setEditing(null);
    load();
  }

  return (
    <div>
      <h1>notes</h1>
      <button onClick={logout}>logout</button>
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="new note" />
        <button>add</button>
      </form>
      {loading && <p>loading...</p>}
      <ul>
        {notes.map(n => (
          <li key={n._id}>
            {editing === n._id ? (
              <>
                <input value={editText} onChange={e => setEditText(e.target.value)} />
                <button onClick={() => save(n._id)}>save</button>
                <button onClick={() => setEditing(null)}>cancel</button>
              </>
            ) : (
              <>
                {n.text}
                <button onClick={() => { setEditing(n._id); setEditText(n.text); }}>edit</button>
                <button onClick={() => del(n._id)}>x</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
