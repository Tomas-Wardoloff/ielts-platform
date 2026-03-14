"use client";

import { useSidebar } from "@/lib/sidebar-context";

export function DashboardMain({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={`flex-1 transition-all duration-300 ${
        collapsed ? "ml-14" : "ml-56"
      }`}
    >
      {children}
    </main>
  );
}
