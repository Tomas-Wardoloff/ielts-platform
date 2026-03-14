import { currentUser } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/lib/sidebar-context";
import { DashboardMain } from "@/components/shared/DashboardMain";
import { getOrCreateUser } from "@/lib/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getOrCreateUser();
  const user = await currentUser();
  const displayName =
    user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? "Account";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar displayName={displayName} />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </SidebarProvider>
  );
}
