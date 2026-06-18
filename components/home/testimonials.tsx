import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Sales Manager",
    company: "Prime Realty",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    review:
      "LeadFlow completely transformed our lead management process. Our sales team receives instant notifications and follow-ups are now automated.",
  },
  {
    name: "Priya Mehta",
    role: "Real Estate Consultant",
    company: "Urban Homes",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    review:
      "The CRM dashboard is intuitive and easy to use. Tracking leads and customer interactions has never been this simple.",
  },
  {
    name: "Amit Verma",
    role: "Business Owner",
    company: "Property Hub",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    review:
      "The automated reminder workflow helped us reduce missed follow-ups and significantly improved our lead conversion rate.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Trusted By Growing Real Estate Teams
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See how businesses are improving lead management,
            automating workflows, and closing deals faster with
            LeadFlow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="leading-7 text-muted-foreground">
                  "{testimonial.review}"
                </p>

                {/* User */}
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {testimonial.name}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>

                    <p className="text-xs text-primary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}