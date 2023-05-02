import { create } from "zustand"
import { PLAYLIST } from "@/types"

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