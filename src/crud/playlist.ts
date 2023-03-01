import { v4 as uuidv4 } from 'uuid'
import localForage from 'localforage'
import { TRACK, PLAYLIST } from '@/types'


export const newPlaylist = (name:string, song: any[]) => {
  localForage.getItem('playlists')
    .then((result:any) => {
      if(result === null) result = []
      result.unshift(
        {
          uuid: uuidv4(),
          name: name,
          song: song
        }
      )
      localForage.setItem('playlists', result)
    })
}

export const addSong = async (uuid: string, song: TRACK) => {
  await localForage.getItem('playlists')
    .then((result:any) => {
      result.map((playlist:any) => {
        if(playlist.uuid === uuid) {
          playlist.song.push(song)
        }
      })

      localForage.setItem('playlists', result)
    })
  
}
  


export const remove = async (uuid: string) => {
  await localForage.getItem('playlists').then((result:any) => {
    if (result === null) result = []
    result = result.filter((playlist: PLAYLIST) => playlist.uuid !== uuid)
    localForage.setItem('playlists', result)
  })
}

export const edit = () => {
  
}


const obj = {
  playlist: [
    {
      uuid: {
          
      }
    }
  ]
}