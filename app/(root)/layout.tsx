"use client";
import { AppSidebar } from "@/components/appSidebar";
import { TopNavigation } from "@/components/top-navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <TopNavigation />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
