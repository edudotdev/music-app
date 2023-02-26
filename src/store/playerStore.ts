import {create} from 'zustand'
import { TRACK } from '@/types'

interface PlayerState {
  tracks: TRACK[]
  setTrack: (value: TRACK[]) => void
}

interface PlayerIndexState {
  index: number
  setIndex: (value: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  tracks: [{
    id: '',
    music: '',
    image: '',
    title: '',
    artist: ''
  }],
  setTrack: (track:TRACK[]) => set(() => ({
    tracks: track,
  }))
}))

export const usePlayerIndexStore = create<PlayerIndexState>((set) => ({
  index: 0,
  setIndex: (index:number) => set(() => ({
    index: index,
  }))
}))

