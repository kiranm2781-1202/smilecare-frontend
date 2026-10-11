import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/mockData';
import './Services.css';

const categories = ['All', ...new Set(services.map(s => s.category))];

const Services = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? services : services.filter(s => s.category === active);

  return (
    <div className="services-page">
      <div className="page-hero">
        <div className="container">
          <div className="section-label">🦷 Our Treatments</div>
          <h1 className="section-title" style={{ color: '#fff' }}>Complete Dental Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 520 }}>From preventive care to advanced smile makeovers — every treatment your family needs, all under one roof.</p>
        </div>
      </div>

      <div className="container section">
        <div className="category-tabs">
          {categories.map(c => (
            <button key={c} className={`cat-tab ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
        <div className="services-full-grid">
          {filtered.map(s => (
            <div key={s.id} className="service-full-card card">
              <div className="sfc-top">
                <div className="sfc-icon">{s.icon}</div>
                <div className="badge badge-blue">{s.category}</div>
              </div>
              <h3 className="sfc-name">{s.name}</h3>
              <p className="sfc-desc">{s.description}</p>
              <div className="sfc-meta">
                <div className="sfc-meta-item"><span>⏱</span><div><div className="meta-label">Duration</div><div className="meta-val">{s.duration} min</div></div></div>
                <div className="sfc-meta-item"><span>💰</span><div><div className="meta-label">Starting From</div><div className="meta-val">₹{s.price.toLocaleString()}</div></div></div>
              </div>
              <Link to="/book-appointment" className="btn btn-primary">Book This Treatment →</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="services-cta">
        <div className="container">
          <h2>Not sure which treatment you need?</h2>
          <p>Book a free consultation and our expert doctors will guide you to the best solution.</p>
          <Link to="/book-appointment" className="btn btn-white btn-lg">Book Free Consultation</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
