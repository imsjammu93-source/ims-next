import HomeLayout from "@/layoutComponents/HomeLayout";
import Image from "next/image";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AwardsSection from "@/components/AwardsSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import PrincipleMessage from "@/components/PrincipleMessage";
import ProgramsSection from "@/components/ProgramsSection";
export default function Home() {
  return (
   <>

<HomeLayout>
<AboutSection/>
<WhyChooseSection/>
<PrincipleMessage/>
<ProgramsSection/>
{/* <GallerySection/> */}
<NewsSection/>
<AwardsSection/>



<TestimonialsSection/>


</HomeLayout>



   </>
  );
}
