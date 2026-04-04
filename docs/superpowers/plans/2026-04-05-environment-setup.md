# Environment Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Skonfigurować kompletne środowisko deweloperskie i produkcyjne dla boosterai-site (Next.js 16 + Payload CMS 3.x + Neon Postgres + Vercel).

**Architecture:** Next.js App Router z Payload CMS embedded jako część tej samej aplikacji. Lokalny dev używa Dockera do Postgres, produkcja łączy się z Neon przez ten sam adapter. Vercel Blob obsługuje media na produkcji.

**Tech Stack:** Node.js 22 (nvm), pnpm (corepack), Next.js 16, Payload CMS 3.x, `@payloadcms/db-postgres`, `@payloadcms/plugin-form-builder`, `@payloadcms/storage-vercel-blob`, Docker Compose, Neon Postgres, Vercel

---

## File Map

| Plik | Odpowiedzialność |
|------|-----------------|
| `.nvmrc` | Pinuje wersję Node.js |
| `docker-compose.yml` | Lokalny serwis Postgres |
| `.env.example` | Template zmiennych środowiskowych (w repo) |
| `.env.local` | Lokalne wartości env (gitignored) |
| `.gitignore` | Wyklucza `.env.local`, `public/media/`, `.next/` itp. |
| `package.json` | Zależności projektu, skrypty |
| `next.config.ts` | Konfiguracja Next.js (withPayload wrapper) |
| `tailwind.config.ts` | Konfiguracja Tailwind CSS |
| `src/payload.config.ts` | Główna konfiguracja Payload CMS |
| `src/collections/Pages.ts` | Kolekcja Pages (title, slug, content, seo) |
| `src/collections/Media.ts` | Kolekcja Media |
| `src/app/(frontend)/page.tsx` | Publiczna strona główna |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | Payload admin panel route |
| `src/app/(payload)/admin/[[...segments]]/not-found.tsx` | Payload admin 404 |
| `src/app/(payload)/api/[...slug]/route.ts` | Payload REST API route |

---

## Task 1: Zainstaluj nvm i Node.js

**Files:**
- Create: `.nvmrc`

- [ ] **Step 1: Zainstaluj nvm**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Następnie zamknij i otwórz terminal (lub wykonaj `source ~/.bashrc` / `source ~/.zshrc`).

Weryfikacja:
```
nvm --version
# oczekiwane: 0.39.7
```

- [ ] **Step 2: Stwórz `.nvmrc`**

```
22
```

Plik: `.nvmrc`

- [ ] **Step 3: Zainstaluj i ustaw Node.js 22**

```bash
nvm install 22
nvm use 22
```

Weryfikacja:
```
node --version
# oczekiwane: v22.x.x
```

- [ ] **Step 4: Włącz corepack (pnpm)**

```bash
corepack enable
```

Weryfikacja:
```
pnpm --version
# oczekiwane: 9.x.x lub wyżej
```

- [ ] **Step 5: Commit**

```bash
git add .nvmrc
git commit -m "chore: add .nvmrc pinning Node.js 22"
```

---

## Task 2: Zainstaluj Docker Desktop i skonfiguruj lokalny Postgres

**Files:**
- Create: `docker-compose.yml`

- [ ] **Step 1: Zainstaluj Docker Desktop**

Pobierz i zainstaluj Docker Desktop ze strony https://docs.docker.com/desktop/

Po instalacji uruchom Docker Desktop i poczekaj aż ikona w systemowym trayu pokaże "Docker Desktop is running".

Weryfikacja:
```bash
docker --version
# oczekiwane: Docker version 25.x.x lub wyżej
docker compose version
# oczekiwane: Docker Compose version v2.x.x
```

- [ ] **Step 2: Stwórz `docker-compose.yml`**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: boosterai
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Plik: `docker-compose.yml`

- [ ] **Step 3: Uruchom lokalny Postgres**

```bash
docker compose up -d
```

Weryfikacja:
```bash
docker compose ps
# oczekiwane: postgres   running   0.0.0.0:5432->5432/tcp
```

