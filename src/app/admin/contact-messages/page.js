'use client';
import { useState, useEffect } from 'react';
import { 
  getContactMessages, updateMessageStatus, deleteMessage 
} from '@/lib/fetchData';

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
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
      const data = await getContactMessages(filter);
      setMessages(data);
    } catch (err) {
      console.error("Refresh Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMessage = async (msg) => {
    setViewingItem(msg);
    setModalOpen(true);
    // Auto-mark as read if unread
    if (msg.is_read == 0) {
      const res = await updateMessageStatus(msg.id, 1);
      if (res.success) refreshData();
    }
  };

  const handleToggleRead = async (msg) => {
    const newStatus = msg.is_read == 1 ? 0 : 1;
    const res = await updateMessageStatus(msg.id, newStatus);
    if (res.success) refreshData();
    else alert(res.message);
  };

  const handleOpenDelete = (msg) => {
    setDeleteModal({ open: true, id: msg.id, name: msg.name });
  };

  const processDelete = async (mode) => {
    setLoading(true);
    const res = await deleteMessage(deleteModal.id, mode);
    if (res.success) {
      setDeleteModal({ open: false, id: null, name: '' });
      refreshData();
    } else alert(res.message);
    setLoading(false);
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
            <i className="fas fa-envelope-open-text" />
          </div>
          <div>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>Inquiry Inbox</h1>
            <p className="admin-page-subtitle" style={{ margin: '5px 0 0', opacity: 0.7 }}>Manage student inquiries, contact messages, and communication logs.</p>
          </div>
        </div>
        
        {/* FILTERS */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '6px', borderRadius: '12px', gap: '4px' }}>
          <button 
            className={`admin-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            style={filter === 'all' ? styles.activeFilter : styles.filter}
          >All</button>
          <button 
            className={`admin-filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
            style={filter === 'unread' ? styles.activeFilter : styles.filter}
          >Unread</button>
          <button 
            className={`admin-filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
            style={filter === 'read' ? styles.activeFilter : styles.filter}
          >Read</button>
          <button 
            className={`admin-filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
            style={filter === 'inactive' ? styles.activeFilter : styles.filter}
          >Archived</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sender Info</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Received Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Loading inquiries...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No messages in this category.</td></tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} style={{ opacity: msg.is_read == 1 ? 0.7 : 1, transition: '0.3s' }}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--admin-navy)' }}>{msg.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{msg.email} | {msg.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{msg.subject}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {msg.message}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${msg.is_read == 1 ? 'active' : 'draft'}`}>
                      {msg.is_read == 1 ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--admin-muted)' }}>{new Date(msg.created_at).toLocaleString()}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn edit" style={{ background: 'rgba(212,163,26,0.1)', color: 'var(--admin-gold)' }} onClick={() => handleOpenMessage(msg)} title="Read Message"><i className="fas fa-eye" /></button>
                      <button 
                        className={`admin-action-btn ${msg.is_read == 1 ? 'delete' : 'edit'}`} 
                        style={msg.is_read == 1 ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                        onClick={() => handleToggleRead(msg)} 
                        title={msg.is_read == 1 ? "Mark as Unread" : "Mark as Read"}
                      >
                        <i className={`fas fa-${msg.is_read == 1 ? 'envelope' : 'envelope-open'}`} />
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleOpenDelete(msg)} title="Delete Permanent">
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

      {/* VIEW MESSAGE MODAL */}
      <div className={`admin-modal-overlay ${modalOpen ? 'active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="admin-modal" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header" style={{ background: 'var(--admin-navy)', color: '#fff' }}>
            <h2 className="admin-modal-title" style={{ color: '#fff' }}><i className="fas fa-envelope-open" /> Message Details</h2>
            <button className="admin-modal-close" onClick={() => setModalOpen(false)} style={{ color: '#fff' }}><i className="fas fa-times" /></button>
          </div>
          <div className="admin-modal-body" style={{ padding: '30px' }}>
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--admin-navy)' }}>{viewingItem?.name}</div>
              <div style={{ color: 'var(--admin-gold)', fontWeight: 600 }}>{viewingItem?.email} <span style={{ color: '#cbd5e1' }}>|</span> {viewingItem?.phone}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</div>
              <div style={{ fontWeight: 700, color: 'var(--admin-navy)' }}>{viewingItem?.subject}</div>
            </div>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '150px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Message</div>
              <div style={{ lineHeight: '1.7', color: '#334155' }}>{viewingItem?.message}</div>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setModalOpen(false)}>Back to Inbox</button>
            <a href={`mailto:${viewingItem?.email}`} className="admin-btn admin-btn-gold" style={{ textDecoration: 'none' }}>
              <i className="fas fa-reply" /> Reply via Email
            </a>
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
              You are about to delete the message from <strong>"{deleteModal.name}"</strong>.
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
