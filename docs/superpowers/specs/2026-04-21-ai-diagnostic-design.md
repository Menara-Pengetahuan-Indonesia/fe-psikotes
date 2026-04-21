# AI Diagnostic — Design Spec
**Date:** 2026-04-21  
**Status:** Approved

---

## Overview

Improve `PsikotesDiagnostic` (embedded di homepage hero section) menjadi conversational AI yang interaktif: 10 bubble suggestion di awal, pertanyaan wajib + opsional berdasarkan konteks, dan rekomendasi produk spesifik dengan link langsung. Hapus `ChatbotWidget` (floating button) sepenuhnya.

---

## Scope

**In scope:**
- Rewrite `PsikotesDiagnostic` component
- Hapus `ChatbotWidget` component dan semua referensinya
- Buat `DiagnosticModule` baru di NestJS backend (repo terpisah)
- Endpoint `POST /diagnostic/chat`

**Out of scope:**
- LLM integration (OpenAI/Claude) — bisa ditambah nanti
- Autentikasi user di diagnostic flow
- Simpan history percakapan ke DB

---

## Frontend: `PsikotesDiagnostic`

### State Machine

```
initial → chatting → result
```

**`initial`** — sebelum user kirim pesan pertama:
- Tampilkan 10 bubble suggestion (klik = langsung terkirim)
- Input teks bebas tetap tersedia
- Tidak ada pesan AI di state ini

**`chatting`** — setelah pesan pertama terkirim:
- Tampilkan riwayat pesan (user + AI)
- Setiap respons AI bisa disertai bubble follow-up (pertanyaan wajib/opsional)
- User bisa klik bubble atau ketik bebas
- Loading indicator saat menunggu respons backend

**`result`** — setelah backend return rekomendasi:
- Tampilkan 1–3 kartu produk spesifik
- Setiap kartu: nama produk, kategori, harga mulai dari, tombol "Lihat →" dengan link langsung
- Input tetap aktif untuk pertanyaan lanjutan
- Tombol "Mulai dari awal" untuk reset

### 10 Bubble Suggestion (State Initial)

| # | Teks | Emoji | Warna |
|---|------|-------|-------|
| 1 | Stres & kelelahan terus-menerus | 😮‍💨 | Biru muda |
| 2 | Bingung soal karir & masa depan | 🧭 | Hijau |
| 3 | Hubungan tidak baik-baik saja | 💔 | Ungu |
| 4 | Tidak percaya diri & rendah diri | 🪞 | Oranye |
| 5 | Ingin tahu kepribadian & potensi diri | 🧠 | Teal |
| 6 | Mempertimbangkan pernikahan | 💍 | Kuning |
| 7 | Rekrut atau kembangkan tim | 🏢 | Abu-abu |
| 8 | Terjebak & tidak tahu harus mulai dari mana | 🌀 | Pink |
| 9 | Persiapkan tes CPNS / BUMN / MT | 📋 | Biru tua |
| 10 | Pahami kondisi mentalku lebih dalam | 🔍 | Violet |

### API Contract (Frontend → Backend)

```typescript
// Request
POST /diagnostic/chat
{
  messages: { role: 'user' | 'assistant', content: string }[]
  context: {
    role?: 'karyawan' | 'mahasiswa' | 'pengusaha' | 'ibu_rumah_tangga' | 'lainnya'
    area?: 'mental_health' | 'karir' | 'relationship' | 'korporat' | 'lainnya'
    intensity?: 'ringan' | 'sedang' | 'berat'
  }
}

// Response
{
  reply: string
  followUpBubbles?: string[]   // bubble opsional untuk pertanyaan lanjutan
  recommendations?: {
    id: string
    name: string
    category: string
    priceFrom: number
    href: string
  }[]
}
```

### Komponen yang Dihapus
- `src/features/psikotes/components/chatbot-widget.tsx` — hapus file
- Semua import dan penggunaan `ChatbotWidget` di layout/page

---

## Backend: `DiagnosticModule` (NestJS)

### Struktur

```
src/diagnostic/
  diagnostic.module.ts
  diagnostic.controller.ts   — POST /diagnostic/chat
  diagnostic.service.ts      — branching logic + product query
  diagnostic.dto.ts          — request/response DTOs
```

