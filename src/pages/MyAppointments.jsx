import React from 'react';
import { Link } from 'react-router-dom';
import './MyAppointments.css';

const mockAppointments = [
  { id: 1, service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', date: '2026-10-10', time: '10:30 AM', status: 'confirmed' },
  { id: 2, service: 'Root Canal Treatment', doctor: 'Dr. Vikram Nair', date: '2026-10-18', time: '2:00 PM', status: 'pending' },
];

const statusStyles = {
  confirmed: { bg: '#d1fae5', color: '#065f46', label: 'Confirmed' },
  pending: { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
  completed: { bg: '#e0f2fe', color: '#075985', label: 'Completed' },
};

const MyAppointments = () => (
  <div className="my-appts-page">
    <div className="page-hero">
      <div className="container">
        <h1 className="section-title" style={{ color: '#fff' }}>My Appointments</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Manage your upcoming and past dental appointments</p>
      </div>
    </div>
    <div className="container section">
      {mockAppointments.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 64, marginBottom: 16 }}>📅</div>
          <h3>No appointments yet</h3>
          <p>Book your first appointment to get started</p>
          <Link to="/book-appointment" className="btn btn-primary" style={{ marginTop: 20 }}>Book Now</Link>
        </div>
      ) : (
        <div className="appt-list">
          {mockAppointments.map(a => {
            const s = statusStyles[a.status];
            return (
              <div key={a.id} className="appt-card card">
                <div className="appt-info">
                  <div className="appt-service">{a.service}</div>
                  <div className="appt-doctor">👨‍⚕️ {a.doctor}</div>
                  <div className="appt-datetime">📅 {new Date(a.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })} &nbsp; ⏰ {a.time}</div>
                </div>
                <div className="appt-status" style={{ background: s.bg, color: s.color }}>{s.label}</div>
              </div>
            );
          })}
          <Link to="/book-appointment" className="btn btn-primary" style={{ width: 'fit-content' }}>+ Book Another Appointment</Link>
        </div>
      )}
    </div>
  </div>
);

export default MyAppointments;
