import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); navigate('/'); };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🦷</div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join SmileCare Family Dentistry</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group"><label className="field-label">Full Name</label><input className="field-input" required placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} /></div>
          <div className="field-group"><label className="field-label">Phone</label><input className="field-input" required placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
          <div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" required placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
          <div className="field-group"><label className="field-label">Password</label><input className="field-input" type="password" required placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account →</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;