### Branching Logic

**Pertanyaan Wajib** (selalu ditanya, urut):

1. **Konteks diri** — "Kamu saat ini sebagai apa?"  
   Bubble: Karyawan · Mahasiswa · Pengusaha · Ibu Rumah Tangga · Lainnya  
   → Menentukan kategori produk (personal, korporat, mahasiswa)

2. **Area masalah** — "Apa yang paling ingin kamu pahami atau selesaikan?"  
   Bubble: Kondisi mental saya · Hubungan saya · Karir & potensi saya · Kebutuhan tim/perusahaan  
   → Routing ke sub-kategori produk

3. **Cerita bebas** — "Ceritakan lebih lanjut..."  
   Input teks + 4 bubble suggestion kontekstual  
   → Analisis keyword untuk rekomendasi spesifik

**Pertanyaan Opsional** (muncul berdasarkan context):

| Kondisi | Pertanyaan | Bubble |
|---------|-----------|--------|
| area = mental_health | "Sudah berapa lama kamu merasakan ini?" | Baru beberapa hari · Beberapa minggu · Sudah berbulan-bulan |
| area = relationship | "Kamu sedang dalam hubungan atau belum?" | Sudah menikah · Pacaran · Single · HTS/tidak jelas |
| area = korporat | "Berapa orang yang perlu diasesmen?" | 1–5 orang · 6–20 orang · 20+ orang |
| keyword krisis terdeteksi | "Apakah ini terasa mendesak?" | Ya, sangat mendesak · Tidak terlalu · Saya hanya ingin tahu |

### Rekomendasi Produk per Jalur

| Bubble Awal | Produk yang Direkomendasikan |
|-------------|------------------------------|
| Stres & kelelahan | Asesmen Anxiety & Burnout, Mental Health Lengkap, Konseling Psikolog |
| Bingung karir | Tes Minat Bakat Full Profile, IQ Professional, Asesmen Quarter-Life Crisis |
| Hubungan bermasalah | Red Flag Detection, Rumah Tangga Terancam, Couple Compatibility |
| Tidak percaya diri | Asesmen Self-Worth & Harga Diri, Mental Health Lengkap |
| Kepribadian & potensi | Full Personality Profile, Minat Bakat Full Profile, MBTI |
| Pernikahan | Marriage Readiness, Couple Compatibility, Nikah Tapi Sepi |
| Rekrut tim | Staff Recruitment Assessment, Cultural Fit, Leadership Assessment |
| Terjebak | Asesmen Quarter-Life Crisis, Full Personality Profile, Konseling Psikolog |
| CPNS/BUMN/MT | Try Out CPNS, MT/MDP Assessment, TPA |
| Kondisi mental | Mental Health Lengkap, MMPI-2, Konseling Psikolog |

### Product Query

Backend query produk dari DB secara dinamis — tidak hardcode nama produk. Mapping dilakukan via `category` + `tags` field di tabel produk. Produk baru yang ditambahkan ke DB otomatis masuk ke rekomendasi selama category/tags-nya sesuai.

---

## Urutan Implementasi

1. **Backend** — buat branch baru, buat `DiagnosticModule`, endpoint, branching logic, product query
2. **Frontend** — hapus `ChatbotWidget`, rewrite `PsikotesDiagnostic` dengan 10 bubble + API call
3. **Testing** — test semua 10 jalur bubble, pastikan rekomendasi berbeda per jalur
4. **Deploy** — push backend branch, push frontend ke production

---

## Success Criteria

- [ ] 10 bubble tersedia di state awal, klik langsung terkirim
- [ ] Setiap bubble menghasilkan rekomendasi produk yang berbeda
- [ ] Pertanyaan wajib selalu muncul (konteks diri, area masalah)
- [ ] Pertanyaan opsional hanya muncul jika relevan
- [ ] Rekomendasi menampilkan kartu produk dengan link langsung
- [ ] `ChatbotWidget` tidak ada lagi di codebase
- [ ] Produk baru di DB otomatis masuk rekomendasi tanpa update frontend
