import { create } from 'zustand'

export const useGameStore = create((set) => ({
  health: 100,
  icor: 0,
  phase: 1, // 1: Body Blood, 2: Quimera, 3: Faraó
  weapon: 'khopesh_broken',
  inventory: [],
  setHealth: (amount) => set((state) => ({ health: Math.max(0, Math.min(100, state.health + amount)) })),
  addIcor: (amount) => set((state) => ({ icor: Math.min(100, state.icor + amount) })),
}))
