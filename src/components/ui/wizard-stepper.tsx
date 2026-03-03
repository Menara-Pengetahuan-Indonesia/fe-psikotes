'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  label: string
  completed: boolean
}

interface WizardStepperProps {
  steps: Step[]
  activeStep: number
  onStepClick: (index: number) => void
}

export function WizardStepper({ steps, activeStep, onStepClick }: WizardStepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1 last:flex-none">
          <button
            type="button"
            onClick={() => onStepClick(index)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2',
                index === activeStep && 'border-primary bg-primary text-primary-foreground',
                step.completed && index !== activeStep && 'border-green-500 bg-green-500 text-white',
                !step.completed && index !== activeStep && 'border-muted-foreground/30 text-muted-foreground',
              )}
            >
              {step.completed && index !== activeStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                'text-xs font-medium hidden sm:block max-w-[80px] text-center',
                index === activeStep && 'text-primary',
                step.completed && index !== activeStep && 'text-green-600',
                !step.completed && index !== activeStep && 'text-muted-foreground',
              )}
            >
              {step.label}
            </span>
          </button>

          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-2',
                step.completed ? 'bg-green-500' : 'bg-muted-foreground/20',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
