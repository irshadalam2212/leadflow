import {
  Building2,
  Home,
  Smile,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "500+",
    label: "Properties Listed",
  },
  {
    icon: Users,
    value: "1,200+",
    label: "Happy Clients",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Real Estate Partners",
  },
  {
    icon: Smile,
    value: "98%",
    label: "Customer Satisfaction",
  },
];

export default function CompanyStats() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">
          Our Achievements
        </h2>

        <p className="mt-4 text-muted-foreground">
          Trusted by buyers, sellers and
          real estate professionals.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card p-8 text-center transition hover:shadow-lg"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-muted-foreground">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}