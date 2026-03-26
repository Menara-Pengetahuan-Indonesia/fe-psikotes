'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  label: string
  completed: boolean
  icon?: React.ComponentType<{ className?: string }>
}

interface WizardStepperProps {
  steps: Step[]
  activeStep: number
  onStepClick: (index: number) => void
}

export function WizardStepper({ steps, activeStep, onStepClick }: WizardStepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isActive = index === activeStep
        const isCompleted = step.completed
        const Icon = step.icon

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={cn(
                  'size-10 rounded-xl flex items-center justify-center text-sm font-black transition-all',
                  isCompleted
                    ? 'bg-teal-500 text-white shadow-sm'
                    : isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                )}
              >
                {isCompleted ? (
                  <Check className="size-5" />
                ) : Icon ? (
                  <Icon className="size-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest hidden sm:block max-w-[80px] text-center transition-colors',
                  isCompleted ? 'text-teal-600' : isActive ? 'text-slate-900' : 'text-slate-400'
                )}
              >
                {step.label}
              </span>
            </button>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-3 rounded-full transition-colors duration-500',
                  isCompleted ? 'bg-teal-400' : 'bg-slate-100',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
