export default function OfficeMap() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold">
          Visit Our Office
        </h2>

        <p className="mt-3 text-muted-foreground">
          We'd love to meet you in person.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <iframe
          src="https://www.google.com/maps?q=Mumbai&output=embed"
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  );
}