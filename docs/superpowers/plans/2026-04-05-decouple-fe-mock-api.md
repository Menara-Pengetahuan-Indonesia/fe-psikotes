# Decouple FE Mock API Routes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create Next.js API routes that mirror all BE endpoints so fe-psikotes works standalone on Vercel with dummy data.

**Architecture:** All admin/public API calls go through axios with baseURL derived from `NEXT_PUBLIC_API_URL`. When empty (Vercel), requests hit Next.js API routes at the same origin. We create mock route handlers that return static dummy data from a shared `_mock-data.ts` file. No changes to services, hooks, or components.

**Tech Stack:** Next.js 15 App Router API routes, TypeScript

---

## File Structure

```
src/app/api/
├── _mock-data.ts                              # Shared dummy data + helpers
├── admin/
│   ├── tests/
│   │   ├── route.ts                           # GET all, POST create
│   │   └── [testId]/
│   │       ├── route.ts                       # GET one, PATCH, DELETE
│   │       ├── publish/route.ts
│   │       ├── unpublish/route.ts
│   │       ├── indicators/
│   │       │   ├── route.ts                   # GET all, POST create
│   │       │   └── [indicatorId]/route.ts     # PATCH, DELETE
│   │       ├── sections/
│   │       │   ├── route.ts                   # GET all, POST create
│   │       │   └── [sectionId]/route.ts       # PATCH, DELETE
│   │       ├── questions/
│   │       │   ├── route.ts                   # GET all, POST create
│   │       │   ├── [questionId]/
│   │       │   │   ├── route.ts               # PATCH, DELETE
│   │       │   │   └── options/route.ts       # POST create option
│   │       │   ├── options/
│   │       │   │   └── [optionId]/
│   │       │   │       ├── route.ts           # PATCH, DELETE option
│   │       │   │       └── indicator-mapping/route.ts
│   │       │   └── indicator-mapping/
│   │       │       └── [mappingId]/route.ts   # DELETE
│   │       └── scoring-rules/
│   │           ├── route.ts                   # GET all, POST create
│   │           └── [ruleId]/route.ts          # PATCH, DELETE
│   ├── packages/
│   │   ├── route.ts                           # GET all, POST create
│   │   └── [packageId]/
│   │       ├── route.ts                       # GET one, PATCH, DELETE
│   │       ├── publish/route.ts
│   │       ├── unpublish/route.ts
│   │       └── tests/
│   │           ├── route.ts                   # POST add test
│   │           └── [testId]/route.ts          # DELETE remove test
│   └── upload/
│       └── image/route.ts
└── packages/
    ├── route.ts                               # GET public packages
    └── [id]/route.ts                          # GET single package
```

---
