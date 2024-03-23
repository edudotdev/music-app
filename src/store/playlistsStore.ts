import { create } from "zustand"
import { PLAYLIST, TRACK } from "@/types"

interface playlistsStore {
  playlists: PLAYLIST[]
  setPlaylists: (playlist: PLAYLIST[]) => void
}

export const usePlaylistsStore = create<playlistsStore>((set) => ({
  playlists: [],
  setPlaylists: (playlist: PLAYLIST[]) => set(() => ({
    playlists: playlist,
  }))
}))

interface modalPlaylist {
  showModal: boolean
  setShowModal: (value: boolean) => void
  song: TRACK
  setSong: (value: TRACK) => void
}

export const useModalPlaylist = create<modalPlaylist>((set) => ({
  showModal: false,
  setShowModal: (value: boolean) => set(() => ({
    showModal: value
  })),
  song: {
    id: '',
    music: '',
    image: '',
    title: '',
    artist: '',
  },
  setSong: (value: TRACK) => set(() => ({
    song: value
  }))
}))