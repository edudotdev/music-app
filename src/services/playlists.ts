import { PLAYLIST } from "@/types"
import localForage from "localforage"

export const getPlaylists = async () => {
  const data = await localForage.getItem('playlists').then((result:any) => {
    if (result === null) result = []
    return result
  })

  return data
}

export const getPlaylistByUUID = async (uuid: string) => {
  const data = await localForage.getItem('playlists').then((result: any) => {
    if (result === null) result = []
    const playlist = result.find((playlist: PLAYLIST) => playlist.uuid === uuid)
    return playlist
  })
  
  return data
}