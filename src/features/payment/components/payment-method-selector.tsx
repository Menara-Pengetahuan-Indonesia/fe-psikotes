'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { PAYMENT_CATEGORIES } from '../constants'

interface PaymentMethodSelectorProps {
  selectedPayment: string | null
  onSelect: (id: string) => void
}

export function PaymentMethodSelector({ selectedPayment, onSelect }: PaymentMethodSelectorProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('ewallet')

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-4">
      {PAYMENT_CATEGORIES.map((cat) => {
        const isExpanded = expandedCategory === cat.id
        const Icon = cat.icon

        return (
          <div
            key={cat.id}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
              isExpanded ? 'border-black shadow-md' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full p-6 flex items-start text-left justify-between"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">{cat.title}</h3>
                  <p className="text-[11px] md:text-xs text-slate-500">{cat.description}</p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {/* Expandable method list */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 border-t border-slate-50">
                <div className="space-y-3 pt-4">
                  {cat.methods.map((opt) => {
                    const isSelected = selectedPayment === opt.id

                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_option"
                            value={opt.id}
                            className="sr-only"
                            onChange={() => onSelect(opt.id)}
                            checked={isSelected}
                          />
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="font-bold text-sm tracking-wide">{opt.name}</span>
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${
                            isSelected ? 'text-slate-400' : 'text-slate-300'
                          }`}
                        >
                          {opt.logo}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
