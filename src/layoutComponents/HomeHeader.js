'use client';
import React from 'react';
import Navbar from './Navbar';
import StatsSection from '@/components/StatsSection';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    bg: "/assets/images/campus.jpg",
    badge: "Pioneer Private Institute — Est. 1997, Jammu",
    title: <>Shaping <span className="highlight">Future Leaders</span><br />Through The Quality</>,
    desc: "Institute of Management Sciences (IMS) - a premier college offering MBA, BBA & BCA programmes.",
    cta1: { text: "Apply for Admission", link: "/admissions", icon: "fa-file-alt" },
    cta2: { text: "Explore IMS", link: "/why-ims", icon: "fa-play-circle" }
  },
  {
    bg: "/assets/images/slider2.jpg",
    badge: "25-Acre Campus · Akhnoor Road, Jammu",
    title: <>World-Class <span className="highlight">Campus & Labs</span><br />Built for 21st-Century Learning</>,
    desc: "Our 14,000+ sq.m. campus features modern lecture halls with AV aids, an AC conference hall, computer centres with 24-hr internet.",
    cta1: { text: "Our Programmes", link: "/bachelor-of-computer-application", icon: "fa-graduation-cap" },
    cta2: { text: "Why Choose IMS", link: "/why-ims", icon: "fa-info-circle" }
  },
  {
    bg: "/assets/images/slider3.jpg",
    badge: "Values · Culture · Social Responsibility",
    title: <>Education That Builds<br /><span className="highlight">Character & Values</span></>,
    desc: "IMS is dedicated to promoting cultural, religious and moral values among youth through education and social activities.",
    cta1: { text: "Upcoming Events", link: "/conference", icon: "fa-calendar-alt" },
    cta2: { text: "Enquire Now", link: "/admissions", icon: "fa-user-edit" }
  },
  {
    bg: "/assets/images/hero4.jpg",
    badge: "Jamwal Group of Educational Institutions",
    title: <>Excellence in<br /><span className="highlight">Management & Technology</span></>,
    desc: "Under the vision of Er. Vidhi S. Singh, JGEI strives to equip students with the right values, attitudes, and capabilities.",
    cta1: { text: "About JGEI Group", link: "/overview-ims", icon: "fa-user-tie" },
    cta2: { text: "The IMS Advantage", link: "/why-ims", icon: "fa-award" }
  }
];

function HomeHeader() {
  return (
    <>
      <Navbar />
      <section id="hero" aria-label="Hero Slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index} className="hero-slide">
              <div
                className="hero-slide__bg"
                style={{ backgroundImage: `url("${slide.bg}")` }}
              />
              <div className="hero-slide__overlay" />
              <div className="container hero-content">
                <div className="hero-badge">
                  <i className="fas fa-circle" /> {slide.badge}
                </div>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-desc">{slide.desc}</p>
                <div className="hero-cta">
                  <Link href={slide.cta1.link} className="btn btn-primary">
                    <i className={`fas ${slide.cta1.icon}`} /> {slide.cta1.text}
                  </Link>
                  <Link href={slide.cta2.link} className="btn btn-outline">
                    <i className={`fas ${slide.cta2.icon}`} /> {slide.cta2.text}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Arrows to match your CSS */}
          <div className="swiper-button-prev"><i className="fas fa-chevron-left"></i></div>
          <div className="swiper-button-next"><i className="fas fa-chevron-right"></i></div>
        </Swiper>
      </section>
      <StatsSection />
    </>
  );
}

export default HomeHeader;