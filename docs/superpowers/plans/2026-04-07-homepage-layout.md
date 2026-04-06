# Homepage Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the BoosterAI homepage with header, hero, services sections, process steps, use cases preview, and footer — pulling content from Payload CMS with responsive design, accessibility, and performance optimization.

**Architecture:** Global Header/Footer components in layout, modular homepage sections as composable React components, all content fetched from Payload CMS Homepage global with SSG + ISR (60s revalidation).

**Tech Stack:** Next.js 16, React 19, Payload CMS 3.x, Tailwind CSS v4, TypeScript

---

## File Structure

### New Files to Create

```
src/
├── components/
│   ├── Header.tsx                    # Global navigation header
│   ├── Footer.tsx                    # Global footer with links
│   └── homepage/
│       ├── HeroSection.tsx           # Hero with headline + CTA
│       ├── ServicesSection.tsx       # Reusable services grid
│       ├── CollaborationBanner.tsx   # Blue banner section
│       ├── ProcessSection.tsx        # 3-step process cards
│       ├── UseCasesPreview.tsx       # Featured case studies
│       └── CTASection.tsx            # Final call-to-action
```

### Files to Modify

```
src/
├── globals/
│   └── Homepage.ts                   # Add new fields (badge, collaboration, useCases)
├── app/(frontend)/
│   ├── layout.tsx                    # Add Header/Footer, update metadata
│   └── page.tsx                      # Compose homepage sections, fetch from Payload
```

---

## Task 1: Update Payload Homepage Schema

**Files:**

- Modify: `src/globals/Homepage.ts`

- [ ] **Step 1: Add badge fields to hero group**

Open `src/globals/Homepage.ts` and add three new fields to the `hero` group after `backgroundImage`:

```typescript
{
  name: 'badgeText',
  type: 'text',
  label: 'Badge Text',
},
{
  name: 'badgeSubtext',
  type: 'text',
  label: 'Badge Subtext',
},
{
  name: 'illustration',
  type: 'upload',
  relationTo: 'media',
  label: 'Hero Illustration',
},
```

- [ ] **Step 2: Add collaborationBanner group**

Add new group after the `processSteps` group and before `cta`:

```typescript
{
  name: 'collaborationBanner',
  type: 'group',
  label: 'Collaboration Banner',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
  ],
},
```

- [ ] **Step 3: Add useCasesSection group**

Add new group after `collaborationBanner` and before `cta`:

```typescript
{
  name: 'useCasesSection',
  type: 'group',
  label: 'Use Cases Preview',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Poznaj nasze wdrożenia',
    },
    {
      name: 'featuredCases',
      type: 'relationship',
      relationTo: 'use-cases',
      hasMany: true,
      maxRows: 2,
      label: 'Featured Use Cases',
    },
  ],
},
```

- [ ] **Step 4: Save file**

Save `src/globals/Homepage.ts`

- [ ] **Step 5: Commit schema changes**

```bash
git add src/globals/Homepage.ts
git commit -m "feat(cms): add badge, collaboration banner, and use cases fields to Homepage global"
```

---

## Task 2: Run Migrations and Regenerate Types

**Files:**

- Creates new migration in `src/migrations/`
- Updates: `src/payload-types.ts`

- [ ] **Step 1: Create and apply migration**

```bash
pnpm payload migrate
```

Expected output: "Migration created" and "Migration applied successfully"

- [ ] **Step 2: Regenerate TypeScript types**

```bash
pnpm generate:types
```

Expected output: "Types generated successfully" and `src/payload-types.ts` updated

- [ ] **Step 3: Verify types include new fields**

```bash
grep -A 5 "badgeText\|collaborationBanner\|useCasesSection" src/payload-types.ts
```

Expected: Should show the new field definitions in the Homepage interface

- [ ] **Step 4: Commit generated files**

```bash
git add src/migrations/ src/payload-types.ts
git commit -m "chore: run migrations and regenerate types for Homepage schema updates"
```

---

## Task 3: Create Header Component

**Files:**

- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create Header component file**

