'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import '@/assets/css/admin.css';
import React from 'react';

const navItems = [
  {
    label: 'MAIN',
    items: [
      { href: '/admin', icon: 'fas fa-th-large', label: 'Dashboard' },
    ]
  },
  {
    label: 'CONTENT',
    items: [
      { href: '/admin/blogs', icon: 'fas fa-blog', label: 'Blog Management'},
      { href: '/admin/events', icon: 'fas fa-calendar-alt', label: 'Events' },
    ]
  },
  {
    label: 'MANAGEMENT',
    items: [
      { href: '/admin/users', icon: 'fas fa-users', label: 'User Management' },
      { href: '/admin/contact-messages', icon: 'fas fa-envelope-open-text', label: 'Inquiry Inbox' },
      { href: '/admin/admissions', icon: 'fas fa-user-graduate', label: 'Admissions' },
    ]
  },
  {
    label: 'SETTINGS',
    items: [
      { href: '/admin/settings', icon: 'fas fa-cog', label: 'Site Settings' },
    ]
  }
];

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user: authUser, loading: authLoading, logout: authLogout } = React.useContext(AuthContext);
  const [user, setUser] = useState({ name: 'Admin', role: 'super_admin' });

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync with AuthContext user
  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  // Auth guard - Proactive check
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  const handleLogout = () => {
    authLogout();
    router.push('/login');
  };

  // If we are checking auth, show a clean loader or nothing
  if (authLoading || !authUser) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        color: '#0b1a33',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: '#ff2d1e', marginBottom: '1rem' }} />
          <p style={{ fontWeight: 600, letterSpacing: '0.05em' }}>Verifying Session...</p>
        </div>
      </div>
    );
  }

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const getInitials = (name = '') =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const getPageLabel = () => {
    for (const section of navItems) {
      for (const item of section.items) {
        if (pathname === item.href) return item.label;
      }
    }
    return 'Dashboard';
  };

  const sidebarClass = [
    'admin-sidebar',
    !isMobile && sidebarCollapsed ? 'collapsed' : '',
    isMobile && mobileSidebarOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  const mainClass = [
    'admin-main',
    !isMobile && sidebarCollapsed ? 'sidebar-collapsed' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="admin-root">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? 'active' : ''}`}
        onClick={closeMobileSidebar}
      />

      {/* SIDEBAR */}
      <aside className={sidebarClass}>
        {/* Brand */}
        <Link href="/admin" className="sidebar-brand">
          <div className="sidebar-brand__icon">I</div>
          <div className="sidebar-brand__text">
            <span>IMS Jammu</span>
            <span>Admin Portal</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((section, si) => (
            <div key={si} className="sidebar-nav-section">
              <div className="sidebar-nav-label">{section.label}</div>
              {section.items.map((item) => {
                // Only super_admin can see User Management
                if (item.label === 'User Management' && authUser?.role !== 'super_admin') return null;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
                    onClick={isMobile ? closeMobileSidebar : undefined}
                  >
                    <i className={`${item.icon} sidebar-nav-item__icon`} />
                    <span className="sidebar-nav-item__label">{item.label}</span>
                    {item.badge && (
                      <span className="sidebar-nav-item__badge">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div
            className="sidebar-nav-item"
            onClick={handleLogout}
            style={{ cursor: 'pointer', color: 'rgba(239,68,68,0.75)' }}
          >
            <i className="fas fa-sign-out-alt sidebar-nav-item__icon" />
            <span className="sidebar-nav-item__label">Logout</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className={mainClass}>
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="topbar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <i className={`fas ${sidebarCollapsed && !isMobile ? 'fa-indent' : 'fa-bars'}`} />
            </button>
            <div className="topbar-breadcrumb">
              <span>Admin</span>
              <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem' }} />
              <span className="current">{getPageLabel()}</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Notification */}
            <button className="topbar-icon-btn" aria-label="Notifications">
              <i className="fas fa-bell" />
              <span className="notif-dot" />
            </button>

            {/* Profile */}
            <div className="topbar-profile" ref={dropdownRef} onClick={() => setProfileDropdownOpen(p => !p)}>
              <div className="topbar-profile__avatar">
                {getInitials(user.name)}
              </div>
              <div className="topbar-profile__info">
                <span className="topbar-profile__name">{user.name || 'Admin'}</span>
                <span className="topbar-profile__role">{user.role?.replace('_', ' ') || 'Administrator'}</span>
              </div>
              <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--admin-muted)', marginLeft: 4 }} />

              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <a href="/admin/profile">
                    <i className="fas fa-user-circle" /> My Profile
                  </a>
                  <a href="/admin/settings">
                    <i className="fas fa-cog" /> Settings
                  </a>
                  <button className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
