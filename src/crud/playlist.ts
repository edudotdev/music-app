import { v4 as uuidv4 } from 'uuid'
import localForage from 'localforage'
import { TRACK, PLAYLIST } from '@/types'

export const newPlaylist = async (name:string, song: TRACK[] | any[]) => {
  const result = localForage.getItem('playlists')
    .then((result: PLAYLIST[] | any) => {
      if(result === null) result = []
      result.unshift(
        {
          uuid: uuidv4(),
          name: name,
          song: song
        }
      )
      localForage.setItem('playlists', result)
      return result
    })
    return result
}

export const addSong = (uuid: string, song: TRACK) => {
  localForage.getItem('playlists')
    .then((result: PLAYLIST[] | any) => {
      result.map((playlist: PLAYLIST[] | any) => {
        if(playlist.uuid === uuid) {
          playlist.song.push(song)
        }
      })
      localForage.setItem('playlists', result)
    })
}

export const removeSong = async (playlistUuid: string, songId: string) => {
  const result = await localForage.getItem('playlists')
    .then((result: PLAYLIST[] | any) => {
      if (!result) return;

      const updatedPlaylists = result.map((playlist: PLAYLIST) => {
        if (playlist.uuid === playlistUuid) {
          playlist.song = playlist.song.filter(song => song.id !== songId);
        }
        return playlist;
      });

      localForage.setItem('playlists', updatedPlaylists);
      return result
    })
    .catch(error => {
      console.error('Error removing song:', error);
    });

    return result
};

export const deletePlaylist = async (uuid: string) => {
  const result = await localForage.getItem('playlists')
    .then((result: PLAYLIST[] | any) => {
      if (result === null) result = []
      result = result.filter((playlist: PLAYLIST) => playlist.uuid !== uuid)
      localForage.setItem('playlists', result)
      return result
  })

  return result
}

export const editNamePlaylist = (uuid: string, name: string) => {
  
}