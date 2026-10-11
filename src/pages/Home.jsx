import React from 'react';
import { Link } from 'react-router-dom';
import { services, doctors, testimonials, stats, clinicInfo } from '../data/mockData';
import './Home.css';

const StarRating = ({ rating }) => '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

const Home = () => (
  <div className="home">
    {/* ── Hero ── */}
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>Now Open — {clinicInfo.hours.weekdays.split(':')[1].trim()}</span>
          </div>
          <h1 className="hero-title">
            Your Family's <span className="hero-highlight">Healthy Smile</span><br />
            Starts Here
          </h1>
          <p className="hero-subtitle">
            Expert dental care for every age — from your child's first tooth to your perfect smile makeover. Trusted by <strong>18,000+ families</strong> across Chennai.
          </p>
          <div className="hero-actions">
            <Link to="/book-appointment" className="btn btn-primary btn-lg">Book Appointment →</Link>
            <Link to="/services" className="btn btn-white btn-lg">Explore Treatments</Link>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="trust-val">4.9 ★</span><span>Google Rating</span></div>
            <div className="trust-sep" />
            <div className="trust-item"><span className="trust-val">18K+</span><span>Happy Patients</span></div>
            <div className="trust-sep" />
            <div className="trust-item"><span className="trust-val">14 Yrs</span><span>Experience</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="hero-emoji">🦷</div>
            <div className="hero-card-title">SmileCare Family Dentistry</div>
            <div className="hero-card-sub">Chennai's Most Trusted Dental Clinic</div>
          </div>
          <div className="hero-float hero-float-1">
            <span>✅</span>
            <div>
              <div className="float-title">Pain-Free Treatment</div>
              <div className="float-sub">Advanced anaesthesia</div>
            </div>
          </div>
          <div className="hero-float hero-float-2">
            <span>👨‍👩‍👧</span>
            <div>
              <div className="float-title">Family Dentistry</div>
              <div className="float-sub">All ages welcome</div>
            </div>
          </div>
          <div className="hero-float hero-float-3">
            <span>🏆</span>
            <div>
              <div className="float-title">Award Winning</div>
              <div className="float-sub">Best Clinic 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Stats ── */}
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Services ── */}
    <section className="section services-section">
      <div className="container">
        <div className="section-header center">
          <div className="section-label">🦷 What We Offer</div>
          <h2 className="section-title">Complete Dental Care<br />Under One Roof</h2>
          <div className="divider divider-center" />
          <p className="section-subtitle">From routine check-ups to advanced smile makeovers — we have every treatment your family needs.</p>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.id} className="service-card card">
              <div className="service-icon">{s.icon}</div>
              <div className="badge badge-blue" style={{ marginBottom: 8 }}>{s.category}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.description}</p>
              <div className="service-meta">
                <span className="service-duration">⏱ {s.duration} min</span>
                <span className="service-price">₹{s.price.toLocaleString()}+</span>
              </div>
              <Link to="/book-appointment" className="btn btn-outline btn-sm service-btn">Book Now</Link>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 40 }}>
          <Link to="/services" className="btn btn-primary">View All Treatments →</Link>
        </div>
      </div>
    </section>

    {/* ── Why Us ── */}
    <section className="section why-section">
      <div className="container why-inner">
        <div className="why-text">
          <div className="section-label">💎 Why Choose Us</div>
          <h2 className="section-title">Dentistry That Puts Your Family First</h2>
          <div className="divider" />
          <p className="section-subtitle">We combine cutting-edge technology with genuine care to make every visit comfortable and effective.</p>
          <div className="why-points">
            {[
              { icon: '🔬', title: 'Latest Technology', desc: 'Digital X-rays, laser dentistry, 3D scanning — the most advanced tools for accurate diagnosis.' },
              { icon: '💉', title: 'Painless Procedures', desc: 'We use the latest anaesthesia techniques so you feel nothing but comfortable.' },
              { icon: '🏥', title: 'Sterile & Safe', desc: 'Hospital-grade sterilisation protocols. Your safety is our top priority, always.' },
              { icon: '💳', title: 'Flexible Payment', desc: 'Easy EMI options, insurance accepted, and transparent pricing with no hidden costs.' },
            ].map((p, i) => (
              <div key={i} className="why-point">
                <div className="why-icon">{p.icon}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn btn-primary" style={{ marginTop: 8 }}>Learn More About Us →</Link>
        </div>
        <div className="why-visual">
          <div className="why-card">
            <div className="why-emoji">🏅</div>
            <h3>Chennai's Top-Rated Family Dental Clinic</h3>
            <p>Recognised by Tamil Nadu Dental Association for excellence in patient care and advanced treatment outcomes.</p>
            <div className="why-badges">
              <span className="badge badge-blue">ISO Certified</span>
              <span className="badge badge-green">NABH Accredited</span>
              <span className="badge badge-amber">ADA Member</span>
            </div>
          </div>
          <div className="emergency-card">
            <div className="emergency-icon">🚨</div>
            <div>
              <div className="emergency-title">Dental Emergency?</div>
              <div className="emergency-sub">Call us now for same-day appointments</div>
              <a href={`tel:${clinicInfo.phone}`} className="btn btn-accent btn-sm" style={{ marginTop: 10 }}>
                {clinicInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Doctors ── */}
    <section className="section doctors-section">
      <div className="container">
        <div className="section-header center">
          <div className="section-label">👨‍⚕️ Meet the Team</div>
          <h2 className="section-title">Expert Doctors Who Care</h2>
          <div className="divider divider-center" />
          <p className="section-subtitle">Our team of experienced specialists are dedicated to giving you the best dental experience possible.</p>
        </div>
        <div className="doctors-grid">
          {doctors.map(d => (
            <div key={d.id} className="doctor-card card">
              <div className="doctor-avatar" style={{ background: `${d.color}20`, color: d.color }}>{d.initials}</div>
              <div className="doctor-info">
                <div className="doctor-name">{d.name}</div>
                <div className="doctor-spec">{d.specialization}</div>
                <div className="doctor-qual">{d.qualification}</div>
                <div className="doctor-meta">
                  <span className="badge badge-blue">{d.experience} yrs exp</span>
                  <span className="stars">{'★'.repeat(Math.floor(d.rating))}</span>
                  <span className="review-count">{d.rating} ({d.reviews})</span>
                </div>
                <div className="doctor-langs">🗣 {d.languages.join(' · ')}</div>
              </div>
              <Link to="/book-appointment" className="btn btn-primary btn-sm doctor-btn">Book Appointment</Link>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 40 }}>
          <Link to="/doctors" className="btn btn-outline">View All Doctors →</Link>
        </div>
      </div>
    </section>

    {/* ── Booking CTA ── */}
    <section className="cta-section">
      <div className="container cta-inner">
        <div className="cta-text">
          <h2>Ready for a Healthier, Brighter Smile?</h2>
          <p>Book your appointment in under 2 minutes. Choose your doctor, pick a time slot that works for you.</p>
        </div>
        <div className="cta-actions">
          <Link to="/book-appointment" className="btn btn-white btn-lg">Book Appointment Now →</Link>
          <a href={`tel:${clinicInfo.phone}`} className="btn btn-outline-white btn-lg">📞 Call Us</a>
        </div>
      </div>
    </section>

    {/* ── Testimonials ── */}
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header center">
          <div className="section-label">💬 Patient Stories</div>
          <h2 className="section-title">What Our Patients Say</h2>
          <div className="divider divider-center" />
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card card">
              <div className="stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-loc">📍 {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Location ── */}
    <section className="section location-section">
      <div className="container location-inner">
        <div className="location-info">
          <div className="section-label">📍 Find Us</div>
          <h2 className="section-title">Visit Our Clinic</h2>
          <div className="divider" />
          <div className="location-details">
            <div className="loc-item"><span>📍</span><div><strong>Address</strong><p>{clinicInfo.address}</p></div></div>
            <div className="loc-item"><span>📞</span><div><strong>Phone</strong><p>{clinicInfo.phone}<br />{clinicInfo.phone2}</p></div></div>
            <div className="loc-item"><span>✉</span><div><strong>Email</strong><p>{clinicInfo.email}</p></div></div>
            <div className="loc-item"><span>🕐</span><div><strong>Working Hours</strong><p>{clinicInfo.hours.weekdays}<br />{clinicInfo.hours.sunday}</p></div></div>
          </div>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 8 }}>Get Directions →</Link>
        </div>
        <div className="map-placeholder">
          <div className="map-inner">
            <div className="map-pin">📍</div>
            <div className="map-label">{clinicInfo.name}</div>
            <div className="map-sub">Anna Salai, Chennai</div>
            <a href={clinicInfo.mapEmbed} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
