"use client";

import { useState } from "react";
import { Headphones, BookOpen, PenTool, Mic } from "lucide-react";
import ModuleCard from "./ModuleCard";

export default function ModulesAccordion() {
  const [activeTab, setActiveTab] = useState("listening");

  const modules = [
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
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          isActive={activeTab === module.id}
          onClick={() => setActiveTab(module.id)}
        />
      ))}
    </div>
  );
}
