# Payload Admin Panel Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Brand the Payload CMS admin panel with Booster AI identity — logo, favicon, dark-blue theme, custom title — using Payload 3.x built-in config keys only.

**Architecture:** Two small React components (`AdminLogo`, `AdminIcon`) render the existing PNG assets from `public/`. The `payload.config.ts` `admin` block is extended with `meta` (title, favicon) and `components.graphics`. A CSS block in `custom.scss` overrides Payload's CSS custom properties for the dark navy/blue color scheme. `pnpm generate:importmap` is run after adding the components so Payload picks them up.

**Tech Stack:** Payload CMS 3.81.0, Next.js 16, React 19, TypeScript, SCSS (existing `custom.scss`)

---

## File Map

| Action | Path                                 | Responsibility                                              |
| ------ | ------------------------------------ | ----------------------------------------------------------- |
| Create | `src/components/admin/AdminLogo.tsx` | Sidebar logo component (wordmark PNG)                       |
| Create | `src/components/admin/AdminIcon.tsx` | Collapsed-sidebar / nav icon component (sygnet PNG)         |
| Modify | `src/payload.config.ts`              | Wire `admin.meta`, `admin.components.graphics`, `admin.css` |
| Modify | `src/app/(payload)/custom.scss`      | Dark navy/blue CSS variable overrides                       |
| Run    | `pnpm generate:importmap`            | Regenerate importMap to include new components              |

---

## Task 1: Create AdminLogo component

**Files:**

- Create: `src/components/admin/AdminLogo.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/admin/AdminLogo.tsx
'use client'

import React from 'react'

const AdminLogo: React.FC = () => (
  <img
    src="/Booster-logo.png"
    alt="Booster AI"
    style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
  />
)

export default AdminLogo
```

- [ ] **Step 2: Verify TypeScript compiles (no errors)**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm tsc --noEmit 2>&1 | grep -i "AdminLogo\|error" || echo "No errors"
```

Expected: no errors referencing `AdminLogo.tsx`

- [ ] **Step 3: Commit**

```bash
git -c commit.gpgsign=false add src/components/admin/AdminLogo.tsx
git -c commit.gpgsign=false commit -m "feat(admin): add AdminLogo component"
```

---

## Task 2: Create AdminIcon component

**Files:**

- Create: `src/components/admin/AdminIcon.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/admin/AdminIcon.tsx
'use client'

import React from 'react'

const AdminIcon: React.FC = () => (
  <img
    src="/Blue-sygnet-with-background-1x1-1.png"
    alt="Booster AI"
    style={{ height: '32px', width: '32px', objectFit: 'contain', borderRadius: '6px' }}
  />
)

export default AdminIcon
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm tsc --noEmit 2>&1 | grep -i "AdminIcon\|error" || echo "No errors"
```

Expected: no errors referencing `AdminIcon.tsx`

- [ ] **Step 3: Commit**

```bash
git -c commit.gpgsign=false add src/components/admin/AdminIcon.tsx
git -c commit.gpgsign=false commit -m "feat(admin): add AdminIcon component"
```

---

## Task 3: Wire components and meta into payload.config.ts

**Files:**

- Modify: `src/payload.config.ts`

- [ ] **Step 1: Update payload.config.ts**

Replace the current `admin` block:

```ts
admin: {
  user: Users.slug,
},
```

With:

```ts
admin: {
  user: Users.slug,
  meta: {
    titleSuffix: '— Booster AI',
    favicon: '/Blue-sygnet-with-background-1x1-1.png',
    ogImage: '/Booster-logo.png',
  },
  components: {
    graphics: {
      Logo: '/src/components/admin/AdminLogo#default',
      Icon: '/src/components/admin/AdminIcon#default',
    },
  },
},
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors (the existing `CollectionSlug` errors in BlogPosts/UseCases are pre-existing and unrelated)

- [ ] **Step 3: Commit**

```bash
git -c commit.gpgsign=false add src/payload.config.ts
git -c commit.gpgsign=false commit -m "feat(admin): wire AdminLogo, AdminIcon and meta into payload config"
```

---

## Task 4: Add dark navy/blue theme to custom.scss

