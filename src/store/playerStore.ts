import {create} from 'zustand'
import { TRACK } from '@/types'

interface PlayerState {
  track: TRACK
  setTrack: (value: TRACK) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  track: {
    id: '',
    music: '',
    image: '',
    title: '',
    artist: ''
  },
  setTrack: (track:TRACK) => set(() => ({
    track: {
      id: track.id,
      music: track.music,
      image: track.image,
      title: track.title,
      artist: track.artist
    },
  }))
}))

