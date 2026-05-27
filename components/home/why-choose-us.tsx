import {
  Building2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/shared/container";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Clock3,
    title: "Faster Response",
    description:
      "Instant notifications and automated follow-ups for every lead.",
  },
  {
    icon: Building2,
    title: "Smart CRM",
    description:
      "Manage leads, properties, and customer interactions efficiently.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    description:
      "Secure, scalable, and built for modern real estate businesses.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y bg-muted/30 py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Built For Modern Real Estate Businesses
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline sales workflows, automate lead
            management, and improve customer engagement
            with a modern CRM automation platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="rounded-3xl p-8 shadow-sm"
              >
                <Icon className="h-12 w-12 text-primary" />

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}