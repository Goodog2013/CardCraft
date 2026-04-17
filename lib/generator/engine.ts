import {
  categoryLabels,
  categoryLabelsEn,
  genderLabels,
} from "@/lib/constants/options";
import { toneProfiles } from "@/lib/generator/templates";
import type {
  GeneratedContent,
  OutputSection,
  ProductInput,
  SectionVariants,
  StylePreset,
} from "@/lib/types";

const defaultSectionVariants: SectionVariants = {
  title: 0,
  description: 0,
  bullets: 0,
  cta: 0,
  promptRu: 0,
  promptEn: 0,
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickBySeed(items: string[], seed: number) {
  if (!items.length) {
    return "";
  }
  return items[seed % items.length];
}

function sanitizeList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function joinNice(items: string[], fallback: string, conjunction = "и") {
  const cleaned = sanitizeList(items);
  if (!cleaned.length) {
    return fallback;
  }
  if (cleaned.length === 1) {
    return cleaned[0];
  }
  return `${cleaned.slice(0, -1).join(", ")} ${conjunction} ${cleaned[cleaned.length - 1]}`;
}

function sectionSeed(
  input: ProductInput,
  tone: StylePreset,
  section: OutputSection,
  variant: number,
) {
  const key = [
    input.productName,
    input.category,
    input.material,
    input.fit,
    input.styleTags.join("|"),
    input.features.join("|"),
    tone,
    section,
    variant.toString(),
  ].join("::");
  return hashString(key);
}

function createTitle(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string {
  const profile = toneProfiles[tone];
  const seed = sectionSeed(input, tone, "title", variant);
  const opener = pickBySeed(profile.opener, seed);
  const category = categoryLabels[input.category];

  const components = [
    `${opener} ${category}`,
    input.productName,
    input.ageGroup ? `${input.ageGroup}` : "",
    input.sizeRange ? `размеры ${input.sizeRange}` : "",
    input.material ? input.material : "",
    input.season.length ? joinNice(input.season, "") : "",
  ].filter(Boolean);

  return components.join(" | ");
}

function createDescription(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string {
  const profile = toneProfiles[tone];
  const seed = sectionSeed(input, tone, "description", variant);

  const trustPhrase = pickBySeed(profile.trustWords, seed);
  const styleTagText = joinNice(input.styleTags, "актуальный casual");
  const featureText = joinNice(input.features.slice(0, 3), "комфорт в повседневной носке");
  const useCaseText = joinNice(input.useCases.slice(0, 3), "школа и прогулки");

  const firstSentence = `${categoryLabels[input.category]} ${genderLabels[input.gender]} в стиле ${styleTagText}.`;
  const secondSentence = `Материал: ${input.material || "качественный текстиль"}. Силуэт: ${input.fit || "regular"}, поэтому вещь легко садится по фигуре и не мешает движениям.`;
  const thirdSentence = `Ключевые преимущества: ${featureText}. Сценарии: ${useCaseText}.`;
  const fourthSentence = `Тон бренда: ${input.brandTone || "дружелюбный и уверенный"}. ${trustPhrase}.`;

  if (profile.descriptionLength === "short") {
    return `${firstSentence} ${thirdSentence}`;
  }

  if (profile.descriptionLength === "medium") {
    return `${firstSentence} ${secondSentence} ${thirdSentence}`;
  }

  return `${firstSentence} ${secondSentence} ${thirdSentence} ${fourthSentence}`;
}

function createBullets(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string[] {
  const seed = sectionSeed(input, tone, "bullets", variant);
  const profile = toneProfiles[tone];
  const featureText = sanitizeList(input.features);
  const styleText = sanitizeList(input.styleTags);
  const useCases = sanitizeList(input.useCases);

  const bullets = [
    `Материал: ${input.material || "плотный и комфортный текстиль"}`,
    `Силуэт: ${input.fit || "комфортная универсальная посадка"}`,
    `Стиль: ${joinNice(styleText.slice(0, 3), "городской casual")}`,
    `Сценарии: ${joinNice(useCases.slice(0, 3), "каждый день")}`,
    `Детали: ${joinNice(featureText.slice(0, 3), "аккуратная посадка и удобный крой")}`,
  ];

  const alternative = [
    `Категория: ${categoryLabels[input.category]} ${genderLabels[input.gender]}`,
    `Сезонность: ${joinNice(input.season, "демисезон")}`,
    `Размерная сетка: ${input.sizeRange || "широкий диапазон"}`,
    `Плюсы: ${pickBySeed(profile.trustWords, seed)}`,
    `Цвет: ${input.color || "базовый универсальный"}`,
  ];

  if (seed % 2 === 0) {
    return bullets;
  }

  return alternative;
}

function createCta(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string {
  const profile = toneProfiles[tone];
  const seed = sectionSeed(input, tone, "cta", variant);
  const lead = pickBySeed(profile.ctaLead, seed);

  if (tone === "short-concise") {
    return `${lead}: ${input.productName}, ${input.sizeRange || "актуальные размеры"}.`;
  }

  return `${lead}: ${input.productName} ${genderLabels[input.gender]}, ${input.ageGroup || "подростковая линейка"}, ${input.sizeRange || "широкий размерный ряд"}.`;
}

function createPromptRu(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string {
  const profile = toneProfiles[tone];
  const seed = sectionSeed(input, tone, "promptRu", variant);
  const angle = pickBySeed(
    [
      "передний ракурс",
      "ракурс 3/4",
      "акцент на фактуру ткани",
      "крупный план с инфографическими зонами",
    ],
    seed,
  );

  return [
    `Создай изображение карточки товара для маркетплейса: ${categoryLabels[input.category]} "${input.productName}" ${genderLabels[input.gender]}.`,
    `Цвет: ${input.color || "нейтральный"}, материал: ${input.material || "качественный текстиль"}, стиль: ${joinNice(input.styleTags, "casual")}.`,
    `Покажи ${angle}, фон светлый, чистый, без лишних объектов, добавь место под 5 инфографических плашек.`,
    `Настроение: ${profile.styleHintRu}, фотореалистично, high detail, мягкие тени, 4k.`,
  ].join(" ");
}

function createPromptEn(
  input: ProductInput,
  tone: StylePreset,
  variant: number,
): string {
  const profile = toneProfiles[tone];
  const seed = sectionSeed(input, tone, "promptEn", variant);
  const shot = pickBySeed(
    [
      "front studio shot",
      "three-quarter angle",
      "fabric texture close-up",
      "hero product shot with infographic zones",
    ],
    seed,
  );

  return [
    `Generate an ecommerce product card image for a ${categoryLabelsEn[input.category]} named "${input.productName}" (${input.gender}).`,
    `Color palette: ${input.color || "neutral"}, fabric: ${input.material || "durable textile"}, vibe: ${joinNice(input.styleTags, "casual", "and")}.`,
    `Use ${shot}, isolated product on a clean bright background, reserve space for five infographic labels.`,
    `Mood: ${profile.styleHintEn}, photorealistic, high detail, soft shadows, 4k, marketplace-ready framing.`,
  ].join(" ");
}

export function generateContent(
  input: ProductInput,
  tone: StylePreset,
  sectionVariants?: Partial<SectionVariants>,
): GeneratedContent {
  const variants: SectionVariants = {
    ...defaultSectionVariants,
    ...sectionVariants,
  };

  return {
    title: createTitle(input, tone, variants.title),
    description: createDescription(input, tone, variants.description),
    bullets: createBullets(input, tone, variants.bullets),
    cta: createCta(input, tone, variants.cta),
    promptRu: createPromptRu(input, tone, variants.promptRu),
    promptEn: createPromptEn(input, tone, variants.promptEn),
  };
}

export function generateSection(
  section: OutputSection,
  input: ProductInput,
  tone: StylePreset,
  variant: number,
) {
  switch (section) {
    case "title":
      return createTitle(input, tone, variant);
    case "description":
      return createDescription(input, tone, variant);
    case "bullets":
      return createBullets(input, tone, variant);
    case "cta":
      return createCta(input, tone, variant);
    case "promptRu":
      return createPromptRu(input, tone, variant);
    case "promptEn":
      return createPromptEn(input, tone, variant);
    default:
      return "";
  }
}

export function createInitialVariants(): SectionVariants {
  return {
    title: 0,
    description: 0,
    bullets: 0,
    cta: 0,
    promptRu: 0,
    promptEn: 0,
  };
}
