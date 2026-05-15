# Catalog API Integration Design

**Date:** 2026-05-03
**Scope:** Catalog browsing, purchase flow (direct), My Packages page
**Out of scope:** Midtrans payment gateway (backend not ready), test session rework

---

## Background

The frontend was built against a `/packages` endpoint that no longer exists. The backend now exposes a `/catalog/*` hierarchy. Admin endpoints (`/admin/*`) are unaffected and remain as-is.

---

## API Endpoints Used

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /catalog/packages` | No (public) | List all active packages (paket besar) |
| `GET /catalog/packages/{packageId}/child-packages` | No (public) | List child packages per package |
| `GET /catalog/child-packages/{childPackageId}/package-types` | Bearer JWT | List package types + price |
| `POST /catalog/package-types/{packageTypeId}/purchase` | Bearer JWT | Purchase a package type |
| `GET /catalog/my-packages` | Bearer JWT | List owned package types |
| `GET /catalog/my-packages/{packageTypeId}/tests` | Bearer JWT | Tests from owned package |

---

## Data Types

New file: `src/features/psikotes/types/catalog.types.ts`

```ts
export interface CatalogPackage {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface CatalogChildPackage {
  id: string
  packageId: string
  name: string
  description?: string
}

export interface CatalogPackageType {
  id: string
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
}

export interface MyPackage {
  id: string           // packageTypeId
  name: string
  childPackageName?: string
  packageName?: string
  purchasedAt: string
}
```

`PublicPackage` and `PublicTest` in `src/features/admin/types/index.ts` will be removed. `publicPackageService` in `src/features/admin/services/index.ts` will be removed.

---

## Service Layer

New file: `src/features/psikotes/services/catalog.service.ts`

```ts
getPackages(): Promise<CatalogPackage[]>
getChildPackages(packageId: string): Promise<CatalogChildPackage[]>
getPackageTypes(childPackageId: string): Promise<CatalogPackageType[]>
purchasePackageType(packageTypeId: string): Promise<void>
getMyPackages(): Promise<MyPackage[]>
getMyPackageTests(packageTypeId: string): Promise<unknown[]>
```

All functions use the shared `api` axios instance which attaches bearer JWT automatically.

---

## Hooks Layer

New files in `src/features/psikotes/hooks/`:

| Hook | File | Notes |
|---|---|---|
| `usePackages()` | `use-catalog-packages.ts` | No auth required |
| `useChildPackages(packageId)` | `use-catalog-child-packages.ts` | No auth required |
| `usePackageTypes(childPackageId)` | `use-catalog-package-types.ts` | Bearer JWT |
| `usePurchasePackageType()` | `use-catalog-purchase.ts` | Mutation, Bearer JWT |
| `useMyPackages()` | `use-my-packages.ts` | `enabled: !!accessToken` |

**Removed:** `use-public-packages.ts`, `use-public-package-detail.ts`

---

## Component Changes

### `psikotes-products.tsx`
- Replace `usePublicPackages()` with `usePackages()` + `useQueries` for parallel child package fetching
- Flatten all child packages from all packages into grid
- `getCategorySlug()` logic unchanged (based on package name keywords)

### `package-detail.tsx`
- Replace `usePublicChildPackage(childId)` with a new `useChildPackageById(childPackageId)` helper that fetches all packages → parallel child fetches → finds matching child
- Replace `usePublicPackageDetail()` with `usePackageTypes(childPackageId)` for tiers
- Remove "jumlah tes" and "estimasi durasi" from hero section (data not available in catalog API)
- `TierCard` purchase button: call `usePurchasePackageType()` → on success redirect to `/dasbor/paket-saya`

### New page: `/dasbor/paket-saya`
- Protected by existing `AuthGuard`
- Fetch from `useMyPackages()`
- Display list of owned package types with link to tests

---

## Error Handling

| Scenario | Behavior |
|---|---|
| `usePackages()` fails | `PsikotesProducts` shows `PackageEmptyState` |
| `useChildPackages()` fails for one package | Skip that package, rest of grid still renders |
| `usePackageTypes()` fails | Detail page shows "Harga tidak tersedia" |
| Purchase 409 (already owned) | Toast "Kamu sudah memiliki paket ini" + redirect to `/dasbor/paket-saya` |
| Purchase 401 (not logged in) | Redirect to login |
| Purchase success | Redirect to `/dasbor/paket-saya` |

---

## Auth Boundaries

- Landing page catalog browsing: **no auth required**
- "Pilih Paket Ini" button click: check login → if not logged in, redirect to login first
- `/dasbor/paket-saya`: guarded by `AuthGuard`

---

## What Is NOT Changed

- `src/features/admin/services/index.ts` — all admin CRUD services untouched (except removing `publicPackageService`)
- `src/features/admin/hooks/` — all admin hooks untouched
- `/admin/*` API endpoints — not affected
- Test session flow (`/tes/[testId]`) — separate spec, future phase
- Midtrans payment gateway — separate spec, after backend is ready
