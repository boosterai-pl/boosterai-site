---
name: ui-ux-pro-max
description: UI/UX design intelligence with searchable database
---

# ui-ux-pro-max

Comprehensive design guide for web and mobile applications. Contains 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 16 technology stacks. Searchable database with priority-based recommendations.

# Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

Use this skill when the user requests any of the following:

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "Build a landing page", "Build a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card", "Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a fintech app?", "Recommend colors" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues", "Check accessibility" | Quick Reference checklist above |
| **Fix a UI bug** | "Button hover is broken", "Layout shifts on load" | Quick Reference → relevant section |
| **Improve / optimize** | "Make this faster", "Improve mobile experience" | Step 3 (domain search: ux, react) |
| **Implement dark mode** | "Add dark mode support" | Step 3 (domain: style "dark mode") |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |
| **Stack best practices** | "React performance tips", "SwiftUI navigation" | Step 4 (stack search) |

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: Entertainment (social, video, music, gaming), Tool (scanner, editor, converter), Productivity (task manager, notes, calendar), or hybrid
- **Target audience**: C-end consumer users; consider age group, usage context (commute, leisure, work)
- **Style keywords**: playful, vibrant, minimal, dark mode, content-first, immersive, etc.
- **Stack**: Detect from project (React, Next.js, Vue, etc.)

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

> Note: Script is located at `.opencode/skills/ui-ux-pro-max/scripts/search.py` relative to project root. Data files are in `.opencode/skills/ui-ux-pro-max/data/`.

This command:
1. Searches domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules from `ui-reasoning.csv` to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

**Example:**
```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

To save the design system for **hierarchical retrieval across sessions**, add `--persist`:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` — Global Source of Truth with all design rules
- `design-system/pages/` — Folder for page-specific overrides

### Step 3: Supplement with Detailed Searches (as needed)

After getting the design system, use domain searches to get additional details:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**When to use detailed searches:**

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "entertainment social"` |
| More style options | `style` | `--domain style "glassmorphism dark"` |
| Color palettes | `color` | `--domain color "entertainment vibrant"` |
| Font pairings | `typography` | `--domain typography "playful modern"` |
| Chart recommendations | `chart` | `--domain chart "real-time dashboard"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |

### Step 4: Stack Guidelines

Get stack-specific best practices:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `react`, `nextjs`, `vue`, `nuxt`, `svelte`, `astro`, `html-tailwind`, `shadcn`, `react-native`, `flutter`, `swiftui`, `jetpack-compose`, `angular`, `laravel`

---

## 67 UI Styles Available

Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode, AI-Native UI, Neubrutalism, Y2K Aesthetic, Cyberpunk UI, Organic Biophilic, Retro-Futurism, Liquid Glass, Motion-Driven, Micro-interactions, and 51 more.

## 161 Color Palettes

Industry-specific palettes aligned 1:1 with 161 product types — SaaS, Fintech, Healthcare, E-commerce, Beauty/Spa, Restaurant, Gaming, and more.

## 57 Font Pairings

Curated typography combinations with Google Fonts imports, matched to brand personality.

## 99 UX Guidelines

Best practices, anti-patterns, and accessibility rules covering animations, touch targets, dark mode, forms, navigation, and more.

---

## Common Rules for Professional UI

### Icons & Visual Elements

| Rule | Standard | Avoid |
|------|----------|--------|
| **No Emoji as Icons** | Use vector icons (Phosphor, Heroicons, Lucide) | Using emojis (🎨 🚀 ⚙️) for UI controls |
| **Vector-Only Assets** | SVG or platform vector icons | Raster PNG icons |
| **Consistent Icon Sizing** | Design tokens (icon-sm, icon-md=24pt, icon-lg) | Mixing arbitrary values |
| **Touch Target Minimum** | ≥44×44pt (iOS) / ≥48×48dp (Android) | Small icons without expanded tap area |
| **Icon Contrast** | WCAG 4.5:1 for small, 3:1 minimum for larger | Low-contrast icons |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|----|
| **8dp spacing rhythm** | Consistent 4/8dp system for padding/gaps | Random spacing increments |
| **Safe-area compliance** | Respect top/bottom safe areas | UI under notch or gesture area |
| **Readable text measure** | Limit line length on large devices | Edge-to-edge paragraphs on tablets |

### Light/Dark Mode

| Rule | Do | Don't |
|------|----|----|
| **Text contrast (light)** | Body text ≥4.5:1 against light surfaces | Low-contrast gray body text |
| **Text contrast (dark)** | Primary ≥4.5:1, secondary ≥3:1 on dark | Text blending into background |
| **Token-driven theming** | Semantic color tokens per theme | Hardcoded hex values per screen |

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG/vector instead)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast ≥4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: tested at 375px, 768px, 1024px, 1440px
- [ ] Safe areas respected for fixed headers and bottom bars
- [ ] Both light and dark modes tested before delivery
