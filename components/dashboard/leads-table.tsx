"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    budget: string;
    propertyId: string;
    status: string;
    createdAt: string;
}

interface LeadsTableProps {
    leads: Lead[];
}

export default function LeadsTable({
    leads,
}: LeadsTableProps) {
    const [updatingId, setUpdatingId] = useState<
        string | null
    >(null);

    //function 
    const updateLeadStatus = async (
        leadId: string,
        status: string
    ) => {
        try {
            setUpdatingId(leadId);
            const response = await fetch(`/api/leads/${leadId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Update failed"
                );
            }
        } catch (error) {
            console.error("Error updating lead status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Property ID</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {leads.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="h-24 text-center"
                            >
                                No leads found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        leads.map((lead) => (
                            <TableRow key={lead._id}>
                                <TableCell className="font-medium">
                                    {lead.name}
                                </TableCell>

                                <TableCell>{lead.email}</TableCell>

                                <TableCell>{lead.phone}</TableCell>

                                <TableCell>
                                    {lead.propertyId}
                                </TableCell>

                                <TableCell>{lead.budget}</TableCell>

                                <TableCell>
                                    <Select
                                        defaultValue={lead.status}
                                        onValueChange={(value) =>
                                            updateLeadStatus(lead._id, value)
                                        }
                                    >
                                        <SelectTrigger
                                            className="w-35"
                                            disabled={updatingId === lead._id}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="new">
                                                New
                                            </SelectItem>

                                            <SelectItem value="contacted">
                                                Contacted
                                            </SelectItem>

                                            <SelectItem value="qualified">
                                                Qualified
                                            </SelectItem>

                                            <SelectItem value="closed">
                                                Closed
                                            </SelectItem>

                                            <SelectItem value="lost">
                                                Lost
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        lead.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}