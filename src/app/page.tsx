import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Approach } from "@/components/services/Approach";
import { Treatments } from "@/components/treatments/Treatments";
import { Doctor } from "@/components/doctor/Doctor";
import { Journal } from "@/components/botanical/Journal";
import { WhyVisit } from "@/components/layout/WhyVisit";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Location } from "@/components/location/Location";
import { Timings } from "@/components/location/Timings";
import { FinalCta } from "@/components/layout/FinalCta";
import { Footer } from "@/components/footer/Footer";
import { StickyActions } from "@/components/ui/StickyActions";
import { clinic } from "@/data/clinic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: clinic.name,
  description: "Siddha, Ayurveda and Panchakarma centre in Adambakkam, Chennai.",
  url: clinic.siteUrl,
  telephone: [clinic.phone.tel, clinic.landline.tel],
  medicalSpecialty: "Ayurvedic",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.locality,
    addressRegion: clinic.address.region,
    postalCode: clinic.address.postalCode,
    addressCountry: clinic.address.country,
  },
  areaServed: "Chennai",
  employee: { "@type": "Person", name: `${clinic.doctor.name} ${clinic.doctor.credentials}`, jobTitle: "Doctor" },
  hasMap: clinic.maps.searchUrl,
  image: `${clinic.siteUrl}/brand/logo-full.png`,
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Approach />
        <Treatments />
        <Doctor />
        <Journal />
        <WhyVisit />
        <Testimonials />
        <Location />
        <Timings />
        <FinalCta />
      </main>
      <Footer />
      <StickyActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
