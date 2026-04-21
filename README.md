# Santos Painting

A static multi-page website for Santos Painting, a residential and commercial painting business. Built with pure HTML, CSS, and vanilla JavaScript — no build tools or backend required.

## Features

- **7 service pages** — Interior Painting, Exterior Painting, Cabinet Painting, Deck & Fence Staining, Drywall Repairs, Light Carpentry, Pressure Washing — each with a 6-photo "Our Work" gallery
- **Portfolio gallery** — filterable image grid (All / Painting / Power Washing) with pagination and a lightbox modal
- **Responsive navbar** — hamburger menu for mobile, hover-activated services dropdown
- **Shared component injection** — navbar and footer fetched from `components/` and injected into every page at runtime
- **Contact form** on the homepage
- **About page** with hero section

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- No frameworks, no npm, no build step

## Getting Started

### Prerequisites

A browser and optionally Python 3 (for the local dev server).

### Running

Open `index.html` directly in a browser, **or** run a local server to avoid fetch/CORS errors with component injection:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project Structure

```
SantosPainting/
├── index.html                  # Homepage
├── pages/                      # All sub-pages
│   ├── interior-painting.html
│   ├── exterior-painting.html
│   ├── cabinet-painting.html
│   ├── deck-fence-staining.html
│   ├── drywall-repairs.html
│   ├── light-carpentry.html
│   ├── pressure-washing.html
│   ├── about.html
│   ├── portfolio.html
│   └── contact.html
├── components/
│   ├── navbar.html             # Shared navbar markup
│   └── footer.html             # Shared footer markup
├── css/
│   ├── shared/
│   │   ├── style.css           # Global styles
│   │   ├── navbar.css
│   │   └── footer.css
│   └── pages/                  # One CSS file per page
├── js/
│   ├── shared/
│   │   ├── components.js       # Fetches and injects navbar + footer
│   │   ├── navbar.js           # Hamburger + dropdown toggle logic
│   │   └── main.js             # Global entry point (loaded on every page)
│   └── pages/                  # Per-page JS stubs (future use)
└── assets/
    └── images/
        ├── Santos-Painting-Logo.png
        ├── *-Icon.png          # One icon per service
        └── gallery/            # 65+ project photos
```

## Adding a New Page

1. Create `pages/<name>.html` — copy `pages/interior-painting.html` as a template.
2. Create `css/pages/<name>.css` and link it in the `<head>`.
3. Create `js/pages/<name>.js` (stub is fine).
4. Include scripts in this order at the bottom of `<body>`:
   ```html
   <script src="../js/shared/navbar.js"></script>
   <script src="../js/shared/components.js"></script>
   <script src="../js/shared/main.js"></script>
   <script src="../js/pages/<name>.js"></script>
   ```
