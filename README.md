# Checkit Content Explorer

A content explorer built for the Checkit Frontend Engineer take-home assessment using Next.js App Router, TypeScript, Tailwind CSS, and the live DummyJSON products API.

## Live Demo

- Repository: `https://github.com/tolubishops0/xyx`
- Live URL: `xyz.com`

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

### Loading, Error, and Empty States

- Route-level loading UI with skeleton layouts
- Route-level error boundary with retry and back-to-listing actions
- Dedicated empty state for no search/filter matches
- Suspense-streamed related products section on the detail page with a meaningful skeleton fallback
