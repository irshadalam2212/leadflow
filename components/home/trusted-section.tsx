import Container from "@/components/shared/container";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Airbnb",
];

export default function TrustedSection() {
  return (
    <section className="border-y bg-muted/30 py-10">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by modern real estate businesses
          </p>

          <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {companies.map((company) => (
              <div
                key={company}
                className="flex items-center justify-center rounded-2xl border bg-background px-6 py-5 text-lg font-semibold shadow-sm transition-all hover:shadow-md"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}