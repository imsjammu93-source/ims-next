import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import { getEventBySlug, getEvents } from '@/lib/fetchData';
import { contactInfo } from '@/config/contactInfo';
import '@/assets/css/events.css';
import { assetsInfo } from '@/config/assetsInfo';

/**
 * SEO - Dynamic Metadata
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: 'Event Not Found' };

  return {
    title: `${event.title} | News & Events | IMS Jammu`,
    description: event.short_desc || event.full_desc?.substring(0, 160).replace(/<[^>]*>/g, ''),
    openGraph: {
      title: event.title,
      description: event.short_desc,
      images: [event.full_image_path || '/assets/img/default-event.jpg'],
    },
    alternates: {
      canonical: `/news-events/${slug}`,
    },
  };
}

import QuickLinksCard from '@/components/QuickLinksCard';

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  // Fetch data in parallel
  const [event, allEvents] = await Promise.all([
    getEventBySlug(slug),
    getEvents(0)
  ]);

  if (!event) {
    notFound();
  }

  // Filter other recent events for sidebar
  const otherEvents = allEvents.filter(e => e.slug !== slug).slice(0, 4);

  const formattedDate = new Date(event.created_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Layout>
      <PageHeader 
        title={event.title}
        subtitle={`News & Events • ${formattedDate}`}
        bgImage={"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1920"}
      />

      <main className="event-detail-page">
        <section className="section">
          <div className="container">
            <div className="layout-with-sidebar">
              {/* LEFT COLUMN: MAIN CONTENT */}
              <div className="tpc-message-left">
                {/* INFO STRIP */}
                <div className="event-info-strip">
                  <div className="info-item">
                    <i className="fas fa-calendar-check" />
                    <div>
                      <p>Published On</p>
                      <h5>{formattedDate}</h5>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-bullhorn" />
                    <div>
                      <p>Category</p>
                      <h5>Campus News</h5>
                    </div>
                  </div>
                  <div className="info-item">
                    {/* <i className="fas fa-share-alt" /> */}
                    <div>
                      <p>Share This</p>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <a href={contactInfo.socials.facebook} target="_blank" className="share-link"><i className="fab fa-facebook-f" /></a>
                        <a href={contactInfo.socials.linkedin} target="_blank" className="share-link"><i className="fab fa-linkedin-in" /></a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(event.title)}`} target="_blank" className="share-link"><i className="fab fa-whatsapp" /></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FEATURED IMAGE */}
                {event.full_image_path && (
                  <div className="event-featured-image" style={{ 
                    marginBottom: '40px', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 30px rgba(11, 26, 51, 0.1)',
                    border: '1px solid #f1f5f9'
                  }}>
                    <img 
                      src={event.full_image_path} 
                      alt={event.title} 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        maxHeight: '600px',
                        display: 'block', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </div>
                )}

                {/* FULL DESCRIPTION */}
                <div className="event-rich-text">
                  {event.short_desc && (
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--clr-navy)', lineHeight: '1.6', marginBottom: '35px' }}>
                      {event.short_desc}
                    </p>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: event.full_desc }} />
                </div>

                {/* CALL TO ACTION */}
                <div style={{ marginTop: '60px', padding: '40px', background: '#f8fafc', borderRadius: '24px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-navy)', marginBottom: '15px' }}>Interested in Joining Our Campus?</h3>
                  <p style={{ color: '#64748b', marginBottom: '25px' }}>Explore our academic programs and be a part of our next big event.</p>
                  <Link href="/admissions" className="btn btn-primary">
                    Admission Enquiry <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }} />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR */}
              <aside className="sidebar">
                <QuickLinksCard />
                
                <div className="sidebar-card" style={{ background: 'var(--grad-gold)', border: 'none', marginTop: '25px' }}>
                  <h4 className="sidebar-card-title" style={{ color: 'white', marginBottom: '10px', fontSize: '1rem' }}>
                    <i className="fas fa-headset" style={{ color: 'white' }} /> Need Help?
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'white', opacity: 0.8, marginBottom: '20px', lineHeight: '1.4' }}>
                    Have questions about this event or our campus? Our admission team is here to assist you.
                  </p>
                  <a href={`tel:${contactInfo.phoneRaw}`} className="btn btn-navy btn-sm" style={{ width: '100%', padding: '10px' }}>
                    <i className="fas fa-phone-alt" /> Call Support
                  </a>
                </div>
              </aside>
            </div>
          </div>

          {/* OTHER EVENTS SECTION */}
          {otherEvents.length > 0 && (
            <div className="container" style={{ marginTop: '80px', borderTop: '1px solid #f1f5f9', paddingTop: '80px' }}>
              <h3 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem', marginBottom: '40px' }}>
                Other <span>Recent Happenings</span>
              </h3>
              <div className="events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {otherEvents.map(ev => (
                  <Link key={ev.id} href={`/news-events/${ev.slug}`} className="event-card">
                    <div className="event-thumb" style={{ height: '180px' }}>
                      <img src={ev.full_image_path || '/assets/img/placeholder.jpg'} alt={ev.title} />
                    </div>
                    <div className="event-body" style={{ padding: '20px' }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{ev.title}</h4>
                      <span className="event-btn" style={{ fontSize: '0.75rem' }}>View Details <i className="fas fa-arrow-right" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