**Files:**

- Modify: `src/app/(payload)/custom.scss`

- [ ] **Step 1: Add CSS variable overrides**

Payload 3.x uses CSS custom properties under the `:root` and `[data-theme]` selectors. Append the following to `src/app/(payload)/custom.scss`:

```scss
// Booster AI — dark navy/blue admin theme
:root,
[data-theme='light'],
[data-theme='dark'] {
  // Sidebar / nav background
  --theme-bg: #0f172a;
  --theme-elevation-0: #0f172a;
  --theme-elevation-50: #1e293b;
  --theme-elevation-100: #1e293b;
  --theme-elevation-150: #243247;
  --theme-elevation-200: #2d3e57;
  --theme-elevation-500: #334d6e;
  --theme-elevation-800: #3b82f6;
  --theme-elevation-900: #60a5fa;
  --theme-elevation-1000: #93c5fd;

  // Primary brand color (electric blue)
  --theme-success-50: #eff6ff;
  --theme-success-500: #3b82f6;
  --theme-success-600: #2563eb;

  // Text
  --theme-text: #f1f5f9;
  --theme-text-secondary: #94a3b8;

  // Accent / interactive
  --color-base-blue-medium: #3b82f6;

  // Input / form backgrounds
  --theme-input-bg: #1e293b;
}
```

- [ ] **Step 2: Verify SCSS is valid (no syntax errors)**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm build 2>&1 | grep -i "scss\|css\|error" | head -20 || echo "Build OK"
```

If build takes too long, check for SCSS parse errors only:

```bash
node -e "require('fs').readFileSync('src/app/(payload)/custom.scss', 'utf8'); console.log('SCSS readable')"
```

Expected: no SCSS parse errors

- [ ] **Step 3: Commit**

```bash
git -c commit.gpgsign=false add src/app/(payload)/custom.scss
git -c commit.gpgsign=false commit -m "feat(admin): add dark navy/blue theme CSS variable overrides"
```

---

## Task 5: Regenerate importMap and verify

**Files:**

- Run: `pnpm generate:importmap` (updates `src/app/(payload)/admin/importMap.js`)

- [ ] **Step 1: Regenerate the importMap**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm generate:importmap
```

Expected: exits 0, no errors. `src/app/(payload)/admin/importMap.js` is updated.

- [ ] **Step 2: Verify AdminLogo and AdminIcon appear in importMap**

```bash
grep -E "AdminLogo|AdminIcon" src/app/(payload)/admin/importMap.js
```

Expected output (hashes will differ):

```
import { default as AdminLogo_... } from '/src/components/admin/AdminLogo'
import { default as AdminIcon_... } from '/src/components/admin/AdminIcon'
```

- [ ] **Step 3: Commit the regenerated importMap**

```bash
git -c commit.gpgsign=false add src/app/(payload)/admin/importMap.js
git -c commit.gpgsign=false commit -m "chore: regenerate importMap with AdminLogo and AdminIcon"
```

---

## Task 6: Smoke test in dev server

- [ ] **Step 1: Start Postgres and dev server**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
/usr/local/bin/docker compose up -d
pnpm dev
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/admin` and confirm:

1. Browser tab title reads "Dashboard — Booster AI" (or similar with the suffix)
2. Browser favicon shows the rocket sygnet
3. Sidebar logo shows the "BOOSTER" wordmark PNG
4. Collapsed sidebar / icon slot shows the rocket icon
5. Admin panel background is dark navy (not Payload's default light grey)

- [ ] **Step 3: Verify admin auth still works**

Log in with your admin credentials at `http://localhost:3000/admin`. Confirm login succeeds and the dashboard loads correctly with Booster AI branding applied.

- [ ] **Step 4: Stop dev server after verification**

`Ctrl+C` to stop.

---

## Task 7: Final lint check and summary commit

- [ ] **Step 1: Run lint**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
pnpm lint 2>&1 | tail -10
```

Expected: 0 new errors introduced by this work (pre-existing `CollectionSlug` errors in BlogPosts/UseCases are out of scope)

- [ ] **Step 2: Done**

Admin panel is now fully branded with Booster AI identity. All changes are committed.
