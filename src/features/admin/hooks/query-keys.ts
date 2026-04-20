export const adminKeys = {
  packages: {
    all: ['admin', 'packages'] as const,
    detail: (id: string) => ['admin', 'packages', id] as const,
  },
  childPackages: {
    all: ['admin', 'child-packages'] as const,
    detail: (id: string) => ['admin', 'child-packages', id] as const,
  },
  packageTypes: {
    all: ['admin', 'package-types'] as const,
    detail: (id: string) => ['admin', 'package-types', id] as const,
  },
  tests: {
    all: ['admin', 'tests'] as const,
    detail: (id: string) => ['admin', 'tests', id] as const,
  },
  subTests: {
    all: ['admin', 'subtests'] as const,
    detail: (id: string) => ['admin', 'subtests', id] as const,
  },
  questions: {
    all: ['admin', 'questions'] as const,
    detail: (id: string) => ['admin', 'questions', id] as const,
  },
  users: {
    all: ['admin', 'users'] as const,
  },
}
