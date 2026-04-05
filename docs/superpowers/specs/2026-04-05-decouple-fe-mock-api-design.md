# Decouple FE dari BE: Mock API Routes

## Masalah

FE di-deploy ke Vercel tanpa BE. Semua halaman admin (CRUD tes, pertanyaan, paket, dll) error karena axios call ke endpoint BE yang tidak ada.

## Solusi

Buat Next.js API routes di `/app/api/` yang mirror semua endpoint BE, return static dummy data. `NEXT_PUBLIC_API_URL` di Vercel kosong (`''`), sehingga axios baseURL jadi relative path — otomatis hit Next.js API routes. Service layer & hooks tidak perlu diubah.

## Yang Sudah Ada (Tidak Diubah)

- `/app/api/auth/login/route.ts` — mock login (4 dummy user: superadmin, admin x2, user)
- `/app/api/auth/logout/route.ts` — mock logout
- `/app/api/auth/refresh/route.ts` — mock token refresh
- Dashboard constants (`DUMMY_TEST_HISTORY`, admin stats, chart data, dll)

## Mock API Routes yang Dibuat

### Shared Mock Data

File: `/app/api/_mock-data.ts`

Berisi semua dummy data yang konsisten:
- 3-4 tests (mix published/draft, berbagai tipe)
- Indicators per test
- Sections per test
- Questions with options & indicator mappings per test
- Scoring rules per test
- 2-3 packages (mix published/draft, dengan test assignments)

### 1. Admin Tests

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/tests` | Array of dummy tests |
| POST | `/api/admin/tests` | Echo body + generated id + timestamps |
| GET | `/api/admin/tests/[testId]` | Single test with nested questions, indicators, sections |
| PATCH | `/api/admin/tests/[testId]` | Echo updated test |
| DELETE | `/api/admin/tests/[testId]` | 204 No Content |
| POST | `/api/admin/tests/[testId]/publish` | Test with `isPublished: true` |
| POST | `/api/admin/tests/[testId]/unpublish` | Test with `isPublished: false` |

### 2. Indicators

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/tests/[testId]/indicators` | Array of indicators |
| POST | `/api/admin/tests/[testId]/indicators` | Echo created indicator |
| PATCH | `/api/admin/tests/[testId]/indicators/[indicatorId]` | Echo updated |
| DELETE | `/api/admin/tests/[testId]/indicators/[indicatorId]` | 204 |

### 3. Sections

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/tests/[testId]/sections` | Array of sections |
| POST | `/api/admin/tests/[testId]/sections` | Echo created section |
| PATCH | `/api/admin/tests/[testId]/sections/[sectionId]` | Echo updated |
| DELETE | `/api/admin/tests/[testId]/sections/[sectionId]` | 204 |

### 4. Questions

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/tests/[testId]/questions` | Array of questions with options & mappings |
| POST | `/api/admin/tests/[testId]/questions` | Echo created question |
| PATCH | `/api/admin/tests/[testId]/questions/[questionId]` | Echo updated |
| DELETE | `/api/admin/tests/[testId]/questions/[questionId]` | 204 |

### 5. Question Options

| Method | Route | Response |
|--------|-------|----------|
| POST | `/api/admin/tests/[testId]/questions/[questionId]/options` | Echo created option |
| PATCH | `/api/admin/tests/[testId]/questions/options/[optionId]` | Echo updated |
| DELETE | `/api/admin/tests/[testId]/questions/options/[optionId]` | 204 |

### 6. Indicator Mappings

| Method | Route | Response |
|--------|-------|----------|
| POST | `/api/admin/tests/[testId]/questions/options/[optionId]/indicator-mapping` | Echo created mapping |
| DELETE | `/api/admin/tests/[testId]/questions/indicator-mapping/[mappingId]` | 204 |

