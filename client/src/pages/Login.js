import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const r = await api.post('/auth/login', { email, password: pw });
      localStorage.setItem('token', r.data.token);
      nav('/');
    } catch (ex) {
      setErr('login failed');
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>log in</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="password" />
      <button>login</button>
      {err && <p style={{color:'red'}}>{err}</p>}
    </form>
  );
}
