# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Santos Painting is a static multi-page website for a residential and commercial painting business. Pure HTML/CSS/vanilla JS — no build tools, no npm, no backend.

## Running the Site

Run the server from the **parent directory** of the project (one level up from `SantosPainting/`). This is required because `navbar.html` uses `/SantosPainting/` prefixed hrefs for GitHub Pages compatibility — those paths only resolve correctly when served from the parent:

```bash
cd ..
python -m http.server 8080
# Visit http://localhost:8080/SantosPainting/
```

## Architecture

The site uses a manual component injection pattern: shared `navbar.html` and `footer.html` live in `components/` and are fetched and injected into each page via `js/shared/components.js`. `components.js` detects page depth (checks if URL includes `/pages/`) to resolve correct relative paths, then calls `initNavbar()` after navbar injection.

**File organization follows a strict parallel structure:**
- Each page in `pages/` has a corresponding CSS file in `css/pages/` and JS file in `js/pages/`
- Shared/global styles are in `css/shared/`, shared logic in `js/shared/`
- `css/shared/style.css` — global styles applied everywhere
- `css/shared/animations.css` — all animation/transition styles (hero entrance, hover effects, scroll animations); loaded on every page after `style.css`
- `css/shared/navbar.css` and `css/shared/footer.css` — shared component styles
- `js/shared/main.js` — main entry point; loads on all pages
- `js/shared/navbar.js` — hamburger toggle (`.nav-toggle` / `.nav-links.open`) and mobile dropdown toggle (`.dropdown.open`); closes menu on any nav link click

**Each page must include these script tags (in this order — `navbar.js` must precede `components.js` since `components.js` calls `initNavbar()` after injecting the navbar; AOS must precede `main.js` since `main.js` calls `AOS.init()`):**
```html
<script src="../js/shared/navbar.js"></script>
<script src="../js/shared/components.js"></script>
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="../js/shared/main.js"></script>
<script src="../js/pages/[page-name].js"></script>
```

**Service page structure** (use `interior-painting.html` as the reference implementation):
- Hero section with logo (left, links home) + title, subtitle, CTA button (right) — NO service icon in hero
- "What We Do" service description
- "Our Work" photo gallery — 6 `<img class="gallery-img">` in a 3-col `.gallery-grid`; images sourced from `assets/images/gallery/`
- "Why Choose Us" features list (5 benefits)
- CTA section linking to `../index.html#contact`

## Pages & Content

- **Home (`index.html`)** — hero, services grid with icons + Learn More links, What to Expect (Clean, Reliable, Professional, Free Estimates, Clear Communication), testimonials, contact form
- **9 service/info pages** (all in `pages/`) — Interior Painting, Exterior Painting, Cabinet Painting, Deck & Fence Staining, Drywall Repairs, Light Carpentry, Pressure Washing, About, Contact
- **`pages/about.html`** — hero section present; mission/testimonials/team sections still needed
- **`pages/portfolio.html`** — gallery with filter buttons (ALL/Painting/Power Washing), pagination, and lightbox modal for full-size images

## Team Responsibilities

| Member | Assigned Sections |
|--------|------------------|
| Crisanto | Homepage, Interior Painting, Exterior Painting |
| Axel | Drywall Repairs, Deck & Fence Staining |
| Hernan | Light Carpentry Repairs, Cabinet Painting, About Us |
| Jemal | Portfolio/Photo Gallery, Pressure Washing |

## Assets

All images are in `assets/images/` — logo (`Santos-Painting-Logo.png`), one icon per service, and 65+ gallery photos in `assets/images/gallery/`.

Note: There is no dedicated Light Carpentry icon — `Wallpaper-Removal-Icon.png` is used as a placeholder.

---

## Current State

### ✅ Completed

- **Shared infrastructure** — `components.js`, `navbar.js`, `navbar.html`, `footer.html`, `style.css`, `navbar.css`, `footer.css` all implemented
- **`index.html`** — fully built with all sections
- **Service pages with full HTML + CSS:** Interior Painting, Exterior Painting, Cabinet Painting, Deck & Fence Staining, Drywall Repairs, Light Carpentry, Pressure Washing
- **`pages/portfolio.html` + `css/pages/portfolio.css`** — complete: gallery grid, filter buttons, pagination, lightbox modal viewer
- **`pages/about.html`** — hero section present; `css/pages/about.css` created and linked

### 🔲 Remaining Work

| Item | Status | Assigned |
|------|--------|----------|
| `pages/about.html` | Partial — hero only, missing mission/testimonials/team | Hernan |
| `js/shared/main.js` | Empty (stub comment only) | — |

All `js/pages/` files are empty stubs — no page-specific JS is needed yet; they exist for future use.

### Requested Features (not yet implemented)

- Fix the size and styling of the images in the portfolio page. add a placeholder before and after title for my reference
- Slightly increase global font size

### ✅ Completed Features

