import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { clinicInfo } from '../../data/mockData';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span>📍 {clinicInfo.address.split(',').slice(0,2).join(',')}</span>
            <span className="topbar-sep">|</span>
            <span>🕐 {clinicInfo.hours.weekdays}</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${clinicInfo.phone}`}>📞 {clinicInfo.phone}</a>
            <a href={`mailto:${clinicInfo.email}`}>✉ {clinicInfo.email}</a>
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">🦷</div>
            <div className="brand-text">
              <span className="brand-name">{clinicInfo.name}</span>
              <span className="brand-sub">Excellence in Dental Care</span>
            </div>
          </Link>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link></li>
            <li><Link to="/doctors" className={isActive('/doctors') ? 'active' : ''}>Our Doctors</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
            {user?.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
          </ul>

          <div className="navbar-actions">
            {user?.role === 'admin' && (
              <div className="user-menu">
                <span className="user-name">Hi, {user.name?.split(' ')[0]}</span>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
              </div>
            )}
            <Link to="/book-appointment" className="btn btn-primary btn-sm">Book Appointment</Link>
          </div>

          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
