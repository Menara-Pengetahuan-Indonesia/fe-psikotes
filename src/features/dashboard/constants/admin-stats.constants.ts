import { FileText, Users, Zap, TrendingUp } from 'lucide-react';

export const ADMIN_STATS = [
  {
    label: 'Total Tes',
    value: 24,
    icon: FileText,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  {
    label: 'Total Peserta',
    value: 156,
    icon: Users,
    color: 'teal',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    badge: '+12%',
  },
  {
    label: 'Tes Aktif',
    value: 8,
    icon: Zap,
    color: 'violet',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    label: 'Completion Rate',
    value: 87,
    icon: TrendingUp,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    suffix: '%',
  },
] as const;
