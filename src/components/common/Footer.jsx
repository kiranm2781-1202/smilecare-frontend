import React from 'react';
import { Link } from 'react-router-dom';
import { clinicInfo } from '../../data/mockData';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-main">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="brand-icon">🦷</div>
            <div>
              <div className="brand-name">{clinicInfo.name}</div>
              <div className="brand-sub">{clinicInfo.tagline}</div>
            </div>
          </div>
          <p className="footer-desc">Providing compassionate, high-quality dental care to families across Bengaluru since {clinicInfo.established}. Your smile is our commitment.</p>
          <div className="footer-social">
            <a href="#" className="social-btn">f</a>
            <a href="#" className="social-btn">in</a>
            <a href="#" className="social-btn">ig</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/doctors">Our Doctors</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/book-appointment">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Treatments</h4>
          <ul>
            <li><Link to="/services">Teeth Cleaning</Link></li>
            <li><Link to="/services">Teeth Whitening</Link></li>
            <li><Link to="/services">Root Canal</Link></li>
            <li><Link to="/services">Dental Implants</Link></li>
            <li><Link to="/services">Braces & Aligners</Link></li>
            <li><Link to="/services">Kids Dentistry</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{clinicInfo.address}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <a href={`mailto:${clinicInfo.email}`}>{clinicInfo.email}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <div>{clinicInfo.hours.weekdays}</div>
                <div>{clinicInfo.hours.sunday}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container footer-bottom-inner">
        <p>© {new Date().getFullYear()} {clinicInfo.name}. All Rights Reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p>Made with ❤️ for healthy smiles</p>
          <Link to="/login" className="manager-login-link">Staff Login</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
