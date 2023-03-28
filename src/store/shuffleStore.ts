import { create } from 'zustand'

interface statusShuffleStore {
  statusShuffle: boolean
  setStatusShuffle: (value: boolean) => void
}

export const useStatusShuffle = create<statusShuffleStore>((set) => ({
  statusShuffle: false,
  setStatusShuffle: (value: boolean) => set(() => ({
    statusShuffle: value
  }))
}))