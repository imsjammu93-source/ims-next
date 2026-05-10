'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { API_BASE_URL } from '@/lib/api';
import { 
  getBlogs, addBlog, updateBlog, deleteBlog,
  getBlogCategories, addCategory, updateCategory, deleteCategory
} from '@/lib/fetchData';

// Dynamically import Jodit Editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function BlogManagement() {
  const [activeTab, setActiveTab] = useState('posts'); 
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    id: '',
    category_id: '',
    title: '',
    slug: '',
    short_description: '',
    content: '',
    meta_title: '',
    meta_description: '',
    is_featured: 0,
    is_active: 1,
    published_at: '',
    image: null
  });

  const [catFormData, setCatFormData] = useState({
    id: '',
    name: '',
    slug: '',
    display_order: 0,
    is_active: 1
  });

  const fileInputRef = useRef(null);

  // Jodit Config
  const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing your blog content...',
    minHeight: 500,
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
      const [blogData, catData] = await Promise.all([
        getBlogs(null, 1),
        getBlogCategories(1)
      ]);
      setBlogs(blogData);
      setCategories(catData);
    } catch (err) {
      console.error("Refresh Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item, image: null });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        category_id: categories[0]?.id || '',
        title: '',
        slug: '',
        short_description: '',
        content: '',
        meta_title: '',
        meta_description: '',
        is_featured: 0,
        is_active: 1,
        published_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        image: null
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
      if (name === 'title') {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return newData;
    });
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Basic Validation
    if (!formData.title || !formData.slug || !formData.category_id) {
      alert("Please fill in the Title, Slug, and Category.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) data.append('image', formData[key]);
      else if (key === 'image_url') return; // Don't send the URL back
      else data.append(key, formData[key]);
    });

    const res = editingItem ? await updateBlog(data) : await addBlog(data);
    if (res.success) {
      setModalOpen(false);
      refreshData();
      alert(editingItem ? "Blog updated!" : "Blog published!");
    } else alert(res.message || "Operation failed");
  };

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, type: '', name: '' });

  const handleOpenDelete = (item, type) => {
    setDeleteModal({ open: true, id: item.id, type, name: item.title || item.name });
  };

  const processDelete = async (mode) => {
    const { id, type } = deleteModal;
    setLoading(true);
    let res;
    if (type === 'blog') res = await deleteBlog(id, mode);
    else res = await deleteCategory(id, mode);

    if (res.success) {
      setDeleteModal({ open: false, id: null, type: '', name: '' });
      refreshData();
    } else alert(res.message);
    setLoading(false);
  };

  // Category Logic
  const handleCatSubmit = async (e, overrideData = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const dataToSend = overrideData || catFormData;
    const res = dataToSend.id ? await updateCategory(dataToSend) : await addCategory(dataToSend);
    if (res.success) {
      setCatFormData({ id: '', name: '', slug: '', display_order: 0, is_active: 1 });
      refreshData();
    } else {
      alert(res.message);
    }
  };

  const handleToggleStatus = async (item, type) => {
    const isActivating = item.is_active == 0;
    let res;
    
    if (type === 'blog') {
      if (isActivating) {
        // To activate, we use updateBlog with essential data
        const data = new FormData();
        Object.keys(item).forEach(key => {
          if (key === 'is_active') data.append(key, 1);
          else if (['id', 'category_id', 'title', 'slug', 'short_description', 'content', 'meta_title', 'meta_description', 'is_featured', 'published_at'].includes(key)) {
            data.append(key, item[key] || '');
          }
        });
        res = await updateBlog(data);
      } else {
        // To inactivate, we use the new soft-delete API (safer)
        res = await deleteBlog(item.id, 'soft');
      }
    } else {
      // Categories use JSON update
      res = await updateCategory({ ...item, is_active: isActivating ? 1 : 0 });
    }

    if (res.success) refreshData();
    else alert(res.message);
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
            <i className="fas fa-newspaper" />
          </div>
          <div>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>Blog Management</h1>
            <p className="admin-page-subtitle" style={{ margin: '5px 0 0', opacity: 0.7 }}>Manage your institutional insights, research articles, and categories.</p>
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
          onClick={() => (activeTab === 'posts' ? handleOpenModal() : setCatFormData({id:'', name:'', slug:'', display_order:0, is_active:1}))}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 163, 26, 0.5)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(212, 163, 26, 0.39)'; }}
        >
          <i className="fas fa-plus-circle" /> 
          <span>{activeTab === 'posts' ? 'Publish New Post' : 'Add New Category'}</span>
        </button>
      </div>

      <div className="admin-tabs">
        <div className={`admin-tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Blog Posts</div>
        <div className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Categories</div>
      </div>

      {activeTab === 'posts' ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post Info</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Loading posts...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No blogs found.</td></tr>
              ) : (
                blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                          {blog.image_url ? (
                            <img src={blog.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : <i className="fas fa-image" style={{ margin: '12px', color: '#cbd5e1' }} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: 'var(--admin-navy)' }}>{blog.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>/{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="admin-badge" style={{ background: '#f1f5f9' }}>{blog.category_name}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <span className={`admin-badge ${blog.is_active == 1 ? 'active' : 'draft'}`}>{blog.is_active == 1 ? 'Active' : 'Inactive'}</span>
                        {blog.is_featured == 1 && <span className="admin-badge featured">Featured</span>}
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-muted)', fontSize: '0.85rem' }}>{blog.published_at}</td>
                    <td>
                      <div className="admin-actions">
                        <a href={`/blogs/${blog.slug}`} target="_blank" className="admin-action-btn edit" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }} title="View Public Page"><i className="fas fa-external-link-alt" /></a>
                        <button className="admin-action-btn edit" style={{ background: 'rgba(212,163,26,0.1)', color: 'var(--admin-gold)' }} onClick={() => handleOpenPreview(blog)} title="Quick Audit"><i className="fas fa-eye" /></button>
                        <button className="admin-action-btn edit" onClick={() => handleOpenModal(blog)} title="Edit"><i className="fas fa-pen" /></button>
                        <button 
                          className={`admin-action-btn ${blog.is_active == 1 ? 'delete' : 'edit'}`} 
                          style={blog.is_active == 0 ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                          onClick={() => handleToggleStatus(blog, 'blog')} 
                          title={blog.is_active == 1 ? "Inactivate" : "Activate"}
                        >
                          <i className={`fas fa-${blog.is_active == 1 ? 'ban' : 'check-circle'}`} />
                        </button>
                        <button className="admin-action-btn delete" onClick={() => handleOpenDelete(blog, 'blog')} title="Delete Permanently">
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
      ) : (
        <div className="admin-widgets-grid">
          <div className="admin-widget">
            <div className="admin-widget-header"><span className="admin-widget-title">Existing Categories</span></div>
            <div className="admin-widget-body" style={{ padding: 0 }}>
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Slug</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat.id}>
                      <td style={{ fontWeight: 600 }}>{cat.name}</td>
                      <td>{cat.slug}</td>
                      <td style={{ opacity: cat.is_active == 1 ? 1 : 0.5 }}>{cat.display_order}</td>
                      <td><span className={`admin-badge ${cat.is_active == 1 ? 'active' : 'draft'}`}>{cat.is_active == 1 ? 'Active' : 'Inactive'}</span></td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-action-btn edit" onClick={() => setCatFormData(cat)} title="Edit"><i className="fas fa-pen" /></button>
                          <button 
                            className={`admin-action-btn ${cat.is_active == 1 ? 'delete' : 'edit'}`} 
                            style={!cat.is_active ? { background: 'rgba(34,197,94,0.1)', color: 'var(--admin-success)' } : {}}
                            onClick={() => handleToggleStatus(cat, 'category')}
                            title={cat.is_active ? "Inactivate" : "Activate"}
                          >
                            <i className={`fas fa-${cat.is_active ? 'ban' : 'check-circle'}`} />
                          </button>
                          <button className="admin-action-btn delete" onClick={() => handleOpenDelete(cat, 'category')} title="Delete Permanently">
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="admin-widget">
            <div className="admin-widget-header"><span className="admin-widget-title">{catFormData.id ? 'Edit Category' : 'Add New Category'}</span></div>
            <div className="admin-widget-body">
              <form onSubmit={handleCatSubmit}>
                <div className="admin-form-group"><label>Category Name</label><input className="admin-input" value={catFormData.name} onChange={e => setCatFormData({...catFormData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} required /></div>
                <div className="admin-form-group"><label>Slug</label><input className="admin-input" value={catFormData.slug} onChange={e => setCatFormData({...catFormData, slug: e.target.value})} required /></div>
                <div className="admin-form-group"><label>Display Order</label><input type="number" className="admin-input" value={catFormData.display_order} onChange={e => setCatFormData({...catFormData, display_order: e.target.value})} /></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="admin-btn admin-btn-primary">{catFormData.id ? 'Update' : 'Save Category'}</button>
                  {catFormData.id && <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setCatFormData({id:'', name:'', slug:'', display_order:0, is_active:1})}>Cancel</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW PREVIEW MODAL */}
      <div className={`admin-modal-overlay ${previewOpen ? 'active' : ''}`} onClick={() => setPreviewOpen(false)}>
        <div className="admin-modal" style={{ maxWidth: '950px' }} onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2 className="admin-modal-title"><i className="fas fa-eye" /> Full Post Audit</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={`/blogs/${viewingItem?.slug}`} target="_blank" className="admin-btn admin-btn-primary" style={{ padding: '6px 16px', background: '#3b82f6' }}>
                <i className="fas fa-external-link-alt" /> Live Page
              </a>
              <button className="admin-btn admin-btn-gold" style={{ padding: '6px 16px' }} onClick={() => { setPreviewOpen(false); handleOpenModal(viewingItem); }}>
                <i className="fas fa-pen" /> Edit Post
              </button>
              <button className="admin-modal-close" onClick={() => setPreviewOpen(false)}><i className="fas fa-times" /></button>
            </div>
          </div>
          <div className="admin-modal-body">
            <div className="modal-grid">
              <div className="modal-main">
                <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--admin-navy)', marginBottom: '10px' }}>{viewingItem?.title}</h1>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', color: 'var(--admin-muted)', fontSize: '0.9rem' }}>
                  <span><i className="fas fa-user-circle" /> {viewingItem?.author_name || 'Admin'}</span>
                  <span><i className="fas fa-calendar-alt" /> {viewingItem?.published_at}</span>
                  <span><i className="fas fa-link" /> imsjammu.com/blog/{viewingItem?.slug}</span>
                </div>

                {viewingItem?.image_url && (
                  <img src={viewingItem.image_url} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '30px', boxShadow: 'var(--admin-shadow-md)' }} />
                )}

                <div 
                  className="blog-preview-content"
                  style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#1e293b' }}
                  dangerouslySetInnerHTML={{ __html: viewingItem?.content }} 
                />
              </div>

              <div className="modal-sidebar">
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--admin-border)', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '15px', color: 'var(--admin-muted)', letterSpacing: '0.05em' }}>Publication Info</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Status</span>
                      <span className={`admin-badge ${viewingItem?.is_active ? 'active' : 'draft'}`}>{viewingItem?.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Category</span>
                      <span className="admin-badge" style={{ background: '#e2e8f0' }}>{viewingItem?.category_name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Featured</span>
                      <span className={`admin-badge ${viewingItem?.is_featured ? 'featured' : ''}`} style={!viewingItem?.is_featured ? { opacity: 0.3 } : {}}>{viewingItem?.is_featured ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--admin-border)' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '15px', color: 'var(--admin-muted)', letterSpacing: '0.05em' }}>SEO Performance</h4>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--admin-navy)', display: 'block', marginBottom: '5px' }}>META TITLE</label>
                    <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>{viewingItem?.meta_title || viewingItem?.title}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--admin-navy)', display: 'block', marginBottom: '5px' }}>META DESCRIPTION</label>
                    <p style={{ fontSize: '0.82rem', color: 'var(--admin-muted)', lineHeight: '1.5' }}>{viewingItem?.meta_description || 'No custom description provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setPreviewOpen(false)}>Close Audit</button>
          </div>
        </div>
      </div>

      {/* BLOG EDIT MODAL */}
      <div className={`admin-modal-overlay ${modalOpen ? 'active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2 className="admin-modal-title"><i className="fas fa-edit" style={{ color: 'var(--admin-gold)' }} /> {editingItem ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            <button className="admin-modal-close" onClick={() => setModalOpen(false)}><i className="fas fa-times" /></button>
          </div>
          <div className="admin-modal-body">
            <div className="modal-grid">
              <div className="modal-main">
                <div className="admin-form-group">
                  <label>Full Content</label>
                  <JoditEditor value={formData.content} config={joditConfig} onBlur={handleEditorChange} />
                </div>
                <div className="admin-form-group">
                  <label>Short Description (Excerpt)</label>
                  <textarea name="short_description" className="admin-textarea" style={{ minHeight: '100px' }} value={formData.short_description} onChange={handleInputChange} />
                </div>
              </div>
              <div className="modal-sidebar">
                <div className="admin-form-group"><label>Post Title</label><input name="title" className="admin-input" value={formData.title} onChange={handleInputChange} required /></div>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select name="category_id" className="admin-select" value={formData.category_id} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="admin-form-group"><label>URL Slug</label><input name="slug" className="admin-input" value={formData.slug} onChange={handleInputChange} required /></div>
                <div className="admin-form-group">
                  <label>Featured Image</label>
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
                    ) : formData.image_url ? (
                      <img src={formData.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <i className="fas fa-image" style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '8px' }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Click to upload banner</span>
                      </>
                    )}
                    {(formData.image || formData.image_url) && (
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>
                        <i className="fas fa-sync" /> Change
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '15px', color: 'var(--admin-muted)' }}>SEO & Meta</h4>
                  <div className="admin-form-group"><label>Meta Title</label><input name="meta_title" className="admin-input" style={{ fontSize: '0.8rem' }} value={formData.meta_title} onChange={handleInputChange} /></div>
                  <div className="admin-form-group"><label>Meta Desc</label><textarea name="meta_description" className="admin-textarea" style={{ minHeight: '60px', fontSize: '0.8rem' }} value={formData.meta_description} onChange={handleInputChange} /></div>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}><input type="checkbox" name="is_featured" checked={formData.is_featured === 1} onChange={handleInputChange} /><span>Mark as Featured</span></label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}><input type="checkbox" name="is_active" checked={formData.is_active === 1} onChange={handleInputChange} /><span>Publish Automatically</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-btn admin-btn-ghost" onClick={() => setModalOpen(false)}>Discard Changes</button>
            <button className="admin-btn admin-btn-gold" onClick={handleSubmit}><i className="fas fa-save" /> {editingItem ? 'Save Blog Post' : 'Publish Article'}</button>
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
              You are about to delete <strong>"{deleteModal.name}"</strong>. <br/> This action cannot be undone if you choose permanent delete.
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
