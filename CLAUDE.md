# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Santos Painting is a static multi-page website for a residential and commercial painting business. Pure HTML/CSS/vanilla JS — no build tools, no npm, no backend.

## Running the Site

Open files directly in a browser, or use a local dev server to avoid CORS issues with component injection:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Architecture

The site uses a manual component injection pattern: shared `navbar.html` and `footer.html` live in `components/` and are intended to be fetched and injected into each page via `js/shared/components.js`. This script is the glue that makes the shared components reusable across all pages.

**File organization follows a strict parallel structure:**
- Each service page in `pages/` has a corresponding CSS file in `css/pages/` and JS file in `js/pages/`
- Shared/global styles are in `css/shared/`, shared logic in `js/shared/`
- `css/shared/style.css` — global styles applied everywhere
- `js/shared/main.js` — main entry point; loads on all pages
- `js/shared/navbar.js` — navbar interaction logic (mobile menu, etc.)

## Pages & Content

- **Home (`index.html`)** — headline, service icons with "Learn More" links, "What to Expect" section (Clean, Reliable, Professional, Free Estimates, Clear Communication), testimonials, contact section
- **7 service pages** (all in `pages/`) — Interior Painting, Exterior Painting, Cabinet Painting, Deck & Fence Staining, Drywall Repairs, Light Carpentry, Pressure Washing
- **About Us** — who we are, mission statement, client testimonials *(page not yet created)*
- **Photo Gallery / Portfolio** — photos of completed work with short descriptions, styled like CertaPro's website *(page not yet created)*

## Team Responsibilities

| Member | Assigned Sections |
|--------|------------------|
| Crisanto | Homepage, Interior Painting, Exterior Painting |
| Axel | Drywall Repairs, Deck & Fence Staining |
| Hernan | Light Carpentry Repairs, Cabinet Painting, About Us |
| Jemal | Portfolio/Photo Gallery, Pressure Washing |

## Assets

All images are in `assets/images/` — logo (`Santos-Painting-Logo.png`) and one icon per service. These are complete and ready to use.

Note: There is no dedicated Light Carpentry icon — `Wallpaper-Removal-Icon.png` is used as a placeholder.

---

## Current State

### ✅ Completed

- **Repo & folder structure** — all `pages/`, `css/pages/`, `js/pages/`, `components/`, `assets/` directories in place
- **`css/shared/style.css`** — fully implemented with CSS variables, navbar, hero, services grid, what-to-expect, testimonials, contact form, footer, and mobile responsive styles
- **`index.html`** — fully built: sticky navbar with Services dropdown (all 7 pages), hero, services grid with icons + Learn More links, What to Expect (Clean, Reliable, Professional, Free Estimates, Clear Communication), testimonials, contact form, footer
- **`components/navbar.html`** — navbar markup populated with root-relative paths, ready for `components.js` injection
- **`pages/light-carpentry.html`** — full skeleton: hero, What We Do, Why Choose Us (features list), CTA; linked to shared + page CSS and all JS files
- **`css/pages/light-carpentry.css`** — page-specific styles for all sections

### 🔲 Not Yet Started — Service Pages (Crisanto & Axel)

All files below exist as empty stubs. Each needs an HTML skeleton (same structure as `light-carpentry.html`) and page CSS filled in.

| Page | HTML | CSS | Assigned |
|------|------|-----|----------|
| `pages/interior-painting.html` | stub | stub | Crisanto |
| `pages/exterior-painting.html` | stub | stub | Crisanto |
| `pages/cabinet-painting.html` | stub | stub | Hernan |
| `pages/deck-fence-staining.html` | stub | stub | Axel |
| `pages/drywall-repairs.html` | stub | stub | Axel |
| `pages/pressure-washing.html` | stub | stub | Jemal |

**Copy descriptions from `features.md` (Obsidian: Projects/In progres/Features.md) when building each page.**

### 🔲 Not Yet Started — Pages to Create from Scratch

- **`pages/about.html`** (Hernan) — Sections needed:
  - Who we are
  - Mission statement
  - What clients are saying (testimonials)
  - Needs corresponding `css/pages/about.css` and `js/pages/about.js`

- **`pages/portfolio.html`** (Jemal) — Sections needed:
  - Photo gallery of completed work
  - Short description per photo
  - Style reference: CertaPro's website layout
  - Needs corresponding `css/pages/portfolio.css` and `js/pages/portfolio.js`

### 🔲 Not Yet Started — Shared JS

- **`js/shared/components.js`** — fetch and inject `components/navbar.html` and `components/footer.html` into every page
- **`js/shared/navbar.js`** — mobile hamburger toggle (`.nav-toggle` / `.nav-links.open`) and Services dropdown toggle on mobile (`.dropdown.open`)
- **`js/shared/main.js`** — any global page-load logic
- **`components/footer.html`** — footer markup (currently empty stub)

