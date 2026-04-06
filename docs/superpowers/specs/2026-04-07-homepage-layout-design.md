# Homepage Layout Design

**Date:** 2026-04-07  
**Status:** Approved  
**Approach:** Modernized Evolution of boosterai.pl

## Overview

This document specifies the design for the BoosterAI homepage, replicating the structure and content of the existing boosterai.pl site while modernizing the implementation with improved responsiveness, accessibility, and performance.

## Design Decisions

### 1. Approach

**Modernized Evolution (Option B)** — Keep the familiar structure and content hierarchy from boosterai.pl, but implement with:

- Modern Tailwind CSS v4
- Better accessibility (WCAG 2.1 AA)
- Improved responsive design
- Performance optimization

### 2. Architecture

**Global Header/Footer Components (Option A)** — Header and Footer are shared React components defined once and used across all pages via the layout.tsx file. Navigation structure is hardcoded in components (not Payload-managed) since it's stable.

### 3. Modernization Priorities

Focus on three foundational improvements:

- **Responsive Design** — Mobile-first with proper breakpoints and touch targets
- **Accessibility** — WCAG 2.1 AA compliance
- **Performance** — Core Web Vitals optimization

## File Structure

```
src/
├── components/
│   ├── Header.tsx              # Global navigation header
│   ├── Footer.tsx              # Global footer with links
│   └── homepage/
│       ├── HeroSection.tsx     # Hero with headline + CTA
│       ├── ServicesSection.tsx # Reusable services grid
│       ├── ProcessSection.tsx  # 3-step process cards
│       ├── UseCasesPreview.tsx # Featured case studies
│       └── CTASection.tsx      # Final call-to-action
├── app/(frontend)/
│   ├── layout.tsx              # Root layout with Header/Footer
│   └── page.tsx                # Homepage composition
└── globals/
    └── Homepage.ts             # Payload CMS schema (needs updates)
```

## Content Structure

Homepage sections (in order):

1. **Header** — Logo, navigation links, CTA button
2. **Hero Section** — Main headline, subheadline, CTA, badge, illustration
3. **Sales Booster** — Section title + 4 service cards
4. **AI Booster** — Section title + 4 service cards
5. **Collaboration Banner** — Full-width blue section with CTA
6. **Process Steps** — 3 large numbered cards (01, 02, 03)
7. **Use Cases Preview** — Section title + 2 featured case studies
8. **Final CTA** — Call-to-action section
9. **Footer** — Multi-column links

## Payload CMS Schema Changes

### Required Updates to `src/globals/Homepage.ts`

#### 1. Hero Section — Add Badge and Illustration

```typescript
{
  name: 'hero',
  type: 'group',
  fields: [
    // ... existing fields (headline, subheadline, ctaLabel, ctaUrl, backgroundImage)

    // ADD THESE:
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      // Example: "Najpopularniejsze LLMy dla Twojej firmy"
    },
    {
      name: 'badgeSubtext',
      type: 'text',
      label: 'Badge Subtext',
      // Example: "Ponad 300 gotowych automatyzacji"
    },
    {
      name: 'illustration',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Illustration',
    },
  ],
}
```

#### 2. Add Collaboration Banner Section

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
}
```

#### 3. Add Use Cases Preview Section

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
}
```

## Component Specifications

### Header Component

**File:** `src/components/Header.tsx`

**Layout:**

- Fixed position at top with backdrop blur on scroll
- Max width container (1280px) centered
- Flexbox layout: Logo (left) | Nav (center) | CTA (right)

**Content:**

- Logo: SVG from `/public/`, links to homepage
- Navigation items: Booster, Usługi, Use cases, Kontakt
- CTA button: "Darmowa konsultacja" (prominent styling)

**Mobile Behavior (< 768px):**

- Hamburger menu icon (right side)
- Slide-in drawer navigation
- Full-width CTA button at bottom of drawer

**Accessibility:**

