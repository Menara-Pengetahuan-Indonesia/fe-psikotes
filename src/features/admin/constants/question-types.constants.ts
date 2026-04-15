export const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  CHECKBOX: 'Checkbox',
  SCALE_RATING: 'Skala Rating',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_SHORT_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'PG',
  CHECKBOX: 'CB',
  SCALE_RATING: 'Skala',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_COLORS: Record<string, string> = {
  MULTIPLE_CHOICE: 'bg-indigo-50 text-indigo-600',
  CHECKBOX: 'bg-teal-50 text-teal-600',
  SCALE_RATING: 'bg-violet-50 text-violet-600',
  ESSAY: 'bg-amber-50 text-amber-600',
}

export const DISPLAY_STYLE_OPTIONS = [
  { value: 'UPPERCASE', label: 'A B C' },
  { value: 'LOWERCASE', label: 'a b c' },
  { value: 'NUMBER', label: '1 2 3' },
  { value: 'RADIO', label: 'Radio' },
] as const

export const DISPLAY_STYLE_LABELS: Record<string, string> = {
  UPPERCASE: 'A B C',
  LOWERCASE: 'a b c',
  NUMBER: '1 2 3',
  RADIO: 'Radio',
}
