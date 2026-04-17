import type { Category, Gender, StylePreset } from "@/lib/types";

export type UiLanguage = "ru" | "en";

export const categoryLabels: Record<Category, string> = {
  jacket: "Куртка",
  windbreaker: "Ветровка",
  pants: "Брюки",
  blouse: "Блуза",
  hoodie: "Худи",
  vest: "Жилет",
  skirt: "Юбка",
  dress: "Платье",
  schoolwear: "Школьная форма",
  sportswear: "Спортивная одежда",
  other: "Одежда",
};

export const categoryLabelsEn: Record<Category, string> = {
  jacket: "jacket",
  windbreaker: "windbreaker",
  pants: "pants",
  blouse: "blouse",
  hoodie: "hoodie",
  vest: "vest",
  skirt: "skirt",
  dress: "dress",
  schoolwear: "schoolwear set",
  sportswear: "sportswear",
  other: "apparel",
};

export const categoryUiLabels: Record<UiLanguage, Record<Category, string>> = {
  ru: categoryLabels,
  en: {
    jacket: "Jacket",
    windbreaker: "Windbreaker",
    pants: "Pants",
    blouse: "Blouse",
    hoodie: "Hoodie",
    vest: "Vest",
    skirt: "Skirt",
    dress: "Dress",
    schoolwear: "Schoolwear",
    sportswear: "Sportswear",
    other: "Other",
  },
};

export const genderLabels: Record<Gender, string> = {
  girl: "для девочек",
  boy: "для мальчиков",
  unisex: "унисекс",
};

export const genderUiLabels: Record<UiLanguage, Record<Gender, string>> = {
  ru: {
    girl: "Девочка",
    boy: "Мальчик",
    unisex: "Унисекс",
  },
  en: {
    girl: "Girl",
    boy: "Boy",
    unisex: "Unisex",
  },
};

export const stylePresetLabelsByLanguage: Record<UiLanguage, Record<StylePreset, string>> = {
  ru: {
    "marketplace-standard": "Маркетплейс стандарт",
    premium: "Премиум",
    fashion: "Fashion",
    "rich-content": "Богатый контент",
    "short-concise": "Коротко и ясно",
    "for-moms": "Для мам",
    "teen-focused": "Для подростков",
  },
  en: {
    "marketplace-standard": "Marketplace standard",
    premium: "Premium",
    fashion: "Fashion",
    "rich-content": "Rich content",
    "short-concise": "Short concise",
    "for-moms": "For moms",
    "teen-focused": "Teen-focused",
  },
};

export const stylePresetDescriptionsByLanguage: Record<UiLanguage, Record<StylePreset, string>> = {
  ru: {
    "marketplace-standard": "Сбалансированная подача для карточек маркетплейса.",
    premium: "Более дорогой, уверенный тон с акцентом на качество.",
    fashion: "Трендовый стиль и визуальные акценты.",
    "rich-content": "Развернуто, с большим количеством аргументов.",
    "short-concise": "Коротко и по делу, быстро читается.",
    "for-moms": "Теплый, практичный тон, важны удобство и уход.",
    "teen-focused": "Язык и ритм для подростковой аудитории.",
  },
  en: {
    "marketplace-standard": "Balanced wording for marketplace product cards.",
    premium: "Premium tone with strong quality positioning.",
    fashion: "Trend-driven styling and visual focus.",
    "rich-content": "Detailed copy with more selling arguments.",
    "short-concise": "Short and clear, easy to scan.",
    "for-moms": "Warm and practical voice for parents.",
    "teen-focused": "Rhythm and language for teenage audience.",
  },
};

export const seasonOptions = [
  "Весна",
  "Лето",
  "Осень",
  "Зима",
  "Демисезон",
  "Всесезон",
];

export const seasonTranslations: Record<string, { ru: string; en: string }> = {
  "Весна": { ru: "Весна", en: "Spring" },
  "Лето": { ru: "Лето", en: "Summer" },
  "Осень": { ru: "Осень", en: "Autumn" },
  "Зима": { ru: "Зима", en: "Winter" },
  "Демисезон": { ru: "Демисезон", en: "Mid-season" },
  "Всесезон": { ru: "Всесезон", en: "All-season" },
};

export const styleTagOptions = [
  "casual",
  "street",
  "school",
  "sport",
  "minimal",
  "oversize",
  "trendy",
  "classic",
  "smart",
  "urban",
];