### 7. Scoring Rules

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/tests/[testId]/scoring-rules` | Array of scoring rules |
| POST | `/api/admin/tests/[testId]/scoring-rules` | Echo created |
| PATCH | `/api/admin/tests/[testId]/scoring-rules/[ruleId]` | Echo updated |
| DELETE | `/api/admin/tests/[testId]/scoring-rules/[ruleId]` | 204 |

### 8. Packages

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/admin/packages` | Array of packages |
| POST | `/api/admin/packages` | Echo created |
| GET | `/api/admin/packages/[packageId]` | Single package with tests |
| PATCH | `/api/admin/packages/[packageId]` | Echo updated |
| DELETE | `/api/admin/packages/[packageId]` | 204 |
| POST | `/api/admin/packages/[packageId]/publish` | Package with `isPublished: true` |
| POST | `/api/admin/packages/[packageId]/unpublish` | Package with `isPublished: false` |
| POST | `/api/admin/packages/[packageId]/tests` | Echo added test |
| DELETE | `/api/admin/packages/[packageId]/tests/[testId]` | 204 |

### 9. Upload

| Method | Route | Response |
|--------|-------|----------|
| POST | `/api/admin/upload/image` | `{ url: "/placeholder.jpg", filename: "placeholder.jpg" }` |

### 10. Public Packages

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/packages` | Published packages (filtered from mock data) |
| GET | `/api/packages/[id]` | Single package |

## Behavior

- **GET**: Return static dummy data dari `_mock-data.ts`
- **POST/PATCH**: Echo request body + generated UUID id + timestamps (`createdAt`, `updatedAt`)
- **DELETE**: Return 204 No Content
- **Tidak persist**: Refresh halaman = data balik ke default

## Yang TIDAK Diubah

- Service layer (`features/admin/services/`)
- Hooks (`features/admin/hooks/`)
- Components
- Auth flow & middleware
- Axios config (`lib/axios.ts`)
- Store (`store/auth.store.ts`)

## File Structure

```
src/app/api/
├── _mock-data.ts                          # Shared dummy data
├── auth/                                  # (sudah ada)
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── refresh/route.ts
├── admin/
│   ├── tests/
│   │   ├── route.ts                       # GET all, POST create
│   │   └── [testId]/
│   │       ├── route.ts                   # GET one, PATCH, DELETE
│   │       ├── publish/route.ts           # POST publish
│   │       ├── unpublish/route.ts         # POST unpublish
│   │       ├── indicators/
│   │       │   ├── route.ts               # GET all, POST create
│   │       │   └── [indicatorId]/route.ts # PATCH, DELETE
│   │       ├── sections/
│   │       │   ├── route.ts               # GET all, POST create
│   │       │   └── [sectionId]/route.ts   # PATCH, DELETE
│   │       ├── questions/
│   │       │   ├── route.ts               # GET all, POST create
│   │       │   ├── [questionId]/
│   │       │   │   ├── route.ts           # PATCH, DELETE
│   │       │   │   └── options/route.ts   # POST create option
│   │       │   ├── options/
│   │       │   │   └── [optionId]/
│   │       │   │       ├── route.ts       # PATCH, DELETE option
│   │       │   │       └── indicator-mapping/route.ts  # POST
│   │       │   └── indicator-mapping/
│   │       │       └── [mappingId]/route.ts  # DELETE
│   │       └── scoring-rules/
│   │           ├── route.ts               # GET all, POST create
│   │           └── [ruleId]/route.ts      # PATCH, DELETE
│   ├── packages/
│   │   ├── route.ts                       # GET all, POST create
│   │   └── [packageId]/
│   │       ├── route.ts                   # GET one, PATCH, DELETE
│   │       ├── publish/route.ts
│   │       ├── unpublish/route.ts
│   │       └── tests/
│   │           ├── route.ts               # POST add test
│   │           └── [testId]/route.ts      # DELETE remove test
│   └── upload/
│       └── image/route.ts                 # POST upload
└── packages/
    ├── route.ts                           # GET public packages
    └── [id]/route.ts                      # GET single package
```
