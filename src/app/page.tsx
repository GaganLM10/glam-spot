import HeroSection from "@/components/common/HeroSection";
import ServicesSection from "@/components/common/ServicesSection";
import CitiesSection from "@/components/common/CitiesSection";
import StatsSection from "@/components/common/StatsSection";
import TopSalonsSection from "@/components/common/TopSalonsSection";
import HowItWorksSection from "@/components/common/HowItWorksSection";
import CTASection from "@/components/common/CTASection";
import OfferPopup from "@/components/common/OfferPopup";
import TestimonialsSection from "@/components/common/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <OfferPopup />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TopSalonsSection />
      <HowItWorksSection />
      <CitiesSection />
      <CTASection />
      <TestimonialsSection />
    </>
  );
}