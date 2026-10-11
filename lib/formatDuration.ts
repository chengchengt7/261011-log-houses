export function formatDuration(duration: string): string {
  return duration
    .replace("P", "")
    .replace("T", "")
    .replace("D", "d ")
    .replace("H", "h ")
    .replace("M", "m ")
    .replace("S", "s")
    .trim();
}
