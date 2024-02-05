import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const r = await api.post('/auth/register', { email, password: pw });
    localStorage.setItem('token', r.data.token);
    nav('/');
  }

  return (
    <form onSubmit={submit}>
      <h2>sign up</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="password" />
      <button>register</button>
    </form>
  );
}
