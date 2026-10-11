import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { treatmentHistory, customers } from '../../data/mockData';
import './Admin.css';

const allAppointments = Object.entries(treatmentHistory).flatMap(([custId, history]) => {
  const cust = customers.find(c => c.id === parseInt(custId));
  return history.map(h => ({ ...h, customerName: cust?.name, customerPhone: cust?.phone }));
}).sort((a, b) => new Date(b.date) - new Date(a.date));

const statusStyle = {
  completed: { bg: '#d1fae5', color: '#065f46', label: 'Completed' },
  confirmed: { bg: '#dbeafe', color: '#1e40af', label: 'Upcoming' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
  pending: { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
};

const Appointments = () => (
  <AdminLayout>
    <div className="admin-page-header">
      <div><h1>All Appointments</h1><p>{allAppointments.length} total records</p></div>
    </div>
    <div className="admin-card">
      <table className="admin-table">
        <thead>
          <tr><th>Date</th><th>Customer</th><th>Treatment</th><th>Doctor</th><th>Notes</th><th>Cost</th><th>Status</th></tr>
        </thead>
        <tbody>
          {allAppointments.map(a => {
            const s = statusStyle[a.status];
            return (
              <tr key={a.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>
                  <div className="table-name-main">{a.customerName}</div>
                  <div className="table-name-sub">{a.customerPhone}</div>
                </td>
                <td><strong>{a.service}</strong></td>
                <td>{a.doctor}</td>
                <td className="notes-cell">{a.notes}</td>
                <td>{a.cost > 0 ? `₹${a.cost.toLocaleString()}` : '—'}</td>
                <td><span className="status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </AdminLayout>
);

export default Appointments;
