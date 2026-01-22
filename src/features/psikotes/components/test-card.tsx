'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Test } from '../types'

interface TestCardProps {
  test: Test
  onStart?: (id: string) => void
}

export function TestCard({ test, onStart }: TestCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{test.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{test.description}</p>
        <div className="flex gap-4 text-sm">
          <span>{test.duration} menit</span>
          <span>{test.questionCount} soal</span>
        </div>
        {onStart && (
          <Button onClick={() => onStart(test.id)} className="w-full">
            Mulai Tes
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
