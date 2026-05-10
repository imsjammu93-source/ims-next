import HomeLayout from "@/layoutComponents/HomeLayout";
import Image from "next/image";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AwardsSection from "@/components/AwardsSection";
import GallerySection from "@/components/GallerySection";
import BlogsSection from "@/components/BlogsSection";
import EventsSection from "@/components/EventsSection";
import PrincipleMessage from "@/components/PrincipleMessage";
import ProgramsSection from "@/components/ProgramsSection";
import HomeAdmissionPopup from "@/components/HomeAdmissionPopup";

export default function Home() {
  return (
   <>
    <HomeAdmissionPopup />

<HomeLayout>
<AboutSection/>
<WhyChooseSection/>
<PrincipleMessage/>
<ProgramsSection/>
{/* <GallerySection/> */}
<EventsSection/>
<BlogsSection/>
<AwardsSection/>



<TestimonialsSection/>


</HomeLayout>



   </>
  );
}
