import { create } from 'zustand'
import { REPEAT } from '@/types'


interface statusRepeatStore {
  statusRepeat: REPEAT
  setStatusRepeat: (value: REPEAT) => void
}

export const useStatusRepeat = create<statusRepeatStore>((set) => ({
  statusRepeat: 'inactive',
  setStatusRepeat: (value: REPEAT) => set(() => ({
    statusRepeat: value
  }))
}))