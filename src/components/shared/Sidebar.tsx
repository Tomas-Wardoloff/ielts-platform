"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useSidebar } from "@/lib/sidebar-context";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  LayoutDashboard,
  GraduationCap,
  Timer,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard size={16} />,
  },
];

const modules = [
  {
    label: "Reading",
    href: "/reading",
    icon: <BookOpen size={16} />,
  },
  {
    label: "Listening",
    href: "/listening",
    icon: <Headphones size={16} />,
  },
  {
    label: "Writing",
    href: "/writing",
    icon: <PenTool size={16} />,
  },
  {
    label: "Speaking",
    href: "/speaking",
    icon: <Mic size={16} />,
  },
];

const secondary = [
  {
    label: "Learn",
    href: "/learn",
    icon: <GraduationCap size={16} />,
  },
  {
    label: "Simulate",
    href: "/simulate",
    icon: <Timer size={16} />,
  },
];

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function NavItem({ href, icon, label, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (pathname.startsWith(href + "/") && href !== "/dashboard");

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
        collapsed ? "justify-center" : ""
      } ${
        isActive
          ? "bg-brand-light text-brand font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className={`shrink-0 ${isActive ? "text-brand" : "text-gray-400"}`}>
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function SectionLabel({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  if (collapsed) return <div className="my-1 border-t border-gray-100" />;
  return (
    <p className="mb-1 px-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
      {children}
    </p>
  );
}

export function Sidebar({ displayName }: { displayName: string }) {
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Header */}
      <div className="flex h-14.25 shrink-0 items-center border-b border-gray-200 px-3">
        {collapsed ? (
          <button
            onClick={toggle}
            className="mx-auto flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Expand sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Link href="/dashboard">
                <span className="font-serif text-xl leading-none font-bold tracking-tight text-gray-900 italic">
                  IELTS Master
                </span>
              </Link>
            </div>
            <button
              onClick={toggle}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Collapse sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto px-2 py-4">
        <div>
          {navigation.map((item) => (
            <NavItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </div>
        <div>
          <SectionLabel collapsed={collapsed}>Practice</SectionLabel>
          <div className="space-y-0.5">
            {modules.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel collapsed={collapsed}>Study</SectionLabel>
          <div className="space-y-0.5">
            {secondary.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-gray-100 px-2 py-3">
        <div
          className={`flex items-center gap-2.5 px-1 ${collapsed ? "justify-center" : ""}`}
        >
          <UserButton />
          {!collapsed && (
            <span className="truncate text-sm text-gray-600">
              {displayName}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
