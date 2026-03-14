"use client";

import { Button } from "@/components/ui/Button";
import { MoveRight, MoveLeft } from "lucide-react";

interface Props {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  onNavigate: (index: number) => void;
}

export function ExerciseNavigationFooter({
  currentIndex,
  totalQuestions,
  answeredCount,
  onNavigate,
}: Props) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-white px-5 py-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onNavigate(currentIndex - 1)}
        disabled={currentIndex === 0}
        leftIcon={<MoveLeft size={14} />}
      >
        Previous
      </Button>
      <span className="text-xs text-gray-400">
        {answeredCount} of {totalQuestions} answered
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onNavigate(currentIndex + 1)}
        disabled={currentIndex === totalQuestions - 1}
        rightIcon={<MoveRight size={14} />}
      >
        Next
      </Button>
    </div>
  );
}
