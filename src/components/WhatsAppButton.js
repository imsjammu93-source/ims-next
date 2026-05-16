'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { contactInfo } from '@/config/contactInfo';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  const whatsappNumber = contactInfo.whatsapp;
  const whatsappUrl = `${whatsappNumber}?text=Hello! I am interested in IMS Jammu admissions.`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-icon-wrapper">
        <i className="fab fa-whatsapp"></i>
      </div>
      <span className="whatsapp-tooltip">Chat with us</span>
      
      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .whatsapp-icon-wrapper {
          width: 55px;
          height: 55px;
          background-color: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
          position: relative;
          transition: all 0.3s ease;
        }

        .whatsapp-float:hover .whatsapp-icon-wrapper {
          transform: scale(1.1) translateY(-5px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
        }

        /* Pulse Animation */
        .whatsapp-icon-wrapper::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #25d366;
          z-index: -1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .whatsapp-tooltip {
          background: #333;
          color: white;
          padding: 8px 15px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          margin-left: 15px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .whatsapp-float:hover .whatsapp-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            left: 20px;
          }
          .whatsapp-icon-wrapper {
            width: 50px;
            height: 50px;
            font-size: 28px;
          }
          .whatsapp-tooltip {
            display: none; /* Hide tooltip on mobile for cleaner look */
          }
        }
      `}</style>
    </a>
  );
}
