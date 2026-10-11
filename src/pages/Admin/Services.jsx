import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { services } from '../../data/mockData';
import './Admin.css';

const AdminServices = () => (
  <AdminLayout>
    <div className="admin-page-header">
      <div><h1>Services</h1><p>{services.length} active treatments</p></div>
      <button className="btn btn-primary">+ Add Service</button>
    </div>
    <div className="admin-card">
      <table className="admin-table">
        <thead>
          <tr><th>Service</th><th>Category</th><th>Duration</th><th>Price</th><th>Status</th></tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <strong>{s.name}</strong>
                </div>
              </td>
              <td><span className="badge badge-blue">{s.category}</span></td>
              <td>{s.duration} min</td>
              <td>₹{s.price.toLocaleString()}+</td>
              <td><span className="status-badge" style={{ background: '#d1fae5', color: '#065f46' }}>Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminLayout>
);

export default AdminServices;
