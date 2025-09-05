import Footer from '@/components/common/Footer';
import Hero from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import InterviewPrepPricing from '@/components/languify/pricing';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/PricingSection';
import TemplatesPreview from '@/components/TemplatesPreviewSection';
import WhyChooseAiSaathi from '@/components/WhyChooseAisaathi';

export default function Home() {
  return (
   <>
      <Navbar />
      <Hero/>
      <WhyChooseAiSaathi/>
      <HowItWorks/>
      <InterviewPrepPricing/>
      {/* <Pricing/> */}
      <TemplatesPreview/>
     <Footer/>
   </>
  );
}