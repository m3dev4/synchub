"use client";
import { AppSidebar } from "@/components/appSidebar";
import FloatingDockDemo from "@/components/floating-dock";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-screen overflow-hidden relative">
        <FloatingDockDemo />
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
