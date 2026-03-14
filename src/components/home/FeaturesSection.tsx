import Link from "next/link";
import { Show } from "@clerk/nextjs";

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
          <Link
            href="/sign-up"
            className="bg-brand hover:bg-brand-dark shadow-brand/20 inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            Start Practicing Free &rarr;
          </Link>
        </Show>
        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="bg-brand hover:bg-brand-dark shadow-brand/20 inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            Go to Dashboard &rarr;
          </Link>
        </Show>
        <p className="mt-6 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          No credit card required • Free forever on basic plan
        </p>
      </div>
    </section>
  );
}
