"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import Badge from "./Badge";
import HeroWidget from "./HeroWidget";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 border-b border-gray-200 px-6 pt-36 pb-20 md:flex-row lg:px-10">
      <div className="relative flex-1 space-y-6">
        <Badge content="E-LEARNING REIMAGINED" />
        <h1 className="font-serif text-5xl leading-tight text-gray-900 md:text-6xl lg:text-[72px]">
          Reach your <br />
          <span className="text-brand">Band Score</span> <br />
          goal — faster.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-gray-500">
          Master all four IELTS modules with adaptive practice, real-time AI
          feedback, and full mock simulations. From Band 5.0 to Band 8 — we'll
          get you there.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="rounded-md border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="bg-brand hover:bg-brand-dark flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Register <span aria-hidden="true">&rarr;</span>
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="bg-brand hover:bg-brand-dark shadow-brand/20 inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Go to Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
          </Show>
        </div>

        <div className="flex flex-col gap-2 pt-6 sm:flex-row sm:items-center">
          <div className="flex -space-x-3">
            {[
              "https://api.dicebear.com/9.x/notionists/svg?seed=Felix",
              "https://api.dicebear.com/9.x/notionists/svg?seed=Aiden",
              "https://api.dicebear.com/9.x/notionists/svg?seed=Emery",
              "https://api.dicebear.com/9.x/notionists/svg?seed=Jasper",
            ].map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt={`User avatar ${i + 1}`}
                className="bg-brand-light relative z-10 h-10 w-10 rounded-full border-2 border-[#fafafa]"
                style={{ zIndex: 4 - i }}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-600 sm:ml-4">
            <span className="font-bold text-gray-900">10,000+ students</span>{" "}
            already reached their score.
          </p>
        </div>
      </div>

      <HeroWidget />
    </section>
  );
}