- [ ] **Step 4: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: add docker-compose for local Postgres"
```

---

## Task 3: Stwórz projekt Next.js + Payload CMS

**Files:**
- Create: wszystkie pliki projektu przez CLI

- [ ] **Step 1: Uruchom Payload CLI w katalogu repo**

```bash
pnpm create payload-app@latest .
```

Gdy CLI zapyta o opcje, wybierz:
- **Template**: `blank` (lub `website` — obydwa działają, `blank` daje czystszy start)
- **Package manager**: `pnpm`
- **Database**: `postgres`
- Jeśli pyta o nazwę projektu: `boosterai-site`

CLI zainstaluje wszystkie zależności automatycznie.

- [ ] **Step 2: Weryfikacja struktury**

```bash
ls src/
# oczekiwane: app/  collections/  payload.config.ts  (lub podobna struktura)
```

- [ ] **Step 3: Sprawdź wygenerowany `package.json`**

Upewnij się że zawiera:
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "payload": "^3.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "@payloadcms/next": "^3.0.0"
  }
}
```

Uwaga: Payload CLI może zainstalować Next.js 15 zamiast 16 (Next.js 16 jest w beta). Jeśli tak — zostaw 15, jest w pełni kompatybilny z całym planem.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js + Payload CMS project"
```

---

## Task 4: Skonfiguruj zmienne środowiskowe

**Files:**
- Create: `.env.example`
- Create: `.env.local` (lokalnie, nie commituj)
- Modify: `.gitignore`

- [ ] **Step 1: Sprawdź `.gitignore`**

Upewnij się że `.gitignore` zawiera te wpisy (Payload CLI powinien je dodać, ale zweryfikuj):

```
# env
.env
.env.local
.env*.local

# payload media
/public/media

# next
.next/
out/

# node
node_modules/
```

Jeśli brakuje wpisów, dodaj je do `.gitignore`.

- [ ] **Step 2: Stwórz `.env.example`**

```env
# Baza danych
# Lokalny dev: Docker Postgres
# Produkcja: Neon connection string
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/boosterai

# Payload secret — min. 32 losowych znaków
# Wygeneruj: openssl rand -hex 32
PAYLOAD_SECRET=change-me-use-openssl-rand-hex-32

# URL aplikacji
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Vercel Blob (tylko produkcja)
# BLOB_READ_WRITE_TOKEN=
```

Plik: `.env.example`

- [ ] **Step 3: Stwórz `.env.local`**

```bash
openssl rand -hex 32
```

Skopiuj output i użyj jako `PAYLOAD_SECRET`.

Stwórz `.env.local`:
```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/boosterai
PAYLOAD_SECRET=<output z openssl rand -hex 32>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Plik: `.env.local` — **nie commituj tego pliku**.

- [ ] **Step 4: Commit**

```bash
git add .env.example .gitignore
git commit -m "chore: add env template and gitignore rules"
```

---

## Task 5: Skonfiguruj Payload CMS — adapter Postgres i collections

**Files:**
- Modify: `src/payload.config.ts`
- Modify: `src/collections/Pages.ts` (lub stwórz jeśli brak)
- Modify: `src/collections/Media.ts` (lub stwórz jeśli brak)

- [ ] **Step 1: Zaktualizuj `src/payload.config.ts`**

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Pages, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
```

- [ ] **Step 2: Stwórz `src/collections/Pages.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
```

- [ ] **Step 3: Stwórz `src/collections/Media.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
```

- [ ] **Step 4: Uruchom migrację bazy**

Upewnij się że Docker Postgres działa (`docker compose up -d`), następnie:

```bash
pnpm payload migrate
```

Oczekiwane: migracje tworzone i zastosowane bez błędów.

- [ ] **Step 5: Commit**

```bash
git add src/payload.config.ts src/collections/Pages.ts src/collections/Media.ts
git commit -m "feat: configure Payload CMS with Pages and Media collections"
```

---

## Task 6: Dodaj plugin Form Builder

**Files:**
- Modify: `src/payload.config.ts`
- Run: `pnpm add @payloadcms/plugin-form-builder`

- [ ] **Step 1: Zainstaluj plugin**

```bash
pnpm add @payloadcms/plugin-form-builder
```

- [ ] **Step 2: Zaktualizuj `src/payload.config.ts`**

Dodaj import i plugin do konfiguracji:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Pages, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
    }),
  ],
})
```

- [ ] **Step 3: Zastosuj nowe migracje**

```bash
pnpm payload migrate
```

Oczekiwane: nowe tabele dla formularzy utworzone bez błędów.

- [ ] **Step 4: Uruchom dev server i sprawdź admin**

```bash
pnpm dev
```

Otwórz http://localhost:3000/admin — powinien pojawić się ekran tworzenia pierwszego użytkownika admin.

- [ ] **Step 5: Commit**

