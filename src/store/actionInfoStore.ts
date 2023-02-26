import {create} from 'zustand'
import { TEXTINFO } from '@/types'


interface actionInfoStore {
  textInfo: TEXTINFO
  setTextInfo: (value: TEXTINFO) => void
}

export const useActionInfoStore = create<actionInfoStore>((set) => ({
  textInfo: {
    text: '',
    active: false
  },
  setTextInfo: (value: TEXTINFO) => set(() => ({
    textInfo: value
  }))
}))