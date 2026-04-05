'use client'

import { useEffect } from 'react'

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Hide root navbar and footer during exam
    const navbar = document.querySelector('[data-navbar]')
    const footer = document.querySelector('[data-footer]')
    const mainContainer = document.querySelector('[data-main-container]')

    if (navbar) (navbar as HTMLElement).style.display = 'none'
    if (footer) (footer as HTMLElement).style.display = 'none'
    if (mainContainer) {
      (mainContainer as HTMLElement).style.padding = '0'
      ;(mainContainer as HTMLElement).style.maxWidth = 'none'
    }

    return () => {
      if (navbar) (navbar as HTMLElement).style.display = ''
      if (footer) (footer as HTMLElement).style.display = ''
      if (mainContainer) {
        (mainContainer as HTMLElement).style.padding = ''
        ;(mainContainer as HTMLElement).style.maxWidth = ''
      }
    }
  }, [])

  return <>{children}</>
}
