import React, { useState } from 'react';
import { clinicInfo } from '../data/mockData';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <div className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>📞 Contact Us</div>
          <h1 className="section-title" style={{ color: '#fff' }}>We'd Love to Hear from You</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17 }}>Get in touch for appointments, queries, or feedback.</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-layout">
          {/* Info */}
          <div className="contact-info">
            <h2>Visit Us</h2>
            <div className="contact-cards">
              <div className="contact-card"><div className="cc-icon">📍</div><div><strong>Clinic Address</strong><p>{clinicInfo.address}</p></div></div>
              <div className="contact-card"><div className="cc-icon">📞</div><div><strong>Phone Numbers</strong><p><a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a><br /><a href={`tel:${clinicInfo.phone2}`}>{clinicInfo.phone2}</a></p></div></div>
              <div className="contact-card"><div className="cc-icon">✉</div><div><strong>Email</strong><p><a href={`mailto:${clinicInfo.email}`}>{clinicInfo.email}</a></p></div></div>
              <div className="contact-card"><div className="cc-icon">🕐</div><div><strong>Working Hours</strong><p>{clinicInfo.hours.weekdays}<br />{clinicInfo.hours.sunday}</p></div></div>
            </div>
            <div className="map-box">
              <div className="map-inner-box">
                <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>SmileCare Family Dentistry</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Brigade Road, MG Road Metro, Bengaluru</div>
                <a href={clinicInfo.mapEmbed} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Open in Google Maps</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <p className="form-sub">We'll respond within 24 hours</p>
              {sent ? (
                <div className="form-success">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="field-group"><label className="field-label">Full Name *</label><input className="field-input" required placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} /></div>
                  <div className="field-group"><label className="field-label">Phone *</label><input className="field-input" required placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
                  <div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                  <div className="field-group"><label className="field-label">Message *</label><textarea className="field-input field-textarea" required placeholder="How can we help you?" value={form.message} onChange={e => set('message', e.target.value)} /></div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
