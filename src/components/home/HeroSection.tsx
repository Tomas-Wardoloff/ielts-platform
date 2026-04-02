"use client";

import { Show } from "@clerk/nextjs";
import Badge from "./Badge";
import HeroWidget from "./HeroWidget";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { Typewriter } from "./animations/Typewriter";
import { FadeIn } from "./animations/FadeIn";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 border-b border-gray-200 px-6 pt-36 pb-20 md:flex-row lg:px-10">
      <div className="relative flex-1 space-y-6">
        <Badge content="E-LEARNING REIMAGINED" />

        <FadeIn delay={0.1}>
          <h1 className="font-serif text-5xl leading-tight text-gray-900 md:text-6xl lg:text-[72px]">
            Reach your <br />
            <span className="text-brand">
              <Typewriter
                words={["Band Score", "Target Score", "Dream Score"]}
                speed={75}
                pauseDuration={2200}
                className="italic"
              />
            </span>{" "}
            <br />
            goal — faster.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="max-w-md text-lg leading-relaxed text-gray-500">
            Master all four IELTS modules with adaptive practice, real-time AI
            feedback, and full mock simulations. From Band 5.0 to Band 8 — we'll
            get you there.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex items-center gap-4 pt-2">
            <Show when="signed-out">
              <Button href="/sign-up" rightIcon={<MoveRight size={14} />}>
                Register
              </Button>
              <Button href="/sign-in" variant="outline">
                Sign In
              </Button>
            </Show>
            <Show when="signed-in">
              <Button
                href="/dashboard"
                size="lg"
                rightIcon={<MoveRight size={14} />}
                className="shadow-brand/20 shadow-lg hover:scale-105"
              >
                Go to Dashboard
              </Button>
            </Show>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
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
        </FadeIn>
      </div>

      <HeroWidget />
    </section>
  );
}
