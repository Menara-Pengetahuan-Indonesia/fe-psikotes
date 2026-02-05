import type { LucideIcon } from 'lucide-react'

export interface PaymentMethod {
  id: string
  name: string
  logo: string
}

export interface PaymentCategory {
  id: string
  title: string
  description: string
  icon: LucideIcon
  methods: PaymentMethod[]
}

export interface OrderDetails {
  orderId: string
  productName: string
  price: number
  status: string
  method: string
  methodName: string
}

export interface ProductPrice {
  name: string
  price: number
}
