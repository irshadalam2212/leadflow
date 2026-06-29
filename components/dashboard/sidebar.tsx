"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  KanbanSquare,
  CheckSquare,
  MessageSquare,
} from "lucide-react";
import LogoutButton from "./logout-button";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Pipeline",
    href: "/dashboard/pipeline",
    icon: KanbanSquare,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: MessageSquare,
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-background">
      {/* Logo */}
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">
          LeadFlow
        </h2>

        <p className="text-sm text-muted-foreground">
          CRM Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
                }`}
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
