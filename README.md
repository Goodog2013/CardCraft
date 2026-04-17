# CardCraft 🧵✨

## RU 🇷🇺

CardCraft — MVP-приложение для генерации контента карточек одежды для маркетплейсов (особенно kids/teen fashion).

Один товар -> полный пакет:
- заголовок
- продающее описание
- инфографика (буллеты)
- финальный CTA
- промпт для изображения на русском
- промпт для изображения на английском

### Возможности 🚀

- Локальный deterministic-генератор (работает без внешнего API)
- Переключение языка интерфейса: **Русский / English** 🌐
- Заполнение параметров товара + загрузка фото (base64 preview)
- Inline-редактирование каждого блока
- Copy по секциям + Copy all
- Regenerate для каждой секции
- Локальные проекты в `localStorage`:
  - создать
  - сохранить
  - открыть
  - переименовать
  - дублировать
  - удалить
- Экспорт:
  - JSON
  - TXT

### Стек 🛠️

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Модульная архитектура: `app/`, `components/`, `hooks/`, `lib/`

### Быстрый старт ⚡

```bash
npm install
npm run dev
```

Откройте `http://192.168.1.66:3131`.

### Скрипты 📦

- `npm run dev` — запуск dev-сервера
- `npm run build` — production build
- `npm run start` — запуск production-сборки
- `npm run lint` — ESLint

### Переменные окружения (готовность к API) 🤖

```env
NEXT_PUBLIC_AI_MODE=local
NEXT_PUBLIC_OPENAI_BASE_URL=http://192.168.1.66:3131/v1
NEXT_PUBLIC_OPENAI_MODEL=local-model
```

Конфиг: `lib/config/ai.ts`

### Локальное хранение 💾

- Ключ проектов: `cardcraft.projects.v1`
- Ключ языка UI: `cardcraft.ui.language.v1`

### Лицензия 📄

MIT. См. [`LICENSE`](./LICENSE).

---

## EN 🇺🇸

CardCraft is an MVP web app for generating marketplace product card content for clothing items (especially kids/teen fashion).

One product -> complete package:
- title
- selling description
- infographic bullets
- final CTA
- image prompt in Russian
- image prompt in English

### Features 🚀

- Local deterministic generator (works without external API)
- UI language switch: **Russian / English** 🌐
- Product input form + optional photo upload (base64 preview)
- Inline editing for every generated block
- Copy by section + Copy all
- Section-level regenerate
- Local project persistence in `localStorage`:
  - create
  - save
  - open
  - rename
  - duplicate
  - delete
- Export:
  - JSON
  - TXT

### Stack 🛠️

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Modular architecture: `app/`, `components/`, `hooks/`, `lib/`

### Quick Start ⚡

```bash
npm install
npm run dev
```

Open `http://192.168.1.66:3131`.

### Scripts 📦

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production build
- `npm run lint` — run ESLint

### Environment Variables (API-ready) 🤖

```env
NEXT_PUBLIC_AI_MODE=local
NEXT_PUBLIC_OPENAI_BASE_URL=http://192.168.1.66:3131/v1
NEXT_PUBLIC_OPENAI_MODEL=local-model
```

Config file: `lib/config/ai.ts`

### Local Persistence 💾

- Projects key: `cardcraft.projects.v1`
- UI language key: `cardcraft.ui.language.v1`

### License 📄

MIT. See [`LICENSE`](./LICENSE).
