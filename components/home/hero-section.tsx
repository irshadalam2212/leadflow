"use client";

import { ArrowRight, BadgeCheck, Building2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/shared/container";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden py-10 lg:py-10 mb-6">
            {/* Background Blur */}
            <div className="absolute left-0 top-0 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />

            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        {/* Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm font-medium">
                            <BadgeCheck className="h-4 w-4 text-primary" />

                            Smart Real Estate CRM Platform
                        </div>

                        {/* Heading */}
                        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight lg:text-5xl">
                            Find Your Dream Property With Ease
                        </h1>

                        {/* Description */}
                        <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
                            Discover premium properties, automate lead
                            management, and connect with trusted real
                            estate experts through our modern CRM-driven
                            platform.
                        </p>

                        {/* Actions */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-xl px-8">
                                Explore Properties

                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-xl px-8"
                            >
                                Book Consultation
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="mt-14 grid grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-3xl font-bold">2K+</h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Properties
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">1.5K+</h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Happy Clients
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">98%</h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Satisfaction
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="overflow-hidden rounded-[32px] border shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
                                alt="Luxury Property"
                                className="h-110 w-full object-cover"
                            />
                        </div>

                        {/* Floating Property Card */}
                        <Card className="absolute -bottom-10 left-1/2 w-[90%] -translate-x-1/2 rounded-3xl border bg-background/90 shadow-2xl backdrop-blur-xl">
                            <CardContent className="flex items-center justify-between gap-6 p-6">
                                {/* Left */}
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-primary/10 p-4">
                                        <Building2 className="h-8 w-8 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Premium Villa
                                        </h3>

                                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />

                                            Mumbai, India
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                        Starting From
                                    </p>

                                    <h3 className="text-2xl font-bold">
                                        ₹2.5 Cr
                                    </h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </section>
    );
}