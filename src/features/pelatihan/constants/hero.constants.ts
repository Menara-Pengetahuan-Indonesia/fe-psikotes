import { Users, Clock, Award, Globe } from 'lucide-react'

export const PELATIHAN_HERO_BENEFITS = [
  {
    label: 'Expert Mentors',
    desc: 'Mentor berpengalaman di bidangnya',
    icon: Users,
  },
  {
    label: 'Flexible Learning',
    desc: 'Belajar kapan saja, di mana saja',
    icon: Clock,
  },
  {
    label: 'Certified',
    desc: 'Sertifikat resmi setiap program',
    icon: Award,
  },
  {
    label: 'Community',
    desc: 'Bergabung dengan komunitas learner',
    icon: Globe,
  },
]

export const PELATIHAN_TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  webinar: ['Webinar'],
  kelas: ['Kelas'],
  mentoring: ['Mentoring'],
}
