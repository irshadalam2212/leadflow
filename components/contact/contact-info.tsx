import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6">
        <Phone className="mb-4 h-8 w-8 text-primary" />

        <h3 className="text-xl font-semibold">
          Phone
        </h3>

        <p className="mt-2 text-muted-foreground">
          +91 98765 43210
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <Mail className="mb-4 h-8 w-8 text-primary" />

        <h3 className="text-xl font-semibold">
          Email
        </h3>

        <p className="mt-2 text-muted-foreground">
          support@leadflow.com
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <MapPin className="mb-4 h-8 w-8 text-primary" />

        <h3 className="text-xl font-semibold">
          Office
        </h3>

        <p className="mt-2 text-muted-foreground">
          123 Business Park,
          Mumbai, Maharashtra,
          India
        </p>
      </div>
    </div>
  );
}