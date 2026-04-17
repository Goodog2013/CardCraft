"use client";

import { WandSparkles } from "lucide-react";
import { PhotoUploader } from "@/components/app/photo-uploader";
import { TagSelector } from "@/components/app/tag-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  ageGroupOptions,
  ageGroupTranslations,
  categoryUiLabels,
  featureOptions,
  featureTranslations,
  fitOptions,
  fitTranslations,
  genderUiLabels,
  localizeOption,
  seasonOptions,
  seasonTranslations,
  sizeRangeOptions,
  stylePresetDescriptionsByLanguage,
  stylePresetLabelsByLanguage,
  styleTagOptions,
  styleTagTranslations,
  type UiLanguage,
  useCaseOptions,
  useCaseTranslations,
} from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";
import { CATEGORIES, GENDERS, STYLE_PRESETS, type ProductInput, type StylePreset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  language: UiLanguage;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  input: ProductInput;
  stylePreset: StylePreset;
  onInputChange: (next: ProductInput) => void;
  onStylePresetChange: (next: StylePreset) => void;
  onGenerate: () => void;
  onNewProject: () => void;
  onSaveProject: () => void;
  isGenerating: boolean;
}

export function ProductForm({
  language,
  projectName,
  onProjectNameChange,
  input,
  stylePreset,
  onInputChange,
  onStylePresetChange,
  onGenerate,
  onNewProject,
  onSaveProject,
  isGenerating,
}: ProductFormProps) {
  const text = uiText[language];

  const updateField = <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => {
    onInputChange({
      ...input,
      [field]: value,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{text.formTitle}</CardTitle>
            <CardDescription>{text.formDescription}</CardDescription>
          </div>
          <WandSparkles className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-3">
          <Label htmlFor="projectName">{text.projectName}</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(event) => onProjectNameChange(event.target.value)}
            placeholder={text.projectNamePlaceholder}
          />
        </section>

        <section className="space-y-3">
          <Label htmlFor="productName">{text.productName}</Label>
          <Input
            id="productName"
            value={input.productName}
            onChange={(event) => updateField("productName", event.target.value)}
            placeholder={text.productNamePlaceholder}
          />
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="category">{text.category}</Label>
            <Select
              id="category"
              value={input.category}
              onChange={(event) => updateField("category", event.target.value as ProductInput["category"])}
              options={CATEGORIES.map((category) => ({
                value: category,
                label: categoryUiLabels[language][category],
              }))}
            />
          </div>
          <div>
            <Label htmlFor="gender">{text.gender}</Label>
            <Select
              id="gender"
              value={input.gender}
              onChange={(event) => updateField("gender", event.target.value as ProductInput["gender"])}
              options={GENDERS.map((gender) => ({
                value: gender,
                label: genderUiLabels[language][gender],
              }))}
            />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="ageGroup">{text.ageGroup}</Label>
            <Select
              id="ageGroup"
              value={input.ageGroup}
              onChange={(event) => updateField("ageGroup", event.target.value)}
              options={ageGroupOptions.map((option) => ({
                value: option,
                label: localizeOption(option, language, ageGroupTranslations),
              }))}
            />
          </div>
          <div>
            <Label htmlFor="sizeRange">{text.sizeRange}</Label>
            <Select
              id="sizeRange"
              value={input.sizeRange}
              onChange={(event) => updateField("sizeRange", event.target.value)}
              options={sizeRangeOptions.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </div>
        </section>

        <section className="space-y-2">
          <Label>{text.season}</Label>
          <TagSelector
            language={language}
            options={seasonOptions}
            selected={input.season}
            onChange={(next) => updateField("season", next)}
            allowCustom={false}
            maxVisibleOptions={6}
            getLabel={(value) => localizeOption(value, language, seasonTranslations)}
          />
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="color">{text.color}</Label>
            <Input
              id="color"
              value={input.color}
              onChange={(event) => updateField("color", event.target.value)}
              placeholder={text.colorPlaceholder}
            />
          </div>
          <div>
            <Label htmlFor="material">{text.material}</Label>
            <Input
              id="material"
              value={input.material}
              onChange={(event) => updateField("material", event.target.value)}
              placeholder={text.materialPlaceholder}
            />
          </div>
        </section>

        <section className="space-y-2">
          <Label>{text.styleTags}</Label>
          <TagSelector
            language={language}
            options={styleTagOptions}
            selected={input.styleTags}
            onChange={(next) => updateField("styleTags", next)}
            getLabel={(value) => localizeOption(value, language, styleTagTranslations)}
          />
        </section>

        <section className="space-y-2">
          <Label>{text.features}</Label>
          <TagSelector
            language={language}
            options={featureOptions}
            selected={input.features}
            onChange={(next) => updateField("features", next)}
            getLabel={(value) => localizeOption(value, language, featureTranslations)}
          />
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="fit">{text.fit}</Label>
            <Select
              id="fit"
              value={input.fit}
              onChange={(event) => updateField("fit", event.target.value)}
              options={fitOptions.map((option) => ({
                value: option,
                label: localizeOption(option, language, fitTranslations),
              }))}
            />
          </div>
          <div>
            <Label htmlFor="brandTone">{text.brandTone}</Label>
            <Input
              id="brandTone"
              value={input.brandTone}
              onChange={(event) => updateField("brandTone", event.target.value)}
              placeholder={text.brandTonePlaceholder}
            />
          </div>
        </section>

        <section className="space-y-2">
          <Label>{text.useCases}</Label>
          <TagSelector
            language={language}
            options={useCaseOptions}
            selected={input.useCases}
            onChange={(next) => updateField("useCases", next)}
            getLabel={(value) => localizeOption(value, language, useCaseTranslations)}
          />
        </section>

        <section className="space-y-2">
          <Label htmlFor="notes">{text.notes}</Label>
          <Textarea
            id="notes"
            value={input.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder={text.notesPlaceholder}
            className="min-h-[88px]"
          />
        </section>

        <section className="space-y-2">
          <Label>{text.photoOptional}</Label>
          <PhotoUploader
            language={language}
            value={input.photoDataUrl}
            onChange={(next) => updateField("photoDataUrl", next)}
          />
        </section>

        <section className="space-y-2">
          <Label>{text.stylePreset}</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onStylePresetChange(preset)}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  preset === stylePreset
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <p className="text-sm font-semibold text-foreground">
                  {stylePresetLabelsByLanguage[language][preset]}
                </p>
                <p className="mt-1 text-xs text-mutedForeground">
                  {stylePresetDescriptionsByLanguage[language][preset]}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button variant="secondary" onClick={onNewProject}>
            {text.newProject}
          </Button>
          <Button variant="secondary" onClick={onSaveProject}>
            {text.saveProject}
          </Button>
          <Button onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? <Spinner /> : null}
            {isGenerating ? text.generating : text.generateContent}
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
