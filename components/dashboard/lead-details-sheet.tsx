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

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  propertyId: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  message?: string;
  createdAt: string;
}

interface LeadDetailsSheetProps {
  lead: Lead;
}

export default function LeadDetailsSheet({
  lead,
}: LeadDetailsSheetProps) {

  const [assignedTo, setAssignedTo] =
    useState(lead.assignedTo || "");

  const [notes, setNotes] =
    useState(lead.notes || "");

  async function handleSave() {
    try {
      const response = await fetch(
        `/api/leads/${lead._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            assignedTo,
            notes,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error();
      }

      alert("Lead updated");
    } catch {
      alert("Failed to update lead");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          View
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-5 pb-5">
        <SheetHeader>
          <SheetTitle>
            Lead Details
          </SheetTitle>

          <SheetDescription>
            View complete lead information.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Lead Information */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">
              Lead Information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">
                  Name:
                </span>{" "}
                {lead.name}
              </div>

              <div>
                <span className="font-medium">
                  Email:
                </span>{" "}
                {lead.email}
              </div>

              <div>
                <span className="font-medium">
                  Phone:
                </span>{" "}
                {lead.phone}
              </div>

              <div>
                <span className="font-medium">
                  Budget:
                </span>{" "}
                {lead.budget}
              </div>

              <div>
                <span className="font-medium">
                  Status:
                </span>{" "}
                {lead.status}
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Assigned To
                </label>

                <select
                  value={assignedTo}
                  onChange={(e) =>
                    setAssignedTo(e.target.value)
                  }
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">
                    Unassigned
                  </option>

                  <option value="John">
                    John
                  </option>

                  <option value="Rahul">
                    Rahul
                  </option>

                  <option value="Amit">
                    Amit
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Property */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">
              Property Information
            </h3>

            <div className="text-sm">
              <span className="font-medium">
                Property ID:
              </span>{" "}
              {lead.propertyId}
            </div>
          </div>

          {/* Message */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">
              Customer Message
            </h3>

            <p className="text-sm text-muted-foreground">
              {lead.message ||
                "No message provided"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">
              Internal Notes
            </h3>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              rows={5}
              className="w-full rounded-lg border p-3"
              placeholder="Add notes..."
            />
          </div>

          {/* Timeline */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">
              Timeline
            </h3>

            <div className="text-sm">
              <span className="font-medium">
                Created At:
              </span>{" "}
              {new Date(
                lead.createdAt
              ).toLocaleString()}
            </div>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </SheetContent>
    </Sheet>
  );
}