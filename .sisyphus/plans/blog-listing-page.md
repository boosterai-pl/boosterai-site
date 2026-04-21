# Blog Listing Page — /blog

## TL;DR

> **Quick Summary**: Create a `/blog` listing page that fetches published blog posts from the existing Payload CMS `BlogPosts` collection and renders them in a card grid, showing title, date, and excerpt per post.
>
> **Deliverables**:
>
> - `src/components/blog/BlogPostCard.tsx` — reusable card component
> - `src/app/(frontend)/blog/page.tsx` — server component listing page with SEO metadata
>
> **Estimated Effort**: Short (2-3 hours)
> **Parallel Execution**: NO — Task 2 depends on Task 1 (card component)
> **Critical Path**: Task 1 (BlogPostCard) → Task 2 (/blog page)

---

## Context

### Original Request

Create a `/blog` page that lists blog posts fetched from Payload CMS. Include title, date, summary for each post.

### Research Findings

- **BlogPosts collection exists** with fields: `title`, `slug`, `excerpt`, `content`, `coverImage` (→ Media), `author` (→ Users), `categories` (→ Categories, hasMany), `publishedDate`, `status` (draft|published)
- **Data-fetching pattern**: direct Payload SDK (`getPayload()` from `payload` package), server components only, ISR with `export const revalidate = 60`
- **No date library installed** — use native `Intl.DateTimeFormat` or `toLocaleDateString()`
- **Tailwind v4**: CSS-based config (`@import 'tailwindcss'` in CSS), no `tailwind.config.ts`
- **Container pattern**: `className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl"`
- **Grid pattern from ServicesSection**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- **Types**: auto-generated in `src/payload-types.ts` — use `BlogPost` type from there

---

## Work Objectives

### Core Objective

Build a public `/blog` listing page that displays published blog posts from Payload CMS, matching the existing site's design conventions.

### Concrete Deliverables

- `src/components/blog/BlogPostCard.tsx` — card with title, formatted date, excerpt, optional cover image
- `src/app/(frontend)/blog/page.tsx` — server page with Payload query, card grid, empty state, and `<Metadata>`

### Definition of Done

- [ ] `http://localhost:3000/blog` renders without errors
- [ ] Published posts appear as cards with title, date, excerpt
- [ ] Draft posts do NOT appear
- [ ] Empty state renders when no published posts exist
- [ ] `pnpm lint` passes with no errors

### Must Have

- Only `status === 'published'` posts are fetched
- `publishedDate` formatted as human-readable date (e.g. "16 kwietnia 2026")
- Cards link to `/blog/[slug]` (individual post page — out of scope but URL must be correct)
- Empty state message when no posts exist
- SEO: `<title>` and `<meta name="description">` via Next.js `generateMetadata`

### Must NOT Have (Guardrails)

- No richText rendering — excerpt (plain text) only, NOT content field
- No pagination — render all published posts (simple list, no infinite scroll)
- No category filtering — just the grid
- No individual post page (`/blog/[slug]`) — this is a separate subtask
- No `as any` or TypeScript suppression — use proper `BlogPost` type from `payload-types.ts`
- No hardcoded post data — always fetched from Payload
- Do NOT touch `src/payload-types.ts`, `src/migrations/`, `src/collections/BlogPosts.ts` — read-only references

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: NO (no test framework detected)
- **Automated tests**: NO — no unit tests for this task
- **Agent-Executed QA**: YES — Playwright browser verification

### QA Policy

After implementation, the executing agent MUST run browser-based QA scenarios. Evidence saved to `.sisyphus/evidence/`.

---

## Execution Strategy

### Sequential Execution (Task 1 → Task 2)

```
Step 1: BlogPostCard component (no dependencies)
└── Task 1: src/components/blog/BlogPostCard.tsx

Step 2: Blog listing page (depends on Task 1)
└── Task 2: src/app/(frontend)/blog/page.tsx

Step FINAL: Lint + browser QA
└── Task F1: pnpm lint + Playwright verification
```

---

## TODOs

