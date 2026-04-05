'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useIndicators,
  useCreateIndicatorMapping,
  useDeleteIndicatorMapping,
} from '../../hooks'
import type { QuestionOption } from '../../types'

interface OptionMapperProps {
  testId: string
  questionId: string
  option: QuestionOption
}

export function OptionMapper({
  testId,
  option,
}: OptionMapperProps) {
  const { data: indicators, isLoading } = useIndicators(testId)
  const createMapping = useCreateIndicatorMapping()
  const deleteMapping = useDeleteIndicatorMapping()
  const [scoreValues, setScoreValues] = useState<Record<string, number>>({})

  if (isLoading) {
    return <Skeleton className="h-32" />
  }

  const existingMappings = option.mappings || []

  const handleAddMapping = (indicatorId: string) => {
    const scoreValue = scoreValues[indicatorId] || 0
    createMapping.mutate({
      testId,
      optionId: option.id,
      dto: {
        indicatorId,
        scoreValue,
      },
    })
  }

  const handleDeleteMapping = (mappingId: string) => {
    deleteMapping.mutate({
      testId,
      mappingId,
    })
  }

  return (
    <Card className="p-4 space-y-3">
      <h4 className="font-semibold text-sm">
        Pemetaan Indikator: {option.text}
      </h4>

      <div className="space-y-2">
        {indicators?.map((indicator) => {
          const existingMapping = existingMappings.find(
            (m) => m.indicatorId === indicator.id,
          )

          return (
            <div key={indicator.id} className="flex items-center gap-2">
              <span className="text-sm flex-1">{indicator.name}</span>

              {existingMapping ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {existingMapping.scoreValue}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleDeleteMapping(existingMapping.id)
                    }
                    disabled={deleteMapping.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Skor"
                    className="w-16"
                    value={scoreValues[indicator.id] || ''}
                    onChange={(e) =>
                      setScoreValues({
                        ...scoreValues,
                        [indicator.id]: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() => handleAddMapping(indicator.id)}
                    disabled={createMapping.isPending}
                  >
                    Tambah
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
