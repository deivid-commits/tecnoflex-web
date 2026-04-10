import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyUs from "@/components/landing/WhyUs";
import Savings from "@/components/landing/Savings";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Savings />
      <CTA />
      <Footer />
    </main>
  );
}