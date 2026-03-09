
export function cleanPath(...segments: string[]): string {
  const cleanedSegments = segments.flatMap((s) => s.split("/").filter(Boolean));
  return `/${cleanedSegments.join("/")}/`;
}
