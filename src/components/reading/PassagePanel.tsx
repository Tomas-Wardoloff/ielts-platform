interface Props {
  text: string;
}

export function PassagePanel({ text }: Props) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="h-1/2 w-full shrink-0 overflow-y-auto border-b border-gray-200 bg-white lg:h-full lg:w-1/2 lg:border-r lg:border-b-0">
      <div className="px-6 py-5">
        <p className="mb-4 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          Passage
        </p>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-700">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
