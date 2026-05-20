'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  getFaculty, addFaculty, updateFaculty, deleteFaculty 
} from '@/lib/fetchData';

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  // Form States
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    qualification: '',
    designation: 'Assistant Professor',
    experience: '',
    department: 'management',
    sort_order: 0,
    is_active: 1,
    image_url: '',
    image: null
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getFaculty(1); // load all records including inactive
      setFaculty(data);
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
        id: item.id,
        name: item.name,
        qualification: item.qualification || '',
        designation: item.designation || 'Assistant Professor',
        experience: item.experience || '',
        department: item.department || 'management',
        sort_order: parseInt(item.sort_order) || 0,
        is_active: parseInt(item.is_active),
        image_url: item.image && item.image.startsWith('http') ? item.image : '',
        image: null
      });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        name: '',
        qualification: '',
        designation: 'Assistant Professor',
        experience: '',
        department: 'management',
        sort_order: 0,
        is_active: 1,
        image_url: '',
        image: null
      });
    }
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 1 : 0) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.name) {
        alert("Faculty Name is required");
        return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        data.append('image', formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    const res = editingItem ? await updateFaculty(data) : await addFaculty(data);
    if (res.success) {
      setModalOpen(false);
      refreshData();
      alert(editingItem ? "Faculty profile updated!" : "Faculty profile added!");
    } else {
      alert(res.message || "Operation failed");
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.is_active == 1 ? 0 : 1;
    const data = new FormData();
    data.append('id', item.id);
    data.append('name', item.name);
    data.append('is_active', newStatus);
    
    const res = await updateFaculty(data);
    if (res.success) refreshData();
    else alert(res.message);
  };

  const handleOpenDelete = (item) => {
    setDeleteModal({ open: true, id: item.id, name: item.name });
  };

  const processDelete = async (mode) => {
    setLoading(true);
    const res = await deleteFaculty(deleteModal.id, mode);
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
            <i className="fas fa-chalkboard-teacher" />
          </div>
          <div>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>Faculty Management</h1>
            <p className="admin-page-subtitle" style={{ margin: '5px 0 0', opacity: 0.7 }}>Manage and coordinate distinguished IMS faculty members and lecturers.</p>
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
        >
          <i className="fas fa-user-plus" /> 
          <span>Add Faculty Member</span>
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Faculty Info</th>
              <th>Department</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Sort Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>Loading faculty members...</td></tr>
            ) : faculty.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>No faculty profiles found.</td></tr>
            ) : (
              faculty.map(mem => (
                <tr key={mem.id} style={{ opacity: mem.is_active == 1 ? 1 : 0.6 }}>
                  <td>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: '#f1f5f9', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        border: '2px solid #e2e8f0',
                        flexShrink: 0
                      }}>
                        {mem.image_url ? (
                          <img src={mem.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : <i className="fas fa-user" style={{ margin: '15px', color: '#cbd5e1' }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--admin-navy)' }}>{mem.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{mem.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 600, 
                      textTransform: 'capitalize', 
                      background: mem.department === 'computerScience' ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)',
                      color: mem.department === 'computerScience' ? '#2563eb' : '#059669',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      {mem.department === 'computerScience' ? 'Computer Science' : 'Management'}
                    </span>
                  </td>
                  <td style={{ maxWidth: '220px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={mem.qualification}>
                      {mem.qualification}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-navy)' }}>{mem.experience}</td>
                  <td>
                    <span className={`admin-badge ${mem.is_active == 1 ? 'active' : 'draft'}`}>
                      {mem.is_active == 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: '700', color: 'var(--admin-gold)' }}>{mem.sort_order}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn edit" onClick={() => handleOpenModal(mem)} title="Edit"><i className="fas fa-pen" /></button>
                      <button 
                        className={`admin-action-btn ${mem.is_active == 1 ? 'delete' : 'edit'}`} 
                        style={mem.is_active == 0 ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                        onClick={() => handleToggleStatus(mem)} 
                        title={mem.is_active == 1 ? "Inactivate" : "Activate"}
                      >
                        <i className={`fas fa-${mem.is_active == 1 ? 'ban' : 'check-circle'}`} />
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleOpenDelete(mem)} title="Delete Permanent">
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

      {/* CREATE/EDIT MODAL */}
      <div className={`admin-modal-overlay ${modalOpen ? 'active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="admin-modal" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2 className="admin-modal-title">
              <i className="fas fa-chalkboard-teacher" style={{ color: 'var(--admin-gold)' }} />
              {editingItem ? 'Edit Faculty Member' : 'Add Faculty Member'}
            </h2>
            <button className="admin-modal-close" onClick={() => setModalOpen(false)}><i className="fas fa-times" /></button>
          </div>
          <form onSubmit={handleSubmit} className="admin-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Full Name (with Title)</label>
              <input name="name" className="admin-input" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Er. Divya Jamwal, Dr. J R Dhotra" />
            </div>

            <div className="admin-form-group">
              <label>Designation</label>
              <input name="designation" className="admin-input" value={formData.designation} onChange={handleInputChange} required placeholder="e.g. Assistant Professor, Professor" />
            </div>

            <div className="admin-form-group">
              <label>Department</label>
              <select name="department" className="admin-input" value={formData.department} onChange={handleInputChange}>
                <option value="management">Management Department</option>
                <option value="computerScience">Computer Science</option>
              </select>
            </div>

            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Academic & Professional Qualifications</label>
              <textarea name="qualification" className="admin-textarea" style={{ minHeight: '80px' }} value={formData.qualification} onChange={handleInputChange} placeholder="e.g. MBA (Jammu University), B.E (Computer Science)" />
            </div>

            <div className="admin-form-group">
              <label>Total Experience</label>
              <input name="experience" className="admin-input" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 10 Years, 7 Months" />
            </div>

            <div className="admin-form-group">
              <label>Sort Order (Lower numbers show first)</label>
              <input type="number" name="sort_order" className="admin-input" value={formData.sort_order} onChange={handleInputChange} />
            </div>

            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Direct Image URL (e.g. Google Drive Link, Unsplash CDN) <em>- Optional</em></label>
              <input name="image_url" className="admin-input" value={formData.image_url} onChange={handleInputChange} placeholder="Paste direct image link if you do not want to upload local file" />
            </div>

            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Or Upload Custom Passport Size Photograph</label>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={e => setFormData({...formData, image: e.target.files[0]})} />
              <div 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  border: '2px dashed var(--admin-border)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: '#fcfcfc',
                  position: 'relative',
                  margin: '0 auto'
                }}
                onClick={() => fileInputRef.current.click()}
              >
                {formData.image ? (
                  <img src={URL.createObjectURL(formData.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : formData.image_url ? (
                  <img src={formData.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <i className="fas fa-camera" style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '8px' }} />
                    <span style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center', padding: '0 10px' }}>Upload Photo</span>
                  </>
                )}
                {(formData.image || formData.image_url) && (
                  <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 600 }}>
                    Change
                  </div>
                )}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" name="is_active" checked={formData.is_active === 1} onChange={handleInputChange} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--admin-navy)' }}>Mark as Active (Show on Website)</span>
              </label>
            </div>
          </form>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-btn admin-btn-gold" onClick={handleSubmit}>
              <i className="fas fa-save" /> {editingItem ? 'Save Changes' : 'Add Faculty'}
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
              You are about to delete <strong>"{deleteModal.name}"</strong>. <br/> Permanent deletion will also clean up their profile picture.
            </p>
          </div>
          <div className="admin-modal-footer" style={{ borderTop: 'none', flexDirection: 'column', gap: '10px', padding: '20px 40px 40px' }}>
            <button className="admin-btn admin-btn-gold" style={{ width: '100%', padding: '12px' }} onClick={() => processDelete('soft')}>
              <i className="fas fa-ban" /> Just Hide from Website (Safe)
            </button>
            <button className="admin-btn" style={{ width: '100%', padding: '12px', background: 'var(--admin-danger)', color: '#fff' }} onClick={() => processDelete('hard')}>
              <i className="fas fa-trash" /> Delete Forever (Permanent)
            </button>
            <button className="admin-btn admin-btn-ghost" style={{ width: '100%' }} onClick={() => setDeleteModal({ ...deleteModal, open: false })}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