- [x] 1. Create `BlogPostCard` component

  **What to do**:
  - Create `src/components/blog/BlogPostCard.tsx` as a pure presentational React component (no async, no data fetching)
  - Accept a single `post` prop typed as `BlogPost` from `payload-types.ts`
  - Display:
    - `post.coverImage` — optional `<Image>` (Next.js `Image`, `fill` layout with `sizes` prop). Wrap in a relative-positioned container with aspect-ratio. Fallback: no image, just the text content.
    - `post.title` — `<h2>` or `<h3>` depending on usage context, styled prominently
    - `post.publishedDate` — formatted with `new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedDate))`. Handle `null`/`undefined` gracefully (omit if missing).
    - `post.excerpt` — plain text paragraph, truncate at 2-3 lines with `line-clamp-3`
  - Wrap entire card in `<Link href={/blog/${post.slug}>` from `next/link`
  - Styling follows ServicesSection card pattern: white background, rounded-xl, border, hover shadow, transition
  - Do NOT include categories, author, richText content

  **Must NOT do**:
  - No data fetching inside this component
  - No `content` field (richText) rendering
  - No date library imports — use native `Intl.DateTimeFormat`
  - No inline styles — Tailwind classes only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with design conventions to match
  - **Skills**: [`frontend-patterns`, `frontend-design`]
    - `frontend-patterns`: Next.js Image component, Link usage, Tailwind patterns
    - `frontend-design`: Card layout, hover states, responsive design

  **Parallelization**:
  - **Can Run In Parallel**: YES (no dependencies)
  - **Parallel Group**: Step 1 (only task)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/components/homepage/ServicesSection.tsx` — card styling pattern (white bg, rounded-xl, border, hover:shadow-lg, transition-all)
  - `src/components/Header.tsx` — Next.js `Link` import and usage pattern
  - `src/app/(frontend)/layout.tsx` — Tailwind class conventions used in the project

  **API/Type References**:
  - `src/payload-types.ts` — `BlogPost` type (fields: id, title, slug, excerpt, coverImage, publishedDate, status, categories). Import as: `import type { BlogPost } from '@/payload-types'`
  - `src/collections/BlogPosts.ts` — field definitions for reference (do not modify)

  **External References**:
  - Next.js `Image` component: use `fill` with a relative-positioned wrapper, always provide `sizes` prop
  - Next.js `Link` component: `import Link from 'next/link'`

  **Acceptance Criteria**:
  - [ ] File exists at `src/components/blog/BlogPostCard.tsx`
  - [ ] TypeScript compiles without errors (`pnpm lint` passes)
  - [ ] Accepts `BlogPost` type from payload-types.ts — no `any`
  - [ ] Renders title, date (formatted pl-PL), excerpt, optional cover image
  - [ ] Is a `<Link>` wrapping to `/blog/[slug]`

  **QA Scenarios**:

  ```
  Scenario: Card renders correctly in blog listing (verified via Task 2 QA)
    Tool: Playwright (run after Task 2 completes)
    Evidence: .sisyphus/evidence/task-1-card-render.png
  ```

  **Commit**: YES (group with Task 2)
  - Message: `feat(blog): add BlogPostCard component and /blog listing page`

---

- [x] 2. Create `/blog` listing page

  **What to do**:
  - Create `src/app/(frontend)/blog/page.tsx` as an async Server Component
  - Add `export const revalidate = 60` (ISR, matches homepage pattern)
  - Import and instantiate Payload client following the exact same pattern as `src/app/(frontend)/page.tsx`:
    ```typescript
    import config from '@/payload.config'
    import { getPayload } from 'payload'
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    ```
  - Fetch published posts:
    ```typescript
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedDate',
      depth: 1, // populates coverImage (Media object with url, alt)
      limit: 100, // no pagination — fetch all published
    })
    ```
  - Export `generateMetadata` returning `{ title: 'Blog | BoosterAI', description: 'Artykuły i aktualności...' }`
  - Render structure:
    ```
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h1>Blog</h1>
        {posts.docs.length === 0 ? <EmptyState /> : <CardGrid />}
      </div>
    </section>
    ```
  - Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
  - Empty state: simple centered message — "Brak artykułów. Wróć wkrótce." — no complex UI
  - Map `posts.docs` to `<BlogPostCard key={post.id} post={post} />`

  **Must NOT do**:
  - No client components (`'use client'`) — this is a Server Component
  - No REST API calls — use Payload SDK directly
  - No pagination UI
  - No category filter UI
  - Do not import or render richText from `post.content`
  - Do not fetch draft posts (`status !== 'published'`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward server component with established patterns to follow
  - **Skills**: [`frontend-patterns`, `backend-patterns`]
    - `frontend-patterns`: Next.js App Router server components, metadata API
    - `backend-patterns`: Payload SDK data fetching pattern

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Step 2 (sequential after Task 1)
  - **Blocks**: Task F1 (final QA)
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/app/(frontend)/page.tsx` — COPY the exact Payload data-fetching pattern (`import config`, `getPayload`, `revalidate = 60`)
  - `src/components/homepage/ServicesSection.tsx` — responsive grid layout pattern

  **API/Type References**:
  - `src/payload-types.ts` — `BlogPost` type for mapping `posts.docs`
  - Payload `find()` API: collection slug is `'blog-posts'` (check `src/collections/BlogPosts.ts` for the `slug` field)

  **Acceptance Criteria**:
  - [ ] File exists at `src/app/(frontend)/blog/page.tsx`
  - [ ] `export const revalidate = 60` present
  - [ ] `generateMetadata` exported with title and description
  - [ ] Only posts with `status === 'published'` rendered (verified by checking query)
  - [ ] Empty state renders when no posts (no crash)
  - [ ] TypeScript compiles without errors

  **QA Scenarios**:

  ```
  Scenario: Happy path — blog page loads with posts
    Tool: Playwright
    Preconditions: Dev server running (pnpm dev). At least 1 published BlogPost exists in Payload admin.
    Steps:
      1. Navigate to http://localhost:3000/blog
      2. Wait for selector "h1" to be visible (timeout: 10s)
      3. Assert page title contains "Blog"
      4. Assert at least one element with selector ".blog-card" OR "article" OR "a[href^='/blog/']" is visible
      5. Assert each visible card contains non-empty text for title (h2/h3)
      6. Assert each visible card contains a date string (contains digits like "2025" or "2026")
      7. Screenshot full page → .sisyphus/evidence/task-2-blog-listing-happy.png
    Expected Result: Page renders, grid of cards visible, each with title and date
    Failure Indicators: 500 error, empty page body, missing title/date elements

  Scenario: Empty state — no published posts
    Tool: Playwright
    Preconditions: Dev server running. No published posts in Payload (all drafts or collection empty).
    Steps:
      1. Navigate to http://localhost:3000/blog
      2. Wait for selector "h1" to be visible (timeout: 10s)
      3. Assert page does NOT show a 500 error
      4. Assert empty state message is visible (text contains "Brak" or "wróć" or similar)
      5. Screenshot → .sisyphus/evidence/task-2-blog-listing-empty.png
    Expected Result: Page renders gracefully with empty state message, no crash
    Failure Indicators: 500 error, JavaScript exception, blank white page

  Scenario: Draft posts not shown
    Tool: Bash (curl + Payload query verification)
    Preconditions: Dev server running. At least 1 draft post exists in Payload.
    Steps:
      1. Run: curl -s http://localhost:3000/blog | grep -i "draft"
      2. Assert output contains NO draft post titles
    Expected Result: Draft posts are not rendered on the page
    Failure Indicators: Draft post title appears in rendered HTML
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-blog-listing-happy.png`
  - [ ] `.sisyphus/evidence/task-2-blog-listing-empty.png`

  **Commit**: YES (group with Task 1)
  - Message: `feat(blog): add BlogPostCard component and /blog listing page`
  - Files: `src/components/blog/BlogPostCard.tsx`, `src/app/(frontend)/blog/page.tsx`
  - Pre-commit: `pnpm lint`

