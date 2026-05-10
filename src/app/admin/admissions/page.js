'use client';
import { useState, useEffect } from 'react';
import { 
  getAdmissions, updateAdmissionStatus, deleteAdmission 
} from '@/lib/fetchData';

export default function AdmissionsManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewingItem, setViewingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  useEffect(() => {
    refreshData();
  }, [filter]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getAdmissions(filter);
      setInquiries(data);
    } catch (err) {
      console.error("Refresh Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInquiry = async (item) => {
    setViewingItem(item);
    setModalOpen(true);
    // Auto-mark as read if unread
    if (item.is_read == 0) {
      const res = await updateAdmissionStatus({ id: item.id, is_read: 1 });
      if (res.success) refreshData();
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    const res = await updateAdmissionStatus({ id, status: newStatus });
    if (res.success) refreshData();
    else alert(res.message);
  };

  const handleToggleRead = async (item) => {
    const newStatus = item.is_read == 1 ? 0 : 1;
    const res = await updateAdmissionStatus({ id: item.id, is_read: newStatus });
    if (res.success) refreshData();
    else alert(res.message);
  };

  const handleOpenDelete = (item) => {
    setDeleteModal({ open: true, id: item.id, name: item.name });
  };

  const processDelete = async (mode) => {
    setLoading(true);
    const res = await deleteAdmission(deleteModal.id, mode);
    if (res.success) {
      setDeleteModal({ open: false, id: null, name: '' });
      refreshData();
    } else alert(res.message);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'enrolled': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a' };
      case 'contacted': return { bg: 'rgba(212, 163, 26, 0.1)', text: '#b8860b' };
      default: return { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748b' };
    }
  };

  return (
    <div className="admin-page">
      {/* PREMIUM HEADER */}
      <div className="admin-page-header" style={{ 
        background: 'linear-gradient(to right, #ffffff, #f8fafc)', 
        padding: '30px', 
        borderRadius: '20px', 
        border: '1px solid #e2e8f0',
        marginBottom: '30px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--admin-gold)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(212, 163, 26, 0.3)'
          }}>
            <i className="fas fa-user-graduate" />
          </div>
          <div>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>Admission Leads</h1>
            <p className="admin-page-subtitle" style={{ margin: '5px 0 0', opacity: 0.7 }}>Track prospective students through the enrollment funnel from inquiry to admission.</p>
          </div>
        </div>
        
        {/* FILTERS */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '6px', borderRadius: '12px', gap: '4px' }}>
          {['all', 'pending', 'contacted', 'enrolled', 'inactive'].map(f => (
            <button 
              key={f}
              className={`admin-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              style={filter === f ? styles.activeFilter : styles.filter}
            >
              {f === 'inactive' ? 'Archived' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Applied Course</th>
              <th>Current Status</th>
              <th>Date Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Syncing student leads...</td></tr>
            ) : inquiries.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No inquiries found in this category.</td></tr>
            ) : (
              inquiries.map(item => (
                <tr key={item.id} style={{ opacity: item.status === 'enrolled' ? 0.7 : 1, transition: '0.3s' }}>
                  <td>
                    <div style={{ fontWeight: item.is_read == 0 ? 900 : 700, color: 'var(--admin-navy)' }}>
                      {item.name} {item.is_read == 0 && <span style={{ color: 'var(--admin-gold)', fontSize: '1.2rem' }}>•</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{item.email} | {item.phone}</div>
                  </td>
                  <td>
                    <span className="admin-badge" style={{ background: '#f1f5f9', color: 'var(--admin-navy)', fontWeight: 700 }}>
                      {item.course}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select 
                        value={item.status} 
                        onChange={(e) => handleChangeStatus(item.id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          outline: 'none',
                          ...getStatusColor(item.status) === null ? {} : {
                            background: getStatusColor(item.status).bg,
                            color: getStatusColor(item.status).text
                          }
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                      </select>
                      <span className={`admin-badge ${item.is_read == 1 ? 'active' : 'draft'}`} style={{ fontSize: '0.7rem' }}>
                        {item.is_read == 1 ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--admin-muted)' }}>{new Date(item.created_at).toLocaleString()}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn edit" style={{ background: 'rgba(212,163,26,0.1)', color: 'var(--admin-gold)' }} onClick={() => handleOpenInquiry(item)} title="Audit Inquiry"><i className="fas fa-eye" /></button>
                      <button 
                        className={`admin-action-btn ${item.is_read == 1 ? 'delete' : 'edit'}`} 
                        style={item.is_read == 1 ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                        onClick={() => handleToggleRead(item)} 
                        title={item.is_read == 1 ? "Mark as Unread" : "Mark as Read"}
                      >
                        <i className={`fas fa-${item.is_read == 1 ? 'envelope' : 'envelope-open'}`} />
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleOpenDelete(item)} title="Purge Record">
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW INQUIRY MODAL */}
      <div className={`admin-modal-overlay ${modalOpen ? 'active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="admin-modal" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header" style={{ background: 'var(--admin-navy)', color: '#fff' }}>
            <h2 className="admin-modal-title" style={{ color: '#fff' }}><i className="fas fa-user-graduate" /> Student Inquiry Details</h2>
            <button className="admin-modal-close" onClick={() => setModalOpen(false)} style={{ color: '#fff' }}><i className="fas fa-times" /></button>
          </div>
          <div className="admin-modal-body" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
              <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--admin-gold)', border: '2px solid #e2e8f0' }}>
                {viewingItem?.name[0]}
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--admin-navy)' }}>{viewingItem?.name}</div>
                <div style={{ color: 'var(--admin-muted)' }}>{viewingItem?.email}</div>
                <div style={{ fontWeight: 600, color: 'var(--admin-gold)' }}>{viewingItem?.phone}</div>
              </div>
            </div>

            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', textTransform: 'uppercase' }}>Applied For</div>
                <div style={{ fontWeight: 700, color: 'var(--admin-navy)' }}>{viewingItem?.course}</div>
              </div>
              <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', textTransform: 'uppercase' }}>Current Pipeline</div>
                <div style={{ fontWeight: 700, color: getStatusColor(viewingItem?.status).text }}>{viewingItem?.status.toUpperCase()}</div>
              </div>
            </div>

            <div style={{ padding: '20px', background: '#fdfdfd', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Background / Message</div>
              <div style={{ lineHeight: '1.7', color: '#334155' }}>{viewingItem?.message || 'No additional details provided by student.'}</div>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setModalOpen(false)}>Close Audit</button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={`tel:${viewingItem?.phone}`} className="admin-btn" style={{ background: '#10b981', color: '#fff', textDecoration: 'none' }}><i className="fas fa-phone" /> Call</a>
              <a href={`mailto:${viewingItem?.email}`} className="admin-btn admin-btn-gold" style={{ textDecoration: 'none' }}><i className="fas fa-reply" /> Email Reply</a>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <div className={`admin-modal-overlay ${deleteModal.open ? 'active' : ''}`} onClick={() => setDeleteModal({ ...deleteModal, open: false })}>
        <div className="admin-modal" style={{ maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <h2 className="admin-modal-title" style={{ color: 'var(--admin-danger)' }}><i className="fas fa-exclamation-triangle" /> Confirm Deletion</h2>
            <button className="admin-modal-close" onClick={() => setDeleteModal({ ...deleteModal, open: false })}><i className="fas fa-times" /></button>
          </div>
          <div className="admin-modal-body" style={{ textAlign: 'center', padding: '30px 40px' }}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--admin-danger)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem' }}>
              <i className="fas fa-trash-alt" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--admin-navy)', marginBottom: '10px' }}>Are you sure?</h3>
            <p style={{ color: 'var(--admin-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              You are about to delete the lead for <strong>"{deleteModal.name}"</strong>.
            </p>
          </div>
          <div className="admin-modal-footer" style={{ borderTop: 'none', flexDirection: 'column', gap: '10px', padding: '20px 40px 40px' }}>
            <button className="admin-btn admin-btn-gold" style={{ width: '100%', padding: '12px' }} onClick={() => processDelete('soft')}>
              <i className="fas fa-archive" /> Just Archive (Safe)
            </button>
            <button className="admin-btn" style={{ width: '100%', padding: '12px', background: 'var(--admin-danger)', color: '#fff' }} onClick={() => processDelete('hard')}>
              <i className="fas fa-trash" /> Delete Forever (Permanent)
            </button>
            <button className="admin-btn admin-btn-ghost" style={{ width: '100%' }} onClick={() => setDeleteModal({ ...deleteModal, open: false })}>
              Keep it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  filter: {
    padding: '8px 20px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '8px',
    transition: '0.2s'
  },
  activeFilter: {
    padding: '8px 20px',
    border: 'none',
    background: '#fff',
    color: 'var(--admin-navy)',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: '0.2s'
  }
};
