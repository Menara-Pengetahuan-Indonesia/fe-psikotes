'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import type { ActivityLogEntry } from '../types'

interface ActivityLogProps {
  entries: ActivityLogEntry[]
  isOpen: boolean
  onToggle: () => void
}

export function ActivityLog({ entries, isOpen, onToggle }: ActivityLogProps) {
  const [displayEntries, setDisplayEntries] = useState<ActivityLogEntry[]>([])

  useEffect(() => {
    setDisplayEntries(entries)
  }, [entries])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
      >
        <Activity className="w-4 h-4" />
        <span className="text-sm font-medium">Log ({displayEntries.length})</span>
      </button>

      {/* Activity Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg border border-slate-200 shadow-xl max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-slate-50 border-b border-slate-200 px-4 py-3">
            <h3 className="font-bold text-slate-900">Activity Log</h3>
          </div>

          <div className="divide-y divide-slate-200">
            {displayEntries.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                Belum ada aktivitas
              </div>
            ) : (
              displayEntries.map((entry, idx) => (
                <div key={idx} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {entry.action}
                      </p>
                      {entry.details && (
                        <p className="text-xs text-slate-600 mt-1">{entry.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {entry.timestamp.toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Soal {entry.questionIndex + 1}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
