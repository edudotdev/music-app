import { getPlaylists } from '@/services/playlists'
import { useEffect } from 'react'
import { usePlaylistsStore } from '@/store/playlistsStore'
import {shallow} from 'zustand/shallow'

export const usePlaylists = () => {
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }), shallow)

  const { setPlaylists } = usePlaylistsStore()

  const handlePlaylists = async () => {
    const data = await getPlaylists()
    setPlaylists(data)
  }

  useEffect(() => {
    handlePlaylists()
  }, [])

  return { playlists, setPlaylists }
}
