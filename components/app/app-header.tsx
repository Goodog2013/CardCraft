import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { UiLanguage } from "@/lib/constants/options";
import { uiText } from "@/lib/i18n/ui";

export function AppHeader({ language }: { language: UiLanguage }) {
  const text = uiText[language];

  return (
    <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-[#f6fbfd] via-[#f9f9f4] to-[#fbf7f1] p-6 shadow-soft dark:from-[#1a242d] dark:via-[#1f2225] dark:to-[#28241f]">
      <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-accent/25 blur-2xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.24em] text-mutedForeground">
            CardCraft Studio
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            CardCraft
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-mutedForeground sm:text-base">{text.appSubtitle}</p>
        </div>

        <Badge className="border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          {text.appBadge}
        </Badge>
      </div>
    </header>
  );
}
