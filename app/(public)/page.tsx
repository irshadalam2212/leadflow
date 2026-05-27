import FeaturedProperties from '@/components/home/featured-properties'
import HeroSection from '@/components/home/hero-section'
import TrustedSection from '@/components/home/trusted-section'
import WhyChooseUs from '@/components/home/why-choose-us'
import React from 'react'

const Page = () => {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </>
  )
}

export default Page
