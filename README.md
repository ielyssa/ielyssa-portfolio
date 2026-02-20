# Personal Website

Personal website for **IRANKUNDA Elyssa** with:
- personal profile and mission sections
- portfolio projects with detail pages
- writing/blog section with detail pages
- ATAS company section + dedicated page
- speaking and media page

This repository was renamed from `ielyssa-portfolio` to `personal-website`.

## Tech Stack

- React + TypeScript
- Vite
- MUI
- React Router

## Project Structure

```text
src/
  layouts/portfolio/          # Main website layout (header, nav, footer)
  pages/                      # Route pages (portfolio, blog-detail, project-detail, atas, speaking)
  sections/website/           # Main section views and page-specific view components
  routes/                     # Route configuration and lazy loading
  utils/                      # Utility modules (analytics, helpers)

public/
  assets/images/              # Website images (focus, atas, projects, blog, logos)
  assets/docs/                # Downloadable files (CV, media kit)
  robots.txt
  sitemap.xml
```

## Run Locally

```bash
npm install
npm run dev
```

App runs on:
- `http://localhost:3039`

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## SEO

The project includes:
- canonical links
- Open Graph + Twitter meta tags
- structured data (Person, Article, CreativeWork, BreadcrumbList)
- `public/robots.txt`
- `public/sitemap.xml`

## Asset Conventions

- Images are served from `public/assets/images/...`
- Documents are served from `public/assets/docs/...`
- Use absolute public paths in code, for example:
  - `/assets/images/focus/focus-rwanda-context-ai.png`
  - `/assets/docs/IRANKUNDA-Elyssa-CV.pdf`

## Deployment Notes

- Ensure the host serves SPA routes (fallback to `index.html`).
- After deployment, clear cache/CDN when changing built chunks.
- If runtime chunk errors appear, redeploy with fresh cache and hard refresh browser.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
