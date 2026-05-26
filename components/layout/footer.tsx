import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
    Globe
} from "lucide-react";

const footerLinks = {
    company: [
        {
            label: "About Us",
            href: "/about",
        },
        {
            label: "Properties",
            href: "/properties",
        },
        {
            label: "Contact",
            href: "/contact",
        },
        {
            label: "Careers",
            href: "/careers",
        },
    ],

    services: [
        {
            label: "Buy Property",
            href: "/buy",
        },
        {
            label: "Sell Property",
            href: "/sell",
        },
        {
            label: "Property Consultation",
            href: "/consultation",
        },
        {
            label: "Investment Planning",
            href: "/investment",
        },
    ],
};

const socialLinks = [
    {
        icon: Globe,
        href: "#",
    },
];

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                                LF
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    LeadFlow
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Smart CRM Automation
                                </p>
                            </div>
                        </div>

                        <p className="mb-6 text-sm leading-7 text-muted-foreground">
                            A modern real estate CRM automation platform
                            helping businesses manage leads, automate
                            workflows, and improve customer engagement.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition-colors hover:bg-muted"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-5 text-base font-semibold">
                            Company
                        </h3>

                        <div className="flex flex-col gap-4">
                            {footerLinks.company.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-5 text-base font-semibold">
                            Services
                        </h3>

                        <div className="flex flex-col gap-4">
                            {footerLinks.services.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-base font-semibold">
                            Contact
                        </h3>

                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-primary" />

                                <p className="text-sm text-muted-foreground">
                                    Mumbai, Maharashtra, India
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />

                                <p className="text-sm text-muted-foreground">
                                    +91 98765 43210
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />

                                <p className="text-sm text-muted-foreground">
                                    support@leadflow.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-center md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © 2026 LeadFlow. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy-policy"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}