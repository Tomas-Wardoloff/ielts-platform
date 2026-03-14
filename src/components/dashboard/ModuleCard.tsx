import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  name: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon: ReactElement;
  isRow?: boolean;
}

export function ModuleCard({
  name,
  description,
  href,
  status,
  icon,
  isRow = false,
}: Props) {
  const isAvailable = status === "available";

  const content = (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border transition-all duration-300 ${
        isRow ? "p-5" : "p-6"
      } ${
        isAvailable
          ? "hover:border-brand/30 cursor-pointer border-gray-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(218,41,28,0.06)]"
          : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-70"
      }`}
    >
      <div
        className={`from-brand/2 absolute inset-0 bg-linear-to-tr to-transparent opacity-0 transition-opacity duration-300 ${
          isAvailable ? "group-hover:opacity-100" : ""
        }`}
      />

      <div
        className={`relative flex items-start justify-between ${isRow ? "mb-3" : "mb-5"}`}
      >
        <div
          className={`flex items-center justify-center rounded-xl transition-transform duration-300 ${
            isRow ? "h-10 w-10" : "h-12 w-12"
          } ${
            isAvailable ? "bg-brand-light group-hover:scale-110" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        {!isAvailable && (
          <span className="font-inter rounded-full bg-gray-200/50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
            Soon
          </span>
        )}
      </div>

      <h3
        className={`group-hover:text-brand relative font-sans font-bold text-gray-900 transition-colors ${
          isRow ? "mb-1 text-lg" : "mb-2 text-xl"
        }`}
      >
        {name}
      </h3>

      {!isRow && (
        <p className="font-inter relative text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      )}

      <div
        className={`font-inter relative mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
          isAvailable
            ? "text-brand translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            : "hidden"
        }`}
      >
        Start {isRow ? "" : "practicing"} <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <Link href={href} className="block w-full">
        {content}
      </Link>
    );
  }

  return <div className="block w-full">{content}</div>;
}
