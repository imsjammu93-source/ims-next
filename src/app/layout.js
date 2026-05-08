import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css/bundle";
import "../assets/css/styles.css";
import Script from "next/script";
import ClientScripts from "@/components/ClientScripts";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Institute of Management Sciences (IMS) Jammu",
    template: "%s | IMS Jammu",
  },
  description:
    "Institute of Management Sciences (IMS), Jammu — a pioneer private college established in 1997, located at GurhaBrahamana, Akhnoor Road. Offering MBA, BBA, and BCA programmes with state-of-the-art infrastructure on a 25-acre campus.",
  keywords: [
    "IMS Jammu",
    "Institute of Management Sciences Jammu",
    "MBA Jammu",
    "BBA Jammu",
    "BCA Jammu",
    "JGEI",
    "Jamwal Group Educational Institutions",
  ],
  openGraph: {
    title: "Institute of Management Sciences (IMS) Jammu",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
 <head>
 
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

 </head>
      <body>
        <ClientScripts />
        {children}


<Script src="/assets/js/main.js"  strategy="afterInteractive" />

    </body>
    </html>
  );
}