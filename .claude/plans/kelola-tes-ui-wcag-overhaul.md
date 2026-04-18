# Kelola Tes — UI Overhaul + WCAG Compliance

## Masalah yang Ditemukan

### WCAG Violations (Kritis)
1. **Font terlalu kecil**: `text-[10px]` dan `text-[9px]` di banyak tempat — WCAG 1.4.4 minimum ~12px
2. **Kontras gagal**: `text-gray-400` di atas bg putih = rasio ~2.7:1, butuh 4.5:1 (WCAG 1.4.3)
3. **Tombol aksi invisible**: `opacity-0 group-hover:opacity-100` — user keyboard tidak bisa lihat tombol edit/delete
4. **Icon-only button tanpa label**: Tombol Pencil, Trash2 tanpa `aria-label` (WCAG 4.1.2)
5. **Toggle tanpa semantik**: Custom toggle button tanpa `role="switch"` dan `aria-checked`
6. **Tree node bukan interactive element**: `<div onClick>` bukan `<button>` — tidak accessible via keyboard
7. **Search input tanpa label**: Input search hanya pakai placeholder, tidak ada `<label>` atau `aria-label`
8. **Focus indicator hilang**: Banyak elemen custom tanpa visible focus ring

### UI/Design Issues
1. **Sidebar terlalu flat** — tidak match dengan dashboard yang pakai rounded-[2.5rem], gradient, shadow
2. **Panel header basic** — tidak ada visual hierarchy yang kuat
3. **Stats card terlalu kecil** — cramped, kurang breathing room
4. **List items monoton** — kurang visual differentiation
5. **Empty state boring** — tidak engaging
6. **Tidak ada breadcrumb** — user bingung posisi di mana dalam hierarki
7. **Page layout** — sidebar border-r terlalu plain, butuh elevation/shadow

## File yang Diubah (8 file)

1. `TreeSidebar.tsx` — redesign sidebar dengan rounded container, better header, keyboard nav
2. `TreeNodeItem.tsx` — proper `<button>` elements, focus rings, better visual hierarchy, aria
3. `EmptyState.tsx` — engaging illustration, better copy, animated
4. `PackagePanel.tsx` — fix semua WCAG issues, better card design, accessible buttons
5. `ChildPackagePanel.tsx` — same fixes
6. `PackageTypePanel.tsx` — same fixes
7. `TestPanel.tsx` — same fixes
8. `SubTestPanel.tsx` — same fixes
9. `page.tsx` — better layout with rounded container, breadcrumb support

## Pola Perbaikan (Diterapkan ke Semua Panel)

### Kontras & Ukuran Font
- `text-[10px]` → `text-xs` (12px)
- `text-[9px]` → `text-xs` (12px)
- `text-gray-400` label → `text-slate-500` (rasio 4.6:1)
- `text-gray-300` → `text-slate-400` minimum
- Badge: pastikan kontras 3:1 minimum (WCAG 1.4.11 non-text)

### Tombol Aksi
- `opacity-0 group-hover:opacity-100` → selalu visible dengan `text-slate-400`
- Tambah `aria-label="Edit {name}"` dan `aria-label="Hapus {name}"`
- Tambah `focus-visible:ring-2 focus-visible:ring-offset-2`

### Toggle Status
- Tambah `role="switch"` dan `aria-checked={formActive}`
- Tambah `aria-label="Status aktif"`

### Tree Node
- `<div onClick>` → `<button>` dengan proper focus management
- Collapsible trigger: proper `aria-expanded`
- Tambah `aria-label` yang descriptive

### Search Input
- Tambah `aria-label="Cari..."` atau `<label>` tersembunyi

### Design Upgrade (Match Dashboard Style)
- Sidebar: `rounded-2xl` container, subtle shadow, gradient header
- Panel: `rounded-[2rem]` cards, better spacing, `font-black` headings
- Stats: bigger cards, `rounded-2xl`, subtle gradient bg
- List items: `rounded-2xl`, better hover states, always-visible actions
- Empty state: gradient icon bg, animated entrance
- Overall: match `font-black`, `tracking-tight` dari dashboard
