"use client";

import { Download, Files, FileJson2, Wand2 } from "lucide-react";
import { BulletsOutputCard, TextOutputCard } from "@/components/app/editable-output-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";
import type { GeneratedContent, OutputSection } from "@/lib/types";

interface OutputPanelProps {
  language: UiLanguage;
  content: GeneratedContent | null;
  isGenerating: boolean;
  onCopyAll: () => void;
  onExportJson: () => void;
  onExportTxt: () => void;
  onCopySection: (section: OutputSection, value: string) => void;
  onRegenerateSection: (section: keyof GeneratedContent) => void;
  onUpdateSection: (section: keyof GeneratedContent, value: string | string[]) => void;
}

function LoadingCards() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <CardContent className="space-y-3 p-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-9/12" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function OutputPanel({
  language,
  content,
  isGenerating,
  onCopyAll,
  onExportJson,
  onExportTxt,
  onCopySection,
  onRegenerateSection,
  onUpdateSection,
}: OutputPanelProps) {
  const text = uiText[language];

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{text.outputTitle}</CardTitle>
            <CardDescription>{text.outputDescription}</CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={onCopyAll} disabled={!content}>
              <Files className="h-4 w-4" />
              {text.copyAll}
            </Button>
            <Button variant="secondary" size="sm" onClick={onExportJson} disabled={!content}>
              <FileJson2 className="h-4 w-4" />
              {text.exportJson}
            </Button>
            <Button variant="secondary" size="sm" onClick={onExportTxt} disabled={!content}>
              <Download className="h-4 w-4" />
              {text.exportTxt}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {isGenerating ? <LoadingCards /> : null}

        {!isGenerating && !content ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted p-8 text-center">
            <Wand2 className="mx-auto h-5 w-5 text-mutedForeground" />
            <p className="mt-3 text-sm font-semibold text-foreground/90">{text.noGeneratedTitle}</p>
            <p className="mt-1 text-sm text-mutedForeground">{text.noGeneratedDescription}</p>
          </div>
        ) : null}

        {!isGenerating && content ? (
          <div className="space-y-3">
            <TextOutputCard
              language={language}
              title={text.titleLabel}
              value={content.title}
              onCopy={() => onCopySection("title", content.title)}
              onRegenerate={() => onRegenerateSection("title")}
              onChange={(next) => onUpdateSection("title", next)}
            />

            <TextOutputCard
              language={language}
              title={text.descriptionLabel}
              value={content.description}
              onCopy={() => onCopySection("description", content.description)}
              onRegenerate={() => onRegenerateSection("description")}
              onChange={(next) => onUpdateSection("description", next)}
            />

            <BulletsOutputCard
              language={language}
              value={content.bullets}
              onCopy={() => onCopySection("bullets", content.bullets.map((b, i) => `${i + 1}. ${b}`).join("\n"))}
              onRegenerate={() => onRegenerateSection("bullets")}
              onChange={(next) => onUpdateSection("bullets", next)}
            />

            <TextOutputCard
              language={language}
              title={text.ctaLabel}
              value={content.cta}
              onCopy={() => onCopySection("cta", content.cta)}
              onRegenerate={() => onRegenerateSection("cta")}
              onChange={(next) => onUpdateSection("cta", next)}
            />

            <TextOutputCard
              language={language}
              title={text.promptRuLabel}
              value={content.promptRu}
              onCopy={() => onCopySection("promptRu", content.promptRu)}
              onRegenerate={() => onRegenerateSection("promptRu")}
              onChange={(next) => onUpdateSection("promptRu", next)}
            />

            <TextOutputCard
              language={language}
              title={text.promptEnLabel}
              value={content.promptEn}
              onCopy={() => onCopySection("promptEn", content.promptEn)}
              onRegenerate={() => onRegenerateSection("promptEn")}
              onChange={(next) => onUpdateSection("promptEn", next)}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
