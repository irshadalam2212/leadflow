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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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
  description: string;
  amenities: string[];
  status: "available" | "sold" | "pending";
  createdAt: string;
}

type PropertyFields = Omit<
  DashboardProperty,
  "_id" | "createdAt" | "amenities"
> & {
  amenities: string;
};

const emptyProperty: PropertyFields = {
  title: "",
  location: "",
  price: "",
  image: "",
  bedrooms: 0,
  bathrooms: 0,
  area: "",
  description: "",
  amenities: "",
  status: "available",
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
          description: property.description ?? "",
          amenities: (property.amenities ?? []).join(", "),
          status: property.status ?? "available",
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
          body: JSON.stringify({
            ...form,
            amenities: form.amenities
              .split(",")
              .map((amenity) => amenity.trim())
              .filter(Boolean),
          }),
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
          <FormField label="Description">
            <Textarea
              required
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Describe the property, location advantages, and key features."
              className="min-h-24"
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Amenities">
              <Input
                value={form.amenities}
                onChange={(event) =>
                  updateField("amenities", event.target.value)
                }
                placeholder="Pool, Gym, Parking"
              />
              <span className="block text-xs font-normal text-muted-foreground">
                Separate amenities with commas.
              </span>
            </FormField>
            <FormField label="Status">
              <Select
                value={form.status}
                onValueChange={(value) => updateField("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
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
                      <div className="max-w-52">
                        <p className="truncate font-medium">{property.title}</p>
                        {property.description && (
                          <p className="truncate text-xs text-muted-foreground">
                            {property.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell className="font-medium">{property.price}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
                  <TableCell>{property.area}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        property.status === "sold"
                          ? "bg-destructive/10 text-destructive"
                          : property.status === "pending"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      }`}
                    >
                      {property.status ?? "available"}
                    </span>
                  </TableCell>
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
