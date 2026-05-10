'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEvents } from '@/lib/fetchData';
import '@/assets/css/events.css';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents(0); // Fetch only active events
      setEvents(data.slice(0, 3)); // Show latest 3
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading || !events || events.length === 0) return null;

  return (
    <section id="events-home" className="section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="text-center" data-aos="fade-up" style={{ marginBottom: '60px' }}>
          <div className="section-label">Campus Happenings</div>
          <h2 className="section-title">
            News & <span>Events</span>
          </h2>
          <p className="section-desc">Stay updated with the latest seminars, workshops, and achievements at IMS Jammu.</p>
        </div>

        {/* Using the beautiful design system from events.css */}
        <div className="events-grid home-events-grid">
          {events.map((event, index) => {
            const eventDate = new Date(event.created_date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' });

            return (
              <Link key={index} href={`/news-events/${event.slug}`} className="event-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="event-thumb">
                  <img 
                    src={event.full_image_path || '/assets/images/placeholder.jpg'} 
                    alt={event.title} 
                  />
                  <div className="event-date-badge">
                    <span className="day">{day}</span>
                    <span className="month">{month}</span>
                  </div>
                </div>
                <div className="event-body">
                  <h4 className="event-title">
                    {event.title}
                  </h4>
                  <p className="event-excerpt">
                    {event.short_desc || (event.full_desc?.replace(/<[^>]*>/g, '').substring(0, 120) + '...')}
                  </p>
                  <div className="event-btn" style={{ marginTop: 'auto', fontWeight: 800, color: 'var(--clr-gold)', fontSize: '0.85rem' }}>
                    View Event Details <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center" style={{ marginTop: '60px' }}>
          <Link href="/news-events" className="btn btn-primary">
            Explore All Events <i className="fas fa-calendar-alt" style={{ marginLeft: '10px' }} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .home-events-grid {
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 30px !important;
        }
        @media (max-width: 991px) {
          .home-events-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .home-events-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default EventsSection;
