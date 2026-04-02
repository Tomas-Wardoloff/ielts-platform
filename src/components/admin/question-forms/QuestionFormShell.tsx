import { Trash2 } from "lucide-react";
import { QUESTION_TYPE_LABELS } from "@/types/admin";
import type { QuestionType } from "@/types/admin";
import Badge from "@/components/home/Badge";
import { Button } from "@/components/ui/Button";

const types = Object.keys(QUESTION_TYPE_LABELS) as QuestionType[];

interface Props {
  index: number;
  type: QuestionType;
  instructions: string;
  onChangeBase: (field: string, value: string) => void;
  onRemove: () => void;
  children: React.ReactNode;
}

export function QuestionFormShell({
  index,
  type,
  instructions,
  onChangeBase,
  onRemove,
  children,
}: Props) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Question {index + 1}</span>
          <span className="text-sm font-semibold text-gray-200">|</span>
          <Badge content={QUESTION_TYPE_LABELS[type]} />
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRemove}
          leftIcon={<Trash2 size={12} />}
        >
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-gray-600">
            Type <span className="text-brand">*</span>
          </label>
          <select
            value={type}
            onChange={(e) => onChangeBase("type", e.target.value)}
            className="focus:border-brand w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors outline-none"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {QUESTION_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold text-gray-600">
            Instructions <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => onChangeBase("instructions", e.target.value)}
            placeholder="e.g. Do the following statements agree with the information in the passage?"
            className="focus:border-brand w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white p-4">
        {children}
      </div>
    </div>
  );
}
