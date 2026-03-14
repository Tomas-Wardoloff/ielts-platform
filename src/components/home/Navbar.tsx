import Link from "next/link";
import { Show } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/90 pt-3 pb-3 backdrop-blur-md">
      <nav className="mx-auto flex items-center justify-between px-6 lg:px-10">
        {/* 1. Left: Logo and Name */}
        <div className="flex w-1/4 justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold leading-none tracking-tight text-gray-900 italic">
              IELTS Master
            </span>
          </Link>
        </div>

        {/* 2. Center: Nav Links */}
        <div className="flex w-2/4 justify-center">
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <Link
                href="#features"
                className="text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#modules"
                className="text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
              >
                Modules
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className="text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
              >
                How it works
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Right: CTA Actions */}
        <div className="flex w-1/4 justify-end">
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-brand hover:bg-brand-dark rounded-md px-5 py-2 text-sm font-medium text-white transition-colors"
              >
                Register
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="bg-brand hover:bg-brand-dark shadow-brand/20 inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
              >
                Dashboard
              </Link>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
}
