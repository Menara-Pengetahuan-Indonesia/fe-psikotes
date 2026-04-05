'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { WEEKLY_PARTICIPANTS_DATA } from '../constants/admin-chart.constants'

const chartData = WEEKLY_PARTICIPANTS_DATA.map((d) => ({ name: d.week, peserta: d.count }))

export function AdminChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPeserta" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,.08)', fontWeight: 700, fontSize: 12 }}
          labelStyle={{ fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}
        />
        <Area type="monotone" dataKey="peserta" stroke="#6366F1" strokeWidth={3} fill="url(#colorPeserta)" dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#6366F1', strokeWidth: 3, stroke: '#fff' }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
