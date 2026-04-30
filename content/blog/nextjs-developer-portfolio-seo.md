---
title: "Next.js portfolio SEO: metadata, sitemaps, and structured data"
description: "A practical checklist for ranking a developer portfolio built with Next.js App Router—without sacrificing performance or design."
date: "2026-01-08"
updated: "2026-01-08"
tags:
  - Next.js
  - SEO
  - App Router
image: "/assets/blogs/b1.webp"
---

Search engines reward **fast, well-structured sites** that clearly explain who you are and what you do. A portfolio is no exception. If you ship with **Next.js**, you already have the right foundation—you mainly need to wire up metadata, discoverability, and a bit of structured data.

## Start with crawlability

Before fine-tuning titles and Open Graph tags, make sure crawlers can reach your pages:

- Serve a **`sitemap.xml`** that lists every important URL, including new blog posts as you publish them.
- Expose a **`robots.txt`** that points to that sitemap and avoids accidentally blocking key sections.
- Use **stable URLs** (`/blog/my-post` beats query-heavy URLs) and return real **404s** for missing content.

## Metadata that actually helps

The App Router’s `metadata` and `generateMetadata` APIs let you set:

- A **unique title and description** per page (your home page sells breadth; deep pages can sell specificity).
- **Open Graph** and **Twitter** cards so links look credible when shared.
- **`alternates.canonical`** when the same content could appear under more than one URL.

Keep descriptions honest and specific—think “what would a hiring manager or founder type into Google before they find you?”

## Structured data for articles

For blog posts, **`Article`** JSON-LD helps search engines understand the headline, dates, author, and hero image. Pair it with **`BreadcrumbList`** so the relationship between Home → Blog → Post is explicit.

You do not need a heavyweight CMS for this—you can generate JSON-LD alongside your page on the server and keep your content in markdown or MDX.

## Performance is an SEO input

Core Web Vitals still matter for competitive queries. On portfolios, the usual wins are:

- **Optimize hero media** (proper dimensions, modern formats, no layout shift).
- **Avoid main-thread stalls** from excessive client JavaScript on above-the-fold content.
- **Prefetch** wisely—link to important routes like [contact](/contact) and [pricing](/pricing) from your articles so visitors (and crawlers) see a cohesive site.

## A minimal code-minded habit

When you publish a new post, update your **sitemap**, confirm the page has **one clear H1**, and sanity-check the rendered HTML in “View Source” for your meta tags and JSON-LD. Those three habits catch most embarrassing SEO slips early.

---

If you want help auditing your portfolio or shipping a content setup like this on your own domain, [get in touch](/contact).
