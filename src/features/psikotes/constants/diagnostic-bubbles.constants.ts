export interface DiagnosticBubble {
  id: string
  text: string
  emoji: string
  bgColor: string
  textColor: string
  borderColor: string
}

export const INITIAL_BUBBLES: DiagnosticBubble[] = [
  { id: 'stres', text: 'Stres & kelelahan terus-menerus', emoji: '😮‍💨', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  { id: 'karir', text: 'Bingung soal karir & masa depan', emoji: '🧭', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  { id: 'hubungan', text: 'Hubungan tidak baik-baik saja', emoji: '💔', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  { id: 'percaya-diri', text: 'Tidak percaya diri & rendah diri', emoji: '🪞', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-200' },
  { id: 'kepribadian', text: 'Ingin tahu kepribadian & potensi diri', emoji: '🧠', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-200' },
  { id: 'nikah', text: 'Mempertimbangkan pernikahan', emoji: '💍', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  { id: 'tim', text: 'Rekrut atau kembangkan tim', emoji: '🏢', bgColor: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-200' },
  { id: 'terjebak', text: 'Terjebak & tidak tahu harus mulai dari mana', emoji: '🌀', bgColor: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
  { id: 'cpns', text: 'Persiapkan tes CPNS / BUMN / MT', emoji: '📋', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' },
  { id: 'mental', text: 'Pahami kondisi mentalku lebih dalam', emoji: '🔍', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200' },
]
