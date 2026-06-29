import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 py-20 text-center text-primary-foreground">
        <h2 className="text-4xl font-bold">
          Looking for Your Dream Property?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg opacity-90">
          Browse our latest listings and connect with our
          experienced real estate advisors today.
        </p>

        <Button
          asChild
          size="lg"
          variant="secondary"
          className="mt-8"
        >
          <Link href="/properties">
            Explore Properties
          </Link>
        </Button>
      </div>
    </section>
  );
}