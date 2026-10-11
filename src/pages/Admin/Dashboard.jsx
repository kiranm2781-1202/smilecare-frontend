import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { customers, treatmentHistory } from '../../data/mockData';
import './Admin.css';

const totalTreatments = Object.values(treatmentHistory).flat().length;
const totalRevenue = Object.values(treatmentHistory).flat().reduce((s, t) => s + t.cost, 0);
const pendingAppts = Object.values(treatmentHistory).flat().filter(t => t.status === 'confirmed').length;

const recentCustomers = [...customers].sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit)).slice(0, 5);

const Dashboard = () => (
  <AdminLayout>
    <div className="admin-page-header">
      <div>
        <h1>Welcome back, Manager 👋</h1>
        <p>Here's what's happening at SmileCare Family Dentistry today.</p>
      </div>
      <Link to="/admin/customers" className="btn btn-primary">+ Add Customer</Link>
    </div>

    {/* Stats */}
    <div className="admin-stats-grid">
      <div className="admin-stat-card">
        <div className="stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>👥</div>
        <div className="stat-info">
          <div className="stat-val">{customers.length}</div>
          <div className="stat-lbl">Total Customers</div>
        </div>
      </div>
      <div className="admin-stat-card">
        <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>🦷</div>
        <div className="stat-info">
          <div className="stat-val">{totalTreatments}</div>
          <div className="stat-lbl">Treatments Done</div>
        </div>
      </div>
      <div className="admin-stat-card">
        <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>📅</div>
        <div className="stat-info">
          <div className="stat-val">{pendingAppts}</div>
          <div className="stat-lbl">Upcoming Appointments</div>
        </div>
      </div>
      <div className="admin-stat-card">
        <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>💰</div>
        <div className="stat-info">
          <div className="stat-val">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-lbl">Total Revenue</div>
        </div>
      </div>
    </div>

    {/* Recent Customers */}
    <div className="admin-card" style={{ marginTop: 28 }}>
      <div className="admin-card-header">
        <h3>Recent Customers</h3>
        <Link to="/admin/customers" className="btn btn-outline btn-sm">View All →</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Assigned Doctor</th>
            <th>Last Visit</th>
            <th>Total Visits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recentCustomers.map(c => (
            <tr key={c.id}>
              <td>
                <div className="table-name">
                  <div className="table-avatar">{c.name[0]}</div>
                  <div>
                    <div className="table-name-main">{c.name}</div>
                    <div className="table-name-sub">{c.email}</div>
                  </div>
                </div>
              </td>
              <td>{c.phone}</td>
              <td>{c.assignedDoctor}</td>
              <td>{new Date(c.lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
              <td><span className="badge badge-blue">{c.totalVisits} visits</span></td>
              <td><Link to={`/admin/customers/${c.id}`} className="btn btn-outline btn-sm">View History</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminLayout>
);

export default Dashboard;
