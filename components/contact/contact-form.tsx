"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully.");
    }, 1000);
  }

  return (
    <div className="rounded-2xl border bg-card p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Send us a Message
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          placeholder="Full Name"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border p-3"
        />

        <input
          placeholder="Phone Number"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          rows={6}
          placeholder="Your Message"
          className="w-full rounded-lg border p-3"
        />

        <Button
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Message"}
        </Button>
      </form>
    </div>
  );
}