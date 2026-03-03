'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
  confirmText?: string
  cancelText?: string
  isDangerous?: boolean
}

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  isPending = false,
  confirmText = 'Hapus',
  cancelText = 'Batal',
  isDangerous = true,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            variant={isDangerous ? 'destructive' : 'default'}
          >
            {isPending ? 'Menghapus...' : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
