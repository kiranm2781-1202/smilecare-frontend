import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { customers, treatmentHistory, services, doctors } from '../../data/mockData';
import './Admin.css';
import './CustomerDetail.css';

const statusStyle = {
  completed: { bg: '#d1fae5', color: '#065f46', label: 'Completed' },
  confirmed: { bg: '#dbeafe', color: '#1e40af', label: 'Upcoming' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
  pending: { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
};

const CustomerDetail = () => {
  const { id } = useParams();
  const customer = customers.find(c => c.id === parseInt(id));
  const [history, setHistory] = useState(treatmentHistory[parseInt(id)] || []);
  const [activeTab, setActiveTab] = useState('history');
  const [files, setFiles] = useState([]);
  const [showAddTreatment, setShowAddTreatment] = useState(false);
  const [treatForm, setTreatForm] = useState({ service: '', doctor: '', date: '', notes: '', cost: '', status: 'completed' });
  const [treatFiles, setTreatFiles] = useState([]);
  const fileInputRef = useRef();
  const treatFileInputRef = useRef();

  if (!customer) return (
    <AdminLayout>
      <div className="empty-table">Customer not found. <Link to="/admin/customers">← Back</Link></div>
    </AdminLayout>
  );

  const totalSpent = history.reduce((s, t) => s + (Number(t.cost) || 0), 0);
  const upcoming = history.filter(h => h.status === 'confirmed');
  const completed = history.filter(h => h.status === 'completed');
  const age = new Date().getFullYear() - new Date(customer.dob).getFullYear();

  /* ── Add Treatment ── */
  const handleTreatFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(f => ({
      id: Date.now() + Math.random(),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }));
    setTreatFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeTreatFile = (id) => setTreatFiles(prev => prev.filter(f => f.id !== id));

  const handleAddTreatment = () => {
    if (!treatForm.service || !treatForm.doctor || !treatForm.date) return;
    setHistory(prev => [{
      id: Date.now(), ...treatForm, cost: Number(treatForm.cost) || 0,
      attachments: treatFiles,
    }, ...prev]);
    setTreatForm({ service: '', doctor: '', date: '', notes: '', cost: '', status: 'completed' });
    setTreatFiles([]);
    setShowAddTreatment(false);
  };

  /* ── File Upload ── */
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(f => ({
      id: Date.now() + Math.random(),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const formatSize = (bytes) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <AdminLayout>
      <div className="detail-back"><Link to="/admin/customers">← Back to Customers</Link></div>

      {/* Profile Header */}
      <div className="customer-profile-card">
        <div className="profile-left">
          <div className="profile-avatar">{customer.name[0]}</div>
          <div className="profile-info">
            <h2>{customer.name}</h2>
            <div className="profile-meta">
              <span>📞 {customer.phone}</span>
              <span>✉ {customer.email}</span>
              <span>🎂 {age} yrs</span>
              <span>⚧ {customer.gender}</span>
              <span>🩸 {customer.bloodGroup}</span>
            </div>
            <div className="profile-meta" style={{ marginTop: 6 }}>
              <span>📍 {customer.address}</span>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-stat"><div className="p-stat-val">{history.length}</div><div className="p-stat-lbl">Total Visits</div></div>
          <div className="profile-stat"><div className="p-stat-val">₹{totalSpent.toLocaleString()}</div><div className="p-stat-lbl">Total Spent</div></div>
          <div className="profile-stat"><div className="p-stat-val">{files.length}</div><div className="p-stat-lbl">Files / X-rays</div></div>
          <div className="profile-stat"><div className="p-stat-val">{upcoming.length}</div><div className="p-stat-lbl">Upcoming</div></div>
        </div>
      </div>

      {/* Alerts */}
      {(customer.allergies.length > 0 || customer.medicalHistory.length > 0) && (
        <div className="alerts-row">
          {customer.allergies.length > 0 && (
            <div className="alert-card allergy">
              <span>⚠️</span>
              <div><strong>Allergies</strong><p>{customer.allergies.join(', ')}</p></div>
            </div>
          )}
          {customer.medicalHistory.length > 0 && (
            <div className="alert-card medical-alert">
              <span>🏥</span>
              <div><strong>Medical History</strong><p>{customer.medicalHistory.join(', ')}</p></div>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="detail-tabs">
        <button className={`detail-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          🦷 Treatment History ({history.length})
        </button>
        <button className={`detail-tab ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
          📁 X-rays & Files ({files.length})
        </button>
        <button className={`detail-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          👤 Patient Profile
        </button>
      </div>

      {/* ── Treatment History Tab ── */}
      {activeTab === 'history' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Treatment History <span className="badge badge-blue" style={{ marginLeft: 8 }}>{completed.length} completed</span></h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddTreatment(true)}>+ Add Treatment</button>
          </div>
          {history.length === 0 ? (
            <div className="empty-table">No treatment history yet.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Date</th><th>Treatment</th><th>Doctor</th><th>Doctor's Notes</th><th>Cost</th><th>Status</th></tr>
              </thead>
              <tbody>
                {[...history].sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => {
                  const s = statusStyle[t.status] || statusStyle.completed;
                  return (
                    <tr key={t.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(t.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td><strong>{t.service}</strong></td>
                      <td>{t.doctor}</td>
                      <td className="notes-cell">{t.notes || '—'}</td>
                      <td>{t.cost > 0 ? `₹${Number(t.cost).toLocaleString()}` : '—'}</td>
                      <td><span className="status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="history-total">
            <span>Total amount paid</span>
            <strong>₹{totalSpent.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {/* ── Files & X-rays Tab ── */}
      {activeTab === 'files' && (
        <div className="files-section">
          <div className="files-upload-zone" onClick={() => fileInputRef.current.click()}>
            <div className="upload-icon">📤</div>
            <div className="upload-title">Click to Upload Files</div>
            <div className="upload-sub">X-rays · Reports · Prescriptions · PDFs · Images</div>
            <div className="upload-sub" style={{ marginTop: 6, fontSize: 12 }}>You can select multiple files at once</div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 14 }} onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>
              + Add Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {files.length === 0 ? (
            <div className="files-empty">
              <div style={{ fontSize: 48, marginBottom: 12 }}>🗂️</div>
              <p>No files uploaded yet. Upload X-rays, reports or prescriptions above.</p>
            </div>
          ) : (
            <div className="files-grid">
              {files.map(f => (
                <div key={f.id} className="file-card">
                  <div className="file-preview">
                    {f.preview ? (
                      <img src={f.preview} alt={f.name} className="file-img" />
                    ) : (
                      <div className="file-icon-box">
                        {f.type === 'application/pdf' ? '📄' : '📁'}
                      </div>
                    )}
                    <button className="file-remove" onClick={() => removeFile(f.id)}>✕</button>
                  </div>
                  <div className="file-info">
                    <div className="file-name" title={f.name}>{f.name}</div>
                    <div className="file-meta">{formatSize(f.size)} · {f.date}</div>
                  </div>
                </div>
              ))}

              {/* Add more button */}
              <div className="file-add-more" onClick={() => fileInputRef.current.click()}>
                <div className="add-more-icon">+</div>
                <div className="add-more-label">Add More Files</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Profile Tab ── */}
      {activeTab === 'profile' && (
        <div className="profile-details-grid">
          <div className="admin-card">
            <div style={{ padding: '20px 24px 0' }}><h4 className="detail-section-title">Personal Information</h4></div>
            <div className="detail-rows">
              {[
                ['Full Name', customer.name],
                ['Date of Birth', `${customer.dob} (Age ${age})`],
                ['Gender', customer.gender],
                ['Blood Group', customer.bloodGroup],
                ['Phone', customer.phone],
                ['Email', customer.email],
                ['Address', customer.address],
                ['Registered On', new Date(customer.registeredOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                ['Assigned Doctor', customer.assignedDoctor],
              ].map(([label, val]) => (
                <div className="detail-row" key={label}><span>{label}</span><strong>{val}</strong></div>
              ))}
            </div>
          </div>
          <div className="admin-card">
            <div style={{ padding: '20px 24px 0' }}><h4 className="detail-section-title">Medical Information</h4></div>
            <div className="detail-rows">
              <div className="detail-row"><span>Allergies</span><strong>{customer.allergies.length > 0 ? <span style={{ color: '#dc2626' }}>⚠ {customer.allergies.join(', ')}</span> : 'None reported'}</strong></div>
              <div className="detail-row"><span>Medical History</span><strong>{customer.medicalHistory.length > 0 ? customer.medicalHistory.join(', ') : 'No significant history'}</strong></div>
              <div className="detail-row"><span>Last Visit</span><strong>{new Date(customer.lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
              <div className="detail-row"><span>Total Visits</span><strong>{history.length}</strong></div>
              <div className="detail-row"><span>Total Spent</span><strong style={{ color: '#1d4ed8' }}>₹{totalSpent.toLocaleString()}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Treatment Modal ── */}
      {showAddTreatment && (
        <div className="modal-overlay" onClick={() => setShowAddTreatment(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Treatment Record</h3>
              <button className="modal-close" onClick={() => setShowAddTreatment(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="field-label">Treatment / Service *</label>
                <select className="field-input" value={treatForm.service} onChange={e => setTreatForm(f => ({ ...f, service: e.target.value }))}>
                  <option value="">Select a service</option>
                  {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label className="field-label">Doctor *</label>
                <select className="field-input" value={treatForm.doctor} onChange={e => setTreatForm(f => ({ ...f, doctor: e.target.value }))}>
                  <option value="">Select doctor</option>
                  {doctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="modal-row">
                <div className="modal-field">
                  <label className="field-label">Date *</label>
                  <input type="date" className="field-input" value={treatForm.date} onChange={e => setTreatForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="modal-field">
                  <label className="field-label">Cost (₹)</label>
                  <input type="number" className="field-input" placeholder="0" value={treatForm.cost} onChange={e => setTreatForm(f => ({ ...f, cost: e.target.value }))} />
                </div>
              </div>
              <div className="modal-field">
                <label className="field-label">Status</label>
                <select className="field-input" value={treatForm.status} onChange={e => setTreatForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="completed">Completed</option>
                  <option value="confirmed">Upcoming</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="modal-field">
                <label className="field-label">Doctor's Notes</label>
                <textarea className="field-input field-textarea" placeholder="Treatment notes, observations..." value={treatForm.notes} onChange={e => setTreatForm(f => ({ ...f, notes: e.target.value }))} />
              </div>

              {/* Photo / File Upload */}
              <div className="modal-field">
                <label className="field-label">X-rays / Photos / Reports</label>
                <input
                  ref={treatFileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleTreatFileChange}
                />
                <div className="treat-upload-row">
                  <button
                    type="button"
                    className="treat-upload-btn"
                    onClick={() => treatFileInputRef.current.click()}
                  >
                    <span>📎</span>
                    <span>Attach Files</span>
                  </button>
                  <span className="treat-upload-hint-inline">Images, X-rays, PDFs — multiple allowed</span>
                </div>

                {treatFiles.length > 0 && (
                  <div className="treat-files-grid">
                    {treatFiles.map(f => (
                      <div key={f.id} className="treat-thumb-card">
                        <div className="treat-thumb-preview">
                          {f.preview
                            ? <img src={f.preview} alt={f.name} className="treat-thumb-img" />
                            : <div className="treat-thumb-icon">{f.type === 'application/pdf' ? '📄' : '📁'}</div>
                          }
                          <button className="treat-thumb-remove" onClick={e => { e.stopPropagation(); removeTreatFile(f.id); }}>✕</button>
                        </div>
                        <div className="treat-thumb-name" title={f.name}>{f.name}</div>
                      </div>
                    ))}
                    <div
                      className="treat-thumb-add"
                      onClick={() => treatFileInputRef.current.click()}
                    >
                      <div className="treat-thumb-add-inner">
                        <span>+</span>
                        <span>Add More</span>
                      </div>
                      <div className="treat-thumb-add-label">&nbsp;</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowAddTreatment(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddTreatment} disabled={!treatForm.service || !treatForm.doctor || !treatForm.date}>
                Save Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CustomerDetail;
