"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { sousNavLinks } from "@/constants/navigation/souNav";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/authState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Settings } from "lucide-react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background my-11">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos préférences et paramètres de compte
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8 max-lg:flex-col">
          {/* Sidebar Navigation */}
          <aside className="w-64 max-lg:w-full">
            <Card className="sticky top-10">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sousNavLinks(user?.id || "").map((link) => (
                    <Link key={link.id} href={link.href}>
                      <Button
                        className={cn(
                          "w-full justify-start h-12 px-4 text-left transition-all duration-200",
                          pathname === link.href
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted hover:text-foreground bg-transparent text-muted-foreground",
                        )}
                        variant={pathname === link.href ? "default" : "ghost"}
                      >
                        <link.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{link.title}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
