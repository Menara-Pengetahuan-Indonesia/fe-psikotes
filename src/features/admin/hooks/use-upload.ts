'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { uploadService } from '../services'

export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => uploadService.uploadImage(file),
    onSuccess: () => {
      toast.success('Gambar berhasil diunggah')
    },
    onError: () => {
      toast.error('Gagal mengunggah gambar')
    },
  })
}
