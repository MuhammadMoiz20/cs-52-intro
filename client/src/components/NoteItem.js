import React, { useState } from 'react';

export default function NoteItem({ note, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);

  if (editing) {
    return (
      <li>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => { onSave(note._id, text); setEditing(false); }}>save</button>
        <button onClick={() => setEditing(false)}>cancel</button>
      </li>
    );
  }
  return (
    <li>
      {note.text}
      <button onClick={() => setEditing(true)}>edit</button>
      <button onClick={() => onDelete(note._id)}>x</button>
    </li>
  );
}
