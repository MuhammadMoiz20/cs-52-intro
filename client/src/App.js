import React, { useEffect, useState } from 'react';
import api from './api';

export default function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    api.get('/notes').then(r => setNotes(r.data)).catch(() => {});
  }, []);
  return (
    <div>
      <h1>notes</h1>
      <ul>
        {notes.map(n => <li key={n._id}>{n.text}</li>)}
      </ul>
    </div>
  );
}
