import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { QueryProvider } from "@/shared/components/query-provider"
import { Navbar } from "@/shared/components/layout/navbar"
import { Footer } from "@/shared/components/layout/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Psikotest Platform",
  description: "Platform Psikotes, Konseling & Coaching, Training & Program",
}

import { MainContainer } from "@/shared/components/layout/main-container"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#faf5e4] min-h-screen`}>
        <QueryProvider>
          <Navbar />
          <MainContainer>
            {children}
          </MainContainer>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