- `<nav>` semantic element with `aria-label="Primary navigation"`
- `aria-current="page"` on active nav item
- Keyboard accessible (Tab navigation, Enter to activate)
- Focus visible indicators
- Skip link to main content (visually hidden, shows on focus)

### Footer Component

**File:** `src/components/Footer.tsx`

**Layout:**

- Multi-column grid (4 columns desktop, 2 tablet, 1 mobile)
- Columns: Usługi, Materiały, Kontakt, About/Social
- Bottom bar: Copyright + privacy links

**Content:**

- Hardcoded links (not Payload-managed)
- Social media icons (optional)
- Company contact information

**Accessibility:**

- `<footer>` semantic element
- Each column as `<nav>` with descriptive `aria-label`
- Link text descriptive (avoid "Click here")

### HeroSection Component

**File:** `src/components/homepage/HeroSection.tsx`

**Props:** `data: Homepage['hero']`

**Layout:**

- Two-column grid on desktop (text left, illustration right)
- Single column stacked on mobile (text first, then image)
- Full-width background (light gradient or solid)

**Content:**

- Headline: Large (text-5xl md:text-6xl), bold, optional gradient effect
- Subheadline: Medium size, lighter color
- Badge: Small pill component with icon + text
- CTA Button: Primary styling, prominent
- Illustration: Next.js Image with `priority` flag

**Responsive:**

- Mobile: Stack vertically, center align text
- Tablet+: Side-by-side layout
- Desktop: Larger text sizes

**Performance:**

- Hero image uses `<Image priority={true} />` for LCP optimization
- Explicit width/height to prevent CLS

### ServicesSection Component

**File:** `src/components/homepage/ServicesSection.tsx`

**Props:** `data: Homepage['salesBooster'] | Homepage['aiBooster']`

**Layout:**

- Section container with title + optional subtitle (rich text)
- Grid of service cards
- Grid columns: 1 (mobile) → 2 (tablet) → 4 (desktop)

**Card Design:**

- Icon/image from Payload Media (Next.js Image)
- Title (text-lg, bold)
- Description (textarea content)
- Light background with subtle border
- Hover effect: slight lift + shadow

**Accessibility:**

- Section has descriptive heading (`<h2>`)
- Each card is semantic (div with proper heading hierarchy)
- Icons have alt text or aria-label

**Performance:**

- Service icons use lazy loading (not above fold)
- Images sized appropriately (use Payload thumbnail sizes)

### ProcessSection Component

**File:** `src/components/homepage/ProcessSection.tsx`

**Props:** `data: Homepage['processSteps']`

**Layout:**

- Section title
- 3 large cards in grid (1 col mobile → 3 col desktop)

**Card Design:**

- Large number display (01, 02, 03) — decorative, large typography
- Title below number
- Description text

**Styling:**

- Light gradient background per card
- Ample padding
- Cards equal height

### UseCasesPreview Component

**File:** `src/components/homepage/UseCasesPreview.tsx`

**Props:** `data: Homepage['useCasesSection']`

**Layout:**

- Section title
- 2 featured case study cards (horizontal layout on desktop, stacked on mobile)

**Card Design:**

- Image thumbnail (aspect ratio 16:9)
- Category badge (from UseCases collection)
- Title
- Short excerpt/description
- "Learn more" link

**Data Fetching:**

- Component receives relationship data from parent (depth: 2)
- Falls back gracefully if use cases not set

### CTASection Component

**File:** `src/components/homepage/CTASection.tsx`

**Props:** `data: Homepage['cta']`

**Layout:**

- Full-width section with accent background
- Centered content
- Headline + CTA button

**Styling:**

- High contrast for visibility
- Large CTA button
- Padding for emphasis

## Responsive Design

### Breakpoint Strategy

| Breakpoint       | Width   | Layout Changes                                  |
| ---------------- | ------- | ----------------------------------------------- |
| Mobile (default) | < 768px | Single column, hamburger menu, stacked sections |
| Tablet (md)      | 768px+  | 2-column grids, horizontal nav                  |
| Desktop (lg)     | 1024px+ | 3-4 column grids, full layout                   |
| XL (xl)          | 1280px+ | Max-width container, optimized spacing          |

