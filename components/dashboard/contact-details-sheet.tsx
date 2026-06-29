"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
}

export default function ContactDetailsSheet({
  contact,
}: {
  contact: Contact;
}) {
  const [status, setStatus] =
    useState(contact.status);

  async function saveStatus() {
    await fetch(
      `/api/contact/${contact._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    alert("Status updated");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="outline"
        >
          View
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            Contact Details
          </SheetTitle>

          <SheetDescription>
            Customer inquiry information.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-5">
          <div>
            <strong>Name:</strong>{" "}
            {contact.name}
          </div>

          <div>
            <strong>Email:</strong>{" "}
            {contact.email}
          </div>

          <div>
            <strong>Phone:</strong>{" "}
            {contact.phone}
          </div>

          <div>
            <strong>Subject:</strong>{" "}
            {contact.subject}
          </div>

          <div>
            <strong>Message:</strong>

            <p className="mt-2 rounded-lg border p-4">
              {contact.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full rounded-lg border p-2"
            >
              <option value="new">
                New
              </option>

              <option value="in_progress">
                In Progress
              </option>

              <option value="resolved">
                Resolved
              </option>
            </select>
          </div>

          <Button
            className="w-full"
            onClick={saveStatus}
          >
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}