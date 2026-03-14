import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-white px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
          GET STARTED TODAY
        </p>
        <h2 className="mb-8 font-serif text-4xl leading-tight text-gray-900 md:text-5xl lg:text-[56px]">
          Your target band score <br /> is{" "}
          <span className="text-brand font-medium italic">within reach.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          Join thousands of self-learning students using IELTS Master to prepare
          smarter, score higher, and open doors to the universities and
          opportunities they deserve.
        </p>

        <Show when="signed-out">
          <Button
            href="/sign-up"
            size="lg"
            rightIcon={<MoveRight size={14} />}
            className="shadow-brand/20 shadow-lg hover:scale-105"
          >
            Start Practicing Free
          </Button>
        </Show>
        <Show when="signed-in">
          <Button
            href="/dashboard"
            size="lg"
            className="shadow-brand/20 shadow-lg hover:scale-105"
          >
            Go to Dashboard
          </Button>
        </Show>
        <p className="mt-6 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          No credit card required • Free forever on basic plan
        </p>
      </div>
    </section>
  );
}