### Touch Targets

All interactive elements (buttons, links, form inputs) must have minimum touch target size:

- **Minimum:** 44×44px (iOS standard)
- Implementation: Add padding if needed to reach minimum size

### Typography Scaling

Use fluid typography with Tailwind responsive classes:

- Hero headline: `text-4xl md:text-5xl lg:text-6xl`
- Section titles: `text-3xl md:text-4xl`
- Body text: `text-base md:text-lg`
- Line height: Generous for readability (1.6-1.8)

## Accessibility Standards (WCAG 2.1 AA)

### Semantic HTML

Use proper semantic elements:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Heading hierarchy (h1 → h2 → h3, no skipping levels)
- `<button>` for actions, `<a>` for navigation

### Keyboard Navigation

- All interactive elements accessible via Tab key
- Logical tab order (follows visual layout)
- Enter/Space activate buttons and links
- Escape closes modals/drawers

### Focus Indicators

- Visible focus rings on all interactive elements
- Custom styled (not removed with `outline: none`)
- High contrast against background
- Implementation: Use Tailwind's `focus:` variants

### ARIA Labels

- `aria-label` on icon-only buttons
- `aria-current="page"` on active navigation item
- `aria-expanded` on expandable sections (if any)
- `aria-labelledby` for section relationships

### Color Contrast

Minimum contrast ratios:

- **Normal text:** 4.5:1
- **Large text (18pt+):** 3:1
- **UI components:** 3:1

Test all color combinations with contrast checker.

### Alt Text

- All images have descriptive alt text
- Alt text pulled from Payload Media (upload field supports alt text)
- Decorative images: `alt=""` or `aria-hidden="true"`

### Skip Links

Add "Skip to main content" link at top of page:

- Visually hidden by default
- Becomes visible on keyboard focus
- Jumps to `<main id="main-content">`

## Performance Optimization

### Core Web Vitals Targets

| Metric                             | Target  | Implementation                                      |
| ---------------------------------- | ------- | --------------------------------------------------- |
| **LCP** (Largest Contentful Paint) | < 2.5s  | Next.js Image with priority on hero, optimize fonts |
| **FID** (First Input Delay)        | < 100ms | Minimal JS, defer non-critical scripts              |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | Explicit image dimensions, font-display: swap       |

### Image Optimization

Use Next.js `<Image>` component for all images:

```tsx
import Image from 'next/image'

;<Image
  src={data.hero.backgroundImage.url}
  alt={data.hero.backgroundImage.alt}
  width={1200}
  height={800}
  priority={true} // For hero/above-the-fold images only
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Benefits:**

- Automatic WebP/AVIF conversion
- Responsive image sizes
- Lazy loading (except `priority` images)
- Blur placeholder while loading

### Font Optimization

Use `next/font/google` for font loading:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

**Benefits:**

- Self-hosted fonts (no external request)
- Font subsetting
- Automatic `font-display: swap`
- Zero layout shift

### Static Generation (SSG) with Revalidation

Homepage uses Static Site Generation with Incremental Static Regeneration:

```tsx
// src/app/(frontend)/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch Payload data at build time
  const homepage = await payload.findGlobal({ slug: 'homepage' })
  return <Homepage data={homepage} />
}
```

**Benefits:**

- Instant page loads (served from CDN)
- Fresh content (revalidates every 60s)
- No database queries on page view

### Payload Query Optimization

Fetch only needed fields:

```tsx
const homepage = await payload.findGlobal({
  slug: 'homepage',
  depth: 2, // Include media relations
  // Could add select: [...] to limit fields if needed
})
```

**Note:** depth: 2 is needed to resolve media relations (icons, images). Monitor query performance if schema grows.

### Bundle Size

- Minimal client-side JavaScript (mostly SSR)
- No heavy animation libraries (use CSS transitions/Tailwind)
- Tree-shake unused Tailwind classes (automatic in production)

## Data Flow

### Homepage Page Component

**File:** `src/app/(frontend)/page.tsx`

```tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroSection from '@/components/homepage/HeroSection'
import ServicesSection from '@/components/homepage/ServicesSection'
import ProcessSection from '@/components/homepage/ProcessSection'
import UseCasesPreview from '@/components/homepage/UseCasesPreview'
import CTASection from '@/components/homepage/CTASection'

