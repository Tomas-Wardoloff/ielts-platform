"use client";

import { Plus, X } from "lucide-react";
import type { MatchingHeadingsFormData } from "@/types/admin";
import { Button } from "@/components/ui/Button";

export function MatchingHeadingsForm({
  data,
  onChange,
}: {
  data: MatchingHeadingsFormData;
  onChange: (data: MatchingHeadingsFormData) => void;
}) {
  const paraIds = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const headingIds = [
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
  ];

  const addParagraph = () => {
    const id =
      paraIds[data.paragraphs.length] ?? `P${data.paragraphs.length + 1}`;
    onChange({
      ...data,
      paragraphs: [...data.paragraphs, { id }],
    });
  };

  const addHeading = () => {
    const id =
      headingIds[data.headings.length] ?? `${data.headings.length + 1}`;
    onChange({
      ...data,
      headings: [...data.headings, { id, text: "" }],
    });
  };

  const removeHeading = (i: number) => {
    onChange({
      ...data,
      headings: data.headings.filter((_, j) => j !== i),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
          Paragraphs
        </p>
        <div className="space-y-2">
          {data.paragraphs.map((para) => (
            <div key={para.id} className="flex items-center gap-2">
              <span className="text-brand min-w-[24px] text-xs font-semibold">
                {para.id}
              </span>
              <select
                value={data.solution[para.id] ?? ""}
                onChange={(e) =>
                  onChange({
                    ...data,
                    solution: { ...data.solution, [para.id]: e.target.value },
                  })
                }
                className="focus:border-brand w-20 shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs outline-none"
              >
                <option value="">—</option>
                {data.headings.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.id}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={addParagraph}
          leftIcon={<Plus size={12} />}
        >
          Add paragraph
        </Button>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
          Headings
        </p>
        <div className="space-y-2">
          {data.headings.map((h, i) => (
            <div key={h.id} className="flex items-center gap-2">
              <span className="min-w-[24px] text-xs font-semibold text-gray-400">
                {h.id}.
              </span>
              <input
                type="text"
                value={h.text}
                onChange={(e) => {
                  const updated = [...data.headings];
                  updated[i] = { ...updated[i], text: e.target.value };
                  onChange({ ...data, headings: updated });
                }}
                placeholder="Heading text..."
                className="focus:border-brand flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition-colors outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHeading(i)}
                leftIcon={<X size={12} />}
              ></Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={addHeading}
          leftIcon={<Plus size={12} />}
        >
          Add heading
        </Button>
      </div>
    </div>
  );
}
