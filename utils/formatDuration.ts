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

export function getDurationSeconds(duration: string): number {
  let seconds = 0;

  for (const part of formatDuration(duration).split(" ")) {
    const value = parseInt(part, 10);
    if (part.endsWith("d")) seconds += value * 86400;
    if (part.endsWith("h")) seconds += value * 3600;
    if (part.endsWith("m")) seconds += value * 60;
    if (part.endsWith("s")) seconds += value;
  }

  return seconds;
}
