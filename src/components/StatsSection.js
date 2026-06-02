'use client';
import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { getAdmissionSettings } from '@/lib/fetchData';

function StatsSection() {
  const [settings, setSettings] = useState({ current_session: '2026-27' });
  useEffect(() => {
      const fetchSettings = async () => {
        try {
          const data = await getAdmissionSettings();
          if (data && !Array.isArray(data)) {
            setSettings(data);
          }
        } catch (err) {
          console.error("Admissions page settings fetch failed:", err);
        }
      };
      fetchSettings();
     
    }, []);
  const ribbonItems = [
    {
      title: "Experienced Faculty",
      subtitle: "Learn from Industry Leaders",
      icon: "fa-chalkboard-teacher",
      link: "/faculty-ims"
    },
    {
      title: `Admissions ${settings.current_session}`,
      subtitle: "Secure Your Future Today",
      icon: "fa-user-edit",
      link: "/admissions"
    },
    {
      title: "Best Campus Life",
      subtitle: "A Vibrant Student Community",
      icon: "fa-university",
      link: "/campus-life-ims"
    },
    {
      title: "Placement Success",
      subtitle: "Top Recruiter Network",
      icon: "fa-briefcase",
      link: "/our-leading-recruiters"
    }
  ];

  return (
    <div className="hero-stats full-width">
        <div className="academic-ribbon" data-aos="fade-up">
          {ribbonItems.map((item, index) => (
            <Link prefetch={false} href={item.link} className="ribbon-item" key={index}>
              <div className="ribbon-icon">
                <i className={`fas ${item.icon}`} />
              </div>
              <div className="ribbon-content">
                <h3>{item.title}</h3>
                <span>{item.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default StatsSection;