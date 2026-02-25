'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useTest } from '../../hooks'
import { IndicatorList } from '../IndicatorManagement/IndicatorList'
import { SectionList } from '../SectionManagement/SectionList'
import { QuestionList } from '../QuestionManagement/QuestionList'
import { ScoringRuleList } from '../ScoringRuleManagement/ScoringRuleList'
import { PublishTab } from './PublishTab'

export function TestDetail() {
  const params = useParams<{ testId: string }>()
  const testId = params.testId
  const { data: test, isLoading } = useTest(testId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (!test) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Tes tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{test.name}</h1>
          {test.description && (
            <p className="text-muted-foreground">{test.description}</p>
          )}
        </div>
      </div>

      <Tabs defaultValue="ringkasan" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
          <TabsTrigger value="indikator">Indikator</TabsTrigger>
          <TabsTrigger value="seksi">Seksi</TabsTrigger>
          <TabsTrigger value="pertanyaan">Pertanyaan</TabsTrigger>
          <TabsTrigger value="aturan-skor">Aturan Skor</TabsTrigger>
          <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="ringkasan" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Durasi</p>
              <p className="text-2xl font-bold">{test.duration} menit</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-2xl font-bold">
                {test.isPublished ? 'Dipublikasikan' : 'Draft'}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="indikator">
          <IndicatorList testId={testId} />
        </TabsContent>

        <TabsContent value="seksi">
          <SectionList testId={testId} />
        </TabsContent>

        <TabsContent value="pertanyaan">
          <QuestionList testId={testId} />
        </TabsContent>

        <TabsContent value="aturan-skor">
          <ScoringRuleList testId={testId} />
        </TabsContent>

        <TabsContent value="publikasi">
          <PublishTab testId={testId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
