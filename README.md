# Bermoela — Platform Psikotes Online

Platform asesmen psikologi online yang menyediakan layanan psikotes, konseling, dan pelatihan.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** TanStack Query, Axios
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest, React Testing Library, Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
npm install
cp .env.example .env.local
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |
| `NEXT_PUBLIC_APP_ENV` | App environment | `development` |

### Development

```bash
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (watch mode) |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run analyze` | Bundle size analysis |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (autentikasi)/      # Auth pages (login, register, forgot-password)
│   ├── (dasbor)/           # Dashboard pages (user & admin)
│   ├── psikotes/           # Psikotes exam pages
│   ├── konseling/          # Konseling pages
│   ├── pelatihan/          # Pelatihan pages
│   ├── about/              # About page
│   ├── blog/               # Blog pages
│   ├── careers/            # Careers page
│   └── contact/            # Contact page
├── features/               # Feature-based modules
│   ├── admin/              # Admin panel (question management, test management)
│   ├── auth/               # Authentication (login, register, forgot-password)
│   ├── dashboard/          # User & admin dashboards
│   ├── general/            # Shared page components
│   ├── homepage/           # Landing page components
│   ├── konseling/          # Konseling feature
│   ├── membership/         # Membership feature
│   ├── payment/            # Payment feature
│   ├── pelatihan/          # Pelatihan feature
│   └── psikotes/           # Psikotes exam feature
├── shared/                 # Shared utilities, hooks, components
├── components/ui/          # shadcn/ui components
├── lib/                    # Axios instance, utilities
├── store/                  # Zustand stores
└── tests/                  # Test files
```

## Architecture

Proyek ini menggunakan **feature-based architecture**:

- Setiap feature memiliki folder sendiri dengan `components/`, `hooks/`, `types/`, `schemas/`, dan `constants/`
- Shared code (layout, hooks, utils) ada di `src/shared/`
- UI primitives dari shadcn/ui ada di `src/components/ui/`
- State management menggunakan Zustand stores di `src/store/`
- API calls menggunakan Axios instance di `src/lib/axios.ts`
