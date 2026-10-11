import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const nav = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/customers', label: 'Customers', icon: '👥' },
  { path: '/admin/appointments', label: 'Appointments', icon: '📅' },
  { path: '/admin/doctors', label: 'Doctors', icon: '👨‍⚕️' },
  { path: '/admin/services', label: 'Services', icon: '🦷' },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => path === '/admin'
    ? location.pathname === '/admin'
    : location.pathname.startsWith(path);

  const handleLogout = () => navigate('/');

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🦷</span>
            {!collapsed && <span className="logo-text">SmileCare</span>}
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {nav.map(n => (
            <Link
              key={n.path}
              to={n.path}
              className={`sidebar-link ${isActive(n.path) ? 'active' : ''}`}
              title={collapsed ? n.label : ''}
            >
              <span className="nav-icon">{n.icon}</span>
              {!collapsed && <span className="nav-label">{n.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link" title="View Website">
            <span className="nav-icon">🌐</span>
            {!collapsed && <span className="nav-label">View Website</span>}
          </Link>
          <button className="sidebar-link logout-btn" onClick={handleLogout} title="Logout">
            <span className="nav-icon">🚪</span>
            {!collapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <div className="admin-breadcrumb">
              {nav.find(n => isActive(n.path))?.label || 'Admin'}
            </div>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-user">
              <div className="admin-avatar">M</div>
              <div className="admin-user-info">
                <div className="admin-user-name">Manager</div>
                <div className="admin-user-role">Admin Access</div>
              </div>
            </div>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
