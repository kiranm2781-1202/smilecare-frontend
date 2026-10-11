import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { customers as initialCustomers, treatmentHistory, doctors } from '../../data/mockData';
import './Admin.css';
import './CustomerDetail.css';
import './Customers.css';

const emptyForm = { name: '', phone: '', email: '', dob: '', gender: 'Male', address: '', bloodGroup: 'O+', allergies: '', medicalHistory: '', assignedDoctor: '' };
const emptyRx = { medicine: '', dosage: '', frequency: 'Twice daily', duration: '', instructions: '' };

const FREQUENCIES = ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'Every 6 hours', 'Every 8 hours', 'Every 12 hours', 'As needed (SOS)', 'Before food', 'After food', 'At bedtime'];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [filterDoc, setFilterDoc] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [prescriptions, setPrescriptions] = useState([{ ...emptyRx, id: 1 }]);
  const [activeSection, setActiveSection] = useState('personal');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [saved, setSaved] = useState(false);
  const photoInputRef = useRef();

  const docList = ['All', ...new Set(customers.map(c => c.assignedDoctor))];

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
    const matchDoc = filterDoc === 'All' || c.assignedDoctor === filterDoc;
    return matchSearch && matchDoc;
  });

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addRxRow = () => setPrescriptions(prev => [...prev, { ...emptyRx, id: Date.now() }]);
  const removeRxRow = (id) => setPrescriptions(prev => prev.filter(r => r.id !== id));
  const updateRx = (id, key, val) => setPrescriptions(prev => prev.map(r => r.id === id ? { ...r, [key]: val } : r));

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    const newCustomer = {
      id: Date.now(),
      ...form,
      allergies: form.allergies ? form.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
      medicalHistory: form.medicalHistory ? form.medicalHistory.split(',').map(s => s.trim()).filter(Boolean) : [],
      prescriptions: prescriptions.filter(r => r.medicine),
      registeredOn: new Date().toISOString().split('T')[0],
      lastVisit: new Date().toISOString().split('T')[0],
      totalVisits: 0,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setForm(emptyForm);
    setPrescriptions([{ ...emptyRx, id: 1 }]);
    setActiveSection('personal');
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowAdd(false); }, 1800);
  };

  const handlePhotoChange = (e) => {
    const newFiles = Array.from(e.target.files).map(f => ({
      id: Date.now() + Math.random(), file: f, name: f.name, size: f.size, type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };
  const removePhoto = (id) => setUploadedFiles(prev => prev.filter(f => f.id !== id));
  const formatSize = (b) => b < 1024 * 1024 ? `${(b/1024).toFixed(0)} KB` : `${(b/(1024*1024)).toFixed(1)} MB`;

  const openAdd = () => {
    setForm(emptyForm);
    setPrescriptions([{ ...emptyRx, id: 1 }]);
    setUploadedFiles([]);
    setActiveSection('personal');
    setSaved(false);
    setShowAdd(true);
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div><h1>Customer Records</h1><p>{customers.length} registered customers</p></div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add New Customer</button>
      </div>

      <div className="admin-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search by name, phone or email..." value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <select className="filter-select" value={filterDoc} onChange={e => setFilterDoc(e.target.value)}>
          {docList.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {filtered.length === 0 ? (
          <div className="empty-table">No customers found{search ? ` for "${search}"` : ''}.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Customer</th><th>Contact</th><th>Blood Group</th><th>Assigned Doctor</th><th>Last Visit</th><th>Visits</th><th>Alerts</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const history = treatmentHistory[c.id] || [];
                const upcoming = history.filter(h => h.status === 'confirmed').length;
                return (
                  <tr key={c.id}>
                    <td>
                      <div className="table-name">
                        <div className="table-avatar">{c.name[0]}</div>
                        <div>
                          <div className="table-name-main">{c.name}</div>
                          <div className="table-name-sub">Since {new Date(c.registeredOn).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
                        </div>
                      </div>
                    </td>
                    <td><div className="table-name-main">{c.phone}</div><div className="table-name-sub">{c.email}</div></td>
                    <td><span className="badge badge-amber">{c.bloodGroup}</span></td>
                    <td>{c.assignedDoctor}</td>
                    <td>{new Date(c.lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td><span className="badge badge-blue">{c.totalVisits}</span></td>
                    <td>
                      {c.allergies.length > 0 && <span className="alert-tag">⚠ Allergy</span>}
                      {c.medicalHistory.length > 0 && <span className="alert-tag medical">🏥 Medical</span>}
                      {upcoming > 0 && <span className="alert-tag upcoming">📅 Upcoming</span>}
                    </td>
                    <td><Link to={`/admin/customers/${c.id}`} className="btn btn-primary btn-sm">View History</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Add New Customer Modal ── */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-box" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Customer</h3>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>

            {saved ? (
              <div style={{ padding: 56, textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#059669', fontSize: 22 }}>Customer Added Successfully!</h3>
                <p style={{ color: '#64748b', marginTop: 8 }}>Patient record has been created.</p>
              </div>
            ) : (
              <>
                {/* Section Tabs */}
                <div className="cust-modal-tabs">
                  {[
                    { key: 'personal', icon: '👤', label: 'Personal Info' },
                    { key: 'medical', icon: '🏥', label: 'Medical Info' },
                    { key: 'prescription', icon: '💊', label: 'Prescription' },
                    { key: 'photos', icon: '📁', label: 'Photos & Files' },
                  ].map(t => (
                    <button
                      key={t.key}
                      className={`cust-modal-tab ${activeSection === t.key ? 'active' : ''}`}
                      onClick={() => setActiveSection(t.key)}
                    >
                      <span>{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                <div className="modal-body">

                  {/* ── Personal Info ── */}
                  {activeSection === 'personal' && (
                    <>
                      <div className="modal-row">
                        <div className="modal-field"><label className="field-label">Full Name *</label><input className="field-input" placeholder="e.g. Kavitha Reddy" value={form.name} onChange={e => setF('name', e.target.value)} /></div>
                        <div className="modal-field"><label className="field-label">Phone *</label><input className="field-input" placeholder="+91 98410 00000" value={form.phone} onChange={e => setF('phone', e.target.value)} /></div>
                      </div>
                      <div className="modal-row">
                        <div className="modal-field"><label className="field-label">Email</label><input className="field-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => setF('email', e.target.value)} /></div>
                        <div className="modal-field"><label className="field-label">Date of Birth</label><input className="field-input" type="date" value={form.dob} onChange={e => setF('dob', e.target.value)} /></div>
                      </div>
                      <div className="modal-row">
                        <div className="modal-field">
                          <label className="field-label">Gender</label>
                          <select className="field-input" value={form.gender} onChange={e => setF('gender', e.target.value)}>
                            <option>Male</option><option>Female</option><option>Other</option>
                          </select>
                        </div>
                        <div className="modal-field">
                          <label className="field-label">Blood Group</label>
                          <select className="field-input" value={form.bloodGroup} onChange={e => setF('bloodGroup', e.target.value)}>
                            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="modal-field"><label className="field-label">Address</label><textarea className="field-input field-textarea" style={{ minHeight: 72 }} placeholder="Full address including city and pincode" value={form.address} onChange={e => setF('address', e.target.value)} /></div>
                      <div className="modal-field">
                        <label className="field-label">Assigned Doctor</label>
                        <select className="field-input" value={form.assignedDoctor} onChange={e => setF('assignedDoctor', e.target.value)}>
                          <option value="">Select doctor</option>
                          {doctors.map(d => <option key={d.id} value={d.name}>{d.name} — {d.specialization}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {/* ── Medical Info ── */}
                  {activeSection === 'medical' && (
                    <>
                      <div className="modal-field">
                        <label className="field-label">⚠️ Allergies <span style={{ color: '#94a3b8', fontWeight: 400 }}>(comma separated)</span></label>
                        <input className="field-input" placeholder="e.g. Penicillin, Latex, Aspirin" value={form.allergies} onChange={e => setF('allergies', e.target.value)} />
                        <span className="field-hint">Leave blank if none</span>
                      </div>
                      <div className="modal-field">
                        <label className="field-label">🏥 Medical History <span style={{ color: '#94a3b8', fontWeight: 400 }}>(comma separated)</span></label>
                        <textarea className="field-input field-textarea" style={{ minHeight: 80 }} placeholder="e.g. Diabetes, Hypertension, Heart condition" value={form.medicalHistory} onChange={e => setF('medicalHistory', e.target.value)} />
                        <span className="field-hint">List any existing conditions the dentist should know</span>
                      </div>
                      <div className="modal-row">
                        <div className="modal-field">
                          <label className="field-label">Current Medications</label>
                          <textarea className="field-input field-textarea" style={{ minHeight: 72 }} placeholder="e.g. Metformin 500mg, Amlodipine 5mg" />
                        </div>
                        <div className="modal-field">
                          <label className="field-label">Previous Dental Issues</label>
                          <textarea className="field-input field-textarea" style={{ minHeight: 72 }} placeholder="e.g. Root canal on #36, Implant on #46" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── Prescription ── */}
                  {activeSection === 'prescription' && (
                    <>
                      <div className="rx-header-row">
                        <div>
                          <div className="field-label" style={{ margin: 0 }}>💊 Prescription</div>
                          <div className="field-hint">Add medicines prescribed to this patient</div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={addRxRow}>+ Add Medicine</button>
                      </div>

                      {prescriptions.length === 0 ? (
                        <div className="rx-empty">No medicines added yet. Click "+ Add Medicine" to start.</div>
                      ) : (
                        <div className="rx-list">
                          {prescriptions.map((rx, idx) => (
                            <div key={rx.id} className="rx-card">
                              <div className="rx-card-header">
                                <span className="rx-num">💊 Medicine {idx + 1}</span>
                                {prescriptions.length > 1 && (
                                  <button className="rx-remove" onClick={() => removeRxRow(rx.id)}>✕ Remove</button>
                                )}
                              </div>
                              <div className="modal-row">
                                <div className="modal-field" style={{ flex: 2 }}>
                                  <label className="field-label">Medicine Name *</label>
                                  <input className="field-input" placeholder="e.g. Amoxicillin, Ibuprofen" value={rx.medicine} onChange={e => updateRx(rx.id, 'medicine', e.target.value)} />
                                </div>
                                <div className="modal-field">
                                  <label className="field-label">Dosage</label>
                                  <input className="field-input" placeholder="e.g. 500mg" value={rx.dosage} onChange={e => updateRx(rx.id, 'dosage', e.target.value)} />
                                </div>
                              </div>
                              <div className="modal-row">
                                <div className="modal-field">
                                  <label className="field-label">Frequency</label>
                                  <select className="field-input" value={rx.frequency} onChange={e => updateRx(rx.id, 'frequency', e.target.value)}>
                                    {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                                  </select>
                                </div>
                                <div className="modal-field">
                                  <label className="field-label">Duration</label>
                                  <input className="field-input" placeholder="e.g. 5 days, 1 week" value={rx.duration} onChange={e => updateRx(rx.id, 'duration', e.target.value)} />
                                </div>
                              </div>
                              <div className="modal-field">
                                <label className="field-label">Special Instructions</label>
                                <input className="field-input" placeholder="e.g. Take after food, Avoid alcohol" value={rx.instructions} onChange={e => updateRx(rx.id, 'instructions', e.target.value)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Photos & Files ── */}
                  {activeSection === 'photos' && (
                    <>
                      <input ref={photoInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handlePhotoChange} />
                      <div className="field-label">📁 Upload X-rays, Photos & Reports</div>
                      <div className="field-hint" style={{ marginBottom: 12 }}>Attach any X-rays, scans, reports or photos for this patient</div>

                      <div className="treat-upload-row">
                        <button type="button" className="treat-upload-btn" onClick={() => photoInputRef.current.click()}>
                          <span>📎</span><span>Attach Files</span>
                        </button>
                        <span className="treat-upload-hint-inline">Images, X-rays, PDFs — multiple files allowed</span>
                      </div>

                      {uploadedFiles.length === 0 ? (
                        <div className="rx-empty" style={{ marginTop: 16 }}>No files attached yet.</div>
                      ) : (
                        <div className="treat-files-grid" style={{ marginTop: 16 }}>
                          {uploadedFiles.map(f => (
                            <div key={f.id} className="treat-thumb-card">
                              <div className="treat-thumb-preview">
                                {f.preview
                                  ? <img src={f.preview} alt={f.name} className="treat-thumb-img" />
                                  : <div className="treat-thumb-icon">{f.type === 'application/pdf' ? '📄' : '📁'}</div>
                                }
                                <button className="treat-thumb-remove" onClick={() => removePhoto(f.id)}>✕</button>
                              </div>
                              <div className="treat-thumb-name" title={f.name}>{f.name}</div>
                            </div>
                          ))}
                          <div className="treat-thumb-add" onClick={() => photoInputRef.current.click()}>
                            <div className="treat-thumb-add-inner"><span>+</span><span>Add More</span></div>
                            <div className="treat-thumb-add-label">&nbsp;</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>

                <div className="modal-footer">
                  <div className="modal-footer-nav">
                    {activeSection !== 'personal' && (
                      <button className="btn btn-outline btn-sm" onClick={() => {
                        const order = ['personal','medical','prescription','photos'];
                        setActiveSection(order[order.indexOf(activeSection) - 1]);
                      }}>← Back</button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                    {activeSection !== 'photos' ? (
                      <button className="btn btn-primary" onClick={() => {
                        const order = ['personal','medical','prescription','photos'];
                        setActiveSection(order[order.indexOf(activeSection) + 1]);
                      }}>
                        Next →
                      </button>
                    ) : (
                      <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.phone}>
                        ✓ Save Customer
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Customers;
