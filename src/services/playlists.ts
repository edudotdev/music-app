import { PLAYLIST } from "@/types"
import localForage from "localforage"

export const getPlaylists = async () => {
  const playlist = await localForage.getItem('playlists').then((result:any) => {
    if (result === null) result = []
    return result
  })

  return playlist
}

export const getPlaylistByUUID = async (uuid: string) => {
  const playlist = await localForage.getItem('playlists').then((result: any) => {
    if (result === null) result = []
    const playlist = result.find((playlist: PLAYLIST) => playlist.uuid === uuid)
    return playlist
  })
  
  return playlist
}