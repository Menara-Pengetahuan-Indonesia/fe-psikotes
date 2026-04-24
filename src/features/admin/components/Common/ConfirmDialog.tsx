'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2 } from 'lucide-react'

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
      <DialogContent className="max-w-[360px] p-0 border-0 rounded-[1.5rem] bg-white shadow-2xl">
        <div className="px-6 pt-8 pb-2 flex flex-col items-center text-center">
          <div className={`size-14 rounded-2xl flex items-center justify-center mb-4 ${isDangerous ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-500'}`}>
            {isDangerous ? <Trash2 className="size-7" /> : <AlertTriangle className="size-7" />}
          </div>
          <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400 font-medium mt-2 leading-relaxed">
            {description}
          </DialogDescription>
        </div>

        <div className="px-6 pb-6 pt-4 flex items-center gap-3">
          <Button
            variant="ghost"
            className="flex-1 h-11 rounded-xl font-black text-sm text-slate-500 hover:bg-slate-50"
            onClick={onCancel}
            disabled={isPending}
          >
            {cancelText}
          </Button>
          <Button
            className={`flex-1 h-11 rounded-xl font-black text-sm shadow-md transition-all active:scale-95 ${
              isDangerous
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
