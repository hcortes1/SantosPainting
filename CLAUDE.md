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

The site uses a manual component injection pattern: shared `navbar.html` and `footer.html` live in `components/` and are fetched and injected into each page via `js/shared/components.js`. `components.js` detects page depth (checks if URL includes `/pages/`) to resolve correct relative paths, then calls `initNavbar()` after navbar injection.

**File organization follows a strict parallel structure:**
- Each page in `pages/` has a corresponding CSS file in `css/pages/` and JS file in `js/pages/`
- Shared/global styles are in `css/shared/`, shared logic in `js/shared/`
- `css/shared/style.css` — global styles applied everywhere
- `css/shared/navbar.css` and `css/shared/footer.css` — shared component styles
- `js/shared/main.js` — main entry point; loads on all pages
- `js/shared/navbar.js` — hamburger toggle (`.nav-toggle` / `.nav-links.open`) and mobile dropdown toggle (`.dropdown.open`); closes menu on any nav link click

**Each page must include these script tags (in this order — `navbar.js` must precede `components.js` since `components.js` calls `initNavbar()` after injecting the navbar):**
```html
<script src="../js/shared/navbar.js"></script>
<script src="../js/shared/components.js"></script>
<script src="../js/shared/main.js"></script>
<script src="../js/pages/[page-name].js"></script>
```

**Service page structure** (use `interior-painting.html` as the reference implementation):
- Hero section with service icon, title, subtitle, CTA button
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
- Make service tile images on homepage larger and be evenly distributed
- Slightly increase global font size
- Take the logo out of the navbar and put it to the left of the big blue banner under the navbar

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