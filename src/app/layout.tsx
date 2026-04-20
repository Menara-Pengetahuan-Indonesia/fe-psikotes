import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { QueryProvider } from "@/shared/components/query-provider"
import { Navbar } from "@/shared/components/layout/navbar"
import { Footer } from "@/shared/components/layout/footer"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
})

export const metadata: Metadata = {
  title: "Bermoela — Life School",
  description: "Platform Psikotes & Asesmen Profesional",
  icons: {
    icon: "/logo/logo_bermoela.png",
  },
}

import { Toaster } from "@/components/ui/sonner"
import { MainContainer } from "@/shared/components/layout/main-container"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} antialiased bg-background`}>
        <QueryProvider>
          <Navbar />
          <MainContainer>
            {children}
          </MainContainer>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
