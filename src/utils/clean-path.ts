import { trailingSlash } from "astro:config/client"

export function cleanPath(...segments: string[]): string {
  const cleanedSegments = segments.flatMap((s) => s.split("/").filter(Boolean));

  if (trailingSlash === "always") {
    return `/${cleanedSegments.join("/")}/`;
  }

  return `/${cleanedSegments.join("/")}`;
}
