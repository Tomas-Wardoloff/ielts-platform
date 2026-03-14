import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading — IELTS Master",
  description: "Practice IELTS Academic Reading passages and question types.",
};

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
