"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Please enter a valid email"),
    phone: z.string().min(10, "Enter a valid phone number"),
    budget: z.string().min(1, "Budget is required"),
    message: z.string().optional(),
});

type LeadInquiryFormValues = z.infer<typeof formSchema>;
interface LeadInquiryFormProps {
    propertyId: string;
}

export default function LeadInquiryForm({ propertyId }: LeadInquiryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<LeadInquiryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            budget: "",
            message: "",
        },
    });

    async function onSubmit(values: LeadInquiryFormValues) {
        try {
            setIsSubmitting(true);
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...values,
                    propertyId,
                }),
            });
            setIsSubmitting(false);
            const data = await response.json();

            console.log("Response:", data);

            if (data.success) {
                alert("Inquiry submitted successfully!");

                form.reset();
            }
        } catch (error) {
            console.error("Submission failed:", error);

            alert("Something went wrong.");
        }
    }

    return (
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold">
                    Interested In This Property?
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form and our sales team will get in touch
                    with you shortly.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="+91 9876543210"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="₹1 Cr"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>

                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us more about your requirements..."
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full rounded-xl"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Inquiry"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}