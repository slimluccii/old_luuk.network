import config from "astro.config";

export function cleanPath(...segments: string[]): string {
  const { trailingSlash } = config;

  const cleanedSegments = segments.flatMap((s) => s.split("/").filter(Boolean));

  if (trailingSlash === "always") {
    return `/${cleanedSegments.join("/")}/`;
  }

  return `/${cleanedSegments.join("/")}`;
}
