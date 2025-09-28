import type { CharacterStatus } from "@/types";

export function validateCharacterSearch(search?: Record<string, unknown>) {
  if (!search) {
    return { page: 1, name: undefined, status: undefined };
  }

  const page =
    typeof search.page === "string"
      ? parseInt(search.page, 10)
      : typeof search.page === "number"
        ? search.page
        : 1;

  const name = typeof search.name === "string" ? search.name : undefined;

  const status =
    typeof search.status === "string"
      ? (search.status as CharacterStatus)
      : undefined;

  return { page, name, status };
}
