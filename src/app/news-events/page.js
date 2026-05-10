import React from 'react';
import Link from 'next/link';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import { getEvents } from '@/lib/fetchData';
import '@/assets/css/events.css';

// ── Helpers ──────────────────────────────────────────────
function getEventDate(d) {
  const date = new Date(d);
  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'short' })
  };
}

export const metadata = {
  title: "News & Events | IMS Jammu",
  description: "Stay updated with the latest institutional news, seminars, workshops, and official events at the Institute of Management Sciences, Jammu.",
};

export default async function NewsEventsPage() {
  const events = await getEvents(0); // Fetch only active events

  return (
    <Layout>
      <PageHeader 
        title="News & Events"
        subtitle="Stay updated with the heartbeat of IMS Jammu."
        bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="events-page">
        <section className="container">
          
          <div style={{ marginBottom: 50, textAlign: 'center' }}>
            <div className="section-label" style={{ margin: '0 auto 15px' }}>Latest Updates</div>
            <h2 className="section-title">
              Our <span>Happenings</span>
            </h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b' }}>
              Explore the latest academic conferences, student workshops, and cultural highlights that define the vibrant campus life at IMS Jammu.
            </p>
          </div>

          <div className="events-grid">
            {events.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                <i className="fas fa-calendar-times" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '20px' }} />
                <h3>No upcoming events scheduled</h3>
                <p>Please check back later for new updates and announcements.</p>
              </div>
            ) : (
              events.map((event) => {
                const { day, month } = getEventDate(event.created_date);
                return (
                  <Link 
                    key={event.id} 
                    href={`/news-events/${event.slug}`} 
                    className="event-card"
                  >
                    <div className="event-thumb">
                      <div className="event-date-badge">
                        <span className="day">{day}</span>
                        <span className="month">{month}</span>
                      </div>
                      <img src={event.full_image_path || '/assets/img/placeholder.jpg'} alt={event.title} />
                    </div>
                    <div className="event-body">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-excerpt">{event.short_desc}</p>
                      <div className="event-footer">
                        <span className="event-btn">
                          Read More <i className="fas fa-arrow-right" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
