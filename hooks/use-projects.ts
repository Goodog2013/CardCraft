"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createSampleProject } from "@/lib/storage/defaults";
import {
  readProjectsFromStorage,
  writeProjectsToStorage,
} from "@/lib/storage/projects";
import type { GeneratedContent, ProductInput, ProjectRecord, StylePreset } from "@/lib/types";
import { makeId } from "@/lib/utils";

interface ProjectSnapshot {
  projectName: string;
  input: ProductInput;
  stylePreset: StylePreset;
  output: GeneratedContent;
}

function cloneProject(project: ProjectRecord) {
  return structuredClone(project);
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loaded = readProjectsFromStorage();

    if (!loaded.length) {
      const seed = createSampleProject();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProjects([seed]);
      setActiveProjectId(seed.id);
      writeProjectsToStorage([seed]);
      setIsHydrated(true);
      return;
    }

    setProjects(loaded);
    setActiveProjectId(loaded[0]?.id ?? null);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writeProjectsToStorage(projects);
  }, [isHydrated, projects]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects],
  );

  const openProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
  }, []);

  const createProject = useCallback((snapshot: ProjectSnapshot) => {
    const now = new Date().toISOString();

    const nextProject: ProjectRecord = {
      id: makeId("project"),
      projectName: snapshot.projectName || "New CardCraft Project",
      input: structuredClone(snapshot.input),
      stylePreset: snapshot.stylePreset,
      output: structuredClone(snapshot.output),
      createdAt: now,
      updatedAt: now,
    };

    setProjects((prev) => [nextProject, ...prev]);
    setActiveProjectId(nextProject.id);
    return nextProject;
  }, []);

  const saveProject = useCallback(
    (projectId: string | null, snapshot: ProjectSnapshot) => {
      if (!projectId) {
        return createProject(snapshot);
      }

      const now = new Date().toISOString();
      const existing = projects.find((project) => project.id === projectId);

      if (!existing) {
        const fresh: ProjectRecord = {
          id: projectId,
          projectName: snapshot.projectName || "New CardCraft Project",
          input: structuredClone(snapshot.input),
          stylePreset: snapshot.stylePreset,
          output: structuredClone(snapshot.output),
          createdAt: now,
          updatedAt: now,
        };

        setProjects((prev) => [fresh, ...prev]);
        setActiveProjectId(fresh.id);
        return fresh;
      }

      const updated: ProjectRecord = {
        ...existing,
        projectName: snapshot.projectName || existing.projectName,
        input: structuredClone(snapshot.input),
        stylePreset: snapshot.stylePreset,
        output: structuredClone(snapshot.output),
        updatedAt: now,
      };

      setProjects((prev) =>
        prev.map((project) => (project.id === projectId ? updated : project)),
      );
      setActiveProjectId(updated.id);
      return updated;
    },
    [createProject, projects],
  );

  const renameProject = useCallback((projectId: string, name: string) => {
    const nextName = name.trim();
    if (!nextName) {
      return;
    }

    const now = new Date().toISOString();

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              projectName: nextName,
              updatedAt: now,
            }
          : project,
      ),
    );
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => {
      const next = prev.filter((project) => project.id !== projectId);
      if (!next.length) {
        const sample = createSampleProject();
        setActiveProjectId(sample.id);
        return [sample];
      }

      setActiveProjectId((active) => {
        if (active === projectId) {
          return next[0]?.id ?? null;
        }
        return active;
      });

      return next;
    });
  }, []);

  const duplicateProject = useCallback(
    (projectId: string) => {
      const target = projects.find((project) => project.id === projectId);
      if (!target) {
        return null;
      }

      const now = new Date().toISOString();
      const duplicated: ProjectRecord = {
        ...cloneProject(target),
        id: makeId("project"),
        projectName: `${target.projectName} Copy`,
        createdAt: now,
        updatedAt: now,
      };

      setProjects((prev) => [duplicated, ...prev]);
      setActiveProjectId(duplicated.id);
      return duplicated;
    },
    [projects],
  );

  return {
    projects,
    activeProject,
    activeProjectId,
    isHydrated,
    openProject,
    createProject,
    saveProject,
    renameProject,
    deleteProject,
    duplicateProject,
  };
}
