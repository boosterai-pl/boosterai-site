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