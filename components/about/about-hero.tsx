import { Building2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Building2 className="mx-auto mb-6 h-14 w-14 text-primary" />

          <h1 className="text-5xl font-bold">
            About LeadFlow
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Helping buyers, sellers, and real estate
            professionals manage properties and leads
            through one modern platform.
          </p>
        </div>
      </div>
    </section>
  );
}