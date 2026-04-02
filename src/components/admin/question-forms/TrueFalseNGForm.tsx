"use client";

import { Plus, X } from "lucide-react";
import type { TrueFalseNGFormData, TFNGValue } from "@/types/admin";
import { Button } from "@/components/ui/Button";

const options: TFNGValue[] = ["TRUE", "FALSE", "NOT GIVEN"];

export function TrueFalseNGForm({
  data,
  onChange,
}: {
  data: TrueFalseNGFormData;
  onChange: (data: TrueFalseNGFormData) => void;
}) {
  const add = () => {
    const id = `s${data.statements.length + 1}`;
    onChange({
      statements: [...data.statements, { id, text: "", answer: "TRUE" }],
    });
  };

  const update = (i: number, field: "text" | "answer", value: string) => {
    const updated = [...data.statements];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ statements: updated });
  };

  const remove = (i: number) => {
    onChange({ statements: data.statements.filter((_, j) => j !== i) });
  };

  return (
    <div className="space-y-2">
      <p className="mb-3 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
        Statements
      </p>
      {data.statements.map((stmt, i) => (
        <div key={stmt.id} className="flex items-center gap-4">
          <span className="text-brand min-w-[24px] text-xs font-semibold">
            {stmt.id.slice(1)}
          </span>
          <input
            type="text"
            value={stmt.text}
            onChange={(e) => update(i, "text", e.target.value)}
            placeholder="Statement text..."
            className="focus:border-brand flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition-colors outline-none"
          />
          <select
            value={stmt.answer}
            onChange={(e) => update(i, "answer", e.target.value)}
            className="focus:border-brand w-28 shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs transition-colors outline-none"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <Button
            onClick={() => remove(i)}
            variant="ghost"
            size="sm"
            leftIcon={<X size={12} />}
          ></Button>
        </div>
      ))}
      <Button
        variant="secondary"
        className="w-full"
        onClick={add}
        leftIcon={<Plus size={12} />}
      >
        Add statement
      </Button>
    </div>
  );
}
