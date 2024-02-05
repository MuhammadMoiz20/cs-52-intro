import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Notes from './pages/Notes';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">notes</Link> | <Link to="/login">login</Link> | <Link to="/register">register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
