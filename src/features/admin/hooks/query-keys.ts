export const adminKeys = {
  all: ['admin'] as const,
  tests: () => [...adminKeys.all, 'tests'] as const,
  test: (id: string) => [...adminKeys.tests(), id] as const,
  indicators: (testId: string) =>
    [...adminKeys.all, 'indicators', testId] as const,
  sections: (testId: string) =>
    [...adminKeys.all, 'sections', testId] as const,
  questions: (testId: string) =>
    [...adminKeys.all, 'questions', testId] as const,
  scoringRules: (testId: string) =>
    [...adminKeys.all, 'scoring-rules', testId] as const,
  packages: () => [...adminKeys.all, 'packages'] as const,
  package: (id: string) => [...adminKeys.packages(), id] as const,
}
