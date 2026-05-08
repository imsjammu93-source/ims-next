'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Alumni · MBA Batch 2022, Now in Corporate Finance",
    text: "IMS Jammu gave me the platform to grow beyond textbooks. The faculty genuinely cares about each student's future. My MBA experience here shaped my entire career trajectory.",
    avatar: "R",
    rating: 5
  },
  {
    name: "Priya Choudhary",
    role: "Alumni · BCA Graduate, Software Engineer",
    text: "The BCA programme at IMS gave me hands-on skills in software and networking. The 24-hr computer lab was a game-changer. I landed my first job before graduation!",
    avatar: "P",
    rating: 5
  },
  {
    name: "Anil Gupta",
    role: "Alumni · BBA Graduate, Entrepreneur",
    text: "The campus atmosphere at IMS is truly inspiring. The AC conference hall, modern labs, and the dedicated faculty made my BBA journey one I will always cherish. Highly recommended!",
    avatar: "A",
    rating: 4.5
  },
  {
    name: "Siddharth Jamwal",
    role: "Alumni · MBA Graduate, Marketing Manager",
    text: "Dr. Meenakshi Sharma and the entire IMS faculty create an environment where students thrive. The institute's focus on values, discipline and practical learning prepared me well for the corporate world.",
    avatar: "S",
    rating: 5
  }
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="section section--alt" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="text-center" data-aos="fade-up">
          <div className="section-label">Student & Alumni Voice</div>
          <h2 className="section-title" id="testimonials-title">
            What Our Community <span>Says About IMS</span>
          </h2>
          <p className="section-desc">
            Real words from the students and alumni who are part of the IMS Jammu legacy.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay={80}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testi, index) => (
              <SwiperSlide key={index}>
                <div className="testi-card">
                  <div className="testi-quote-icon">"</div>
                  <div className="testi-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={i < Math.floor(testi.rating) ? "fas fa-star" : (i < testi.rating ? "fas fa-star-half-alt" : "far fa-star")} 
                      />
                    ))}
                  </div>
                  <p className="testi-text">"{testi.text}"</p>
                  <div className="testi-author">
                    <div className="testi-avatar">{testi.avatar}</div>
                    <div>
                      <div className="testi-name">{testi.name}</div>
                      <div className="testi-role">
                        {testi.role.split(' · ')[0]} · <span>{testi.role.split(' · ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;