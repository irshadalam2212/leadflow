import LeadStatusOverview from "@/components/dashboard/lead-status-overview";
import RecentActivity from "@/components/dashboard/recent-activity";
import RecentLeads from "@/components/dashboard/recent-leads";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import {
    Users,
    UserPlus,
    PhoneCall,
    BadgeCheck,
} from "lucide-react";

export default async function DashboardPage() {
    await connectDB();

    const [
        totalLeads,
        newLeads,
        contactedLeads,
        closedLeads,
        qualifiedLeads,
        lostLeads,
    ] = await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ status: "new" }),
        Lead.countDocuments({ status: "contacted" }),
        Lead.countDocuments({ status: "closed" }),
        Lead.countDocuments({ status: "qualified" }),
        Lead.countDocuments({ status: "lost" }),
    ]);

    const stats = [
        {
            title: "Total Leads",
            value: totalLeads,
            icon: Users,
        },
        {
            title: "New Leads",
            value: newLeads,
            icon: UserPlus,
        },
        {
            title: "Contacted",
            value: contactedLeads,
            icon: PhoneCall,
        },
        {
            title: "Closed",
            value: closedLeads,
            icon: BadgeCheck,
        },
    ];

    const recentLeads = await Lead.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const leads = await Lead.find({})
        .select("name activity")
        .lean();

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Overview of your lead management system.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border bg-card p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        {stat.value}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Recent Leads Section */}
            <div className="mt-10">
                <RecentLeads
                    leads={JSON.parse(
                        JSON.stringify(recentLeads)
                    )}
                />
            </div>
            {/* Recent Activity Section */}
            <div className="mt-10">
                <RecentActivity
                    leads={JSON.parse(
                        JSON.stringify(leads)
                    )}
                />
            </div>
            {/* Recent lead status overview section */}
            <div className="mt-10">
                <LeadStatusOverview
                    stats={{
                        new: newLeads,
                        contacted: contactedLeads,
                        qualified: qualifiedLeads,
                        closed: closedLeads,
                        lost: lostLeads,
                    }}
                />
            </div>
        </div>
    );
}