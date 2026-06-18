"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PropertyFilters() {
  return (
    <div className="mb-10 rounded-3xl border bg-card p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search properties..."
            className="pl-10"
          />
        </div>

        {/* Property Type */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="villa">
              Villa
            </SelectItem>

            <SelectItem value="apartment">
              Apartment
            </SelectItem>

            <SelectItem value="penthouse">
              Penthouse
            </SelectItem>

            <SelectItem value="duplex">
              Duplex
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Location */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="mumbai">
              Mumbai
            </SelectItem>

            <SelectItem value="pune">
              Pune
            </SelectItem>

            <SelectItem value="goa">
              Goa
            </SelectItem>

            <SelectItem value="bangalore">
              Bangalore
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Budget */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Budget" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="50">
              Under ₹50 Lakh
            </SelectItem>

            <SelectItem value="100">
              ₹50L - ₹1 Cr
            </SelectItem>

            <SelectItem value="200">
              ₹1 Cr - ₹2 Cr
            </SelectItem>

            <SelectItem value="300">
              Above ₹2 Cr
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}