Create `src/components/Header.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
            <span>BOOSTER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-current="page"
            >
              Booster
            </Link>
            <Link href="/uslugi" className="text-gray-700 hover:text-blue-600 transition-colors">
              Usługi
            </Link>
            <Link href="/use-cases" className="text-gray-700 hover:text-blue-600 transition-colors">
              Use cases
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="/kontakt"
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Darmowa konsultacja
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Booster
              </Link>
              <Link
                href="/uslugi"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Usługi
              </Link>
              <Link
                href="/use-cases"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use cases
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Darmowa konsultacja
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit Header component**

```bash
git add src/components/Header.tsx
git commit -m "feat(ui): add Header component with mobile menu and accessibility"
```

---

## Task 4: Create Footer Component

**Files:**

- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer component file**

Create `src/components/Footer.tsx`:

```typescript
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Usługi Column */}
          <nav aria-label="Services">
            <h3 className="font-bold text-gray-900 mb-4">Usługi</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/uslugi/sales-booster" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Sales Booster
                </Link>
              </li>
              <li>
                <Link href="/uslugi/ai-booster" className="text-gray-600 hover:text-blue-600 transition-colors">
                  AI Booster
                </Link>
              </li>
              <li>
                <Link href="/uslugi/konsultacje" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Konsultacje
                </Link>
              </li>
              <li>
                <Link href="/uslugi/wdrozenia" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Wdrożenia
                </Link>
              </li>
            </ul>
          </nav>

          {/* Materiały Column */}
          <nav aria-label="Resources">
            <h3 className="font-bold text-gray-900 mb-4">Materiały</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-600 hover:text-blue-600 transition-colors">
                  O nas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt Column */}
          <nav aria-label="Contact">
            <h3 className="font-bold text-gray-900 mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:kontakt@boosterai.pl"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  kontakt@boosterai.pl
                </a>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Formularz kontaktowy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social/About Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Booster AI</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Automatyzacja i AI w procesach sprzedaży. Pomagamy firmom B2B osiągać lepsze wyniki.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Booster AI. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link href="/polityka-prywatnosci" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit Footer component**

```bash
git add src/components/Footer.tsx
git commit -m "feat(ui): add Footer component with multi-column layout"
```

---

## Task 5: Create HeroSection Component

**Files:**

- Create: `src/components/homepage/HeroSection.tsx`

- [ ] **Step 1: Create homepage components directory**

```bash
mkdir -p src/components/homepage
```

- [ ] **Step 2: Create HeroSection component**

Create `src/components/homepage/HeroSection.tsx`:

```typescript
import Image from 'next/image'
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface HeroSectionProps {
  data: Homepage['hero']
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.headline || 'Booster 🚀'}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI & Automation Agency
              </span>
            </h1>

            {data?.subheadline && (
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                {data.subheadline}
              </p>
            )}

            {/* Badge */}
            {(data?.badgeText || data?.badgeSubtext) && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-8">
                <span className="text-2xl">✨</span>
                <div className="text-left">
                  {data.badgeText && (
                    <p className="text-sm font-semibold text-gray-900">{data.badgeText}</p>
                  )}
                  {data.badgeSubtext && (
                    <p className="text-xs text-gray-600">{data.badgeSubtext}</p>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {data?.ctaLabel && data?.ctaUrl && (
              <Link
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {data.ctaLabel}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Illustration */}
          {data?.illustration && typeof data.illustration === 'object' && (
            <div className="relative h-64 md:h-96 lg:h-[500px]">
              <Image
                src={data.illustration.url || ''}
                alt={data.illustration.alt || 'Hero illustration'}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 4: Commit HeroSection component**

```bash
git add src/components/homepage/HeroSection.tsx
git commit -m "feat(ui): add HeroSection component with responsive layout and badge"
```

---

## Task 6: Create ServicesSection Component

**Files:**

- Create: `src/components/homepage/ServicesSection.tsx`

- [ ] **Step 1: Create ServicesSection component**

Create `src/components/homepage/ServicesSection.tsx`:

```typescript
import Image from 'next/image'
import type { Homepage } from '@/payload-types'

interface ServicesSectionProps {
  data: Homepage['salesBooster'] | Homepage['aiBooster']
  sectionId?: string
}

