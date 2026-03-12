"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect
          x="9"
          y="2"
          width="5"
          height="5"
          rx="1.5"
          fill="currentColor"
          opacity=".5"
        />
        <rect
          x="2"
          y="9"
          width="5"
          height="5"
          rx="1.5"
          fill="currentColor"
          opacity=".5"
        />
        <rect
          x="9"
          y="9"
          width="5"
          height="5"
          rx="1.5"
          fill="currentColor"
          opacity=".25"
        />
      </svg>
    ),
  },
];

const modules = [
  {
    label: "Reading",
    href: "/reading",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
        <rect
          x="2"
          y="7"
          width="9"
          height="2"
          rx="1"
          fill="currentColor"
          opacity=".6"
        />
        <rect
          x="2"
          y="11"
          width="10"
          height="2"
          rx="1"
          fill="currentColor"
          opacity=".35"
        />
      </svg>
    ),
  },
  {
    label: "Listening",
    href: "/listening",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" fill="currentColor" opacity=".8" />
        <path
          d="M3.5 8a4.5 4.5 0 009 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity=".4"
        />
      </svg>
    ),
  },
  {
    label: "Writing",
    href: "/writing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12l7-7 2 2-7 7H3v-2z" fill="currentColor" opacity=".8" />
        <path
          d="M10 5l1.5-1.5a1.4 1.4 0 012 2L12 7l-2-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Speaking",
    href: "/speaking",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="6"
          y="2"
          width="4"
          height="7"
          rx="2"
          fill="currentColor"
          opacity=".8"
        />
        <path
          d="M4 8a4 4 0 008 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity=".5"
        />
        <line
          x1="8"
          y1="12"
          x2="8"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".5"
        />
      </svg>
    ),
  },
];

const secondary = [
  {
    label: "Learn",
    href: "/learn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4l6-2 6 2v5c0 3-6 5-6 5S2 12 2 9V4z"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="none"
          opacity=".7"
        />
      </svg>
    ),
  },
  {
    label: "Simulate",
    href: "/simulate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="none"
          opacity=".7"
        />
        <path
          d="M8 4v4l3 2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity=".7"
        />
      </svg>
    ),
  },
];

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-brand-light text-brand font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className={isActive ? "text-brand" : "text-gray-400"}>{icon}</span>
      {label}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-600 mb-1 px-3 text-[11px] tracking-wider text-gray-400 uppercase">
      {children}
    </p>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 flex h-screen w-56 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-brand flex h-7 w-7 items-center justify-center rounded-lg">
            <span className="text-[11px] font-bold text-white">IM</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            IELTS Master
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <div>
          {navigation.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>

        <div>
          <SectionLabel>Practice</SectionLabel>
          <div className="space-y-0.5">
            {modules.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Study</SectionLabel>
          <div className="space-y-0.5">
            {secondary.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <UserButton afterSignOutUrl="/" />
          <span className="truncate text-sm text-gray-600">My account</span>
        </div>
      </div>
    </aside>
  );
}
