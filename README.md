# boosterai-site

Marketing site — landing page, oferta, formularze kontaktowe.

**Stack:** Next.js 16 · Payload CMS 3.x · Tailwind CSS v4 · PostgreSQL (Docker)

---

## Wymagania

- [nvm](https://github.com/nvm-sh/nvm) — menadżer wersji Node.js
- [Docker](https://docs.docker.com/desktop/) — lokalny Postgres

## Pierwsze uruchomienie

```bash
# 1. Ustaw wersję Node.js
nvm use

# 2. Zainstaluj zależności
pnpm install

# 3. Skopiuj plik zmiennych środowiskowych
cp .env.example .env.local
# Otwórz .env.local i uzupełnij PAYLOAD_SECRET:
#   openssl rand -hex 32

# 4. Uruchom bazę danych
docker compose up -d

# 5. Zastosuj migracje
pnpm payload migrate

# 6. Uruchom serwer deweloperski
pnpm dev
```

Aplikacja działa na [http://localhost:3000](http://localhost:3000)
Panel admina: [http://localhost:3000/admin](http://localhost:3000/admin)

## Codzienne uruchomienie

```bash
docker compose up -d   # uruchom Postgres (jeśli nie działa)
pnpm dev               # uruchom Next.js + Payload
```

## Zatrzymanie

```bash
# Ctrl+C — zatrzymuje dev server

# Zatrzymaj Postgres
docker compose stop

# Lub całkowicie usuń kontener i dane
docker compose down -v
```

## Zmienne środowiskowe

| Zmienna                  | Opis                               | Przykład                                                  |
| ------------------------ | ---------------------------------- | --------------------------------------------------------- |
| `DATABASE_URI`           | Connection string do Postgres      | `postgresql://postgres:postgres@localhost:5432/boosterai` |
| `PAYLOAD_SECRET`         | Sekret Payload CMS (min. 32 znaki) | `openssl rand -hex 32`                                    |
| `NEXT_PUBLIC_SERVER_URL` | URL aplikacji                      | `http://localhost:3000`                                   |
| `BLOB_READ_WRITE_TOKEN`  | Vercel Blob (tylko produkcja)      | —                                                         |

## Skrypty

```bash
pnpm dev            # serwer deweloperski
pnpm build          # build produkcyjny
pnpm start          # uruchom build produkcyjny
pnpm lint           # sprawdź ESLint
pnpm lint:fix       # napraw błędy ESLint
pnpm format         # sformatuj kod (Prettier)
pnpm format:check   # sprawdź formatowanie
```

## Migracje bazy danych

```bash
pnpm payload migrate          # zastosuj nowe migracje
pnpm payload migrate:create   # utwórz nową migrację ręcznie
```

Reset lokalnej bazy:

```bash
docker compose down -v && docker compose up -d
pnpm payload migrate
```

## Deployment (Vercel + Neon)

Produkcja używa **Neon Postgres** (serverless) zamiast lokalnego Dockera. Lokalny dev pozostaje na Dockerze.

### Pierwsza konfiguracja

1. Zaloguj się do [Neon Console](https://console.neon.tech/) i skopiuj **pooled** connection string z zakładki _Connection Details_ (endpoint z sufiksem `-pooler`, parametr `?sslmode=require`).

2. Ustaw zmienne środowiskowe na Vercel (_Project → Settings → Environment Variables_) dla środowisk `Production` i `Preview`:

   | Zmienna                  | Wartość                                                                     |
   | ------------------------ | --------------------------------------------------------------------------- |
   | `DATABASE_URI`           | Neon **pooled** URL (`...-pooler.REGION.aws.neon.tech/...?sslmode=require`) |
   | `PAYLOAD_SECRET`         | `openssl rand -hex 32` (inny niż lokalnie)                                  |
   | `NEXT_PUBLIC_SERVER_URL` | `https://twoja-domena.vercel.app`                                           |
   | `BLOB_READ_WRITE_TOKEN`  | Token z Vercel Blob (_Storage → Blob_)                                      |

   Payload używa zmiennej `DATABASE_URI` — **nie** `DATABASE_URL` z szablonów Vercel.

3. Uruchom migracje Payload na bazie Neon (jednorazowo, z lokalnej maszyny):

   ```bash
   DATABASE_URI="<neon-pooled-url>" PAYLOAD_SECRET="<prod-secret>" pnpm payload migrate
   ```

4. Deploy:

   ```bash
   vercel --prod
   ```

### Po zmianie schematu kolekcji

```bash
# 1. Wygeneruj nową migrację lokalnie (na Docker DB)
pnpm payload migrate:create

# 2. Zastosuj lokalnie
pnpm payload migrate

# 3. Commit migracji (src/migrations/) i wypchnij

# 4. Zastosuj na Neon przed deployem
DATABASE_URI="<neon-pooled-url>" pnpm payload migrate
```

### Uwagi

- **Pooled vs unpooled**: używamy poolera (pgbouncer) bo Next.js API routes i Payload na Vercel są serverless. Direct connection (`DATABASE_URL_UNPOOLED`) nie jest potrzebny.
- **Zmienne PG\* / POSTGRES\***: ignorujemy je — Payload czyta tylko `DATABASE_URI`.
- **Pierwsze połączenie** do Neon może mieć cold start ~1-2s (auto-suspend po 5 min bezczynności na darmowym planie).

## Struktura projektu

```
src/
├── app/
│   ├── (frontend)/     # publiczne strony (landing, oferta)
│   └── (payload)/      # Payload admin panel + API
├── collections/        # definicje kolekcji Payload
│   ├── Pages.ts        # strony (title, slug, content, SEO)
│   ├── Media.ts        # pliki i obrazy
│   └── Users.ts        # użytkownicy admina
├── migrations/         # migracje bazy danych
└── payload.config.ts   # konfiguracja Payload CMS
```

## haslo do dev admin panel

    test@test.com:BoosterAI67!
