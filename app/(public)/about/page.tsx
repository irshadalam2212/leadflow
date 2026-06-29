import AboutCTA from "@/components/about/about-cta";
import AboutHero from "@/components/about/about-hero";
import CompanyStats from "@/components/about/company-stats";
import CoreValues from "@/components/about/core-values";
import OurStory from "@/components/about/our-story";
import MissionVision from "@/components/about/vision-mission";
import WorkProcess from "@/components/about/work-process";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function AboutPage() {
    return (
        <main>
            <AboutHero />

            <OurStory />

            <MissionVision />

            <WhyChooseUs />

            <CompanyStats />

            <WorkProcess />

            <CoreValues />

            <AboutCTA />
        </main>
    );
}