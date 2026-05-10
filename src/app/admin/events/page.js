'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  getEvents, addEvent, updateEvent, deleteEvent 
} from '@/lib/fetchData';

// Dynamically import Jodit Editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  // Form States
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    short_desc: '',
    full_desc: '',
    is_active: 1,
    image: null,
    full_image_path: ''
  });

  const fileInputRef = useRef(null);

  // Jodit Config
  const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Write the full details of the event...',
    minHeight: 450,
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|', 'ul', 'ol', '|', 'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'
    ],
    uploader: { insertImageAsBase64URI: true }
  }), []);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getEvents(1); 
      setEvents(data);
    } catch (err) {
      console.error("Refresh Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        ...item,
        is_active: parseInt(item.is_active),
        image: null
      });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        title: '',
        slug: '',
        short_desc: '',
        full_desc: '',
        is_active: 1,
        image: null,
        full_image_path: ''
      });
    }
    setModalOpen(true);
  };

  const handleOpenPreview = (item) => {
    setViewingItem(item);
    setPreviewOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 1 : 0) : value;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: val };
      if (name === 'title' && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))) {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      }
      return newData;
    });
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({ ...prev, full_desc: newContent }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.title) {
        alert("Event Title is required");
        return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        data.append('image', formData[key]);
      } else if (key === 'full_image_path') {
        return;
      } else {
        data.append(key, formData[key]);
      }
    });

    const res = editingItem ? await updateEvent(data) : await addEvent(data);
    if (res.success) {
      setModalOpen(false);
      refreshData();
      alert(editingItem ? "Event updated!" : "Event published!");
    } else {
      alert(res.message || "Operation failed");
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.is_active == 1 ? 0 : 1;
    const data = new FormData();
    data.append('id', item.id);
    data.append('title', item.title);
    data.append('slug', item.slug);
    data.append('is_active', newStatus);
    
    const res = await updateEvent(data);
    if (res.success) refreshData();
    else alert(res.message);
  };

  const handleOpenDelete = (item) => {
    setDeleteModal({ open: true, id: item.id, name: item.title });
  };

  const processDelete = async (mode) => {
    setLoading(true);
    const res = await deleteEvent(deleteModal.id, mode);
    if (res.success) {
      setDeleteModal({ open: false, id: null, name: '' });
      refreshData();
    } else alert(res.message);
    setLoading(false);
  };

  return (
    <div className="admin-page">
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
            <i className="fas fa-calendar-day" />
          </div>
          <div>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>Event Management</h1>
            <p className="admin-page-subtitle" style={{ margin: '5px 0 0', opacity: 0.7 }}>Coordinate institutional seminars, workshops, and official news events.</p>
          </div>
        </div>
        <button 
          className="admin-btn-premium" 
          style={{
            background: 'linear-gradient(135deg, var(--admin-gold) 0%, #b8860b 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px 0 rgba(212, 163, 26, 0.39)'
          }}
          onClick={() => handleOpenModal()}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 163, 26, 0.5)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(212, 163, 26, 0.39)'; }}
        >
          <i className="fas fa-calendar-plus" /> 
          <span>Create New Event</span>
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event Info</th>
              <th>Short Description</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Loading events...</td></tr>
            ) : events.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No events recorded yet.</td></tr>
            ) : (
              events.map(ev => (
                <tr key={ev.id} style={{ opacity: ev.is_active == 1 ? 1 : 0.6 }}>
                  <td>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '50px', height: '50px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        {ev.full_image_path ? (
                          <img src={ev.full_image_path} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : <i className="fas fa-calendar-day" style={{ margin: '15px', color: '#cbd5e1' }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--admin-navy)' }}>{ev.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>/{ev.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ev.short_desc}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${ev.is_active == 1 ? 'active' : 'draft'}`}>
                      {ev.is_active == 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--admin-muted)' }}>{new Date(ev.created_date).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-actions">
                      <a href={`/news-events/${ev.slug}`} target="_blank" className="admin-action-btn edit" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }} title="View Public Page"><i className="fas fa-external-link-alt" /></a>
                      <button className="admin-action-btn edit" style={{ background: 'rgba(212,163,26,0.1)', color: 'var(--admin-gold)' }} onClick={() => handleOpenPreview(ev)} title="Quick Audit"><i className="fas fa-eye" /></button>
                      <button className="admin-action-btn edit" onClick={() => handleOpenModal(ev)} title="Edit"><i className="fas fa-pen" /></button>
                      <button 
                        className={`admin-action-btn ${ev.is_active == 1 ? 'delete' : 'edit'}`} 
                        style={ev.is_active == 0 ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                        onClick={() => handleToggleStatus(ev)} 
                        title={ev.is_active == 1 ? "Inactivate" : "Activate"}
                      >
                        <i className={`fas fa-${ev.is_active == 1 ? 'ban' : 'check-circle'}`} />
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleOpenDelete(ev)} title="Delete Permanent">
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

      {/* EVENT PREVIEW MODAL */}
      <div className={`admin-modal-overlay ${previewOpen ? 'active' : ''}`} onClick={() => setPreviewOpen(false)}>
        <div className="admin-modal" style={{ maxWidth: '850px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={`/news-events/${viewingItem?.slug}`} target="_blank" className="admin-btn admin-btn-primary" style={{ padding: '6px 16px', background: '#3b82f6' }}>
                <i className="fas fa-external-link-alt" /> Live Page
              </a>
              <button className="admin-modal-close" onClick={() => setPreviewOpen(false)}><i className="fas fa-times" /></button>
            </div>
          </div>
          <div className="admin-modal-body">
             {viewingItem?.full_image_path && (
               <img src={viewingItem.full_image_path} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '25px', boxShadow: 'var(--admin-shadow-md)' }} />
             )}
             <h1 style={{ color: 'var(--admin-navy)', fontWeight: 900, marginBottom: '10px' }}>{viewingItem?.title}</h1>
             <p style={{ color: 'var(--admin-muted)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '20px', paddingLeft: '15px', borderLeft: '4px solid var(--admin-gold)' }}>
               {viewingItem?.short_desc}
             </p>
             <div 
               style={{ lineHeight: '1.8', color: '#334155', fontSize: '1.05rem' }} 
               dangerouslySetInnerHTML={{ __html: viewingItem?.full_desc }} 
             />
          </div>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setPreviewOpen(false)}>Close Preview</button>
          </div>
        </div>
      </div>

      {/* CREATE/EDIT MODAL */}
      <div className={`admin-modal-overlay ${modalOpen ? 'active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2 className="admin-modal-title">
              <i className="fas fa-calendar-plus" style={{ color: 'var(--admin-gold)' }} />
              {editingItem ? 'Edit Event Details' : 'Create New Event'}
            </h2>
            <button className="admin-modal-close" onClick={() => setModalOpen(false)}><i className="fas fa-times" /></button>
          </div>
          <form onSubmit={handleSubmit} className="admin-modal-body">
            <div className="modal-grid">
              <div className="modal-main">
                <div className="admin-form-group">
                  <label>Detailed Description</label>
                  <JoditEditor value={formData.full_desc} config={joditConfig} onBlur={handleEditorChange} />
                </div>
              </div>
              <div className="modal-sidebar">
                <div className="admin-form-group">
                  <label>Event Title</label>
                  <input name="title" className="admin-input" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Annual Convocation 2026" />
                </div>
                <div className="admin-form-group">
                  <label>URL Slug</label>
                  <input name="slug" className="admin-input" value={formData.slug} onChange={handleInputChange} required placeholder="event-url-slug" />
                </div>
                <div className="admin-form-group">
                  <label>Brief Summary</label>
                  <textarea name="short_desc" className="admin-textarea" style={{ minHeight: '120px' }} value={formData.short_desc} onChange={handleInputChange} placeholder="A short blurb for event cards..." />
                </div>
                <div className="admin-form-group">
                  <label>Event Banner</label>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={e => setFormData({...formData, image: e.target.files[0]})} />
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '160px', 
                      borderRadius: '12px', 
                      border: '2px dashed var(--admin-border)', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: '#fcfcfc',
                      position: 'relative'
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {formData.image ? (
                      <img src={URL.createObjectURL(formData.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : formData.full_image_path ? (
                      <img src={formData.full_image_path} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <i className="fas fa-image" style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '8px' }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Click to upload banner</span>
                      </>
                    )}
                    {(formData.image || formData.full_image_path) && (
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>
                        <i className="fas fa-sync" /> Change
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" name="is_active" checked={formData.is_active === 1} onChange={handleInputChange} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--admin-navy)' }}>Mark as Active Event</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-btn admin-btn-gold" onClick={handleSubmit}>
              <i className="fas fa-save" /> {editingItem ? 'Save Changes' : 'Publish Event'}
            </button>
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
              You are about to delete the event <strong>"{deleteModal.name}"</strong>. <br/> Permanent deletion will also remove the banner image.
            </p>
          </div>
          <div className="admin-modal-footer" style={{ borderTop: 'none', flexDirection: 'column', gap: '10px', padding: '20px 40px 40px' }}>
            <button className="admin-btn admin-btn-gold" style={{ width: '100%', padding: '12px' }} onClick={() => processDelete('soft')}>
              <i className="fas fa-ban" /> Just Inactivate (Safe)
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