- **Homepage service tile images** — icons enlarged from 60px → 90px; grid switched from CSS Grid to Flexbox with `justify-content: center` and fixed `width: 220px` per card, giving a 4-column layout on desktop with the 3-card last row centered
- **Logo moved from navbar to hero banner** — logo removed from navbar (links centered); logo added to the left (~28%) of every page's hero section via `.hero-inner` flex wrapper; clicking logo navigates home
- **Hero background image** — all hero sections (`.hero` and `.service-hero`) use `IMG_0160.jpeg` from the gallery with a dark navy gradient overlay (darker on left/logo side, lighter on right/text side) instead of a flat color; logo has a drop-shadow for depth
- **Service icons removed from hero** — Cabinet Painting, Light Carpentry, and Pressure Washing hero sections no longer show the service icon (icons only remain on the homepage service grid cards)
- **Animations added to all pages** — `css/shared/animations.css` created; AOS (Animate on Scroll) library added via CDN to all 11 pages; scroll-triggered fade-up/fade-right on sections, headings, cards, and feature list items; hero logo/content slide in on page load; hover effects on buttons, service cards, expect items, testimonials, gallery images, and feature list items; portfolio gallery items fade-up with stagger on each page render/filter change
- **Navbar page-load animation** — navbar slides down from top on every page load via `navbarSlideDown` keyframe in `animations.css`; nav link hover lifts by 1px
- **Mobile nav open/close animation** — hamburger menu slides down + fades in using CSS transitions (not a one-shot keyframe animation); implemented via `opacity`/`transform`/`visibility` transition on `.nav-links` in `navbar.css` so the animation re-fires on every open
- **Homepage mobile 2-per-row grid** — on screens ≤ 768px, `.services-grid` switches to a 2-column CSS grid so service cards display two per row instead of one
- **Contact page hero** — added matching `service-hero` section with logo, "Contact Us" title, subtitle, and CTA button, consistent with all other service pages

## Workflow (AI Agent Instructions)

- After writing code, deploy the **code-reviewer** subagent to review newly generated code
- If the code-reviewer finds an error, delegate bug fixing to the **debugger** subagent
- For frontend design work, deploy the **ui-designer** subagent
- For testing/debugging, run `python -m http.server 8080` from the parent directory and use the **Playwright** MCP to review changes at `http://localhost:8080/SantosPainting/`

---

## Known Bugs

### ✅ All Fixed

| # | Bug | Fix |
|---|-----|-----|
| 1 | ~~Portfolio gallery images all broken (wrong dir + wrong extension)~~ | Corrected all 21 paths to `../assets/images/gallery/` with correct extensions |
| 2 | ~~Duplicate gallery image (`IMG_0105` twice) in `pages/portfolio.html`~~ | Replaced second entry with `IMG_0088.jpeg` |
| 3 | ~~Light Carpentry icon referenced non-existent file~~ | Changed src to `Wallpaper-Removal-Icon.png` |
| 4 | ~~"Free Estimate" button invisible (CSS specificity — `background: none` override)~~ | Changed `.nav-cta` → `.nav-links a.nav-cta` in `navbar.css` |
| 5 | ~~Services dropdown closed before reaching menu items (8px hover dead zone)~~ | Changed `top: calc(100% + 8px)` → `top: 100%` in `navbar.css` |
| 6 | ~~About page linked `interior-painting.css` instead of its own stylesheet~~ | Created `css/pages/about.css` and updated the link |
| 7 | ~~Portfolio linked stray `interior-painting.css` alongside `portfolio.css`~~ | Removed the extra link from `pages/portfolio.html` |
| 8 | ~~About page missing `</main>` closing tag~~ | Added `</main>` before footer placeholder |
| 9 | ~~`footer.css` never linked by any page~~ | Added `footer.css` link after `navbar.css` in all 8 HTML pages |
| 10 | ~~Navbar contact link had `href =` (space before `=`)~~ | Fixed in `components/navbar.html`; also normalised "Contact us" → "Contact Us" |
| 11 | ~~Drywall CSS header comment said "exterior painting page CSS"~~ | Corrected to "drywall repairs page CSS" in `drywall-repairs.css` |
| 12 | ~~Navbar links caused `pages/pages/` double-prefix after code-review agent incorrectly removed leading `/` from hrefs and added broken rewriting logic to `components.js`~~ | Restored root-relative `/` hrefs in `navbar.html`; removed href-rewriting from `components.js` |
| 13 | ~~`components/footer.html` printed year twice (dynamic span + hardcoded `2025`)~~ | Removed hardcoded `2025` text; year span alone renders the current year |
| 14 | ~~`pages/contact.html` linked `interior-painting.css` instead of its own stylesheet~~ | Created `css/pages/contact.css` and updated the link |
| 15 | ~~`pages/contact.html` missing `footer.css` link~~ | Added `footer.css` link after `navbar.css` |
| 16 | ~~`pages/about.html` CTA button used absolute `/pages/contact.html` href~~ | Changed to relative `href="contact.html"` |
| 17 | ~~`pages/about.html` missing `js/pages/about.js` stub script tag~~ | Created `js/pages/about.js` stub and added the script tag as the last script in the page |
| 18 | ~~`pages/portfolio.html` `.pagination` div was outside `<main>`~~ | Moved `.pagination` inside `<main>` before `</main>` |
| 19 | ~~`pages/portfolio.html` gallery images missing `alt` attributes~~ | Added descriptive `alt` text to all 21 gallery images |
| 20 | ~~`pages/deck-fence-staining.html` had an HTML comment before `<!DOCTYPE>`, triggering quirks mode~~ | Removed the comment; `<!DOCTYPE html>` is now the first line |
| 21 | ~~`.service-hero` CSS rule copy-pasted across 9 page stylesheets~~ | Consolidated into `css/shared/style.css` once; removed from all 9 page-specific CSS files |