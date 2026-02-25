'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import {
  useTest,
  useQuestions,
  usePublishTest,
  useUnpublishTest,
} from '../../hooks'

interface PublishTabProps {
  testId: string
}

export function PublishTab({ testId }: PublishTabProps) {
  const { data: test } = useTest(testId)
  const { data: questions } = useQuestions(testId)
  const publishTest = usePublishTest()
  const unpublishTest = useUnpublishTest()

  const canPublish = questions && questions.length > 0

  const handlePublish = () => {
    publishTest.mutate(testId)
  }

  const handleUnpublish = () => {
    unpublishTest.mutate(testId)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Status Publikasi</h3>
            <div className="flex items-center gap-2">
              {test?.isPublished ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">
                    Dipublikasikan
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600 font-semibold">Draft</span>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Pertanyaan</p>
              <p className="text-2xl font-bold">{questions?.length || 0}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Durasi</p>
              <p className="text-2xl font-bold">{test?.duration} menit</p>
            </div>
          </div>
        </div>
      </Card>

      {!canPublish && (
        <Card className="p-4 border-yellow-200 bg-yellow-50">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">Tidak dapat dipublikasikan</p>
              <p className="text-sm text-yellow-800">
                Tes harus memiliki minimal 1 pertanyaan sebelum dapat dipublikasikan.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        {test?.isPublished ? (
          <Button
            variant="outline"
            onClick={handleUnpublish}
            disabled={unpublishTest.isPending}
          >
            {unpublishTest.isPending ? 'Membatalkan...' : 'Batalkan Publikasi'}
          </Button>
        ) : (
          <Button
            onClick={handlePublish}
            disabled={!canPublish || publishTest.isPending}
          >
            {publishTest.isPending ? 'Mempublikasikan...' : 'Publikasikan Tes'}
          </Button>
        )}
      </div>
    </div>
  )
}
