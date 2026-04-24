# Package Listing, Filter & Detail Polish

**Date:** 2026-04-24
**Scope:** Halaman kategori (diri-pribadi, relationship, bisnis) + detail page polish
**Out of scope:** Landing page "populer" section, payment/Midtrans, filter usia & permasalahan

## Overview

Tambah search & filter di ketiga halaman kategori asesmen, dan polish halaman detail paket agar lebih informatif. Semua data dari API, no dummy data. Client-side filtering karena jumlah paket masih kecil.

## 1. Shared PackageFilterBar Component

Reusable component dipake di ketiga halaman kategori.

**Elemen:**
- Search input — filter by `ChildPackage.name` dan `description`. Debounced 300ms.
- Filter tipe paket — chip/dropdown: Semua | Dasar | Lengkap | Komprehensif. Match dari `PackageType.name` di dalam child package.
- Filter harga — dropdown range: Semua | < Rp100rb | Rp100rb–500rb | Rp500rb–1jt | > Rp1jt. Cek harga terendah `PackageType.price` per child package.
- Reset filter button — clear semua ke default.
- Result count — "Menampilkan X dari Y paket".

**Layout:** Horizontal bar, responsive stack vertikal di mobile. Posisi di bawah hero, di atas product grid.

**Empty state:** "Tidak ada paket yang sesuai filter. Coba ubah kriteria pencarian."

## 2. usePackageFilter Hook

Custom hook yang handle semua filter logic.

**Input:** `ChildPackage[]` (with `packageTypes` populated)

**Output:**
```ts
{
  filtered: ChildPackage[]
  search: string
  setSearch: (v: string) => void
  tier: string          // 'all' | 'dasar' | 'lengkap' | 'komprehensif'
  setTier: (v: string) => void
  priceRange: string    // 'all' | 'under100k' | '100k-500k' | '500k-1m' | 'over1m'
  setPriceRange: (v: string) => void
  resetFilters: () => void
}
```

**Filter logic:**
- Search: case-insensitive match on `name` OR `description`
- Tier: child package has at least one active `PackageType` whose `name` includes the tier keyword
- Price: child package's lowest active `PackageType.price` falls within selected range
- All filters are AND-combined

## 3. Halaman Kategori — Refactor

Ketiga halaman tetap punya hero section masing-masing (branding/warna beda). Yang berubah:

**Struktur per halaman:**
```
<Hero khusus per kategori />       ← tidak diubah
<PackageFilterBar />               ← baru
<FilteredPackageGrid />            ← pake ChildPackageCard yang sudah ada
<BottomCTA />                      ← tidak diubah
```

**Data flow:**
1. `usePublicPackages()` fetch semua packages
2. Find parent package by nama (`.includes('diri')` / `'relationship'` / `'bisnis'`)
3. Extract `childPackages` yang `isActive`
4. Pass ke `usePackageFilter` → return filtered list
5. Render `ChildPackageCard` per item

## 4. Detail Page — Polish

Existing `PackageDetailClient` di-enhance:

**Breadcrumb navigation:**
`Beranda > {categoryLabel} > {child.name}` — di atas hero section, replace tombol "Kembali" yang sekarang.

**Info tambahan di hero:**
- Total estimasi durasi (sum durasi tes)
- Jumlah tes yang termasuk

**Daftar tes per tier:**
- Parse `PackageType.testTool` (comma-separated) → checklist visual
- Modify `usePublicChildPackage` hook to also return `parentId` so we can fetch `PublicPackage` via `publicPackageService.getById(parentId)` untuk dapat `tests[]` array
- Tampilin nama tes, deskripsi singkat, durasi per tes

**Sticky CTA (mobile):**
- Tombol "Pilih Paket Ini" sticky di bottom pada viewport mobile
- Text tetap "Pilih Paket Ini" dengan note kecil "Pembayaran akan segera tersedia"
- `alert()` behavior dipertahankan sampai Midtrans ready

## 5. Files yang Akan Dibuat/Diubah

**Baru:**
- `src/features/psikotes/components/package-filter-bar.tsx` — shared filter component
- `src/features/psikotes/hooks/use-package-filter.ts` — filter logic hook

**Diubah:**
- `src/app/diri-pribadi/page.tsx` — integrate filter bar
- `src/app/relationship/page.tsx` — integrate filter bar
- `src/app/bisnis/page.tsx` — integrate filter bar
- `src/features/psikotes/components/package-detail.tsx` — breadcrumb, tes list, sticky CTA, info tambahan
- `src/features/psikotes/hooks/use-public-packages.ts` — `usePublicChildPackage` return `parentId` juga

## 6. Data Dependencies

Semua data sudah tersedia dari API:
- `usePublicPackages()` → `Package[]` with `childPackages[].packageTypes[]`
- `publicPackageService.getById(id)` → `PublicPackage` with `tests[]`
- No backend changes needed
