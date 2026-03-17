export function scoreToBand(score: number): string {
  const correct = Math.round(score * 40);
  if (correct >= 39) return "9.0";
  if (correct >= 37) return "8.5";
  if (correct >= 35) return "8.0";
  if (correct >= 33) return "7.5";
  if (correct >= 30) return "7.0";
  if (correct >= 27) return "6.5";
  if (correct >= 23) return "6.0";
  if (correct >= 19) return "5.5";
  if (correct >= 15) return "5.0";
  if (correct >= 13) return "4.5";
  return "4.0";
}
