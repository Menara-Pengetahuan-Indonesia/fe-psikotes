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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Navbar />
          <main className="relative z-10 bg-[#F3F8EC] rounded-b-[80px] lg:rounded-b-[120px] overflow-hidden min-h-[150vh] mb-[400px]">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
