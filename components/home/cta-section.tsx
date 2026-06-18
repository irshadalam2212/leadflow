import { ArrowRight, CalendarDays } from "lucide-react";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border bg-linear-to-br from-primary/10 via-background to-primary/5 p-8 shadow-xl md:p-16">
          {/* Background Blur */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Ready To Get Started?
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Automate Your Real Estate Sales Workflow
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Capture leads, notify your sales team instantly,
              automate follow-ups, and close more deals with a
              modern CRM automation platform.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <span>✓ Lead Management</span>
              <span>✓ CRM Automation</span>
              <span>✓ Email Workflows</span>
              <span>✓ Slack Notifications</span>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="rounded-xl px-8">
                Get Started

                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8"
              >
                <CalendarDays className="mr-2 h-5 w-5" />

                Book a Demo
              </Button>
            </div>

            {/* Small Trust Text */}
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Free onboarding •
              Setup in minutes
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}