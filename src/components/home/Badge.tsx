interface BadgeProps {
  content: string;
}

export default function Badge({ content }: BadgeProps) {
  return (
    <div className="bg-brand-light text-brand relative inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-xs font-semibold tracking-[0.08em] uppercase">
      <span className="bg-brand h-2 w-2 rounded-full"></span>
      {content}
    </div>
  );
}
