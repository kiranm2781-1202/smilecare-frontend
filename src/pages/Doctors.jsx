import React from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../data/mockData';
import './Doctors.css';

const Doctors = () => (
  <div className="doctors-page">
    <div className="page-hero">
      <div className="container">
        <div className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>👨‍⚕️ Our Team</div>
        <h1 className="section-title" style={{ color: '#fff' }}>Meet Our Expert Doctors</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 520 }}>A team of highly qualified and experienced specialists dedicated to your family's dental health.</p>
      </div>
    </div>

    <div className="container section">
      <div className="doctors-full-grid">
        {doctors.map(d => (
          <div key={d.id} className="doctor-full-card card">
            <div className="dfc-left">
              <div className="dfc-avatar" style={{ background: `${d.color}15`, color: d.color }}>{d.initials}</div>
              <div className="dfc-rating">
                <div className="stars">{'★'.repeat(Math.floor(d.rating))}</div>
                <div className="dfc-rating-val">{d.rating} · {d.reviews} reviews</div>
              </div>
            </div>
            <div className="dfc-info">
              <div className="dfc-name">{d.name}</div>
              <div className="dfc-designation">{d.designation}</div>
              <div className="dfc-spec">{d.specialization}</div>
              <div className="dfc-qual">{d.qualification}</div>
              <div className="dfc-tags">
                <span className="badge badge-blue">{d.experience}+ yrs experience</span>
                <span className="badge badge-green">Available Now</span>
              </div>
              <div className="dfc-details">
                <div className="dfc-detail-item">
                  <span className="dfc-detail-label">Working Days</span>
                  <span>{d.availableDays.join(' · ')}</span>
                </div>
                <div className="dfc-detail-item">
                  <span className="dfc-detail-label">Languages</span>
                  <span>{d.languages.join(', ')}</span>
                </div>
              </div>
              <Link to="/book-appointment" className="btn btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>Book Appointment →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="join-team-section">
      <div className="container join-inner">
        <div>
          <h2>Are you a dental professional?</h2>
          <p>We are always looking for passionate dentists to join our growing family dental practice.</p>
        </div>
        <Link to="/contact" className="btn btn-white btn-lg">Get In Touch →</Link>
      </div>
    </div>
  </div>
);

export default Doctors;
