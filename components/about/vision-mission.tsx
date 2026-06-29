import {
  Target,
  Eye,
} from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto grid gap-8 px-4 py-20 md:grid-cols-2">

        <div className="rounded-2xl border bg-card p-8">
          <Target className="mb-4 h-10 w-10 text-primary" />

          <h3 className="text-2xl font-bold">
            Our Mission
          </h3>

          <p className="mt-4 text-muted-foreground">
            Empower real estate businesses with smart,
            scalable, and automated CRM solutions.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-8">
          <Eye className="mb-4 h-10 w-10 text-primary" />

          <h3 className="text-2xl font-bold">
            Our Vision
          </h3>

          <p className="mt-4 text-muted-foreground">
            Build the future of AI-powered property
            management and customer engagement.
          </p>
        </div>

      </div>
    </section>
  );
}