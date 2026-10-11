import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { doctors as initialDoctors } from '../../data/mockData';
import './Admin.css';
import './CustomerDetail.css';
import './Doctors.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };

function fmt12(totalMins) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
}

function generate45MinSlots(startTime, endTime) {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  const slots = [];
  let cur = startMins;
  while (cur + 45 <= endMins) {
    slots.push({ id: `slot-${cur}`, from: cur, to: cur + 45, blocked: false });
    cur += 45;
  }
  return slots;
}

const initDoctors = initialDoctors.map(d => ({
  ...d,
  dayMap: Object.fromEntries(
    d.availableDays.map(day => {
      const abbr = DAYS.find(a => DAY_FULL[a] === day) || day.slice(0, 3);
      return [abbr, { startTime: '09:00', endTime: '18:00', slots: generate45MinSlots('09:00', '18:00') }];
    })
  ),
}));

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState(initDoctors);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [activeDay, setActiveDay] = useState({});

  const toggleDay = (doctorId, abbr) => {
    setDoctors(prev => prev.map(d => {
      if (d.id !== doctorId) return d;
      const map = { ...d.dayMap };
      if (map[abbr]) {
        delete map[abbr];
        if (activeDay[doctorId] === abbr) setActiveDay(p => ({ ...p, [doctorId]: null }));
      } else {
        map[abbr] = { startTime: '09:00', endTime: '18:00', slots: generate45MinSlots('09:00', '18:00') };
      }
      return { ...d, dayMap: map };
    }));
  };

  const selectDay = (doctorId, abbr) => {
    setActiveDay(p => ({ ...p, [doctorId]: p[doctorId] === abbr ? null : abbr }));
  };

  const updateTime = (doctorId, abbr, key, val) => {
    setDoctors(prev => prev.map(d => {
      if (d.id !== doctorId) return d;
      const entry = d.dayMap[abbr];
      if (!entry) return d;
      const updated = { ...entry, [key]: val };
      updated.slots = generate45MinSlots(updated.startTime, updated.endTime);
      return { ...d, dayMap: { ...d.dayMap, [abbr]: updated } };
    }));
  };

  const toggleSlot = (doctorId, abbr, slotId) => {
    setDoctors(prev => prev.map(d => {
      if (d.id !== doctorId) return d;
      const entry = d.dayMap[abbr];
      if (!entry) return d;
      return {
        ...d,
        dayMap: {
          ...d.dayMap,
          [abbr]: { ...entry, slots: entry.slots.map(s => s.id === slotId ? { ...s, blocked: !s.blocked } : s) },
        },
      };
    }));
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Doctors & Slot Management</h1>
          <p>Set working days and manage 45-minute appointment slots per doctor</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {doctors.map(d => {
          const activeDays = Object.keys(d.dayMap);
          const totalActive = activeDays.reduce((a, k) => a + d.dayMap[k].slots.filter(s => !s.blocked).length, 0);
          const selDay = activeDay[d.id];
          const selEntry = selDay ? d.dayMap[selDay] : null;

          return (
            <div key={d.id} className="admin-card">
              {/* Doctor header */}
              <div className="doctor-slot-header" onClick={() => setExpandedDoctor(expandedDoctor === d.id ? null : d.id)}>
                <div className="table-name">
                  <div className="table-avatar" style={{ background: `${d.color}20`, color: d.color }}>{d.initials}</div>
                  <div>
                    <div className="table-name-main">{d.name}</div>
                    <div className="table-name-sub">{d.specialization}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="badge badge-blue">{activeDays.length} days/week</span>
                  <span className="badge badge-green">{totalActive} slots/week</span>
                  <span style={{ fontSize: 20, color: '#94a3b8', transition: 'transform 0.2s', transform: expandedDoctor === d.id ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
              </div>

              {expandedDoctor === d.id && (
                <div className="slots-panel">

                  {/* Week day chips */}
                  <div className="week-days-row">
                    <span className="week-days-label">Working Days</span>
                    <div className="week-chips">
                      {DAYS.map(abbr => {
                        const on = !!d.dayMap[abbr];
                        const sel = selDay === abbr;
                        return (
                          <div key={abbr} className={`day-chip-wrap ${sel ? 'selected' : ''}`}>
                            <button
                              className={`day-chip ${on ? 'on' : 'off'} ${sel ? 'sel' : ''}`}
                              onClick={() => {
                                if (!on) toggleDay(d.id, abbr);
                                else selectDay(d.id, abbr);
                              }}
                              title={on ? `${DAY_FULL[abbr]} — click to configure` : `Click to enable ${DAY_FULL[abbr]}`}
                            >
                              {abbr}
                            </button>
                            {on && (
                              <button className="day-chip-remove" title="Remove this day" onClick={e => { e.stopPropagation(); toggleDay(d.id, abbr); }}>✕</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <span className="week-days-hint">Click a day to configure · ✕ to remove</span>
                  </div>

                  {/* Day detail panel */}
                  {selDay && selEntry && (
                    <div className="day-detail-panel">
                      <div className="day-detail-header">
                        <span className="day-detail-title">📅 {DAY_FULL[selDay]}</span>
                        <div className="day-detail-times">
                          <label className="slot-label">Start</label>
                          <input type="time" className="slot-input" value={selEntry.startTime} onChange={e => updateTime(d.id, selDay, 'startTime', e.target.value)} />
                          <span style={{ color: '#94a3b8', padding: '0 4px' }}>→</span>
                          <label className="slot-label">End</label>
                          <input type="time" className="slot-input" value={selEntry.endTime} onChange={e => updateTime(d.id, selDay, 'endTime', e.target.value)} />
                          <span className="badge badge-blue" style={{ marginLeft: 8 }}>
                            {selEntry.slots.filter(s => !s.blocked).length} / {selEntry.slots.length} slots active
                          </span>
                        </div>
                      </div>

                      <div className="day-slots-hint">Click a slot to block it · click again to restore</div>
                      <div className="slots-pill-grid">
                        {selEntry.slots.length === 0 ? (
                          <span style={{ color: '#94a3b8', fontSize: 13 }}>No slots in this range — adjust start/end time.</span>
                        ) : selEntry.slots.map(sl => (
                          <button
                            key={sl.id}
                            className={`slot-pill ${sl.blocked ? 'blocked' : 'active'}`}
                            onClick={() => toggleSlot(d.id, selDay, sl.id)}
                          >
                            {fmt12(sl.from)} – {fmt12(sl.to)}
                            {sl.blocked && <span className="slot-pill-x">✕</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!selDay && activeDays.length > 0 && (
                    <div className="day-prompt">Select a working day above to configure its time slots</div>
                  )}

                  <div className="slots-save-row" style={{ marginTop: 16 }}>
                    <span style={{ fontSize: 13, color: '#64748b' }}>
                      Total: <strong style={{ color: '#1d4ed8' }}>{totalActive}</strong> active slots/week across {activeDays.length} days
                    </span>
                    <button className="btn btn-primary btn-sm">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;
