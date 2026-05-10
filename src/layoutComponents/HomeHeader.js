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
    bg: "/assets/images/ims-slider1.jpg",
    badge: "Pioneer Private Institute — Est. 1997, Jammu",
    title: <>Shaping <span className="highlight">Future Leaders</span><br />Through Academic Excellence</>,
    desc: "Experience the grandeur of IMS Jammu, a premier institution dedicated to nurturing MBA, BBA & BCA professionals for over two decades.",
    cta1: { text: "Apply for Admission", link: "/admissions", icon: "fa-file-alt" },
    cta2: { text: "Explore Campus", link: "/why-ims", icon: "fa-play-circle" }
  },
  {
    bg: "/assets/images/ims-slider2.jpg",
    badge: "Advanced Learning Infrastructure",
    title: <>World-Class <span className="highlight">Modern Labs</span><br />Built for Technical Mastery</>,
    desc: "Empowering students with hands-on technical training in state-of-the-art computer centres and lecture halls designed for 21st-century learning.",
    cta1: { text: "Our Programmes", link: "/bachelor-of-computer-application", icon: "fa-graduation-cap" },
    cta2: { text: "Research Facilities", link: "/why-ims", icon: "fa-microchip" }
  },
  {
    bg: "/assets/images/ims-slider3.jpg",
    badge: "Distinguished Academic Mentorship",
    title: <>Guided by <span className="highlight">Expert Faculty</span><br />Committed to Your Success</>,
    desc: "Learn from the best. Our experienced faculty brings industry insights and academic rigor to help you navigate your professional journey.",
    cta1: { text: "Meet Our Faculty", link: "/about-ims", icon: "fa-chalkboard-teacher" },
    cta2: { text: "Academics", link: "/master-of-business-administration", icon: "fa-book-open" }
  },
  {
    bg: "/assets/images/ims-slider4.jpg",
    badge: "Vibrant Campus Life",
    title: <>Beyond <span className="highlight">Academics</span><br />Celebrate Every Milestone</>,
    desc: "From cultural concerts to academic seminars, life at IMS Jammu is a journey of holistic development and unforgettable memories.",
    cta1: { text: "Upcoming Events", link: "/news-events", icon: "fa-calendar-alt" },
    cta2: { text: "Gallery", link: "/gallery", icon: "fa-images" }
  },
   {
    bg: "/assets/images/ims-slider5.jpg",
    badge: "Social Responsibility & Ethics",
    title: <>Nurturing <span className="highlight">Values & Sustainability</span><br />For a Greener Tomorrow</>,
    desc: "We believe in building character. Our students actively engage in social welfare and environmental initiatives to become responsible global citizens.",
    cta1: { text: "Student Life", link: "/why-ims", icon: "fa-leaf" },
    cta2: { text: "Our Vision", link: "/overview-ims", icon: "fa-eye" }
  },
   {
    bg: "/assets/images/ims-slider6.jpg",
    badge: "The IMS Jammu Family",
    title: <>Stronger <span className="highlight">Together</span><br />Defining Professional Excellence</>,
    desc: "Join a collaborative community where teachers and students work hand-in-hand to achieve prestigious placements and career success.",
    cta1: { text: "Join Our Community", link: "/admissions", icon: "fa-users" },
    cta2: { text: "Placement Success", link: "/our-leading-recruiters", icon: "fa-briefcase" }
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