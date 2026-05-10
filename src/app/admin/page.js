'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getBlogs, getEvents, getAdmissions, getContactMessages,
  getAdmissionSettings, updateAdmissionSettings
} from '@/lib/fetchData';

const statCards = [
  { label: 'Total Blogs', icon: 'fas fa-blog', colorClass: 'gold', accentClass: 'stat-gold', trend: 'Total Published', trendDir: 'up', valueKey: 'blogs' },
  { label: 'Active Events', icon: 'fas fa-calendar-alt', colorClass: 'blue', accentClass: 'stat-blue', trend: 'Events & News', trendDir: 'up', valueKey: 'events' },
  { label: 'Admission Leads', icon: 'fas fa-user-graduate', colorClass: 'green', accentClass: 'stat-green', trend: 'New Enquiries', trendDir: 'up', valueKey: 'admissions' },
  { label: 'Inquiry Inbox', icon: 'fas fa-envelope', colorClass: 'red', accentClass: 'stat-red', trend: 'Contact Messages', trendDir: 'up', valueKey: 'contacts' },
];

const quickActions = [
  { href: '/admin/blogs', icon: 'fas fa-pen-nib', label: 'New Blog Post' },
  { href: '/admin/events', icon: 'fas fa-calendar-plus', label: 'Add Event' },
  { href: '/admin/users', icon: 'fas fa-user-plus', label: 'Add User' },
  { href: '/admin/contact-messages', icon: 'fas fa-inbox', label: 'View Contacts' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, events: 0, admissions: 0, contacts: 0 });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [admissionSettings, setAdmissionSettings] = useState({ show_popup: 1, current_session: '2024-25' });
  const [loading, setLoading] = useState(true);
  const [updatingSettings, setUpdatingSettings] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [blogData, eventData, admissionData, contactData, settingsData] = await Promise.all([
          getBlogs(null, 1),
          getEvents(1),
          getAdmissions('all'),
          getContactMessages('all'),
          getAdmissionSettings()
        ]);

        setStats({
          blogs: blogData.length,
          events: eventData.length,
          admissions: admissionData.length,
          contacts: contactData.length
        });

        setRecentBlogs(blogData.slice(0, 5));
        
        if (settingsData && !Array.isArray(settingsData)) {
          setAdmissionSettings(settingsData);
        }

        // Merge and sort recent inquiries (Admissions + Contacts)
        const combinedInquiries = [
          ...admissionData.map(a => ({ ...a, type: 'admission', icon: 'fa-user-graduate', text: `New Admission enquiry from <strong>${a.name}</strong> for ${a.course}` })),
          ...contactData.map(c => ({ ...c, type: 'contact', icon: 'fa-envelope', text: `New Contact message from <strong>${c.name}</strong>: ${c.subject}` }))
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setRecentInquiries(combinedInquiries.slice(0, 5));
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setUpdatingSettings(true);
    try {
      const res = await updateAdmissionSettings(admissionSettings);
      if (res.success) {
        alert("Admission settings updated successfully!");
      } else {
        alert("Failed to update settings: " + res.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating settings.");
    } finally {
      setUpdatingSettings(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here is what is happening at IMS Jammu today.</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card, i) => (
          <div key={i} className={`admin-stat-card ${card.accentClass}`}>
            <span className={`stat-card-trend ${card.trendDir}`}>
              <i className={`fas fa-arrow-${card.trendDir}`} /> {card.trend}
            </span>
            <div className={`stat-card-icon ${card.colorClass}`}>
              <i className={card.icon} />
            </div>
            <div className="stat-card-value">
              {loading ? '...' : stats[card.valueKey]}
            </div>
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Widgets */}
      <div className="admin-widgets-grid">
        {/* Recent Blogs */}
        <div className="admin-widget">
          <div className="admin-widget-header">
            <span className="admin-widget-title">
              <i className="fas fa-blog" style={{ marginRight: 8, color: 'var(--admin-gold)' }} />
              Recent Blog Posts
            </span>
            <Link href="/admin/blogs" className="admin-widget-action">
              Manage All →
            </Link>
          </div>
          <div className="admin-widget-body" style={{ padding: '0 22px' }}>
            {loading ? (
              <p style={{ textAlign: 'center', padding: '30px 0', color: 'var(--admin-muted)', fontSize: '0.85rem' }}>
                Loading blogs...
              </p>
            ) : recentBlogs.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--admin-muted)', fontSize: '0.85rem' }}>
                <i className="fas fa-blog" style={{ fontSize: '2rem', opacity: 0.3, display: 'block', marginBottom: 10 }} />
                No blogs found. <Link href="/admin/blogs" style={{ color: 'var(--admin-gold)' }}>Create your first blog →</Link>
              </p>
            ) : (
              <table className="admin-mini-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBlogs.map((blog, i) => (
                    <tr key={i}>
                      <td style={{ maxWidth: 220 }}>
                        <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {blog.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>
                          by {blog.author_name || 'Admin'}
                        </div>
                      </td>
                      <td style={{ color: 'var(--admin-muted)', fontSize: '0.82rem' }}>
                        {blog.category_name || '—'}
                      </td>
                      <td>
                        <span className={`admin-badge ${blog.is_active ? 'active' : 'draft'}`}>
                          {blog.is_active ? 'Active' : 'Draft'}
                        </span>
                        {blog.is_featured ? (
                          <span className="admin-badge featured" style={{ marginLeft: 4 }}>Featured</span>
                        ) : null}
                      </td>
                      <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick Actions */}
          <div className="admin-widget">
            <div className="admin-widget-header">
              <span className="admin-widget-title">
                <i className="fas fa-bolt" style={{ marginRight: 8, color: 'var(--admin-gold)' }} />
                Quick Actions
              </span>
            </div>
            <div className="admin-widget-body">
              <div className="quick-actions-grid">
                {quickActions.map((action, i) => (
                  <Link key={i} href={action.href} className="quick-action-btn">
                    <i className={action.icon} />
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Admission Control Widget */}
          <div className="admin-widget">
            <div className="admin-widget-header">
              <span className="admin-widget-title">
                <i className="fas fa-user-shield" style={{ marginRight: 8, color: 'var(--admin-gold)' }} />
                Admission Portal Control
              </span>
            </div>
            <div className="admin-widget-body" style={{ padding: '20px' }}>
              <form onSubmit={handleUpdateSettings}>
                <div style={{ marginBottom: 15 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--admin-muted)', marginBottom: 8, fontWeight: 600 }}>
                    Admission Cycle Session
                  </label>
                  <input 
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. 2024-25"
                    value={admissionSettings.current_session}
                    onChange={(e) => setAdmissionSettings({ ...admissionSettings, current_session: e.target.value })}
                    required
                    style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '10px', borderRadius: 6, width: '100%', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, padding: '10px', background: '#f8f9fa', borderRadius: 8 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-navy)' }}>
                    Show Admission Popup
                  </span>
                  <label className="admin-toggle">
                    <input 
                      type="checkbox" 
                      checked={admissionSettings.show_popup == 1}
                      onChange={(e) => setAdmissionSettings({ ...admissionSettings, show_popup: e.target.checked ? 1 : 0 })}
                    />
                    <span className="admin-toggle-slider"></span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="admin-btn-primary" 
                  disabled={updatingSettings}
                  style={{ width: '100%', padding: '12px', background: 'var(--admin-navy)', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  {updatingSettings ? <i className="fas fa-spinner fa-spin" /> : 'Update Admission Portal'}
                </button>
              </form>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="admin-widget">
            <div className="admin-widget-header">
              <span className="admin-widget-title">
                <i className="fas fa-history" style={{ marginRight: 8, color: 'var(--admin-gold)' }} />
                Recent Activity
              </span>
            </div>
            <div className="admin-widget-body" style={{ padding: '0 22px' }}>
              <div className="activity-feed">
                {loading ? (
                  <p style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-muted)' }}>Loading activity...</p>
                ) : recentInquiries.length === 0 ? (
                  <p style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-muted)' }}>No recent activity.</p>
                ) : (
                  recentInquiries.map((item, i) => (
                    <div key={i} className="activity-item">
                      <div className={`activity-icon ${item.type}`}>
                        <i className={`fas ${item.icon}`} />
                      </div>
                      <div className="activity-text">
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                        <time>{new Date(item.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</time>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
