"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from 'swiper/bundle';

if (typeof window !== "undefined") {
    window.Swiper = Swiper;
    window.AOS = AOS;
}

export default function ClientScripts() {
    useEffect(() => {
        window.Swiper = Swiper;
        AOS.init({
            duration: 750,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic',
        });
    }, []);

    return null;
}