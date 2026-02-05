import { Building2, Wallet, Store, CreditCard } from 'lucide-react'

import type { PaymentCategory, ProductPrice } from '../types'

export const PAYMENT_CATEGORIES: PaymentCategory[] = [
  {
    id: 'va',
    title: 'Transfer melalui Virtual Account',
    description: 'Konfirmasi otomatis. Tersedia untuk berbagai bank.',
    icon: Building2,
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', logo: 'BCA' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', logo: 'MANDIRI' },
      { id: 'bni', name: 'BNI Virtual Account', logo: 'BNI' },
      { id: 'bri', name: 'BRIVA', logo: 'BRI' },
    ],
  },
  {
    id: 'ewallet',
    title: 'Dompet Elektronik',
    description: 'Scan QRIS atau potong saldo langsung.',
    icon: Wallet,
    methods: [
      { id: 'gopay', name: 'GoPay', logo: 'GOPAY' },
      { id: 'ovo', name: 'OVO', logo: 'OVO' },
      { id: 'shopeepay', name: 'ShopeePay', logo: 'SHOPEE' },
      { id: 'dana', name: 'DANA', logo: 'DANA' },
    ],
  },
  {
    id: 'retail',
    title: 'Minimarket',
    description: 'Bayar tunai di gerai terdekat.',
    icon: Store,
    methods: [
      { id: 'indomaret', name: 'Indomaret', logo: 'INDOMARET' },
      { id: 'alfamart', name: 'Alfamart', logo: 'ALFAMART' },
    ],
  },
  {
    id: 'cc',
    title: 'Kartu Kredit / Debit',
    description: 'Visa, Mastercard, JCB.',
    icon: CreditCard,
    methods: [{ id: 'cc-input', name: 'Tambah Kartu Baru', logo: 'VISA/MC' }],
  },
]

export const PRODUCT_PRICES: Record<string, ProductPrice> = {
  rekrutmen: { name: 'Psikotes Rekrutmen', price: 150000 },
  'kenaikan-jabatan': { name: 'Kenaikan Jabatan', price: 250000 },
  'perencanaan-karir': { name: 'Perencanaan Karir', price: 200000 },
}

export const SERVICE_FEE = 5000

export const PAYMENT_INSTRUCTIONS: Record<
  string,
  { type: 'qr' | 'va'; content: string; steps: string[] }
> = {
  gopay: {
    type: 'qr',
    content: 'https://example.com/qr-code.png',
    steps: [
      'Buka aplikasi Gojek di HP Anda.',
      'Klik bayar di menu utama.',
      'Scan QR Code yang muncul di layar ini.',
      'Periksa detail transaksi Anda di aplikasi, lalu tap Konfirmasi & Bayar.',
      'Masukkan PIN GoPay Anda.',
      'Transaksi berhasil.',
    ],
  },
  bca: {
    type: 'va',
    content: '8801234567890',
    steps: [
      'Masukkan kartu ATM BCA & PIN.',
      'Pilih menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account.',
      'Masukkan kode Virtual Account di atas.',
      'Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Perus/Produk dan Total Tagihan.',
      'Masukkan Jumlah Transfer sesuai dengan Total Tagihan.',
      'Ikuti instruksi untuk menyelesaikan transaksi.',
    ],
  },
}
