"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

interface TagSelectorProps {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  allowCustom?: boolean;
  maxVisibleOptions?: number;
  language: UiLanguage;
  getLabel?: (value: string) => string;
}

export function TagSelector({
  options,
  selected,
  onChange,
  allowCustom = true,
  maxVisibleOptions = 10,
  language,
  getLabel,
}: TagSelectorProps) {
  const [draft, setDraft] = useState("");
  const text = uiText[language];
  const format = getLabel ?? ((value: string) => value);

  const normalizedSelected = selected.map((item) => item.trim()).filter(Boolean);

  const toggleTag = (tag: string) => {
    if (normalizedSelected.includes(tag)) {
      onChange(normalizedSelected.filter((item) => item !== tag));
      return;
    }

    onChange([...normalizedSelected, tag]);
  };

  const addCustom = () => {
    const value = draft.trim();
    if (!value || normalizedSelected.includes(value)) {
      setDraft("");
      return;
    }

    onChange([...normalizedSelected, value]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.slice(0, maxVisibleOptions).map((option) => {
          const active = normalizedSelected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleTag(option)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-mutedForeground hover:border-primary/40",
              )}
            >
              {format(option)}
            </button>
          );
        })}
      </div>

      {allowCustom ? (
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustom();
              }
            }}
            placeholder={text.addCustomTagPlaceholder}
            className="h-9 flex-1 rounded-xl border border-border px-3 text-sm shadow-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addCustom}
            aria-label={text.addTag}
          >
            <Plus className="h-3.5 w-3.5" />
            {text.addTag}
          </Button>
        </div>
      ) : null}

      {normalizedSelected.length ? (
        <div className="flex flex-wrap gap-2 rounded-xl border border-dashed border-border bg-muted p-2">
          {normalizedSelected.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs text-foreground/90 shadow-sm"
            >
              {format(tag)}
              <button
                type="button"
                className="text-mutedForeground hover:text-foreground"
                onClick={() => toggleTag(tag)}
                aria-label={`${text.removeTag} ${format(tag)}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
