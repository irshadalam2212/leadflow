export default function OurStory() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold">
            Our Story
          </h2>

          <p className="mt-6 leading-8 text-muted-foreground">
            LeadFlow was created to simplify real estate
            operations by combining property management,
            lead tracking, follow-up automation, and sales
            pipelines into a single platform.
          </p>

          <p className="mt-4 leading-8 text-muted-foreground">
            Our goal is to help agencies improve customer
            relationships, automate repetitive tasks, and
            increase sales efficiency.
          </p>
        </div>

        <div className="rounded-3xl bg-muted p-12">
          <div className="aspect-video rounded-2xl bg-background" />
        </div>
      </div>
    </section>
  );
}