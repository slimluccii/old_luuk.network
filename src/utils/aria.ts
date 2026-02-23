/**
 * Adds an ID to an element's aria-describedby attribute
 * @param element - The element to update
 * @param id - The ID to add to aria-describedby
 */
export function addAriaDescribedBy(
  element: HTMLElement | null,
  id: string
): void {
  if (!element) return;

  const existingDescribedBy = element.getAttribute("aria-describedby");
  const ids = existingDescribedBy
    ? existingDescribedBy.split(" ").filter(Boolean)
    : [];

  // Only add if not already present
  if (!ids.includes(id)) {
    ids.push(id);
    element.setAttribute("aria-describedby", ids.join(" "));
  }
}

/**
 * Removes an ID from an element's aria-describedby attribute
 * @param element - The element to update
 * @param id - The ID to remove from aria-describedby
 */
export function removeAriaDescribedBy(
  element: HTMLElement | null,
  id: string
): void {
  if (!element) return;

  const existingDescribedBy = element.getAttribute("aria-describedby");
  if (!existingDescribedBy) return;

  const ids = existingDescribedBy
    .split(" ")
    .filter(Boolean)
    .filter((existingId) => existingId !== id);

  if (ids.length > 0) {
    element.setAttribute("aria-describedby", ids.join(" "));
  } else {
    element.removeAttribute("aria-describedby");
  }
}
