import { AppSidebar } from '@/components/layouts/sidebar-layout/app-sidebar';
import { AppNavbar } from '@/components/layouts/sidebar-layout/app-navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SidePanel } from '@/components/ui/side-panel';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col overflow-hidden">
        <SidebarTrigger className="absolute z-10" />
        {children}
        <AppNavbar />
        <SidePanel /> {/* Add your side-panel here */}

      </main>
    </SidebarProvider>
  );
}
