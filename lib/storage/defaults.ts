import { createInitialVariants, generateContent } from "@/lib/generator/engine";
import type { ProductInput, ProjectRecord, StylePreset } from "@/lib/types";
import { makeId } from "@/lib/utils";

export const defaultStylePreset: StylePreset = "marketplace-standard";

export const emptyProductInput: ProductInput = {
  productName: "",
  category: "hoodie",
  gender: "unisex",
  ageGroup: "11-13 лет",
  sizeRange: "128-140",
  season: ["Осень", "Весна"],
  color: "графит",
  material: "хлопок 80%, полиэстер 20%",
  styleTags: ["casual", "street"],
  features: ["мягкая подкладка", "не сковывает движения"],
  fit: "oversize",
  useCases: ["школа", "прогулки", "город"],
  brandTone: "уверенный, дружелюбный",
  notes: "Подчеркнуть комфорт и трендовый силуэт",
};

export function createSampleProject(): ProjectRecord {
  const sampleInput: ProductInput = {
    productName: "Urban Move",
    category: "hoodie",
    gender: "unisex",
    ageGroup: "10-16 лет",
    sizeRange: "128-170",
    season: ["Осень", "Зима", "Весна"],
    color: "глубокий синий",
    material: "футер 3-нитка, хлопок 85%",
    styleTags: ["street", "oversize", "trendy"],
    features: [
      "мягкая изнанка",
      "карман кенгуру",
      "эластичные манжеты",
      "износостойкий принт",
    ],
    fit: "oversize",
    useCases: ["школа", "прогулки", "поездки"],
    brandTone: "молодежный и уверенный",
    notes: "Акцент на комфорт и универсальность",
    photoDataUrl: "",
  };

  const stylePreset: StylePreset = "teen-focused";
  const output = generateContent(sampleInput, stylePreset, createInitialVariants());
  const now = new Date().toISOString();

  return {
    id: makeId("project"),
    projectName: "Urban Move Hoodie",
    input: sampleInput,
    stylePreset,
    output,
    createdAt: now,
    updatedAt: now,
  };
}
