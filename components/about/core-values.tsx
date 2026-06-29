import {
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Honest advice and transparent transactions for every customer.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "We prioritize customer satisfaction throughout the buying journey.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Using technology and automation to simplify real estate management.",
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    description:
      "Building long-term relationships through reliable service and support.",
  },
];

export default function CoreValues() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Our Core Values
        </h2>

        <p className="mt-4 text-muted-foreground">
          The principles that guide every interaction with our customers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <div
              key={value.title}
              className="rounded-2xl border bg-card p-8 transition hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {value.title}
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}