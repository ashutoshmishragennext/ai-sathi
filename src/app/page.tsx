import Footer from '@/components/common/Footer';
import Hero from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import InterviewPrepPricing from '@/components/languify/pricing';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/PricingSection';
import Template1 from '@/components/Templates/template1';
import TemplatesPreview from '@/components/TemplatesPreviewSection';
import TemplateTab from '@/components/TemplateTab';
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