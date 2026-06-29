import {
  Search,
  CalendarDays,
  Handshake,
  KeyRound,
} from "lucide-react";

const process = [
  {
    icon: Search,
    title: "Search Property",
    description:
      "Browse verified properties based on your budget and preferences.",
  },
  {
    icon: CalendarDays,
    title: "Schedule Visit",
    description:
      "Book a property visit with one of our experienced agents.",
  },
  {
    icon: Handshake,
    title: "Finalize Deal",
    description:
      "Negotiate confidently with complete transparency and expert guidance.",
  },
  {
    icon: KeyRound,
    title: "Move In",
    description:
      "Complete documentation and receive your property keys.",
  },
];

export default function WorkProcess() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-muted-foreground">
            A simple process to help you find your dream property.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border bg-card p-8"
              >
                <div className="absolute right-5 top-5 text-5xl font-bold text-muted/20">
                  0{index + 1}
                </div>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}