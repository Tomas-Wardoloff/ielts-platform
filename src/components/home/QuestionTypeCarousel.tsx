"use client";

import { motion } from "framer-motion";

const questionTypes = [
  "Multiple Choice",
  "True / False / Not Given",
  "Yes / No / Not Given",
  "Matching Headings",
  "Matching Information",
  "Matching Features",
  "Matching Sentence Endings",
  "Sentence Completion",
  "Note / Table / Flowchart",
  "Diagram Label Completion",
  "Short Answer Questions",
];

export function QuestionTypeCarousel() {
  // Duplicate for seamless loop
  const items = [...questionTypes, ...questionTypes];

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((type, i) => (
          <div
            key={i}
            className="border-brand/20 bg-brand/10 text-brand shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            {type}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
