import CTASection from '@/components/home/cta-section'
import FeaturedProperties from '@/components/home/featured-properties'
import HeroSection from '@/components/home/hero-section'
import Testimonials from '@/components/home/testimonials'
import TrustedSection from '@/components/home/trusted-section'
import WhyChooseUs from '@/components/home/why-choose-us'

const Page = () => {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default Page
