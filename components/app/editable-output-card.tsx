"use client";

import { useState } from "react";
import { Copy, Pencil, RefreshCcw, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";

interface TextOutputCardProps {
  language: UiLanguage;
  title: string;
  description?: string;
  value: string;
  onChange: (next: string) => void;
  onCopy: () => void;
  onRegenerate: () => void;
}

export function TextOutputCard({
  language,
  title,
  description,
  value,
  onChange,
  onCopy,
  onRegenerate,
}: TextOutputCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const text = uiText[language];

  const startEdit = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const save = () => {
    onChange(draft.trim());
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">{title}</CardTitle>
            {description ? (
              <p className="mt-1 text-xs text-mutedForeground">{description}</p>
            ) : null}
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="secondary" onClick={onCopy} aria-label={`${text.copySectionAria} ${title}`}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={onRegenerate}
              aria-label={`${text.regenerateSectionAria} ${title}`}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            {isEditing ? (
              <>
                <Button size="icon" variant="secondary" onClick={save} aria-label={text.saveEditAria}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  aria-label={text.cancelEditAria}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="icon" variant="secondary" onClick={startEdit} aria-label={`${text.editSectionAria} ${title}`}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-h-[130px]"
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/90">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface BulletsOutputCardProps {
  language: UiLanguage;
  value: string[];
  onChange: (next: string[]) => void;
  onCopy: () => void;
  onRegenerate: () => void;
}

export function BulletsOutputCard({ language, value, onChange, onCopy, onRegenerate }: BulletsOutputCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value.join("\n"));
  const text = uiText[language];

  const startEdit = () => {
    setDraft(value.join("\n"));
    setIsEditing(true);
  };

  const save = () => {
    const next = draft
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    onChange(next);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">{text.bulletsLabel}</CardTitle>
            <p className="mt-1 text-xs text-mutedForeground">
              {text.bulletsDescription}
            </p>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="secondary" onClick={onCopy} aria-label={`${text.copySectionAria} ${text.bulletsLabel}`}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={onRegenerate} aria-label={`${text.regenerateSectionAria} ${text.bulletsLabel}`}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            {isEditing ? (
              <>
                <Button size="icon" variant="secondary" onClick={save} aria-label={text.saveEditAria}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  aria-label={text.cancelEditAria}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="icon" variant="secondary" onClick={startEdit} aria-label={`${text.editSectionAria} ${text.bulletsLabel}`}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} />
        ) : (
          <ul className="space-y-1.5 text-sm text-foreground/90">
            {value.map((item, index) => (
              <li key={`${item}-${index}`} className="rounded-lg bg-muted px-2.5 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
