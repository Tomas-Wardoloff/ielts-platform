interface Props {
  durationMinutes: number;
  totalQuestions: number;
  sections: string;
  questionTypesCount: number;
  sectionBreakdown: { time: string; label: string }[];
}

export function ModuleInfo({
  durationMinutes,
  totalQuestions,
  sections,
  questionTypesCount,
  sectionBreakdown,
}: Props) {
  return (
    <div className="bg-brand-light mb-8 rounded-xl border border-red-100 p-5">
      <h2 className="text-brand mb-3 text-sm font-semibold">
        About this module
      </h2>
      <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium text-gray-900">
            {durationMinutes} minutes
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total questions</span>
          <span className="font-medium text-gray-900">{totalQuestions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sections</span>
          <span className="font-medium text-gray-900">{sections}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Question types</span>
          <span className="font-medium text-gray-900">
            {questionTypesCount}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-red-100 pt-3 text-xs text-gray-500">
        {sectionBreakdown.map((section, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="bg-brand inline-block h-1.5 w-1.5 rounded-full" />
            {section.label} — {section.time}
          </div>
        ))}
      </div>
    </div>
  );
}
