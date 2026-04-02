"use client";

import { Plus, X } from "lucide-react";
import type { MultipleChoiceFormData } from "@/types/admin";
import { Button } from "@/components/ui/Button";

export function MultipleChoiceForm({
  data,
  onChange,
}: {
  data: MultipleChoiceFormData;
  onChange: (data: MultipleChoiceFormData) => void;
}) {
  const ids = ["A", "B", "C", "D", "E", "F"];

  const addOption = () => {
    const id = ids[data.options.length] ?? `${data.options.length + 1}`;
    onChange({ ...data, options: [...data.options, { id, text: "" }] });
  };

  const updateOption = (i: number, text: string) => {
    const updated = [...data.options];
    updated[i] = { ...updated[i], text };
    onChange({ ...data, options: updated });
  };

  const removeOption = (i: number) => {
    const updated = data.options.filter((_, j) => j !== i);
    const newAnswer = data.answer === data.options[i].id ? "" : data.answer;
    onChange({ ...data, options: updated, answer: newAnswer });
  };

  return (
    <div className="space-y-2">
      <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
        Question
      </p>
      <textarea
        value={data.question}
        onChange={(e) => onChange({ ...data, question: e.target.value })}
        placeholder="According to the passage..."
        rows={2}
        className="focus:border-brand w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
      />
      <div className="space-y-2">
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
          Correct option:{" "}
          <span className="text-brand">{data.answer || "none"}</span>
        </p>
        <div className="space-y-2">
          {data.options.map((opt, i) => (
            <div key={opt.id} className="flex items-center gap-2">
              <button
                onClick={() => onChange({ ...data, answer: opt.id })}
                className={`h-5 w-5 shrink-0 cursor-pointer rounded-full border-2 transition-colors ${
                  data.answer === opt.id
                    ? "border-brand bg-brand"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
              <span className="min-w-[16px] text-xs font-semibold text-gray-400">
                {opt.id}
              </span>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => updateOption(i, e.target.value)}
                placeholder={`Option ${opt.id}`}
                className="focus:border-brand flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition-colors outline-none"
              />
              <Button
                onClick={() => removeOption(i)}
                variant="ghost"
                size="sm"
                leftIcon={<X size={12} />}
              ></Button>
            </div>
          ))}
        </div>
        {data.options.length < 6 && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={addOption}
            leftIcon={<Plus size={12} />}
          >
            Add statement
          </Button>
        )}
      </div>
    </div>
  );
}