```bash
git add src/payload.config.ts package.json pnpm-lock.yaml
git commit -m "feat: add form-builder plugin to Payload CMS"
```

---

## Task 7: Skonfiguruj Vercel Blob storage dla mediów

**Files:**
- Modify: `src/payload.config.ts`
- Run: `pnpm add @payloadcms/storage-vercel-blob`

- [ ] **Step 1: Zainstaluj plugin**

```bash
pnpm add @payloadcms/storage-vercel-blob
```

- [ ] **Step 2: Zaktualizuj `src/payload.config.ts`**

Dodaj `vercelBlobStorage` — aktywuje się tylko na produkcji gdy `BLOB_READ_WRITE_TOKEN` jest ustawiony:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Pages, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
```

- [ ] **Step 3: Weryfikacja lokalnie**

```bash
pnpm dev
```

Lokalnie `BLOB_READ_WRITE_TOKEN` nie jest ustawiony — pliki trafiają do `public/media/`. Sprawdź upload pliku przez admin panel http://localhost:3000/admin.

- [ ] **Step 4: Commit**

```bash
git add src/payload.config.ts package.json pnpm-lock.yaml
git commit -m "feat: add Vercel Blob storage for media (prod only)"
```

---

## Task 8: Skonfiguruj Tailwind CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/(frontend)/globals.css` (lub `src/app/globals.css`)

- [ ] **Step 1: Sprawdź `tailwind.config.ts`**

Upewnij się że content paths obejmują wszystkie pliki projektu (Payload CLI może ustawić tylko `./src/app/**`):

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Sprawdź globals.css**

Upewnij się że `globals.css` zawiera Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Weryfikacja**

```bash
pnpm dev
```

Sprawdź http://localhost:3000 — strona powinna się renderować (może być pusta, to OK na tym etapie).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/
git commit -m "chore: verify Tailwind CSS configuration"
```

---

## Task 9: Przygotowanie do deploymentu na Vercel

**Files:**
- Brak nowych plików — kroki manualne przez UI

- [ ] **Step 1: Utwórz konto na Neon i bazę danych**

1. Wejdź na https://neon.tech i utwórz konto
2. Stwórz nowy projekt: nazwa `boosterai-site`, region najbliższy użytkownikom
3. Skopiuj **connection string** (format: `postgresql://user:pass@host/dbname?sslmode=require`)

- [ ] **Step 2: Utwórz konto na Vercel i połącz repo**

1. Wejdź na https://vercel.com i utwórz konto
2. "Add New Project" → zaimportuj repo `boosterai-site` z GitHub
3. Framework: Next.js (Vercel wykryje automatycznie)
4. **Nie deployuj jeszcze** — najpierw ustaw env vars

- [ ] **Step 3: Ustaw zmienne środowiskowe w Vercel Dashboard**

W Project Settings → Environment Variables dodaj:

| Klucz | Wartość | Środowisko |
|-------|---------|-----------|
| `DATABASE_URI` | Neon connection string | Production, Preview |
| `PAYLOAD_SECRET` | ten sam co lokalnie (lub nowy `openssl rand -hex 32`) | Production, Preview |
| `NEXT_PUBLIC_SERVER_URL` | `https://twoja-domena.vercel.app` | Production |
| `BLOB_READ_WRITE_TOKEN` | wygenerowany z Vercel Blob (krok 4) | Production, Preview |

- [ ] **Step 4: Utwórz Vercel Blob store**

W Vercel Dashboard → Storage → "Create Database" → "Blob" → "Create"

Skopiuj `BLOB_READ_WRITE_TOKEN` i dodaj do env vars (krok 3).

- [ ] **Step 5: Deploy**

```bash
git push origin main
```

Vercel automatycznie uruchomi build. Sprawdź logi — przy pierwszym starcie Payload uruchomi `migrate` automatycznie.

Weryfikacja: wejdź na `https://twoja-domena.vercel.app/admin` — powinien pojawić się panel logowania.

---

## Weryfikacja końcowa

Po wykonaniu wszystkich tasków sprawdź:

```bash
# Lokalnie
nvm use && node --version          # v22.x.x
pnpm --version                     # 9.x.x
docker compose ps                  # postgres running
pnpm dev                           # localhost:3000 działa
# http://localhost:3000/admin      # panel Payload dostępny
```

Na produkcji:
- `https://twoja-domena.vercel.app` — strona działa
- `https://twoja-domena.vercel.app/admin` — panel działa
- Upload pliku przez admin → plik ląduje w Vercel Blob
