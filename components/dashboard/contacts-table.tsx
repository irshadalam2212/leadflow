"use client";

import { Badge } from "../ui/badge";
import ContactDetailsSheet from "./contact-details-sheet";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: string;
  createdAt: string;
  message: string;
}

interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactsTable({
  contacts,
}: ContactsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="p-4 text-left">
              Name
            </th>
            <th className="p-4 text-left">
              Subject
            </th>
            <th className="p-4 text-left">
              Status
            </th>
            <th className="p-4 text-left">
              Date
            </th>
            <th className="p-4 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact._id}
              className="border-t"
            >
              <td className="p-4">
                <div className="font-medium">
                  {contact.name}
                </div>

                <div className="text-sm text-muted-foreground">
                  {contact.email}
                </div>
              </td>

              <td className="p-4">
                {contact.subject}
              </td>

              <td className="p-4">
                <Badge>
                  {contact.status}
                </Badge>
              </td>

              <td className="p-4">
                {new Date(
                  contact.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-center">
                <ContactDetailsSheet
                  contact={contact}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {contacts.length === 0 && (
        <div className="p-10 text-center text-muted-foreground">
          No contact messages found.
        </div>
      )}
    </div>
  );
}