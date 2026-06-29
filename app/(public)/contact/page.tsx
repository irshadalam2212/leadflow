import ContactHero from "@/components/contact/contact-hero";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import OfficeMap from "@/components/contact/office-map";
import BusinessHours from "@/components/contact/business-hours";
import ContactCTA from "@/components/contact/contact-cta";

export default function ContactPage() {
    return (
        <main>
            <ContactHero />

            <section className="container mx-auto px-4 py-20">
                <div className="grid gap-10 lg:grid-cols-2">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </section>

            <BusinessHours />

            <OfficeMap />

            <ContactCTA />
        </main>
    );
}