'use client'

import { useState } from 'react'

import { PaymentMethodSelector, OrderSummary } from '@/features/payment/components'

export function PembayaranLayout() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleContinue = () => {
    setIsProcessing(true)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <PaymentMethodSelector
          selectedPayment={selectedPayment}
          onSelect={setSelectedPayment}
        />
      </div>
      <div className="lg:col-span-1">
        <OrderSummary
          productName="Psikotes Premium"
          productPrice={25000}
          onContinue={handleContinue}
          isProcessing={isProcessing}
          hasPaymentSelected={selectedPayment !== null}
        />
      </div>
    </div>
  )
}
