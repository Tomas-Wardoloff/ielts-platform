import Link from "next/link";

const footerLinks = [
  {
    title: "Practice",
    links: [
      { label: "Reading", href: "/dashboard/reading" },
      { label: "Listening", href: "/dashboard/listening" },
      { label: "Writing", href: "/dashboard/writing" },
      { label: "Speaking", href: "/dashboard/speaking" },
      { label: "Full Exam Sim", href: "/dashboard/simulate" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Grammar Guides", href: "/learn/grammar" },
      { label: "Vocabulary", href: "/learn/vocabulary" },
      { label: "Exam Tips", href: "/learn/tips" },
      { label: "Band Score Guide", href: "/learn/band-scores" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign Up Free", href: "/sign-up" },
      { label: "Sign In", href: "/sign-in" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 pt-14 pb-8 lg:px-10">
      {/* Top grid */}
      <div className="mb-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
        {/* Brand column */}
        <div className="col-span-2 sm:col-span-1">
          {/* Logo */}
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="font-serif text-xl leading-none font-bold text-white italic">
              IELTS Master
            </span>
          </Link>
          <p className="max-w-[220px] text-sm leading-relaxed text-white/35">
            The AI-powered preparation platform for students who are serious
            about their band score goal.
          </p>
        </div>

        {/* Nav columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-[11px] font-semibold tracking-widest text-white/30 uppercase">
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="border-t border-white/6 pt-6">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} IELTS Master. Not affiliated with the
          British Council, IDP, or Cambridge Assessment English.
        </p>
      </div>
    </footer>
  );
}
