# Saelan — Architect Portfolio

Portfolio website for Oskar Saelan Halskov, built with Next.js 14 (App Router).

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Tech Stack

- **Next.js 14.2.3** — App Router, static generation
- **React 18** — Client + Server Components
- **Tailwind CSS 3.4.1** — Utility-first styling
- **Framer Motion 11.2.10** — Animation library (installed, lightly used)
- **Custom font** — Italian Plate No2 Light (loaded via `next/font/local`)

## Project Structure

```
app/
├── layout.js                 # Root layout (font, Header, TransitionWrapper)
├── page.js                   # Home — splash video → image reveal
├── globals.css               # Font-face, fade-in/out animations, polyrattan mask
├── error.js                  # Error boundary
├── not-found.js              # 404 page
├── contact/page.js           # Contact info page
├── projects/
│   ├── page.js               # Project list (grid)
│   └── [slug]/page.js        # Individual project detail
components/
├── Header.js                 # Navigation with category dropdowns (client component)
├── TransitionWrapper.js      # Route fade-in animation wrapper
├── Video.js                  # Masked video player
lib/
└── projects.js               # Project data + helper functions (async, fetches from Strapi)
public/
├── fonts/                    # Italian Plate No2 font files (11 variants)
├── PH.jpg                    # Placeholder image
├── polyrattanLogo.jpg        # Header logo
├── polyrattanVideo.mp4       # Splash screen video
└── logoTransparent.png       # CSS mask for video
```

## Data Model

Projects are fetched from Strapi CMS. Each project has:

```js
{ slug, title, category, description, image, year, where, who }
```

- **Categories**: `architecture`, `illustration`, `other`
- **Image**: URL from Strapi media library (Cloudinary in production)

## Key Patterns

- **Bilingual labels**: Danish primary, English italic — `DANSK.<em>ENGLISH</em>`
- **Header visibility**: Controlled via localStorage + custom events (`showHeader`, `resetSplash`)
- **ISR**: Pages revalidate every 60 seconds via `next: { revalidate: 60 }` in fetch calls
- **Static params**: `generateStaticParams()` in project pages for build-time generation
- **Header data flow**: Root layout.js (Server Component) fetches all projects and passes them as props to Header.js (Client Component)

## Strapi CMS

The backend CMS lives in a sibling directory (`../saelan-cms/`) and on GitHub at `Luchassmed/saelan-cms` (private).

### Local development
```bash
cd ../saelan-cms && npm run develop   # Starts on localhost:1337
```

### Production
- **Railway**: https://strapi-production-8ff7.up.railway.app
- **Database**: PostgreSQL (Railway managed)
- **Image storage**: Cloudinary (configured via `@strapi/provider-upload-cloudinary`)

### Environment variables (`.env.local`)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<read-only-token>
```

## Deployment

- **Frontend (Next.js)**: Vercel, auto-deploys from `Luchassmed/saelan` on GitHub
- **Backend (Strapi)**: Railway, deployed via `railway up` from `../saelan-cms/`
- **Images**: Cloudinary (free tier)

## Remaining Setup Steps (pick up from here)

The Strapi CMS code changes and Railway deployment are complete. The following manual steps remain:

1. **Register admin account on production Strapi**: Go to https://strapi-production-8ff7.up.railway.app/admin and create an admin user
2. **Set API permissions**: Settings > Roles > Public > enable `find` and `findOne` on the Project content type
3. **Create API token**: Settings > API Tokens > create a read-only token named `nextjs-frontend`
4. **Add Vercel environment variables**: In the Vercel dashboard for `saelan`, add:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://strapi-production-8ff7.up.railway.app`
   - `STRAPI_API_TOKEN` = *(the token from step 3)*
5. **Trigger a Vercel redeploy** after adding the env vars (push a commit or redeploy from dashboard)
6. **Add projects in production Strapi** — images will be stored in Cloudinary automatically
