"use client";

import { useState } from "react";
import { Headphones, BookOpen, PenTool, Mic } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesAccordion() {
  const [activeTab, setActiveTab] = useState("listening");

  const features = [
    {
      id: "listening",
      title: "Listening",
      icon: Headphones,
      description:
        "Practice with diverse accents and question types. Master timing and spelling with real-time corrections.",
    },
    {
      id: "reading",
      title: "Reading",
      icon: BookOpen,
      description:
        "Academic and general passages with instant answer keys and vocabulary highlights.",
    },
    {
      id: "writing",
      title: "Writing",
      icon: PenTool,
      description:
        "Submit essays for AI grading across all official criteria: Task Response, Coherence, Lexical Resource, and Grammar.",
    },
    {
      id: "speaking",
      title: "Speaking",
      icon: Mic,
      description:
        "Record yourself answering real IELTS prompts and get AI feedback on fluency and pronunciation.",
    },
  ];

  return (
    <div className="mx-auto mt-12 max-w-2xl space-y-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          isActive={activeTab === feature.id}
          onClick={() => setActiveTab(feature.id)}
        />
      ))}
    </div>
  );
}
