import { MusicNotesSimple } from 'phosphor-react'
import React from 'react'
import { TRACK } from '@/types'

interface ThumbnailPlaylistProps {
  songs: TRACK[]
}

export const ThumbnailPlaylist = ({
  songs
}:ThumbnailPlaylistProps) => {
  return (
    <>
      {songs.length === 0 && 
        <div className='relative grid place-content-center h-full rounded-xl bg-neutral-900/30 border-2 border-neutral-700 border-opacity-70'>
          <MusicNotesSimple size={70} color="#ccc" weight="fill" />
        </div>
      }
      {songs.length < 4 && songs.length !== 0 &&
        <div className='h-full w-full'>
          {songs.slice(0, 1).map((song:TRACK, index:number) => (
            <img src={song.image} key={index} height={400} width={400} alt={song.title} />
          ))}
        </div>
      }
      {
        songs.length >= 4 && 
        <div className='grid grid-cols-2 h-full '>
        {songs.slice(0,4).map((song:TRACK, index:number) => (
          <img src={song.image} key={index} height={250} width={250} alt={song.title} />
        ))}
      </div>
      }
    </>
  )
}
