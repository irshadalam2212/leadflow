"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Lead {
  _id: string;
  name: string;
  email: string;
  budget: string;
  status: string;
  createdAt: string;
}

interface PipelineBoardProps {
  leads: Lead[];
}

const columns = [
  { title: "New", status: "new" },
  { title: "Contacted", status: "contacted" },
  { title: "Qualified", status: "qualified" },
  { title: "Closed", status: "closed" },
  { title: "Lost", status: "lost" },
];

function LeadCard({ lead }: { lead: Lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    // transition,
  } = useDraggable({
    id: lead._id,
    data: {
      lead,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    // transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-xl border bg-background p-4 shadow-sm active:cursor-grabbing"
    >
      <h3 className="font-medium">{lead.name}</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {lead.email}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium">
          {lead.budget}
        </span>

        <span className="text-xs text-muted-foreground">
          {new Date(
            lead.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

function PipelineColumn({
  title,
  status,
  leads,
}: {
  title: string;
  status: string;
  leads: Lead[];
}) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="rounded-2xl border bg-card"
    >
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {title}
          </h2>

          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {leads.length}
          </span>
        </div>
      </div>

      <div className="min-h-125 space-y-4 p-4">
        {leads.map((lead) => (
          <LeadCard
            key={lead._id}
            lead={lead}
          />
        ))}
      </div>
    </div>
  );
}

export default function PipelineBoard({
  leads,
}: PipelineBoardProps) {
  const [items, setItems] = useState(leads);
  const [activeLead, setActiveLead] =
    useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  async function updateLeadStatus(
    leadId: string,
    status: string
  ) {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    setActiveLead(null);

    if (!over) return;

    const leadId = String(active.id);
    const newStatus = String(over.id);

    setItems((prev) =>
      prev.map((lead) =>
        lead._id === leadId
          ? {
              ...lead,
              status: newStatus,
            }
          : lead
      )
    );

    await updateLeadStatus(
      leadId,
      newStatus
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const lead = items.find(
          (item) =>
            item._id ===
            String(event.active.id)
        );

        if (lead) {
          setActiveLead(lead);
        }
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {columns.map((column) => (
          <PipelineColumn
            key={column.status}
            title={column.title}
            status={column.status}
            leads={items.filter(
              (lead) =>
                lead.status ===
                column.status
            )}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <LeadCard lead={activeLead} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}