---
title: "Web performance for small teams: a Web Vitals playbook"
description: "How to prioritize LCP, INP, and CLS when you do not have a dedicated performance team—measurement, budgets, and the fixes that pay off."
date: "2026-03-22"
tags:
  - Performance
  - Web Vitals
  - Frontend
image: "/assets/blogs/b3.webp"
---

**Performance is product quality.** Slow pages lose signups, degrade trust, and quietly hurt SEO in competitive niches. The good news: most teams can get 80% of the value with a short playbook centered on **Core Web Vitals**.

## Measure like a product decision, not a vanity score

Pick **field data** (real users) when you can, and supplement with **lab tests** when iterating locally. Before changing code, answer:

- Which route or template is the worst for **LCP**?
- Where do users see jank—**INP** hotspots on click/keyboard handlers?
- Do late-loading assets cause **CLS** on mobile?

If you only fix one page, fix the one that carries your primary conversion.

## Budgets that engineering and design can share

A performance budget is just a constraint everyone agrees on. Examples:

- Hero **LCP image** under a known byte budget and with explicit dimensions.
- No blocking scripts on the critical path for landing pages.
- Third-party tags gated until after first interaction (or removed).

Budgets prevent “just add one more analytics snippet” from becoming death by a thousand cuts.

## The fixes that usually win

These are not glamorous, but they consistently move scores:

- **Right-size images** and serve modern formats.
- Split or lazy-load non-critical work; keep above-the-fold interactions lean.
- Avoid layout thrash: reserve space for media, skeletons, and dynamic UI.
- Audit **font loading** and reduce flashes of invisible text where possible.

## Tie performance back to business outcomes

Record a before/after for the metric you care about—**bounce rate**, **signup completion**, or **time-to-first-success** in your app. When stakeholders ask why perf matters, show the graph, not the Lighthouse trophy.

---

If you want a focused pass on your public site or app shell, I take on [select consulting projects](/contact)—send your URL and what “success” looks like for your users.
