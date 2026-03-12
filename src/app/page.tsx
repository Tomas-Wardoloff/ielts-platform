import Link from "next/link";
import { Show } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex items-center justify-between border-b border-gray-100 px-10 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-brand flex h-7 w-7 items-center justify-center rounded-lg">
            <span className="text-[11px] font-bold text-white">IM</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            IELTS Master
          </span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#modules"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Modules
          </Link>
          <Link
            href="#features"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Features
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="bg-brand hover:bg-brand-dark rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Get started free
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="bg-brand hover:bg-brand-dark rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Go to dashboard →
            </Link>
          </Show>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-10 py-24 text-center">
        <div className="bg-brand-light text-brand mb-8 inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium">
          <span className="bg-brand h-1.5 w-1.5 rounded-full" />
          Complete IELTS preparation platform
        </div>
        <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-gray-900">
          Your path to the <span className="text-brand">band score</span> you
          need
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          Learn English, practice all four exam modules, and get real AI
          feedback. Everything in one place, no distractions.
        </p>
        <div className="mb-4 flex items-center justify-center gap-3">
          <Show when="signed-out">
            <Link
              href="/sign-up"
              className="bg-brand hover:bg-brand-dark rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              Start for free
            </Link>
            <Link
              href="#modules"
              className="rounded-lg border border-gray-200 px-6 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-50"
            >
              See how it works →
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="bg-brand hover:bg-brand-dark rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              Go to dashboard →
            </Link>
          </Show>
        </div>
        <p className="text-xs text-gray-400">
          No credit card required · Free forever on the basic plan
        </p>
      </section>

      <section className="bg-brand-light border-y border-red-100 px-10 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-brand mb-3 text-center text-xs font-semibold tracking-widest uppercase">
            Four modules · One place
          </p>
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Everything you need for the exam
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-sm leading-relaxed text-gray-500">
            From grammar fundamentals to full timed simulations with real
            scoring.
          </p>
          <div id="modules" className="grid grid-cols-2 gap-4">
            {[
              {
                name: "Reading",
                description:
                  "Academic passages with all official IELTS question types. Instant correction and answer explanations.",
                tag: "Available",
              },
              {
                name: "Writing",
                description:
                  "Submit your essays and get AI band scores across all four official IELTS criteria.",
                tag: "Available",
              },
              {
                name: "Listening",
                description:
                  "Audio exercises with transcription and detailed error analysis after each attempt.",
                tag: "Available",
              },
              {
                name: "Speaking",
                description:
                  "Record your responses and receive feedback on fluency, vocabulary, and pronunciation.",
                tag: "Coming soon",
              },
            ].map((mod) => (
              <div
                key={mod.name}
                className="hover:border-brand rounded-xl border border-red-100 bg-white p-6 transition-colors"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {mod.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      mod.tag === "Available"
                        ? "bg-brand-light text-brand"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {mod.tag}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-500">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-10 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
          Ready to start preparing?
        </h2>
        <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
          Join learners who are already practicing smarter with AI-powered
          feedback.
        </p>
        <Show when="signed-out">
          <Link
            href="/sign-up"
            className="bg-brand hover:bg-brand-dark inline-block rounded-lg px-8 py-3 text-sm font-semibold text-white transition-colors"
          >
            Get started free
          </Link>
        </Show>
        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="bg-brand hover:bg-brand-dark inline-block rounded-lg px-8 py-3 text-sm font-semibold text-white transition-colors"
          >
            Go to dashboard →
          </Link>
        </Show>
      </section>

      <footer className="flex items-center justify-between border-t border-gray-100 px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-brand flex h-5 w-5 items-center justify-center rounded-md">
            <span className="text-[9px] font-bold text-white">IM</span>
          </div>
          <span className="text-xs text-gray-400">IELTS Master</span>
        </div>
        <p className="text-xs text-gray-400">
          Built for self-directed learners.
        </p>
      </footer>
    </div>
  );
}