export const styleTagTranslations: Record<string, { ru: string; en: string }> = {
  casual: { ru: "Кэжуал", en: "Casual" },
  street: { ru: "Стрит", en: "Street" },
  school: { ru: "Школьный", en: "School" },
  sport: { ru: "Спорт", en: "Sport" },
  minimal: { ru: "Минимализм", en: "Minimal" },
  oversize: { ru: "Оверсайз", en: "Oversize" },
  trendy: { ru: "Трендовый", en: "Trendy" },
  classic: { ru: "Классика", en: "Classic" },
  smart: { ru: "Smart", en: "Smart" },
  urban: { ru: "Городской", en: "Urban" },
};

export const featureOptions = [
  "мягкая подкладка",
  "дышащая ткань",
  "легкий уход",
  "регулируемые манжеты",
  "молния YKK",
  "карманы на кнопках",
  "износостойкий материал",
  "свободная посадка",
  "гипоаллергенный состав",
  "не сковывает движения",
];

export const featureTranslations: Record<string, { ru: string; en: string }> = {
  "мягкая подкладка": { ru: "мягкая подкладка", en: "soft lining" },
  "дышащая ткань": { ru: "дышащая ткань", en: "breathable fabric" },
  "легкий уход": { ru: "легкий уход", en: "easy care" },
  "регулируемые манжеты": { ru: "регулируемые манжеты", en: "adjustable cuffs" },
  "молния YKK": { ru: "молния YKK", en: "YKK zipper" },
  "карманы на кнопках": { ru: "карманы на кнопках", en: "snap pockets" },
  "износостойкий материал": { ru: "износостойкий материал", en: "durable material" },
  "свободная посадка": { ru: "свободная посадка", en: "relaxed fit" },
  "гипоаллергенный состав": { ru: "гипоаллергенный состав", en: "hypoallergenic fabric blend" },
  "не сковывает движения": { ru: "не сковывает движения", en: "freedom of movement" },
};

export const useCaseOptions = [
  "школа",
  "прогулки",
  "поездки",
  "спорт",
  "повседневная носка",
  "фотосессии",
  "активный отдых",
  "город",
  "двор",
];

export const useCaseTranslations: Record<string, { ru: string; en: string }> = {
  школа: { ru: "школа", en: "school" },
  прогулки: { ru: "прогулки", en: "walks" },
  поездки: { ru: "поездки", en: "trips" },
  спорт: { ru: "спорт", en: "sports" },
  "повседневная носка": { ru: "повседневная носка", en: "daily wear" },
  фотосессии: { ru: "фотосессии", en: "photoshoots" },
  "активный отдых": { ru: "активный отдых", en: "active leisure" },
  город: { ru: "город", en: "city" },
  двор: { ru: "двор", en: "yard" },
};

export const ageGroupOptions = [
  "5-7 лет",
  "8-10 лет",
  "11-13 лет",
  "14-16 лет",
  "10-16 лет",
];

export const ageGroupTranslations: Record<string, { ru: string; en: string }> = {
  "5-7 лет": { ru: "5-7 лет", en: "5-7 years" },
  "8-10 лет": { ru: "8-10 лет", en: "8-10 years" },
  "11-13 лет": { ru: "11-13 лет", en: "11-13 years" },
  "14-16 лет": { ru: "14-16 лет", en: "14-16 years" },
  "10-16 лет": { ru: "10-16 лет", en: "10-16 years" },
};

export const sizeRangeOptions = ["98-104", "110-122", "128-140", "146-158", "158-170"];

export const fitOptions = [
  "прямой силуэт",
  "oversize",
  "regular fit",
  "slim fit",
  "А-силуэт",
  "свободный крой",
];

export const fitTranslations: Record<string, { ru: string; en: string }> = {
  "прямой силуэт": { ru: "прямой силуэт", en: "straight silhouette" },
  oversize: { ru: "oversize", en: "oversize" },
  "regular fit": { ru: "regular fit", en: "regular fit" },
  "slim fit": { ru: "slim fit", en: "slim fit" },
  "А-силуэт": { ru: "А-силуэт", en: "A-line" },
  "свободный крой": { ru: "свободный крой", en: "relaxed cut" },
};

export function localizeOption(
  value: string,
  language: UiLanguage,
  translations: Record<string, { ru: string; en: string }>,
) {
  const item = translations[value];
  if (!item) {
    return value;
  }
  return item[language];
}
