'use client';
import { useState, useEffect } from 'react';
import { 
  getUsers, addUser, updateUser, deleteUser 
} from '@/lib/fetchData';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [resetPassModal, setResetPassModal] = useState({ open: false, id: null, username: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'editor',
    status: 'active'
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Refresh Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    console.log("Button Clicked: handleOpenAdd");
    setEditUser(null);
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'editor',
      status: 'active'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    console.log("Button Clicked: handleOpenEdit", user.username);
    setEditUser(user);
    setFormData({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (editUser) {
        res = await updateUser(formData);
      } else {
        res = await addUser(formData);
      }

      if (res.success) {
        setModalOpen(false);
        refreshData();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during save");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    setLoading(true);
    try {
      const res = await updateUser({ id: resetPassModal.id, password: newPassword });
      if (res.success) {
        alert("Password reset successfully!");
        setResetPassModal({ open: false, id: null, username: '' });
        setNewPassword('');
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    try {
      const res = await deleteUser(id);
      if (res.success) refreshData();
      else alert(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin': return { bg: '#1E355A', text: '#fff', label: 'Super Admin' };
      case 'admin': return { bg: 'rgba(212, 163, 26, 0.1)', text: 'var(--admin-gold)', label: 'Admin' };
      default: return { bg: '#f1f5f9', text: '#64748b', label: 'Editor' };
    }
  };

  return (
    <div className="admin-page">
      {/* HEADER SECTION */}
      <div className="admin-page-header" style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        border: '1px solid #eee',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--admin-gold)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <i className="fas fa-users-cog" style={{ fontSize: '1.2rem' }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>User Management</h1>
            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>System access & administrative roles</p>
          </div>
        </div>
        
        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: 'var(--admin-navy)', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }} /> Add User
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && users.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '50px' }}>Loading directory...</td></tr>
            ) : users.map(user => {
              const badge = getRoleBadge(user.role);
              return (
                <tr key={user.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>@{user.username}</div>
                  </td>
                  <td>
                    <span style={{ background: badge.bg, color: badge.text, padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>
                      {badge.label}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${user.status === 'active' ? 'active' : 'draft'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn edit" onClick={() => handleOpenEdit(user)}>
                        <i className="fas fa-edit" />
                      </button>
                      <button className="admin-action-btn edit" onClick={() => setResetPassModal({ open: true, id: user.id, username: user.username })} style={{ color: 'var(--admin-gold)' }}>
                        <i className="fas fa-key" />
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleDelete(user.id)}>
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD/EDIT */}
      {modalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card">
            <div className="custom-modal-header">
              <h3>{editUser ? 'Edit System User' : 'New System User'}</h3>
              <button onClick={() => setModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="custom-modal-body">
              <div className="form-row">
                <label>Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-row">
                  <label>Username</label>
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                </div>
                <div className="form-row">
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
              </div>
              
              {!editUser && (
                <div className="form-row">
                  <label>Password</label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-row">
                  <label>Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="custom-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">{loading ? 'Saving...' : 'Confirm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET PASSWORD */}
      {resetPassModal.open && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card" style={{ maxWidth: '400px' }}>
            <div className="custom-modal-header">
              <h3>Reset Password</h3>
              <button onClick={() => setResetPassModal({ open: false, id: null, username: '' })}>×</button>
            </div>
            <form onSubmit={handleResetPassword} className="custom-modal-body">
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>Resetting password for <strong>@{resetPassModal.username}</strong></p>
              <div className="form-row">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
              </div>
              <div className="custom-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setResetPassModal({ open: false, id: null, username: '' })}>Cancel</button>
                <button type="submit" className="btn-save">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }
        .custom-modal-card {
          background: white;
          width: 100%;
          max-width: 500px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }
        .custom-modal-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .custom-modal-header h3 { margin: 0; font-size: 1.1rem; }
        .custom-modal-header button { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #999; }
        .custom-modal-body { padding: 20px; }
        .form-row { margin-bottom: 15px; }
        .form-row label { display: block; margin-bottom: 5px; font-size: 0.85rem; font-weight: 700; color: #444; }
        .form-row input, .form-row select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
        .custom-modal-footer { margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px; }
        .btn-cancel { padding: 10px 20px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; }
        .btn-save { padding: 10px 20px; background: var(--admin-navy); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; }
      `}</style>
    </div>
  );
}
