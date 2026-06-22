"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";

export interface DashboardProperty {
  _id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  createdAt: string;
}

type PropertyFields = Omit<DashboardProperty, "_id" | "createdAt">;

const emptyProperty: PropertyFields = {
  title: "",
  location: "",
  price: "",
  image: "",
  bedrooms: 0,
  bathrooms: 0,
  area: "",
};

interface PropertyFormDialogProps {
  property?: DashboardProperty;
  onSaved: (property: DashboardProperty) => void;
}

function PropertyFormDialog({ property, onSaved }: PropertyFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PropertyFields>(
    property
      ? {
          title: property.title,
          location: property.location,
          price: property.price,
          image: property.image,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
        }
      : emptyProperty
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof PropertyFields, value: string | number) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(
        property ? `/api/properties/${property._id}` : "/api/properties",
        {
          method: property ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save property.");
      }

      onSaved(data.property);
      setOpen(false);
      if (!property) setForm(emptyProperty);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save property."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {property ? (
          <Button variant="outline" size="icon-sm" aria-label={`Edit ${property.title}`}>
            <Pencil />
          </Button>
        ) : (
          <Button size="lg">
            <Plus />
            Add Property
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{property ? "Edit property" : "Add property"}</DialogTitle>
          <DialogDescription>
            {property
              ? "Update the listing details below."
              : "Enter the details for the new property listing."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Property title">
              <Input
                required
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Luxury Villa"
              />
            </FormField>
            <FormField label="Location">
              <Input
                required
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Mumbai, Maharashtra"
              />
            </FormField>
            <FormField label="Price">
              <Input
                required
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="₹2.5 Cr"
              />
            </FormField>
            <FormField label="Area">
              <Input
                required
                value={form.area}
                onChange={(event) => updateField("area", event.target.value)}
                placeholder="3200 sqft"
              />
            </FormField>
            <FormField label="Bedrooms">
              <Input
                required
                min={0}
                type="number"
                value={form.bedrooms}
                onChange={(event) => updateField("bedrooms", Number(event.target.value))}
              />
            </FormField>
            <FormField label="Bathrooms">
              <Input
                required
                min={0}
                type="number"
                value={form.bathrooms}
                onChange={(event) => updateField("bathrooms", Number(event.target.value))}
              />
            </FormField>
          </div>
          <FormField label="Image URL">
            <Input
              required
              type="url"
              value={form.image}
              onChange={(event) => updateField("image", event.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </FormField>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : property ? "Save changes" : "Add property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}

function DeletePropertyButton({
  property,
  onDeleted,
}: {
  property: DashboardProperty;
  onDeleted: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/properties/${property._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete property.");
      }

      onDeleted(property._id);
      setOpen(false);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete property."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon-sm" aria-label={`Delete ${property.title}`}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete property?</DialogTitle>
          <DialogDescription>
            “{property.title}” will be permanently removed. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete property"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PropertiesTable({
  initialProperties,
}: {
  initialProperties: DashboardProperty[];
}) {
  const [properties, setProperties] = useState(initialProperties);

  function handleSaved(savedProperty: DashboardProperty) {
    setProperties((current) => {
      const exists = current.some((property) => property._id === savedProperty._id);

      return exists
        ? current.map((property) =>
            property._id === savedProperty._id ? savedProperty : property
          )
        : [savedProperty, ...current];
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <PropertyFormDialog onSaved={handleSaved} />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Bathrooms</TableHead>
              <TableHead>Area</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No properties yet. Add your first property to get started.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* Native image keeps dashboard previews compatible with any remote URL. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={property.image}
                        alt=""
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                      <span className="max-w-52 truncate font-medium">{property.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell className="font-medium">{property.price}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
                  <TableCell>{property.area}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <PropertyFormDialog property={property} onSaved={handleSaved} />
                      <DeletePropertyButton
                        property={property}
                        onDeleted={(id) =>
                          setProperties((current) =>
                            current.filter((item) => item._id !== id)
                          )
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
