import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, doctors, generateTimeSlots, clinicInfo } from '../data/mockData';
import './BookAppointment.css';

const STEPS = ['Select Service', 'Choose Doctor', 'Pick Date & Time', 'Your Details', 'Confirmation'];

const today = new Date().toISOString().split('T')[0];

const BookAppointment = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: null,
    doctor: null,
    date: '',
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [booked, setBooked] = useState(false);

  const slots = generateTimeSlots();

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return !!form.doctor;
    if (step === 2) return !!form.date && !!form.timeSlot;
    if (step === 3) return form.name && form.phone && form.email;
    return true;
  };

  const handleBook = () => setBooked(true);

  if (booked) return <SuccessScreen form={form} />;

  return (
    <div className="book-page">
      {/* Header */}
      <div className="book-header">
        <div className="container">
          <div className="book-header-badge">📅 Book Your Appointment</div>
          <h1>Schedule Your Visit in <span>4 Easy Steps</span></h1>
          <p>Pick a service, choose your doctor, and select a time that works for you.</p>
        </div>
      </div>

      <div className="container book-body">
        {/* Stepper */}
        <div className="stepper">
          {STEPS.slice(0,-1).map((label, i) => (
            <React.Fragment key={i}>
              <div className={`step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                <div className="step-circle">{i < step ? '✓' : i + 1}</div>
                <div className="step-label">{label}</div>
              </div>
              {i < STEPS.length - 2 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="book-content">
          {/* Step 0 – Service */}
          {step === 0 && (
            <div className="step-panel">
              <h2>What treatment do you need?</h2>
              <p className="step-desc">Select the service you'd like to book</p>
              <div className="service-select-grid">
                {services.map(s => (
                  <div
                    key={s.id}
                    className={`service-option ${form.service?.id === s.id ? 'selected' : ''}`}
                    onClick={() => set('service', s)}
                  >
                    <div className="sopt-icon">{s.icon}</div>
                    <div className="sopt-info">
                      <div className="sopt-name">{s.name}</div>
                      <div className="sopt-meta">⏱ {s.duration} min &nbsp;|&nbsp; ₹{s.price.toLocaleString()}+</div>
                    </div>
                    <div className="sopt-check">{form.service?.id === s.id ? '✓' : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 – Doctor */}
          {step === 1 && (
            <div className="step-panel">
              <h2>Choose your doctor</h2>
              <p className="step-desc">All our doctors are experienced specialists</p>
              <div className="doctor-select-grid">
                {doctors.map(d => (
                  <div
                    key={d.id}
                    className={`doctor-option ${form.doctor?.id === d.id ? 'selected' : ''}`}
                    onClick={() => set('doctor', d)}
                  >
                    <div className="dopt-avatar" style={{ background: `${d.color}20`, color: d.color }}>{d.initials}</div>
                    <div className="dopt-info">
                      <div className="dopt-name">{d.name}</div>
                      <div className="dopt-spec">{d.specialization}</div>
                      <div className="dopt-qual">{d.qualification}</div>
                      <div className="dopt-meta">
                        <span className="badge badge-blue">{d.experience} yrs</span>
                        <span className="stars">{'★'.repeat(Math.floor(d.rating))}</span>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{d.rating}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                        📅 Available: {d.availableDays.slice(0,3).join(', ')}{d.availableDays.length > 3 ? '...' : ''}
                      </div>
                    </div>
                    {form.doctor?.id === d.id && <div className="dopt-check">✓</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 – Date & Time */}
          {step === 2 && (
            <div className="step-panel">
              <h2>Pick a date & time</h2>
              <p className="step-desc">Each slot is 45 minutes. Greyed slots are already booked.</p>
              <div className="datetime-layout">
                <div className="date-picker-wrap">
                  <label className="field-label">Select Date</label>
                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={e => { set('date', e.target.value); set('timeSlot', ''); }}
                    className="date-input"
                  />
                  {form.date && (
                    <div className="selected-date-info">
                      📅 {new Date(form.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </div>
                <div className="slots-wrap">
                  <label className="field-label">Available Time Slots (45 min each)</label>
                  {!form.date ? (
                    <div className="slots-placeholder">👆 Please select a date first</div>
                  ) : (
                    <div className="slots-grid">
                      {slots.map((slot, i) => (
                        <button
                          key={i}
                          className={`slot-btn ${slot.booked ? 'booked' : ''} ${form.timeSlot === slot.time ? 'selected' : ''}`}
                          disabled={slot.booked}
                          onClick={() => set('timeSlot', slot.time)}
                        >
                          {slot.time}
                          {slot.booked && <span className="slot-tag">Booked</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="slots-legend">
                    <span className="legend-item"><span className="legend-dot available" />Available</span>
                    <span className="legend-item"><span className="legend-dot sel" />Selected</span>
                    <span className="legend-item"><span className="legend-dot booked" />Booked</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 – Details */}
          {step === 3 && (
            <div className="step-panel">
              <h2>Your details</h2>
              <p className="step-desc">Fill in your information to complete the booking</p>
              <div className="form-grid">
                <div className="field-group">
                  <label className="field-label">Full Name *</label>
                  <input className="field-input" placeholder="e.g. Kavitha Reddy" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Phone Number *</label>
                  <input className="field-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Email Address *</label>
                  <input className="field-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Any notes for the doctor? (Optional)</label>
                  <textarea className="field-input field-textarea" placeholder="e.g. I have sensitivity on the upper left side..." value={form.notes} onChange={e => set('notes', e.target.value)} />
                </div>
              </div>

              {/* Summary */}
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-row"><span>Service</span><strong>{form.service?.name}</strong></div>
                <div className="summary-row"><span>Doctor</span><strong>{form.doctor?.name}</strong></div>
                <div className="summary-row"><span>Date</span><strong>{form.date ? new Date(form.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</strong></div>
                <div className="summary-row"><span>Time</span><strong>{form.timeSlot}</strong></div>
                <div className="summary-row"><span>Duration</span><strong>{form.service?.duration} min</strong></div>
                <div className="summary-row total"><span>Estimated Cost</span><strong>₹{form.service?.price.toLocaleString()}+</strong></div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="step-nav">
            {step > 0 && (
              <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <div style={{ flex: 1 }} />
            {step < 3 ? (
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
                Continue →
              </button>
            ) : (
              <button className="btn btn-accent btn-lg" disabled={!canNext()} onClick={handleBook}>
                Confirm Booking ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessScreen = ({ form }) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✅</div>
      <h2>Appointment Confirmed!</h2>
      <p>We've received your booking. You'll get a confirmation SMS & email shortly.</p>
      <div className="success-details">
        <div className="summary-row"><span>Patient</span><strong>{form.name}</strong></div>
        <div className="summary-row"><span>Service</span><strong>{form.service?.name}</strong></div>
        <div className="summary-row"><span>Doctor</span><strong>{form.doctor?.name}</strong></div>
        <div className="summary-row"><span>Date</span><strong>{form.date ? new Date(form.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : '-'}</strong></div>
        <div className="summary-row"><span>Time</span><strong>{form.timeSlot}</strong></div>
      </div>
      <div className="success-clinic">
        <span>📍</span>
        <span>SmileCare Family Dentistry, Anna Salai, Chennai</span>
      </div>
      <div className="success-actions">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/my-appointments" className="btn btn-outline">View My Appointments</Link>
      </div>
    </div>
  </div>
);

export default BookAppointment;
