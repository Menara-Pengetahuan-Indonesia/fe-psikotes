# fe-psikotes

Aplikasi tes psikologi (psikotes) online berbasis web dengan tiga pilar layanan: **Psikotes**, **Konseling**, dan **Training**.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4, Radix UI
- **State**: Zustand, TanStack React Query
- **Form**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript (strict mode)

## Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x (atau pnpm/yarn)

## Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd fe-psikotes
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` sesuai kebutuhan:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_ENV=development
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**

   Akses [http://localhost:3000](http://localhost:3000)

## Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Cek kode dengan ESLint |
| `npm run test` | Jalankan unit tests (Vitest) |
| `npm run test:ui` | Jalankan tests dengan UI |
| `npm run test:coverage` | Jalankan tests dengan coverage report |
| `npm run type-check` | Cek TypeScript errors |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (autentikasi)/      # Login, Register
│   ├── (public)/           # Psikotes, Konseling, Training
│   └── (dasbor)/           # Dashboard (User, Company, Admin)
├── components/ui/          # Reusable UI components
├── features/               # Feature modules
│   ├── auth/               # Authentication
│   ├── psikotes/           # Psikotes feature
│   ├── konseling/          # Konseling feature
│   ├── training/           # Training feature
│   └── dashboard/          # Dashboard feature
├── shared/                 # Shared components & types
├── store/                  # Zustand stores
├── lib/                    # Utilities (axios, utils, env)
└── styles/                 # Global styles & pillar colors
```

## Pillar Color System

Aplikasi menggunakan sistem warna berbasis 3 pilar:

| Pilar | Warna | CSS Prefix | Kesan |
|-------|-------|------------|-------|
| Psikotes | Biru | `ps-` | Profesional, Terpercaya |
| Konseling | Hijau | `ks-` | Tenang, Healing |
| Training | Orange | `tr-` | Energik, Motivasi |

Contoh penggunaan:
```tsx
<div className="bg-ps-primary text-white">Psikotes</div>
<div className="bg-ks-primary text-white">Konseling</div>
<div className="bg-tr-primary text-white">Training</div>
```

## Development

### Before Commit

Pastikan semua check pass:

```bash
npm run type-check  # TypeScript check
npm run lint        # ESLint check
npm run test        # Unit tests
```

### Branch Naming

```
feat/nama-fitur     # Fitur baru
fix/nama-bug        # Bug fix
refactor/nama       # Refactoring
```

### Commit Message

```
feat: add login form
fix: resolve auth redirect issue
refactor: extract test card component
```

## Documentation

- [Coding Guidelines](./CODING_GUIDELINES.md) - Panduan penulisan kode

## License

Private - All rights reserved
