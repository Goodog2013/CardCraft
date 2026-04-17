"use client";

import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";

interface PhotoUploaderProps {
  value?: string;
  onChange: (next: string) => void;
  language: UiLanguage;
}

export function PhotoUploader({ value, onChange, language }: PhotoUploaderProps) {
  const text = uiText[language];

  const handleFile = async (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onChange(result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="photo-upload"
        className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted p-4 text-center transition hover:border-primary/50"
      >
        <ImagePlus className="mb-2 h-5 w-5 text-mutedForeground" />
        <p className="text-sm font-medium text-foreground/90">{text.uploadPhoto}</p>
        <p className="mt-1 text-xs text-mutedForeground">{text.uploadPhotoHint}</p>
      </label>

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleFile(file);
          }
        }}
      />

      {value ? (
        <div className="space-y-2">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={value}
              alt={text.uploadedPreviewAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onChange("")}
            className="w-full"
          >
            <Trash2 className="h-4 w-4" />
            {text.removePhoto}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