export default function ServicesSection({ data, sectionId }: ServicesSectionProps) {
  if (!data) return null

  return (
    <section id={sectionId} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {data.sectionTitle}
          </h2>
        )}

        {/* Section Subtitle (Rich Text) */}
        {data.sectionSubtitle && (
          <div className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {/* TODO: Render rich text properly with lexical renderer */}
            <p>{JSON.stringify(data.sectionSubtitle)}</p>
          </div>
        )}

        {/* Services Grid */}
        {data.services && data.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                {/* Icon */}
                {service.icon && typeof service.icon === 'object' && (
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={service.icon.url || ''}
                      alt={service.icon.alt || ''}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}

                {/* Title */}
                {service.title && (
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                )}

                {/* Description */}
                {service.description && (
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit ServicesSection component**

```bash
git add src/components/homepage/ServicesSection.tsx
git commit -m "feat(ui): add reusable ServicesSection component with grid layout"
```

---

## Task 7: Create CollaborationBanner Component

**Files:**

- Create: `src/components/homepage/CollaborationBanner.tsx`

- [ ] **Step 1: Create CollaborationBanner component**

Create `src/components/homepage/CollaborationBanner.tsx`:

```typescript
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CollaborationBannerProps {
  data: Homepage['collaborationBanner']
}

export default function CollaborationBanner({ data }: CollaborationBannerProps) {
  if (!data) return null

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {data.title}
          </h2>

          {data.ctaLabel && data.ctaUrl && (
            <Link
              href={data.ctaUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {data.ctaLabel}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit CollaborationBanner component**

```bash
git add src/components/homepage/CollaborationBanner.tsx
git commit -m "feat(ui): add CollaborationBanner component"
```

---

## Task 8: Create ProcessSection Component

**Files:**

- Create: `src/components/homepage/ProcessSection.tsx`

- [ ] **Step 1: Create ProcessSection component**

Create `src/components/homepage/ProcessSection.tsx`:

```typescript
import type { Homepage } from '@/payload-types'

interface ProcessSectionProps {
  data: Homepage['processSteps']
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {data.sectionTitle}
          </h2>
        )}

        {/* Process Steps Grid */}
        {data.steps && data.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Large Number */}
                {step.number && (
                  <div className="text-7xl md:text-8xl font-bold text-blue-100 mb-4">
                    {step.number}
                  </div>
                )}

                {/* Title */}
                {step.title && (
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                )}

                {/* Description */}
                {step.description && (
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                )}

                {/* Connector Arrow (not on last item) */}
                {index < data.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit ProcessSection component**

```bash
git add src/components/homepage/ProcessSection.tsx
git commit -m "feat(ui): add ProcessSection component with numbered steps"
```

---

## Task 9: Create UseCasesPreview Component

**Files:**

- Create: `src/components/homepage/UseCasesPreview.tsx`

- [ ] **Step 1: Create UseCasesPreview component**

Create `src/components/homepage/UseCasesPreview.tsx`:

```typescript
import Image from 'next/image'
import Link from 'next/link'
import type { Homepage, UseCase } from '@/payload-types'

interface UseCasesPreviewProps {
  data: Homepage['useCasesSection']
}

export default function UseCasesPreview({ data }: UseCasesPreviewProps) {
  if (!data || !data.featuredCases || data.featuredCases.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        {data.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {data.sectionTitle}
          </h2>
        )}

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.featuredCases.map((caseItem) => {
            // Handle relationship resolution
            const useCase = typeof caseItem === 'object' ? caseItem as UseCase : null
            if (!useCase) return null

            return (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.slug}`}
                className="group block bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                {/* Image */}
                {useCase.featuredImage && typeof useCase.featuredImage === 'object' && (
                  <div className="relative aspect-video bg-gray-200">
                    <Image
                      src={useCase.featuredImage.url || ''}
                      alt={useCase.featuredImage.alt || useCase.title || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  {useCase.category && typeof useCase.category === 'object' && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                      {useCase.category.name}
                    </span>
                  )}

                  {/* Title */}
                  {useCase.title && (
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {useCase.title}
                    </h3>
                  )}

                  {/* Excerpt */}
                  {useCase.excerpt && (
                    <p className="text-gray-600 leading-relaxed mb-4">{useCase.excerpt}</p>
                  )}

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>Dowiedz się więcej</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit UseCasesPreview component**

```bash
git add src/components/homepage/UseCasesPreview.tsx
git commit -m "feat(ui): add UseCasesPreview component with featured case studies"
```

---

## Task 10: Create CTASection Component

**Files:**

- Create: `src/components/homepage/CTASection.tsx`

- [ ] **Step 1: Create CTASection component**

Create `src/components/homepage/CTASection.tsx`:

```typescript
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface CTASectionProps {
  data: Homepage['cta']
}

export default function CTASection({ data }: CTASectionProps) {
  if (!data) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
        {/* Headline */}
        {data.headline && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto">
            {data.headline}
          </h2>
        )}

        {/* CTA Button */}
        {data.ctaLabel && data.ctaUrl && (
          <Link
            href={data.ctaUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            {data.ctaLabel}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify component compiles**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit CTASection component**

```bash
git add src/components/homepage/CTASection.tsx
git commit -m "feat(ui): add CTASection component with gradient background"
```

---

## Task 11: Update Layout with Header and Footer

**Files:**

- Modify: `src/app/(frontend)/layout.tsx`

- [ ] **Step 1: Update layout.tsx to include Header and Footer**

Replace contents of `src/app/(frontend)/layout.tsx`:

```typescript
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  title: 'Booster AI — AI & Automation Agency',
  description: 'Wdrażamy Automatyzację i AI w procesach sprzedaży.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pl">
      <body className="antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit layout updates**

```bash
git add src/app/(frontend)/layout.tsx
git commit -m "feat(layout): add Header and Footer to root layout with updated metadata"
```

---

## Task 12: Update Homepage Page to Compose All Sections

**Files:**

- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Replace homepage page.tsx with new composition**

Replace contents of `src/app/(frontend)/page.tsx`:

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroSection from '@/components/homepage/HeroSection'
import ServicesSection from '@/components/homepage/ServicesSection'
import CollaborationBanner from '@/components/homepage/CollaborationBanner'
import ProcessSection from '@/components/homepage/ProcessSection'
import UseCasesPreview from '@/components/homepage/UseCasesPreview'
import CTASection from '@/components/homepage/CTASection'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch homepage data from Payload CMS
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2, // Include media and use case relations
  })

  return (
    <>
      <HeroSection data={homepage.hero} />

      <ServicesSection
        data={homepage.salesBooster}
        sectionId="sales-booster"
      />

      <ServicesSection
        data={homepage.aiBooster}
        sectionId="ai-booster"
      />

      <CollaborationBanner data={homepage.collaborationBanner} />

      <ProcessSection data={homepage.processSteps} />

      <UseCasesPreview data={homepage.useCasesSection} />

      <CTASection data={homepage.cta} />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build completes without errors

- [ ] **Step 3: Commit homepage composition**

```bash
git add src/app/(frontend)/page.tsx
git commit -m "feat(homepage): compose all sections with Payload CMS data fetching and ISR"
```

---

## Task 13: Test the Homepage Locally

**Files:**

- N/A (testing only)

- [ ] **Step 1: Start dev server**

```bash
export NVM_DIR="$HOME/.config/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
docker compose up -d
pnpm dev
```

Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Verify homepage loads without errors**

Open http://localhost:3000 in browser

Expected: Homepage renders without errors (content may be empty if CMS not populated yet)

- [ ] **Step 3: Check browser console for errors**

Open browser DevTools → Console tab

Expected: No React errors, no 404s, no type errors

- [ ] **Step 4: Test mobile responsiveness**

Open DevTools → Toggle device toolbar → Test at 375px, 768px, 1024px widths

Expected: Layout adapts properly at each breakpoint

- [ ] **Step 5: Test Header mobile menu**

Click hamburger menu on mobile view

Expected: Menu opens/closes smoothly, navigation works

- [ ] **Step 6: Test keyboard navigation**

Press Tab key repeatedly to navigate through interactive elements

Expected: All links, buttons accessible, focus indicators visible

- [ ] **Step 7: Test skip link**

Press Tab once on page load

Expected: "Skip to main content" link appears and is focusable

---

## Task 14: Populate CMS Content (Manual)

**Files:**

- N/A (CMS admin panel only)

- [ ] **Step 1: Log into Payload admin**

Navigate to http://localhost:3000/admin

Login with: test@test.com / BoosterAI67!

- [ ] **Step 2: Navigate to Homepage global**

Click "Globals" in sidebar → "Homepage"

- [ ] **Step 3: Fill in Hero section**

- headline: "Booster 🚀"
- subheadline: "AI & Automation Agency"
- badgeText: "Najpopularniejsze LLMy dla Twojej firmy"
- badgeSubtext: "Ponad 300 gotowych automatyzacji"
- ctaLabel: "Kontakt"
- ctaUrl: "/kontakt"
- Upload an illustration image (or use placeholder)

- [ ] **Step 4: Fill in Sales Booster section**

- sectionTitle: "Sales Booster"
- Add 4 services with icons, titles, descriptions (copy from boosterai.pl)

- [ ] **Step 5: Fill in AI Booster section**

- sectionTitle: "AI Booster"
- Add 4 services with icons, titles, descriptions (copy from boosterai.pl)

- [ ] **Step 6: Fill in Collaboration Banner**

- title: "Współpraca"
- ctaLabel: "Poznaj więcej"
- ctaUrl: "/wspolpraca"

- [ ] **Step 7: Fill in Process Steps**

- sectionTitle: "Jak pracujemy"
- Add 3 steps with numbers (01, 02, 03), titles, descriptions

- [ ] **Step 8: Fill in Use Cases Preview**

- sectionTitle: "Poznaj nasze wdrożenia"
- Select 2 featured use cases (create use cases first if needed)

- [ ] **Step 9: Fill in Final CTA**

- headline: "Gotowy na automatyzację?"
- ctaLabel: "Umów darmową konsultację"
- ctaUrl: "/kontakt"

- [ ] **Step 10: Save and verify**

Click "Save" → Refresh homepage at http://localhost:3000

Expected: All content displays correctly

---

## Task 15: Final Verification and Commit

**Files:**

- N/A (verification only)

- [ ] **Step 1: Run full build**

```bash
pnpm build
```

Expected: Build succeeds with no errors or warnings

- [ ] **Step 2: Run linter**

```bash
pnpm lint
```

Expected: No linting errors

- [ ] **Step 3: Check formatting**

```bash
pnpm format:check
```

Expected: All files properly formatted (run `pnpm format` if needed)

- [ ] **Step 4: Test production build locally**

```bash
pnpm start
```

Open http://localhost:3000

Expected: Homepage loads correctly in production mode

- [ ] **Step 5: Verify all sections present**

Scroll through entire homepage

Expected: All sections render (Hero, Sales Booster, AI Booster, Collaboration, Process, Use Cases, CTA, Footer)

- [ ] **Step 6: Run Lighthouse audit (optional)**

Open DevTools → Lighthouse tab → Run audit

Target: 90+ scores for Performance, Accessibility, Best Practices, SEO

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "feat(homepage): complete homepage implementation with all sections and CMS integration"
```

- [ ] **Step 8: Verify git log**

```bash
git log --oneline -10
```

Expected: See all feature commits from this implementation

---

## Success Criteria

The homepage implementation is complete when:

- ✅ All Payload schema changes applied and types regenerated
- ✅ Header component renders with mobile menu and skip link
- ✅ Footer component renders with multi-column layout
- ✅ All homepage sections render correctly (Hero, Services, Process, Use Cases, CTA)
- ✅ Content is editable via Payload CMS admin panel
- ✅ Layout is responsive (mobile, tablet, desktop tested)
- ✅ Keyboard navigation works (all interactive elements accessible)
- ✅ Build succeeds without errors
- ✅ Homepage loads in both dev and production modes

## Next Steps (Out of Scope)

After this implementation:

1. **Content Population** — Add real images, copy from boosterai.pl
2. **Accessibility Audit** — Test with screen reader, run axe DevTools
3. **Performance Testing** — Run Lighthouse, optimize images further
4. **Rich Text Rendering** — Implement proper Lexical rich text renderer for subtitles
5. **Animation Polish** — Add scroll-triggered animations (optional)
6. **Dark Mode** — Implement dark theme (optional)
