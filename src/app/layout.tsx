import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IELTS Master - Free IELTS Practice Platform",
    template: "%s - IELTS Master",
  },
  description:
    "Practice all four IELTS modules online for free. AI-powered feedback to reach your target band score faster.",
  keywords: [
    "IELTS practice",
    "IELTS preparation",
    "IELTS reading",
    "IELTS listening",
    "IELTS writing",
    "band score",
    "free IELTS",
    "IELTS",
  ],
};

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${dmSerif.variable}`}>
        <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
