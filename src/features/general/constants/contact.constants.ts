import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react'

export const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@bermoela.com',
    desc: 'Respon dalam 1x24 jam kerja',
    href: 'mailto:info@bermoela.com',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+62 812-3456-7890',
    desc: 'Senin - Jumat, 09:00 - 17:00',
    href: 'tel:+6281234567890',
  },
  {
    icon: MapPin,
    title: 'Kantor',
    value: 'Jakarta, Indonesia',
    desc: 'Kunjungan dengan janji temu',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: 'Sen - Jum, 09:00 - 17:00',
    desc: 'Layanan online 24/7',
    href: '#',
  },
]
