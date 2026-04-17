import type { ProjectRecord } from "@/lib/types";

const STORAGE_KEY = "cardcraft.projects.v1";

export function readProjectsFromStorage(): ProjectRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as ProjectRecord[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function writeProjectsToStorage(projects: ProjectRecord[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function clearProjectsStorage() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
