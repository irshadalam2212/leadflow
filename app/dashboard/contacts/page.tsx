import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import ContactsTable from "@/components/dashboard/contacts-table";

export default async function ContactsPage() {
  await connectDB();

  const contacts = await Contact.find({})
    .sort({
      createdAt: -1,
    })
    .lean();

  return (
    <div className="container mx-auto space-y-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold">
          Contact Messages
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage customer inquiries and support requests.
        </p>
      </div>

      <ContactsTable
        contacts={JSON.parse(
          JSON.stringify(contacts)
        )}
      />
    </div>
  );
}