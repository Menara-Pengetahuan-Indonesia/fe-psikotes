import type { Metadata } from 'next'

import {
  MembershipHero,
  EcosystemSection,
  GatheringSection,
  PricingSection,
  MembershipFaq,
} from '@/features/membership/components'

export const metadata: Metadata = {
  title: 'Membership — BERMOELA',
  description: 'Bergabung dengan komunitas BERMOELA dan nikmati berbagai keuntungan eksklusif sebagai anggota.',
}

export default function MembershipBenefitPage() {
  return (
    <main>
      <MembershipHero />
      <EcosystemSection />
      <GatheringSection />
      <PricingSection />
      <MembershipFaq />
    </main>
  )
}
