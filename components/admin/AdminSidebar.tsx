"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  Settings,
  MessageSquare,
  Palette,
  Shield,
  Bell,
  FileText,
} from "lucide-react";

interface AdminSidebarProps {
  communityId: string;
}

const adminNavItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: BarChart3,
    href: "admin",
    description: "Vue d'ensemble et métriques",
  },
  {
    id: "members",
    title: "Membres",
    icon: Users,
    href: "admin/members",
    description: "Gestion des membres et rôles",
  },
  {
    id: "channels",
    title: "Canaux",
    icon: MessageSquare,
    href: "admin/channels",
    description: "Gestion des canaux de discussion",
  },
  {
    id: "appearance",
    title: "Apparence",
    icon: Palette,
    href: "admin/appearance",
    description: "Thèmes et personnalisation",
  },
  {
    id: "moderation",
    title: "Modération",
    icon: Shield,
    href: "admin/moderation",
    description: "Outils de modération",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    href: "admin/notifications",
    description: "Paramètres de notifications",
  },
  {
    id: "rules",
    title: "Règles",
    icon: FileText,
    href: "admin/rules",
    description: "Règles de la communauté",
  },
  {
    id: "settings",
    title: "Paramètres",
    icon: Settings,
    href: "admin/settings",
    description: "Configuration générale",
  },
];

export function AdminSidebar({ communityId }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Administration
        </h2>

        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const href = pathname.includes("/admin/")
              ? pathname.replace(/\/admin.*/, `/${item.href}`)
              : `${pathname}/${item.href}`;

            const isActive = pathname.endsWith(item.href) ||
              (item.href === "admin" && pathname.endsWith("/admin"));

            return (
              <Link
                key={item.id}
                href={href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
