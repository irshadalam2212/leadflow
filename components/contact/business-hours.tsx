const hours = [
  ["Monday", "9:00 AM - 6:00 PM"],
  ["Tuesday", "9:00 AM - 6:00 PM"],
  ["Wednesday", "9:00 AM - 6:00 PM"],
  ["Thursday", "9:00 AM - 6:00 PM"],
  ["Friday", "9:00 AM - 6:00 PM"],
  ["Saturday", "10:00 AM - 4:00 PM"],
  ["Sunday", "Closed"],
];

export default function BusinessHours() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Business Hours
          </h2>

          <div className="space-y-4">
            {hours.map(([day, time]) => (
              <div
                key={day}
                className="flex justify-between border-b pb-3"
              >
                <span>{day}</span>
                <span className="font-medium">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}