import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center text-primary-foreground">
          <h2 className="text-4xl font-bold">
            Ready to Find Your Dream Property?
          </h2>

          <p className="mt-6 text-lg opacity-90">
            Explore premium properties, connect with experienced agents,
            and let LeadFlow help you find the perfect home.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
            >
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}