import { ResultPageClient } from "@/components/reading/ResultPageClient";

interface Props {
  params: Promise<{ passageId: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { passageId } = await params;
  return <ResultPageClient passageId={passageId} />;
}
