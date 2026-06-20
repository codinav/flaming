import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ModesBand } from "@/components/home/ModesBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ValueProps } from "@/components/home/ValueProps";
import { CoverageSection } from "@/components/home/CoverageSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCTA } from "@/components/home/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <StatsBar />
      <ServicesOverview />
      <ModesBand />
      <ProcessSection />
      <ValueProps />
      <CoverageSection />
      <IndustriesSection />
      <Testimonials />
      <QuoteCTA />
    </>
  );
}