---

## Final Verification Wave

- [x] F1. **Lint + Build Check** — `quick`
      Run `pnpm lint` — assert 0 errors, 0 warnings related to new files. Run `pnpm build` (or check TypeScript: `npx tsc --noEmit`). Check for `as any`, `@ts-ignore`, `console.log` in new files.
      Output: `Lint [PASS/FAIL] | TypeScript [PASS/FAIL] | VERDICT: APPROVE/REJECT`

- [x] F2. **Browser QA** — `unspecified-high` (+ `playwright` skill)
      Start dev server (`pnpm dev`). Execute ALL QA scenarios from Task 2. Navigate to http://localhost:3000/blog. Save screenshots to `.sisyphus/evidence/`. Verify happy path AND empty state.
      Output: `Scenarios [N/N pass] | VERDICT: APPROVE/REJECT`

---

## Commit Strategy

- **Single commit** after both tasks complete:
  - `feat(blog): add BlogPostCard component and /blog listing page`
  - Files: `src/components/blog/BlogPostCard.tsx`, `src/app/(frontend)/blog/page.tsx`
  - Pre-commit: `pnpm lint`
  - GPG note: use `git -c commit.gpgsign=false commit -m "..."` if pinentry fails

---

## Success Criteria

### Verification Commands

```bash
pnpm lint                    # Expected: 0 errors
# In browser: http://localhost:3000/blog renders card grid
```

### Final Checklist

- [ ] `/blog` page renders at `http://localhost:3000/blog`
- [ ] Only published posts shown (status filter applied)
- [ ] Each card shows title, formatted date, excerpt
- [ ] Empty state works — no crash on 0 posts
- [ ] `pnpm lint` passes with 0 errors
- [ ] No TypeScript errors
