import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); navigate('/admin'); };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🦷</div>
        <h2>Manager Login</h2>
        <p className="auth-sub">Staff & admin access only</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" required placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
          <div className="field-group"><label className="field-label">Password</label><input className="field-input" type="password" required placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In →</button>
        </form>
        <p className="auth-switch">Contact IT admin to create a new staff account.</p>
      </div>
    </div>
  );
};

export default Login;
