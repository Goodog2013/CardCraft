import type { GeneratedContent, ProjectRecord } from "@/lib/types";

export function stringifyGeneratedContent(content: GeneratedContent) {
  return [
    `TITLE:\n${content.title}`,
    `DESCRIPTION:\n${content.description}`,
    `INFOGRAPHIC BULLETS:\n${content.bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}`,
    `CTA:\n${content.cta}`,
    `PROMPT RU:\n${content.promptRu}`,
    `PROMPT EN:\n${content.promptEn}`,
  ].join("\n\n");
}

export function downloadFile(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportProjectAsJson(project: ProjectRecord) {
  downloadFile(`${project.projectName || "cardcraft-project"}.json`, JSON.stringify(project, null, 2), "application/json");
}

export function exportContentAsTxt(project: ProjectRecord) {
  const text = stringifyGeneratedContent(project.output);
  downloadFile(`${project.projectName || "cardcraft-content"}.txt`, text, "text/plain;charset=utf-8");
}
