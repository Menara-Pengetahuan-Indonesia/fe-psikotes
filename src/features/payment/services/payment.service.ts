import { api } from '@/lib/axios'

interface CreatePaymentResponse {
  status: string
  orderId?: string
  snapToken?: string
  snapUrl?: string
  message?: string
}

interface PaymentStatusResponse {
  id: string
  status: string
  amount: number
  paidAt?: string
}

export const paymentService = {
  createPayment: async (packageTypeId: string): Promise<CreatePaymentResponse> => {
    const { data } = await api.post('/payment/create', { packageTypeId })
    return data.data
  },

  getPaymentStatus: async (orderId: string): Promise<PaymentStatusResponse> => {
    const { data } = await api.get(`/payment/status/${orderId}`)
    return data.data
  },

  getMyPayments: async () => {
    const { data } = await api.get('/payment/my-payments')
    return data.data
  },
}
