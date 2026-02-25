'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, CameraOff, AlertCircle } from 'lucide-react'

interface CameraProctoringProps {
  isEnabled: boolean
  onToggle: () => void
}

export function CameraProctoring({ isEnabled, onToggle }: CameraProctoringProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isEnabled) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
          setError(null)
        }
      } catch (err) {
        setHasPermission(false)
        setError('Tidak dapat mengakses kamera. Periksa izin browser Anda.')
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [isEnabled])

  if (!isEnabled) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
      >
        <CameraOff className="w-4 h-4" />
        <span className="text-sm font-medium">Aktifkan Kamera</span>
      </button>
    )
  }

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-slate-900">Kamera Aktif</span>
          </div>
          <button
            onClick={onToggle}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            <CameraOff className="w-4 h-4" />
          </button>
        </div>

        {/* Video Feed */}
        <div className="w-48 h-36 bg-slate-900 relative overflow-hidden">
          {hasPermission === false ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50">
              <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
              <p className="text-xs text-red-600 text-center px-2">{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Status */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2">
          <p className="text-xs text-slate-600">
            {hasPermission === true
              ? 'Kamera sedang merekam'
              : 'Menunggu izin kamera...'}
          </p>
        </div>
      </div>
    </div>
  )
}
