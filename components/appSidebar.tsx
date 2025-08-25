"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { navFooterLinks, navLinks } from "@/constants/navigation/nav";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-stone-800" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 pointer-events-none">
            <Image
              src="/images/shlogo.png"
              alt="logo syncHub"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-bold shadow-lg group-data-[collapsible=icon]:hidden">
              SyncHub
            </span>
          </div>
          <SidebarTrigger className="pointer-events-auto" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  className={cn(
                    "w-full justify-start",
                    pathname === link.href
                      ? "bg-neutral-800 rounded-2xl boxShadowLight dark:boxShadow"
                      : "",
                  )}
                >
                  <Link href={link.href}>
                    <link.icon className="w-5 h-5" />
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        playfairDisplay.className,
                      )}
                    >
                      {link.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="-ml-2">
        <SidebarGroup>
          <SidebarMenu>
            {navFooterLinks.map((link) => (
              <SidebarMenuItem key={link.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  className={cn(
                    "w-full justify-start",
                    pathname === link.href
                      ? "bg-neutral-800 rounded-2xl boxShadow"
                      : "",
                  )}
                >
                  <Link href={link.href}>
                    <link.icon className="w-5 h-5" />
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        playfairDisplay.className,
                      )}
                    >
                      {link.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild size="sm">
              <Link href="/privacy-terms">
                <span className="text-xs font-semibold text-cyan-500">
                  Conditions d'utilisation
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none">
            <SidebarGroupLabel asChild>
              <div className="px-2 py-1">
                <span className="text-xs font-semibold dark:text-muted-foreground">
                  Copyright © 2025 SyncHub. Tous droits réservés.
                </span>
              </div>
            </SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
