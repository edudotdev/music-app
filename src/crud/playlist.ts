import { v4 as uuidv4 } from 'uuid'
import localForage from 'localforage'
import { TRACK } from '@/types'


export const newPlaylist = async (name:string, song: TRACK) => {
  await localForage.getItem('playlists')
    .then((result:any) => {
      if(result === null) localForage.setItem('playlists', [])
    })

  await localForage.getItem('playlists')
    .then((result:any) => {

      result.push(
        {
          uuid: uuidv4(),
          name: name,
          song: [song]
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
  


export const remove = () => {
  
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