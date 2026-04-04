# Design: Environment Setup — boosterai-site

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS)
- Payload CMS 3.x (embedded w Next.js)
- Neon Postgres (produkcja)
- Docker Compose + Postgres 16 (lokalny dev)
- Vercel (hosting + Vercel Blob dla mediów)
- Node.js via nvm, pnpm via corepack

## Narzędzia systemowe

- **Node.js**: instalowany przez `nvm`, wersja pinowana w `.nvmrc`
- **pnpm**: aktywowany przez `corepack enable` (wchodzi z Node)
- **Docker Desktop**: lokalny Postgres w kontenerze, `docker-compose.yml` w repo

## Struktura projektu

```
boosterai-site/
├── src/
│   ├── app/
│   │   ├── (frontend)/        # publiczne strony
│   │   └── (payload)/         # Payload admin
│   ├── collections/           # Pages, Media
│   └── payload.config.ts
├── public/
│   └── media/                 # lokalne media (gitignored)
├── docker-compose.yml
├── .env.local                 # gitignored
├── .env.example               # w repo
├── .nvmrc
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Zmienne środowiskowe

```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/boosterai
PAYLOAD_SECRET=<losowy string min. 32 znaki>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Na Vercelu: te same klucze, `DATABASE_URI` wskazuje na Neon connection string.

## Payload CMS Collections

- **Pages**: `title`, `slug`, `content` (rich text), `seo` (meta title/description)
- **Media**: storage lokalne w dev (`public/media/`) / Vercel Blob na prod (`@payloadcms/storage-vercel-blob`)
- **Forms**: `@payloadcms/plugin-form-builder` + wysyłka emaili przez Resend lub nodemailer (konfiguracja przez env vars `SMTP_*`)

## Dev workflow

```bash
nvm use                    # przełącza Node na wersję z .nvmrc
docker compose up -d       # startuje lokalny Postgres w tle
pnpm dev                   # Next.js + Payload na localhost:3000
```

Reset bazy lokalnie:

```bash
docker compose down -v && docker compose up -d
pnpm payload migrate  # Payload 3.x — brak migrate:fresh, drop tabel ręcznie lub przez psql
```

## Deployment

- GitHub → Vercel integration, auto-deploy na push do `main`
- Preview deployments automatycznie na każdym PR
- Env vars ustawiane jednorazowo w Vercel Dashboard
- Migracje Payload uruchamiane automatycznie przy starcie (`payload migrate`)
- Media na prod: Vercel Blob przez `@payloadcms/storage-vercel-blob`

## Decyzje projektowe

- **Opcja A (Docker Compose)** wybrana dla lokalnego Postgres — pełna izolacja, odtwarzalne środowisko, łatwy reset
- Payload CMS embedded w Next.js (nie osobny serwis) — mniej infrastruktury, łatwiejszy deploy
- pnpm zamiast npm — szybszy, lepszy disk cache
- nvm zamiast globalnej instalacji Node — kontrola wersji bez zaśmiecania systemu
