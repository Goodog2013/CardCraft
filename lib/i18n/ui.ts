import type { OutputSection } from "@/lib/types";
import type { UiLanguage } from "@/lib/constants/options";

interface UiDictionary {
  language: string;
  russian: string;
  english: string;
  theme: string;
  lightTheme: string;
  darkTheme: string;
  appSubtitle: string;
  appBadge: string;
  runtimeConfig: string;
  aiMode: string;
  endpoint: string;
  model: string;
  localGeneratorHint: string;

  formTitle: string;
  formDescription: string;
  projectName: string;
  projectNamePlaceholder: string;
  productName: string;
  productNamePlaceholder: string;
  category: string;
  gender: string;
  ageGroup: string;
  sizeRange: string;
  season: string;
  color: string;
  colorPlaceholder: string;
  material: string;
  materialPlaceholder: string;
  styleTags: string;
  features: string;
  fit: string;
  brandTone: string;
  brandTonePlaceholder: string;
  useCases: string;
  notes: string;
  notesPlaceholder: string;
  photoOptional: string;
  stylePreset: string;
  newProject: string;
  saveProject: string;
  generateContent: string;
  generating: string;

  uploadPhoto: string;
  uploadPhotoHint: string;
  uploadedPreviewAlt: string;
  removePhoto: string;

  addCustomTagPlaceholder: string;
  addTag: string;
  removeTag: string;

  savedProjects: string;
  savedProjectsDescription: string;
  noProjects: string;
  updatedPrefix: string;
  openProject: string;
  renameProject: string;
  duplicateProject: string;
  deleteProject: string;

  outputTitle: string;
  outputDescription: string;
  copyAll: string;
  exportJson: string;
  exportTxt: string;
  noGeneratedTitle: string;
  noGeneratedDescription: string;
  titleLabel: string;
  descriptionLabel: string;
  bulletsLabel: string;
  bulletsDescription: string;
  ctaLabel: string;
  promptRuLabel: string;
  promptEnLabel: string;

  copySectionAria: string;
  regenerateSectionAria: string;
  editSectionAria: string;
  saveEditAria: string;
  cancelEditAria: string;

  toastProductNameRequired: string;
  toastProductNameRequiredText: string;
  toastMaterialRequired: string;
  toastMaterialRequiredText: string;
  toastContentGenerated: string;
  toastContentGeneratedText: string;
  toastSectionRegenerated: string;
  toastSectionRegeneratedText: string;
  toastCopied: string;
  toastCopiedText: string;
  toastCopyFailed: string;
  toastCopyFailedText: string;
  toastProjectSaved: string;
  toastProjectSavedText: string;
  toastProjectOpened: string;
  toastProjectRenamed: string;
  toastProjectDeleted: string;
  toastProjectDuplicated: string;
  toastNewProject: string;
  toastNewProjectText: string;
  toastJsonExported: string;
  toastTxtExported: string;

  confirmDelete: string;
}

