import { create } from 'zustand'

type Pillar = 'psikotes' | 'konseling' | 'training'

interface ContextState {
  activePillar: Pillar
  setActivePillar: (pillar: Pillar) => void
}

export const useContextStore = create<ContextState>((set) => ({
  activePillar: 'psikotes',
  setActivePillar: (pillar) => set({ activePillar: pillar }),
}))
