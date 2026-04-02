import { PassageForm } from "@/components/admin/PassageForm";
import { Button } from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";

export default function NewPassagePage() {
  return (
    <div>
      <div className="flex h-14.25 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            href="/admin"
            leftIcon={<MoveLeft size={14} />}
          >
            Admin
          </Button>
        </div>
      </div>
      <div className="w-full px-4 py-6 md:px-8 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            New passage
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a reading passage and add all its questions in one step.
          </p>
        </div>
        <PassageForm />
      </div>
    </div>
  );
}
