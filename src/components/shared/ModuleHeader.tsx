import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ModuleHeader({ title, description, icon }: Props) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
