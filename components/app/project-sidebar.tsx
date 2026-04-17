"use client";

import { useState } from "react";
import { Copy, FolderOpen, Pencil, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { stylePresetLabelsByLanguage, type UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";
import type { ProjectRecord } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/utils";

interface ProjectSidebarProps {
  language: UiLanguage;
  projects: ProjectRecord[];
  activeProjectId: string | null;
  onOpen: (projectId: string) => void;
  onRename: (projectId: string, name: string) => void;
  onDelete: (projectId: string) => void;
  onDuplicate: (projectId: string) => void;
}

export function ProjectSidebar({
  language,
  projects,
  activeProjectId,
  onOpen,
  onRename,
  onDelete,
  onDuplicate,
}: ProjectSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const text = uiText[language];
  const locale = language === "ru" ? "ru-RU" : "en-US";

  const startEditing = (project: ProjectRecord) => {
    setEditingId(project.id);
    setDraftName(project.projectName);
  };

  const commitRename = () => {
    if (!editingId) {
      return;
    }

    onRename(editingId, draftName);
    setEditingId(null);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-base">{text.savedProjects}</CardTitle>
        <CardDescription>{text.savedProjectsDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!projects.length ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-4 text-sm text-mutedForeground">
            {text.noProjects}
          </div>
        ) : null}

        {projects.map((project) => {
          const active = project.id === activeProjectId;
          const isEditing = editingId === project.id;

          return (
            <div
              key={project.id}
              className={cn(
                "rounded-xl border p-3 transition",
                active
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        value={draftName}
                        onChange={(event) => setDraftName(event.target.value)}
                        className="h-8"
                        autoFocus
                      />
                      <Button size="icon" variant="secondary" onClick={commitRename}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {project.projectName}
                      </p>
                      <p className="mt-1 text-xs text-mutedForeground">
                        {text.updatedPrefix} {formatDateTime(project.updatedAt, locale)}
                      </p>
                    </>
                  )}
                </div>
                <Badge>{stylePresetLabelsByLanguage[language][project.stylePreset]}</Badge>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-1.5">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => onOpen(project.id)}
                  aria-label={text.openProject}
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => startEditing(project)}
                  aria-label={text.renameProject}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => onDuplicate(project.id)}
                  aria-label={text.duplicateProject}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="danger"
                  onClick={() => onDelete(project.id)}
                  aria-label={text.deleteProject}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
