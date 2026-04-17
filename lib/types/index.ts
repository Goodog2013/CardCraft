export const CATEGORIES = [
  "jacket",
  "windbreaker",
  "pants",
  "blouse",
  "hoodie",
  "vest",
  "skirt",
  "dress",
  "schoolwear",
  "sportswear",
  "other",
] as const;

export const GENDERS = ["girl", "boy", "unisex"] as const;

export const STYLE_PRESETS = [
  "marketplace-standard",
  "premium",
  "fashion",
  "rich-content",
  "short-concise",
  "for-moms",
  "teen-focused",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type Gender = (typeof GENDERS)[number];
export type StylePreset = (typeof STYLE_PRESETS)[number];

export interface ProductInput {
  productName: string;
  category: Category;
  gender: Gender;
  ageGroup: string;
  sizeRange: string;
  season: string[];
  color: string;
  material: string;
  styleTags: string[];
  features: string[];
  fit: string;
  useCases: string[];
  brandTone: string;
  notes: string;
  photoDataUrl?: string;
}

export interface GeneratedContent {
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  promptRu: string;
  promptEn: string;
}

export interface ProjectRecord {
  id: string;
  projectName: string;
  input: ProductInput;
  stylePreset: StylePreset;
  output: GeneratedContent;
  createdAt: string;
  updatedAt: string;
}

export type OutputSection = keyof GeneratedContent;

export type SectionVariants = Record<OutputSection, number>;
