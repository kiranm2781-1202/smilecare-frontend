import React from 'react';
import { Link } from 'react-router-dom';
import { clinicInfo, stats, doctors } from '../data/mockData';
import './About.css';

const About = () => (
  <div className="about-page">
    <div className="page-hero">
      <div className="container">
        <div className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>🏥 About Us</div>
        <h1 className="section-title" style={{ color: '#fff' }}>14 Years of Smiles & Trust</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 540 }}>Serving Chennai's families with compassionate, state-of-the-art dental care since {clinicInfo.established}.</p>
      </div>
    </div>

    {/* Story */}
    <section className="section">
      <div className="container about-story">
        <div className="about-text">
          <div className="section-label">📖 Our Story</div>
          <h2 className="section-title">A Family Clinic, Built for Families</h2>
          <div className="divider" />
          <p>SmileCare Family Dentistry was founded in {clinicInfo.established} with a simple mission: to make quality dental care accessible, comfortable and affordable for every family in Chennai.</p>
          <p style={{ marginTop: 14 }}>Over the past 14 years, we have grown from a single-doctor clinic into a multi-specialty dental centre with a team of 4 experienced dentists and a dedicated support staff — all united by one goal: your healthy, confident smile.</p>
          <p style={{ marginTop: 14 }}>We invest in the latest technology — from digital X-rays to laser dentistry — because we believe every patient deserves the best. But more than equipment, we invest in relationships, treating every patient like family.</p>
        </div>
        <div className="about-visual">
          <div className="about-card-main">
            <div style={{ fontSize: 56, marginBottom: 16 }}>🏆</div>
            <h3>Best Dental Clinic Award</h3>
            <p>Tamil Nadu Dental Association, 2024</p>
          </div>
          <div className="about-stats-mini">
            {stats.map((s, i) => (
              <div key={i} className="mini-stat">
                <div className="mini-stat-val">{s.value}</div>
                <div className="mini-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section values-section">
      <div className="container">
        <div className="section-header center">
          <div className="section-label">💎 Our Values</div>
          <h2 className="section-title">What We Stand For</h2>
          <div className="divider divider-center" />
        </div>
        <div className="values-grid">
          {[
            { icon: '❤️', title: 'Compassion First', desc: 'We treat every patient with empathy, patience and genuine care — especially those with dental anxiety.' },
            { icon: '🔬', title: 'Clinical Excellence', desc: 'Our doctors stay current with global best practices, attending regular CMEs and international conferences.' },
            { icon: '🔒', title: 'Patient Safety', desc: 'Hospital-grade sterilisation, single-use instruments, and strict infection control — always.' },
            { icon: '💬', title: 'Transparent Communication', desc: 'We explain every diagnosis, treatment option and cost before proceeding. No surprises.' },
            { icon: '👨‍👩‍👧', title: 'Family-Friendly', desc: 'A warm, welcoming environment for patients of all ages — from toddlers to grandparents.' },
            { icon: '🌱', title: 'Long-Term Relationships', desc: 'We focus on prevention and maintenance, building lifetime dental health partnerships with our patients.' },
          ].map((v, i) => (
            <div key={i} className="value-card card">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Accreditations */}
    <section className="section accred-section">
      <div className="container">
        <div className="section-header center">
          <div className="section-label">🏅 Recognised Excellence</div>
          <h2 className="section-title">Accreditations & Awards</h2>
          <div className="divider divider-center" />
        </div>
        <div className="accred-grid">
          {[
            { icon: '🏥', label: 'NABH Accredited', sub: 'National Accreditation Board for Hospitals' },
            { icon: '✅', label: 'ISO 9001:2015', sub: 'Certified Quality Management System' },
            { icon: '🦷', label: 'IDA Member', sub: 'Indian Dental Association' },
            { icon: '🏆', label: 'Best Clinic 2024', sub: 'Tamil Nadu Dental Association Award' },
          ].map((a, i) => (
            <div key={i} className="accred-card card">
              <div className="accred-icon">{a.icon}</div>
              <div className="accred-label">{a.label}</div>
              <div className="accred-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <div className="about-cta">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Experience the SmileCare Difference</h2>
        <p>Book your appointment today and see why 18,000+ Chennai families trust us with their smiles.</p>
        <Link to="/book-appointment" className="btn btn-white btn-lg" style={{ marginTop: 24 }}>Book an Appointment →</Link>
      </div>
    </div>
  </div>
);

export default About;
