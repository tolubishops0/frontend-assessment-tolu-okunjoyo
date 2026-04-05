# Checkit Content Explorer

A content explorer built for the Checkit Frontend Engineer take-home assessment using Next.js App Router, TypeScript, Tailwind CSS, and the live DummyJSON products API.

## Live Demo

- Repository: `https://github.com/tolubishops0/frontend-assessment-tolu-okunjoyo`
- Live URL: `https://frontend-assessment-tolu-okunjoyo.vercel.app/products`

## Why DummyJSON

I chose [DummyJSON Products](https://dummyjson.com/docs/products) because it offers:

- a stable free API with no authentication setup
- built-in product listing and single-product detail endpoints
- search support
- category support
- image-rich product data that maps naturally to the assessment requirements

This let me focus on engineering quality, UI polish, and state handling rather than spending time on API auth or incomplete data.

## Features Implemented

### Listing Page

- App Router listing route at `/products`
- Root route `/` redirects to `/products`
- Server-rendered listing page using live DummyJSON data
- Responsive card grid:
  - mobile: 1 column
  - tablet: 2 columns
  - desktop: 3 columns
  - large desktop: 4 columns
- Pagination with compact ellipsis-based navigation
- Product cards with:
  - title
  - image with fallback
  - brand
  - price
  - rating
  - stock

### Detail Page

- Dynamic route at `/products/[id]`
- Server-side product fetch
- Breadcrumb back to the listing
- Dynamic metadata via `generateMetadata`
  - title
  - description
  - Open Graph image

### Search and Filtering

- URL-driven search using `query`
- URL-driven category filter using `category`
- Debounced search input via a reusable `useDebouncedValue` hook
- Shareable filter state because the URL reflects current inputs
- Pagination resets automatically when search/filter changes

### Loading, Error, and Empty States

- Route-level loading UI with skeleton layouts
- Route-level error boundary with retry and back-to-listing actions
- Dedicated empty state for no search/filter matches
- Suspense-streamed related products section on the detail page with a meaningful skeleton fallback

### Testing

Vitest + React Testing Library coverage includes:

- `ProductCard` rendering
- `ProductCard` image fallback behavior
- products error boundary rendering and retry action
- products loading skeleton rendering
- product not-found rendering
- filter query-building logic

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Vitest
- React Testing Library

## Setup

1. Clone the repository
2. Install dependencies
3. Start the dev server
4. Refer to `.env.example` for the environment file format, even though no runtime secrets are required for this project

```bash
git clone https://github.com/tolubishops0/frontend-assessment-tolu-okunjoyo.git
cd frontend-assessment-tolu-okunjoyo
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

This project includes an [`.env.example`](./.env.example) file at the repo root.

The app reads `NEXT_PUBLIC_API_URL` from the environment so the API base URL can be configured explicitly across local and deployed environments.

Example:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

This project does not require any secrets, but it does expect that public API base URL to be set.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
```

## Project Structure

```text
src/
  app/
    page.tsx
    products/
      page.tsx
      loading.tsx
      error.tsx
      [id]/page.tsx
      [id]/loading.tsx
      [id]/not-found.tsx
  components/
    products/
  hooks/
  lib/
    api/
    utils/
  types/
  test/
```

## Architecture Decisions

### 1. App Router route design

I kept the explorer under `/products` instead of placing the full listing directly at `/`.

Why:

- it creates a clearer route hierarchy
- it makes `/products/[id]` feel natural
- it improves breadcrumb structure
- it keeps the root route free to act as a redirect entry point

### 2. API layer behind `lib/`

Components do not call `fetch()` directly.

Instead:

- `src/lib/api/products.ts` handles all API requests
- `src/lib/utils/products.ts` maps raw API responses into an internal product model
- components only receive clean, normalized data

Why:

- easier to swap APIs later
- cleaner component contracts
- keeps business logic out of JSX
- easier to test

### 3. Internal product model

I do not render the raw DummyJSON response directly.

I map it into a shared `Product` type so the UI depends on application-level data, not API quirks.

Why:

- protects the UI from API shape changes
- keeps formatting consistent
- makes future refactors easier

### 4. Pagination over infinite scroll

I intentionally chose pagination instead of infinite scroll.

Why:

- clearer URL state
- easier sharing and refresh behavior
- easier testing
- simpler and more predictable server-rendered UX
- lower implementation risk for a take-home assessment

### 5. URL-driven filters

Search and category state live in the URL instead of only local component state.

Why:

- results are shareable
- refresh-safe
- works naturally with server rendering
- gives better navigation behavior

## Performance Optimizations Applied

### 1. `next/image`

All product imagery uses `next/image` with responsive `sizes` and explicit layout behavior.

Why:

- optimized image loading
- better LCP
- reduced layout shift risk

### 2. `next/font`

Fonts are loaded through `next/font` in the root layout.

Why:

- font loading is optimized automatically
- helps avoid layout shifts caused by late font swaps

### 3. Fetch cache strategy

I used Next.js fetch cache options inside the API layer:

- category list: `revalidate: 86400`
- listing/search/category pages: `revalidate: 1800`
- product detail: `revalidate: 3600`

Why:

- balances freshness with performance
- keeps repeated navigation efficient
- avoids unnecessary `no-store` usage

### 4. Stable layout sizing

Cards and detail imagery use fixed aspect-ratio containers.

Why:

- prevents content jumping while images load
- improves CLS

## Lighthouse Results

I ran Lighthouse against the deployed application after deployment.

### Desktop

- Performance: 100
- Accessibility: 96
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 0.4s
- Largest Contentful Paint: 0.6s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0

### Mobile

- Performance: 100
- Accessibility: 96
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 1.0s
- Largest Contentful Paint: 1.3s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0

## Trade-offs and Known Limitations

### 1. Combined search + category filtering

DummyJSON supports search and category endpoints separately, but not a single clean endpoint for both together.

Current approach:

- use the search endpoint
- filter the results by category on the server
- paginate the filtered result

Why I accepted this:

- keeps the UX correct
- keeps the app consistent with the required shareable URL behavior
- avoids overengineering a separate backend layer for the assessment

If I had more time, I would evaluate whether a small edge function or cached aggregation layer would make this more efficient.

### 2. Bonus scope kept intentionally narrow

I prioritized the core requirements first and only added bonuses that fit cleanly into the product.

### 3. Vercel instead of Cloudflare Workers

I deployed this version on Vercel rather than Cloudflare Workers.

Why:

- Vercel provides the lowest-risk path for a polished App Router deployment under a time-boxed assessment
- it let me focus on product quality, resilience states, testing, and performance instead of introducing OpenNext/Workers-specific deployment complexity late in the process
- the deployed result still meets the hosting requirement while keeping the implementation easier to verify quickly

### 4. No `.env` values required

DummyJSON does not require authentication, so there are no secret runtime environment variables needed for this version. The only environment variable used is the public `NEXT_PUBLIC_API_URL` base URL.

### 5. Remaining accessibility note

Lighthouse reports a contrast issue on a few low-emphasis text elements, specifically the `CURATED PRODUCT EXPLORER` badge and parts of the pagination UI such as `Previous` and the pagination summary. That contrast issue remains the primary unresolved accessibility item.

## Bonus Tasks

### B-2 Suspense Streaming

The product detail route streams a secondary related-products section with `Suspense`, so the main product content can render first while the category-based recommendations load behind a dedicated skeleton fallback. No client-side loading state is involved — the stream is handled entirely at the server level by the App Router.

### B-3 Accessibility Audit

I ran Lighthouse accessibility checks against the deployed application and reached a score of 96 on both desktop and mobile.

I used that audit to validate route-state messaging, form labeling, recovery actions, and general semantic structure. Lighthouse flagged insufficient contrast on a few muted text elements, and that remains the only unresolved item from the audit.

## Verification Checklist

- `npm run lint`
- `npm test`
- `npm run build`

All three pass locally.

## What I Would Tackle Next With Two More Hours

With another two hours, I would focus first on a final contrast pass to address any remaining Lighthouse accessibility warning without losing the visual tone of the interface. After that, I would spend the remaining time on a small round of interaction polish around filtering and pagination and add one or two more integration-style tests for those flows.