export const uiText: Record<UiLanguage, UiDictionary> = {
  ru: {
    language: "Язык",
    russian: "Русский",
    english: "English",
    theme: "Тема",
    lightTheme: "Светлая",
    darkTheme: "Темная",
    appSubtitle:
      "AI-ready генератор контента карточек маркетплейса для детской и подростковой одежды.",
    appBadge: "Локальный Smart Engine + API Ready",
    runtimeConfig: "Конфигурация runtime",
    aiMode: "AI режим",
    endpoint: "Endpoint",
    model: "Модель",
    localGeneratorHint: "Локальный генератор всегда доступен для MVP-режима.",

    formTitle: "Параметры товара",
    formDescription: "Заполните характеристики и получите полный пакет контента карточки.",
    projectName: "Название проекта",
    projectNamePlaceholder: "Например: Autumn Teen Windbreaker",
    productName: "Название товара *",
    productNamePlaceholder: "Например: Breeze School Windbreaker",
    category: "Категория",
    gender: "Пол",
    ageGroup: "Возрастная группа",
    sizeRange: "Размерный ряд",
    season: "Сезон",
    color: "Цвет",
    colorPlaceholder: "Например: графит / шоколад",
    material: "Материал",
    materialPlaceholder: "Например: хлопок 90%, эластан 10%",
    styleTags: "Стилевые теги",
    features: "Особенности / детали",
    fit: "Посадка / силуэт",
    brandTone: "Тон бренда",
    brandTonePlaceholder: "Уверенный, дружелюбный, premium",
    useCases: "Сценарии использования",
    notes: "Заметки",
    notesPlaceholder: "Дополнительные требования к карточке",
    photoOptional: "Фото (опционально)",
    stylePreset: "Стиль / тональность",
    newProject: "Новый проект",
    saveProject: "Сохранить",
    generateContent: "Сгенерировать",
    generating: "Генерируем...",

    uploadPhoto: "Загрузить фото товара",
    uploadPhotoHint: "JPG, PNG, WEBP. Хранится локально в проекте.",
    uploadedPreviewAlt: "Превью загруженного товара",
    removePhoto: "Удалить фото",

    addCustomTagPlaceholder: "Добавить свой тег",
    addTag: "Добавить",
    removeTag: "Удалить",

    savedProjects: "Сохраненные проекты",
    savedProjectsDescription: "Открывайте, переименовывайте, дублируйте и удаляйте локальные проекты.",
    noProjects: "Проектов пока нет. Сгенерируйте контент и сохраните первую карточку.",
    updatedPrefix: "Обновлено",
    openProject: "Открыть проект",
    renameProject: "Переименовать проект",
    duplicateProject: "Дублировать проект",
    deleteProject: "Удалить проект",

    outputTitle: "Сгенерированный пакет карточки",
    outputDescription: "Редактируйте блоки, пересоздавайте секции, копируйте и экспортируйте результат.",
    copyAll: "Копировать все",
    exportJson: "Экспорт JSON",
    exportTxt: "Экспорт TXT",
    noGeneratedTitle: "Контент еще не сгенерирован",
    noGeneratedDescription: "Заполните форму и нажмите «Сгенерировать».",
    titleLabel: "Заголовок",
    descriptionLabel: "Описание",
    bulletsLabel: "Инфографика (буллеты)",
    bulletsDescription: "Используйте в слайдах карусели или на изображениях.",
    ctaLabel: "Финальный CTA",
    promptRuLabel: "Промпт RU",
    promptEnLabel: "Промпт EN",

    copySectionAria: "Копировать",
    regenerateSectionAria: "Перегенерировать",
    editSectionAria: "Редактировать",
    saveEditAria: "Сохранить",
    cancelEditAria: "Отмена",

    toastProductNameRequired: "Нужно название товара",
    toastProductNameRequiredText: "Заполните поле «Название товара» перед генерацией.",
    toastMaterialRequired: "Нужен материал",
    toastMaterialRequiredText: "Материал помогает получить более точный и полезный результат.",
    toastContentGenerated: "Контент готов",
    toastContentGeneratedText: "Пакет карточки готов к редактированию и экспорту.",
    toastSectionRegenerated: "Секция обновлена",
    toastSectionRegeneratedText: "Сгенерирован новый детерминированный вариант секции",
    toastCopied: "Скопировано",
    toastCopiedText: "Секция скопирована в буфер обмена",
    toastCopyFailed: "Не удалось скопировать",
    toastCopyFailedText: "Нет доступа к буферу обмена.",
    toastProjectSaved: "Проект сохранен",
    toastProjectSavedText: "Изменения записаны в localStorage.",
    toastProjectOpened: "Проект открыт",
    toastProjectRenamed: "Проект переименован",
    toastProjectDeleted: "Проект удален",
    toastProjectDuplicated: "Проект дублирован",
    toastNewProject: "Новый проект",
    toastNewProjectText: "Чистое рабочее пространство готово.",
    toastJsonExported: "JSON экспортирован",
    toastTxtExported: "TXT экспортирован",

    confirmDelete: "Удалить проект",
  },
  en: {
    language: "Language",
    russian: "Russian",
    english: "English",
    theme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    appSubtitle:
      "AI-ready marketplace card content generator for kids and teen fashion products.",
    appBadge: "Local Smart Engine + API Ready",
    runtimeConfig: "Runtime config",
    aiMode: "AI mode",
    endpoint: "Endpoint",
    model: "Model",
    localGeneratorHint: "Local generator is always available for MVP usage.",

    formTitle: "Product Input",
    formDescription: "Fill product details and generate a complete marketplace content package.",
    projectName: "Project name",
    projectNamePlaceholder: "For example: Autumn Teen Windbreaker",
    productName: "Product name *",
    productNamePlaceholder: "For example: Breeze School Windbreaker",
    category: "Category",
    gender: "Gender",
    ageGroup: "Age group",
    sizeRange: "Size range",
    season: "Season",
    color: "Color",
    colorPlaceholder: "For example: graphite / cocoa",
    material: "Material",
    materialPlaceholder: "For example: cotton 90%, elastane 10%",
    styleTags: "Style tags",
    features: "Features / details",
    fit: "Fit / silhouette",
    brandTone: "Brand tone",
    brandTonePlaceholder: "Confident, friendly, premium",
    useCases: "Use cases",
    notes: "Notes",
    notesPlaceholder: "Additional requirements for this card",
    photoOptional: "Photo (optional)",
    stylePreset: "Style / tone preset",
    newProject: "New project",
    saveProject: "Save project",
    generateContent: "Generate content",
    generating: "Generating...",

    uploadPhoto: "Upload product photo",
    uploadPhotoHint: "JPG, PNG, WEBP. Stored locally in project data.",
    uploadedPreviewAlt: "Uploaded product preview",
    removePhoto: "Remove photo",

    addCustomTagPlaceholder: "Add custom tag",
    addTag: "Add",
    removeTag: "Remove",

    savedProjects: "Saved Projects",
    savedProjectsDescription: "Open, rename, duplicate or delete local projects.",
    noProjects: "No projects yet. Generate content and save your first card.",
    updatedPrefix: "Updated",
    openProject: "Open project",
    renameProject: "Rename project",
    duplicateProject: "Duplicate project",
    deleteProject: "Delete project",

    outputTitle: "Generated Card Package",
    outputDescription: "Edit inline, regenerate sections, copy blocks, or export full package.",
    copyAll: "Copy all",
    exportJson: "Export JSON",
    exportTxt: "Export TXT",
    noGeneratedTitle: "No generated content yet",
    noGeneratedDescription: "Fill the form and click Generate content.",
    titleLabel: "Title",
    descriptionLabel: "Description",
    bulletsLabel: "Infographic Bullets",
    bulletsDescription: "Use in carousel slides or image overlays.",
    ctaLabel: "Final CTA",
    promptRuLabel: "Prompt RU",
    promptEnLabel: "Prompt EN",

    copySectionAria: "Copy",
    regenerateSectionAria: "Regenerate",
    editSectionAria: "Edit",
    saveEditAria: "Save",
    cancelEditAria: "Cancel",

    toastProductNameRequired: "Product name is required",
    toastProductNameRequiredText: "Fill product name before generating content.",
    toastMaterialRequired: "Material is required",
    toastMaterialRequiredText: "Material helps the generator produce specific output.",
    toastContentGenerated: "Content generated",
    toastContentGeneratedText: "Card package is ready for editing or export.",
    toastSectionRegenerated: "Section regenerated",
    toastSectionRegeneratedText: "A new deterministic section variant is ready",
    toastCopied: "Copied",
    toastCopiedText: "Section copied to clipboard",
    toastCopyFailed: "Copy failed",
    toastCopyFailedText: "Clipboard permission denied.",
    toastProjectSaved: "Project saved",
    toastProjectSavedText: "Changes persisted in local storage.",
    toastProjectOpened: "Project opened",
    toastProjectRenamed: "Project renamed",
    toastProjectDeleted: "Project deleted",
    toastProjectDuplicated: "Project duplicated",
    toastNewProject: "New project",
    toastNewProjectText: "Fresh workspace is ready.",
    toastJsonExported: "JSON exported",
    toastTxtExported: "TXT exported",

    confirmDelete: "Delete project",
  },
};

const sectionLabelMap: Record<UiLanguage, Record<OutputSection, string>> = {
  ru: {
    title: "Заголовок",
    description: "Описание",
    bullets: "Инфографика",
    cta: "CTA",
    promptRu: "Промпт RU",
    promptEn: "Промпт EN",
  },
  en: {
    title: "Title",
    description: "Description",
    bullets: "Bullets",
    cta: "CTA",
    promptRu: "Prompt RU",
    promptEn: "Prompt EN",
  },
};

export function sectionLabel(section: OutputSection, language: UiLanguage) {
  return sectionLabelMap[language][section];
}
