'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useTest } from '../../hooks'
import { TestForm } from './TestForm'
import { IndicatorList } from '../IndicatorManagement/IndicatorList'
import { SectionList } from '../SectionManagement/SectionList'
import { QuestionList } from '../QuestionManagement/QuestionList'
import { ScoringRuleList } from '../ScoringRuleManagement/ScoringRuleList'
import { PublishTab } from './PublishTab'

interface TestDetailProps {
  testId: string
}

export function TestDetail({ testId }: TestDetailProps) {
  const { data: test, isLoading } = useTest(testId)
  const [isEditing, setIsEditing] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!test) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Tes tidak ditemukan</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/admin/tests">Kembali ke Daftar Tes</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/tests">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{test.name}</h1>
            <Badge variant={test.isPublished ? 'default' : 'secondary'}>
              {test.isPublished ? 'Dipublikasikan' : 'Draft'}
            </Badge>
          </div>
          {test.description && (
            <p className="text-muted-foreground mt-1">{test.description}</p>
          )}
        </div>
      </div>

      <Tabs defaultValue="ringkasan" className="w-full">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
          <TabsTrigger value="indikator">Indikator</TabsTrigger>
          <TabsTrigger value="seksi">Seksi</TabsTrigger>
          <TabsTrigger value="pertanyaan">Pertanyaan</TabsTrigger>
          <TabsTrigger value="aturan-skor">Aturan Skor</TabsTrigger>
          <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="ringkasan" className="mt-6">
          {isEditing ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold">Edit Tes</h2>
              </div>
              <TestForm
                initialData={test}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Durasi</p>
                  <p className="text-2xl font-bold">{test.duration} menit</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Waktu per Soal</p>
                  <p className="text-2xl font-bold">
                    {test.timePerQuestion
                      ? `${test.timePerQuestion} detik`
                      : 'Tidak dibatasi'}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-2xl font-bold">
                    {test.isPublished ? 'Dipublikasikan' : 'Draft'}
                  </p>
                </Card>
              </div>

              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Pengaturan</p>
                <div className="flex gap-3">
                  <Badge variant={test.shuffleQuestions ? 'default' : 'outline'}>
                    {test.shuffleQuestions
                      ? 'Soal Diacak'
                      : 'Soal Tidak Diacak'}
                  </Badge>
                  <Badge variant={test.shuffleOptions ? 'default' : 'outline'}>
                    {test.shuffleOptions
                      ? 'Opsi Diacak'
                      : 'Opsi Tidak Diacak'}
                  </Badge>
                </div>
              </Card>

              {test.description && (
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Deskripsi
                  </p>
                  <p className="text-sm">{test.description}</p>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="indikator" className="mt-6">
          <IndicatorList testId={testId} />
        </TabsContent>

        <TabsContent value="seksi" className="mt-6">
          <SectionList testId={testId} />
        </TabsContent>

        <TabsContent value="pertanyaan" className="mt-6">
          <QuestionList testId={testId} />
        </TabsContent>

        <TabsContent value="aturan-skor" className="mt-6">
          <ScoringRuleList testId={testId} />
        </TabsContent>

        <TabsContent value="publikasi" className="mt-6">
          <PublishTab testId={testId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
