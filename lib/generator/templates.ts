import type { StylePreset } from "@/lib/types";

export interface ToneProfile {
  opener: string[];
  trustWords: string[];
  ctaLead: string[];
  styleHintRu: string;
  styleHintEn: string;
  descriptionLength: "short" | "medium" | "long";
}

export const toneProfiles: Record<StylePreset, ToneProfile> = {
  "marketplace-standard": {
    opener: ["Практичная", "Универсальная", "Комфортная"],
    trustWords: ["продуманный крой", "аккуратная посадка", "надежный материал"],
    ctaLead: ["Добавьте в корзину", "Закажите сейчас", "Выбирайте размер"],
    styleHintRu: "чистый студийный стиль маркетплейса",
    styleHintEn: "clean ecommerce studio style",
    descriptionLength: "medium",
  },
  premium: {
    opener: ["Премиальная", "Выразительная", "Статусная"],
    trustWords: ["качественная фурнитура", "деликатная посадка", "внимание к деталям"],
    ctaLead: ["Подчеркните уровень гардероба", "Соберите премиальный образ", "Выберите качество"],
    styleHintRu: "дорогой каталоговый стиль, мягкий свет",
    styleHintEn: "premium catalog look, soft diffused lighting",
    descriptionLength: "medium",
  },
  fashion: {
    opener: ["Трендовая", "Актуальная", "Смелая"],
    trustWords: ["модный силуэт", "фактурный материал", "акцентные элементы"],
    ctaLead: ["Соберите трендовый лук", "Добавьте модный акцент", "Заберите хит сезона"],
    styleHintRu: "fashion-editorial настроение, динамика",
    styleHintEn: "fashion editorial mood with dynamic framing",
    descriptionLength: "medium",
  },
  "rich-content": {
    opener: ["Функциональная", "Детально продуманная", "Многофункциональная"],
    trustWords: ["баланс практичности и стиля", "комфорт на каждый день", "подходит для активного ритма"],
    ctaLead: ["Соберите готовое решение", "Выберите универсальную модель", "Добавьте в гардероб уже сегодня"],
    styleHintRu: "подробный инфографический контент",
    styleHintEn: "detailed infographic-first e-commerce rendering",
    descriptionLength: "long",
  },
  "short-concise": {
    opener: ["Лаконичная", "Удобная", "Легкая"],
    trustWords: ["базовый комфорт", "функциональный дизайн", "удачный крой"],
    ctaLead: ["Закажите в 1 клик", "Выберите размер и оформляйте", "Забирайте без сомнений"],
    styleHintRu: "минималистичная карточка товара",
    styleHintEn: "minimal product card composition",
    descriptionLength: "short",
  },
  "for-moms": {
    opener: ["Практичная для родителей", "Надежная для ежедневной носки", "Комфортная и понятная"],
    trustWords: ["удобно стирать", "приятно носить весь день", "подходит для активного ребенка"],
    ctaLead: ["Выберите вещь, которую полюбят и дети, и родители", "Добавьте в базовый гардероб", "Оформите и забудьте о компромиссах"],
    styleHintRu: "уютная подача, акцент на практичность",
    styleHintEn: "cozy practical presentation for parents",
    descriptionLength: "medium",
  },
  "teen-focused": {
    opener: ["Стильная", "С характером", "Уверенная"],
    trustWords: ["выглядит актуально", "удобно двигаться", "легко сочетать с любимыми вещами"],
    ctaLead: ["Прокачайте повседневный образ", "Добавьте в свой street-набор", "Заберите свой вайб"],
    styleHintRu: "подростковый street-контент, живой ракурс",
    styleHintEn: "teen streetwear vibe, energetic framing",
    descriptionLength: "short",
  },
};
