import { MessageCircle } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-24 text-center">
        <MessageCircle className="mx-auto mb-6 h-14 w-14 text-primary" />

        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Have questions about a property or need expert
          guidance? Our team is here to help.
        </p>
      </div>
    </section>
  );
}