export const revalidate = 60 // ISR every 60 seconds

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2, // Include media and use case relations
  })

  return (
    <>
      <HeroSection data={homepage.hero} />
      <ServicesSection data={homepage.salesBooster} sectionId="sales-booster" />
      <ServicesSection data={homepage.aiBooster} sectionId="ai-booster" />
      {homepage.collaborationBanner && <CollaborationBanner data={homepage.collaborationBanner} />}
      <ProcessSection data={homepage.processSteps} />
      {homepage.useCasesSection && <UseCasesPreview data={homepage.useCasesSection} />}
      <CTASection data={homepage.cta} />
    </>
  )
}
```

### Layout Component

**File:** `src/app/(frontend)/layout.tsx`

```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Booster AI — AI & Automation Agency',
  description: 'Wdrażamy Automatyzację i AI w procesach sprzedaży.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

## Styling Approach

### Tailwind CSS v4

Use Tailwind for all styling:

- Utility-first approach
- Responsive variants (md:, lg:, xl:)
- Custom theme in CSS (not tailwind.config.ts)
- Dark mode support (optional, can add later)

### Component Patterns

**Container:**

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
```

**Section Spacing:**

```tsx
<section className="py-16 md:py-24 lg:py-32">
```

**Grid Layouts:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
```

## Testing Requirements

### Accessibility Testing

- Run with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- Test keyboard navigation (no mouse)
- Validate with axe DevTools
- Check color contrast with browser tools

### Responsive Testing

Test at these viewport widths:

- 375px (iPhone SE)
- 768px (iPad portrait)
- 1024px (iPad landscape / small laptop)
- 1440px (desktop)

### Performance Testing

- Run Lighthouse audit (target 90+ scores)
- Test on slow 3G connection
- Measure Core Web Vitals in field (Chrome User Experience Report)

### Browser Compatibility

Test on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Migration Path

### Phase 1: Schema Updates (First)

1. Update `src/globals/Homepage.ts` with new fields
2. Run `pnpm payload migrate` to create migration
3. Apply migration to database
4. Run `pnpm generate:types` to update TypeScript types

### Phase 2: Components (Second)

1. Create global components: Header, Footer
2. Update layout.tsx to use Header/Footer
3. Create homepage section components
4. Implement homepage page.tsx

### Phase 3: Content Population (Third)

1. Log into Payload admin (http://localhost:3000/admin)
2. Navigate to Globals → Homepage
3. Fill in all sections with content from boosterai.pl
4. Upload images/icons to Media collection
5. Save and preview

### Phase 4: Testing & Refinement (Fourth)

1. Visual QA against boosterai.pl
2. Accessibility audit
3. Performance testing
4. Responsive testing
5. Browser compatibility check

## Success Criteria

The homepage implementation is complete when:

- ✅ All sections from boosterai.pl are present and functional
- ✅ Content is editable via Payload CMS admin panel
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Passes WCAG 2.1 AA accessibility audit
- ✅ Lighthouse score 90+ for Performance, Accessibility, Best Practices, SEO
- ✅ Core Web Vitals meet targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ Works in all major browsers (Chrome, Firefox, Safari, Edge)

## Future Enhancements (Out of Scope)

These are not part of the initial implementation but could be added later:

- Dark mode toggle
- Smooth scroll animations (Framer Motion or similar)
- Advanced micro-interactions
- A/B testing for CTA variations
- Analytics integration (GA4, etc.)
- Contact form integration (using Payload form-builder plugin)

## References

- Existing site: https://boosterai.pl
- Payload CMS docs: https://payloadcms.com/docs
- Next.js Image optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Tailwind CSS v4: https://tailwindcss.com/docs
