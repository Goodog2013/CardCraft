"use client";

import { useEffect, useMemo, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { OutputPanel } from "@/components/app/output-panel";
import { ProductForm } from "@/components/app/product-form";
import { ProjectSidebar } from "@/components/app/project-sidebar";
import {
  type UiLanguage,
} from "@/lib/constants/options";
import { useProjects } from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";
import { getAiConfig } from "@/lib/config/ai";
import { exportContentAsTxt, exportProjectAsJson, stringifyGeneratedContent } from "@/lib/export";
import { createInitialVariants, generateContent, generateSection } from "@/lib/generator/engine";
import { sectionLabel, uiText } from "@/lib/i18n/ui";
import { defaultStylePreset, emptyProductInput } from "@/lib/storage/defaults";
import type { GeneratedContent, OutputSection, ProductInput, ProjectRecord, SectionVariants, StylePreset } from "@/lib/types";
import { makeId } from "@/lib/utils";

const LANGUAGE_STORAGE_KEY = "cardcraft.ui.language.v1";
const THEME_STORAGE_KEY = "cardcraft.ui.theme.v1";

type UiTheme = "light" | "dark";

function cloneInput(input: ProductInput): ProductInput {
  return {
    ...input,
    season: [...input.season],
    styleTags: [...input.styleTags],
    features: [...input.features],
    useCases: [...input.useCases],
  };
}

export function CardCraftDashboard() {
  const {
    projects,
    activeProject,
    activeProjectId,
    isHydrated,
    openProject,
    saveProject,
    renameProject,
    deleteProject,
    duplicateProject,
  } = useProjects();

  const { toast } = useToast();

  const [language, setLanguage] = useState<UiLanguage>("ru");
  const [theme, setTheme] = useState<UiTheme>("light");
  const [initialized, setInitialized] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("Untitled CardCraft Project");
  const [input, setInput] = useState<ProductInput>({
    ...emptyProductInput,
    season: [...emptyProductInput.season],
    styleTags: [...emptyProductInput.styleTags],
    features: [...emptyProductInput.features],
    useCases: [...emptyProductInput.useCases],
  });
  const [stylePreset, setStylePreset] = useState<StylePreset>(defaultStylePreset);
  const [output, setOutput] = useState<GeneratedContent | null>(null);
  const [sectionVariants, setSectionVariants] = useState<SectionVariants>(createInitialVariants());
  const [isGenerating, setIsGenerating] = useState(false);

  const aiConfig = useMemo(() => getAiConfig(), []);
  const text = uiText[language];

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "ru" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(saved);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const applyProject = (project: ProjectRecord) => {
    setCurrentProjectId(project.id);
    setProjectName(project.projectName);
    setInput(cloneInput(project.input));
    setStylePreset(project.stylePreset);
    setOutput({
      ...project.output,
      bullets: [...project.output.bullets],
    });
    setSectionVariants(createInitialVariants());
  };

  useEffect(() => {
    if (!isHydrated || initialized) {
      return;
    }

    if (activeProject) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      applyProject(activeProject);
    }

    setInitialized(true);
  }, [activeProject, initialized, isHydrated]);

  const ensureOutput = () => {
    if (output) {
      return output;
    }

    const generated = generateContent(input, stylePreset, sectionVariants);
    setOutput(generated);
    return generated;
  };

  const validateForm = () => {
    if (!input.productName.trim()) {
      toast({
        title: text.toastProductNameRequired,
        message: text.toastProductNameRequiredText,
        variant: "danger",
      });
      return false;
    }

    if (!input.material.trim()) {
      toast({
        title: text.toastMaterialRequired,
        message: text.toastMaterialRequiredText,
        variant: "danger",
      });
      return false;
    }

    return true;
  };

  const handleGenerate = () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    const resetVariants = createInitialVariants();
    setSectionVariants(resetVariants);

    window.setTimeout(() => {
      const generated = generateContent(input, stylePreset, resetVariants);
      setOutput(generated);
      setIsGenerating(false);
      toast({
        title: text.toastContentGenerated,
        message: text.toastContentGeneratedText,
        variant: "success",
      });
    }, 420);
  };

  const handleRegenerateSection = (section: OutputSection) => {
    if (!output) {
      return;
    }

    setSectionVariants((prev) => {
      const nextVariant = prev[section] + 1;
      const next = {
        ...prev,
        [section]: nextVariant,
      };

      const regenerated = generateSection(section, input, stylePreset, nextVariant);

      setOutput((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [section]: regenerated,
        };
      });

      return next;
    });

    toast({
      title: text.toastSectionRegenerated,
      message: `${sectionLabel(section, language)}: ${text.toastSectionRegeneratedText}.`,
      variant: "info",
    });
  };

  const handleUpdateSection = (
    section: OutputSection,
    value: string | string[],
  ) => {
    setOutput((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [section]: value,
      } as GeneratedContent;
    });
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: text.toastCopied,
        message: `${label}: ${text.toastCopiedText}.`,
        variant: "success",
      });
    } catch {
      toast({
        title: text.toastCopyFailed,
        message: text.toastCopyFailedText,
        variant: "danger",
      });
    }
  };

  const buildProjectSnapshot = (content: GeneratedContent): ProjectRecord => {
    const existing = projects.find((project) => project.id === currentProjectId) ?? null;
    const now = new Date().toISOString();

    return {
      id: currentProjectId ?? makeId("project"),
      projectName: projectName.trim() || "Untitled CardCraft Project",
      input: cloneInput(input),
      stylePreset,
      output: {
        ...content,
        bullets: [...content.bullets],
      },
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
  };

  const handleSaveProject = () => {
    const content = ensureOutput();

    const saved = saveProject(currentProjectId, {
      projectName: projectName.trim() || "Untitled CardCraft Project",
      input: cloneInput(input),
      stylePreset,
      output: {
        ...content,
        bullets: [...content.bullets],
      },
    });

    if (saved) {
      setCurrentProjectId(saved.id);
      openProject(saved.id);
    }

    toast({
      title: text.toastProjectSaved,
      message: text.toastProjectSavedText,
      variant: "success",
    });
  };

  const handleOpenProject = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) {
      return;
    }

    openProject(projectId);
    applyProject(project);
    toast({
      title: text.toastProjectOpened,
      message: project.projectName,
      variant: "info",
    });
  };

  const handleRenameProject = (projectId: string, name: string) => {
    renameProject(projectId, name);

    if (projectId === currentProjectId) {
      setProjectName(name.trim());
    }

    toast({
      title: text.toastProjectRenamed,
      variant: "success",
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const target = projects.find((project) => project.id === projectId);
    if (!target) {
      return;
    }

    const confirmed = window.confirm(`${text.confirmDelete} "${target.projectName}"?`);
    if (!confirmed) {
      return;
    }

    const rest = projects.filter((project) => project.id !== projectId);
    deleteProject(projectId);

    if (currentProjectId === projectId) {
      const fallback = rest[0];
      if (fallback) {
        applyProject(fallback);
      } else {
        handleNewProject();
      }
    }

    toast({
      title: text.toastProjectDeleted,
      variant: "info",
    });
  };

  const handleDuplicateProject = (projectId: string) => {
    const duplicated = duplicateProject(projectId);

    if (!duplicated) {
      return;
    }

    applyProject(duplicated);
    toast({
      title: text.toastProjectDuplicated,
      message: duplicated.projectName,
      variant: "success",
    });
  };

  const handleNewProject = () => {
    setCurrentProjectId(null);
    setProjectName("Untitled CardCraft Project");
    setInput({
      ...emptyProductInput,
      season: [...emptyProductInput.season],
      styleTags: [...emptyProductInput.styleTags],
      features: [...emptyProductInput.features],
      useCases: [...emptyProductInput.useCases],
      productName: "",
      photoDataUrl: "",
    });
    setStylePreset(defaultStylePreset);
    setOutput(null);
    setSectionVariants(createInitialVariants());

    toast({
      title: text.toastNewProject,
      message: text.toastNewProjectText,
      variant: "info",
    });
  };

  const handleCopyAll = async () => {
    if (!output) {
      return;
    }

    await copyText(stringifyGeneratedContent(output), text.copyAll);
  };

  const handleExportJson = () => {
    if (!output) {
      return;
    }

    exportProjectAsJson(buildProjectSnapshot(output));
    toast({
      title: text.toastJsonExported,
      variant: "success",
    });
  };

  const handleExportTxt = () => {
    if (!output) {
      return;
    }

    exportContentAsTxt(buildProjectSnapshot(output));
    toast({
      title: text.toastTxtExported,
      variant: "success",
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#dff2f7_0,transparent_36%),radial-gradient(circle_at_100%_0%,#f7f2e8_0,transparent_38%),#f8fafc] dark:bg-[radial-gradient(circle_at_0%_0%,#1a3037_0,transparent_36%),radial-gradient(circle_at_100%_0%,#2f2a21_0,transparent_38%),#0f141d]">
      <div className="mx-auto max-w-[1500px] space-y-5 p-4 pb-8 sm:p-6 lg:p-8">
        <AppHeader language={language} />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white/85 p-4 shadow-soft backdrop-blur dark:bg-card/85">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mutedForeground">{text.runtimeConfig}</p>
            <p className="mt-1 text-sm text-foreground/90">
              {text.aiMode}: <span className="font-semibold">{aiConfig.mode}</span> | {text.endpoint}: {aiConfig.baseUrl} | {text.model}: {aiConfig.model}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-mutedForeground">{text.localGeneratorHint}</p>
            <div className="flex items-center gap-1 rounded-xl border border-border bg-white p-1 dark:bg-muted">
              <span className="px-2 text-xs font-medium text-mutedForeground">{text.language}</span>
              <button
                type="button"
                onClick={() => setLanguage("ru")}
                className={`rounded-lg px-2 py-1 text-xs transition ${language === "ru" ? "bg-primary text-primaryForeground" : "text-mutedForeground hover:bg-muted"}`}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-2 py-1 text-xs transition ${language === "en" ? "bg-primary text-primaryForeground" : "text-mutedForeground hover:bg-muted"}`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-border bg-white p-1 dark:bg-muted">
              <span className="px-2 text-xs font-medium text-mutedForeground">{text.theme}</span>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition ${theme === "light" ? "bg-primary text-primaryForeground" : "text-mutedForeground hover:bg-muted"}`}
              >
                <Sun className="h-3.5 w-3.5" />
                {text.lightTheme}
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition ${theme === "dark" ? "bg-primary text-primaryForeground" : "text-mutedForeground hover:bg-muted"}`}
              >
                <MoonStar className="h-3.5 w-3.5" />
                {text.darkTheme}
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-5 xl:grid-cols-[320px_minmax(430px,1fr)_minmax(520px,1.1fr)]">
          <ProjectSidebar
            language={language}
            projects={projects}
            activeProjectId={activeProjectId}
            onOpen={handleOpenProject}
            onRename={handleRenameProject}
            onDelete={handleDeleteProject}
            onDuplicate={handleDuplicateProject}
          />

          <ProductForm
            language={language}
            projectName={projectName}
            onProjectNameChange={setProjectName}
            input={input}
            stylePreset={stylePreset}
            onInputChange={setInput}
            onStylePresetChange={setStylePreset}
            onGenerate={handleGenerate}
            onNewProject={handleNewProject}
            onSaveProject={handleSaveProject}
            isGenerating={isGenerating}
          />

          <OutputPanel
            language={language}
            content={output}
            isGenerating={isGenerating}
            onCopyAll={handleCopyAll}
            onExportJson={handleExportJson}
            onExportTxt={handleExportTxt}
            onCopySection={(section, value) => {
              void copyText(value, sectionLabel(section, language));
            }}
            onRegenerateSection={handleRegenerateSection}
            onUpdateSection={handleUpdateSection}
          />
        </section>
      </div>
    </main>
  );
}
