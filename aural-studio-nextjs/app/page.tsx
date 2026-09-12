import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { LocalServices } from "@/components/sections/LocalServices";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Founder />
        <LocalServices />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
