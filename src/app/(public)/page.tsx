import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const pillars = [
  { title: 'Psikotes', description: 'Tes psikologi untuk evaluasi potensi dan kepribadian', href: '/psikotes' },
  { title: 'Konseling & Coaching', description: 'Layanan konseling dan coaching profesional', href: '/konseling' },
  { title: 'Training & Program', description: 'Program pelatihan dan pengembangan diri', href: '/training' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Psikotest Platform</h1>
          <nav className="flex gap-2">
            <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
            <Button asChild><Link href="/register">Daftar</Link></Button>
          </nav>
        </div>
      </header>
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Layanan Kami</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.href}>
              <CardHeader><CardTitle>{pillar.title}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{pillar.description}</p>
                <Button asChild className="w-full"><Link href={pillar.href}>Selengkapnya</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
