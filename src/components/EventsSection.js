'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEvents } from '@/lib/fetchData';

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
        <div className="text-center" data-aos="fade-up" style={{ marginBottom: '50px' }}>
          <div className="section-label">Campus Happenings</div>
          <h2 className="section-title">
            News & <span>Events</span>
          </h2>
          <p className="section-desc">Stay updated with the latest seminars, workshops, and achievements at IMS Jammu.</p>
        </div>

        <div className="row g-4">
          {events.map((event, index) => {
            const eventDate = new Date(event.created_date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' });

            return (
              <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <Link href={`/news-events/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="event-card-home" style={{ 
                    background: '#fff', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={event.full_image_path || '/assets/images/placeholder.jpg'} 
                        alt={event.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="event-img"
                      />
                      <div style={{ 
                        position: 'absolute', 
                        top: '15px', 
                        left: '15px', 
                        background: 'var(--clr-gold)', 
                        color: '#fff', 
                        padding: '5px 12px', 
                        borderRadius: '10px', 
                        textAlign: 'center',
                        boxShadow: '0 5px 15px rgba(255, 45, 30, 0.3)'
                      }}>
                        <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>{day}</span>
                        <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700 }}>{month}</span>
                      </div>
                    </div>
                    <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ color: 'var(--clr-navy)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.4 }}>
                        {event.title}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                        {event.short_desc?.substring(0, 100)}...
                      </p>
                      <div style={{ marginTop: 'auto', color: 'var(--clr-gold)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        View Details <i className="fas fa-arrow-right" style={{ fontSize: '0.7rem' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center" style={{ marginTop: '50px' }}>
          <Link href="/news-events" className="btn btn-primary-outline">
            Explore All Happenings <i className="fas fa-calendar-alt" style={{ marginLeft: '10px' }} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .event-card-home:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .event-card-home:hover .event-img {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

export default EventsSection;
