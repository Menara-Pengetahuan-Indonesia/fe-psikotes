'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Printer,
  Download,
  Award,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  Share2,
  Brain
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/shared/components/layout/breadcrumb'
import { DUMMY_TEST_HISTORY } from '@/features/dashboard/constants'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { cn } from '@/lib/utils'

export default function CertificatePage() {
  const params = useParams()
  const id = params.id as string
  const { user } = useAuthStoreHydrated()
  
  const test = DUMMY_TEST_HISTORY.find(t => t.id === id) || DUMMY_TEST_HISTORY[0]

  const breadcrumbItems = [
    { label: 'Riwayat', href: '/pengguna/riwayat' },
    { label: test.name, href: `/pengguna/riwayat/${id}` },
    { label: 'Sertifikat' }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm print:hidden">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl font-bold gap-2 h-11 border-slate-200">
              <Share2 className="size-4 text-slate-400" /> Bagikan
           </Button>
           <Button variant="outline" className="rounded-xl font-bold gap-2 h-11 border-slate-200 bg-white">
              <Download className="size-4 text-primary-600" /> PDF
           </Button>
           <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black gap-2 h-11 px-6 shadow-lg transition-all active:scale-95" onClick={() => window.print()}>
              <Printer className="size-4" /> CETAK SEKARANG
           </Button>
        </div>
      </div>

      {/* CERTIFICATE VIEWER */}
      <div className="flex justify-center items-center py-10 px-4 bg-slate-200/30 rounded-[3rem] border-2 border-dashed border-slate-200 print:p-0 print:bg-white print:border-none">
        
        {/* PHYSICAL CERTIFICATE BOX */}
        <div className="relative w-full max-w-[900px] aspect-[1.414/1] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm p-1 md:p-1.5 border border-slate-300 overflow-hidden print:shadow-none print:border-none print:m-0">
          
          {/* Border Decoration */}
          <div className="absolute inset-4 md:inset-8 border-8 border-double border-primary-600/10 rounded-sm pointer-events-none" />
          <div className="absolute inset-6 md:inset-12 border border-slate-100 pointer-events-none" />

          {/* Main Content Area */}
          <div className="relative h-full w-full bg-[#FCFCF9] p-8 md:p-16 lg:p-20 flex flex-col items-center justify-between text-center overflow-hidden">
            
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2314b8a6\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            {/* Header: Logo */}
            <div className="relative z-10 flex flex-col items-center gap-4">
               <div className="size-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-black/20 transform -rotate-3">
                  <span className="text-2xl font-black italic">B</span>
               </div>
               <div className="space-y-1">
                  <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                    BER<span className="text-primary-600">MOELA</span>
                  </span>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Indonesian Life School</p>
               </div>
            </div>

            {/* Centerpiece: Title & Name */}
            <div className="relative z-10 space-y-10 w-full">
               <div className="space-y-4">
                  <div className="flex items-center justify-center gap-6 text-primary-600/40">
                     <div className="h-px w-16 bg-current" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-600">Certificate of Excellence</span>
                     <div className="h-px w-16 bg-current" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-slate-900 italic tracking-tight font-medium">Achievement Award</h2>
               </div>

               <div className="space-y-4">
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">This is to certify that</p>
                  <h3 className="text-4xl md:text-6xl font-black text-slate-900 border-b-2 border-primary-500/10 pb-4 inline-block px-10">
                    {user?.name || 'Peserta Bermoela'}
                  </h3>
               </div>

               <div className="max-w-2xl mx-auto">
                  <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed">
                    Has successfully completed the assessment for <br />
                    <span className="text-slate-900 font-black tracking-tight underline decoration-primary-500/20 underline-offset-4">{test.name}</span>
                  </p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-6">
                    With a Final Score of <span className="text-primary-600 font-black">{test.score}/100</span> &bull; {test.resultTitle}
                  </p>
               </div>
            </div>

            {/* Footer: Signatures & Validation */}
            <div className="relative z-10 w-full grid grid-cols-3 items-end px-10">
               
               {/* Left: Security Info */}
               <div className="text-left space-y-4">
                  <div className="h-12 flex items-center">
                     <ShieldCheck className="size-10 text-primary-600/10" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Verification ID</p>
                     <p className="text-[10px] font-bold text-slate-900 font-mono">{id?.slice(0,16).toUpperCase()}</p>
                  </div>
               </div>

               {/* Center: Official Stamp */}
               <div className="flex justify-center">
                  <div className="relative size-28 flex items-center justify-center">
                     <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-600/20 animate-spin-slow" />
                     <div className="relative size-20 rounded-full border-4 border-double border-primary-600/60 flex flex-col items-center justify-center p-2 transform -rotate-12 bg-white/80 backdrop-blur-sm shadow-xl">
                        <span className="text-[7px] font-black text-primary-600 uppercase">VERIFIED</span>
                        <Sparkles className="size-5 text-primary-600 my-1" />
                        <span className="text-[7px] font-black text-primary-600 uppercase">OFFICIAL</span>
                     </div>
                  </div>
               </div>

               {/* Right: Signature */}
               <div className="text-right space-y-4">
                  <div className="h-12 flex items-end justify-end italic font-serif text-2xl text-slate-800 pr-4">
                     Bermoela Team
                  </div>
                  <div className="h-px w-full bg-slate-200" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Indonesian Life School</p>
               </div>
            </div>

            {/* Watermark/Decor */}
            <Award className="absolute -left-12 -bottom-12 size-48 text-slate-100 opacity-30 pointer-events-none" />
            <Brain className="absolute -right-12 -top-12 size-48 text-slate-100 opacity-30 pointer-events-none" />

          </div>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="max-w-2xl mx-auto text-center space-y-2 opacity-50 print:hidden">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sertifikat ini sah dan terverifikasi secara digital oleh sistem Bermoela.</p>
      </div>

    </div>
  )
}
