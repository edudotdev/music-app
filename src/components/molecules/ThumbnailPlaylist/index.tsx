import { MusicNotesSimple } from 'phosphor-react'
import Image from 'next/image'
import React from 'react'
import { TRACK } from '@/types'

interface ThumbnailPlaylistProps {
  songs: []
}

export const ThumbnailPlaylist = ({
  songs
}:ThumbnailPlaylistProps) => {
  return (
    <>
      {songs.length === 0 && 
        <div className='relative grid place-content-center h-full'>
          <MusicNotesSimple size={70} color="#ccc" weight="fill" />
        </div>
      }
      {songs.length < 4 &&
        <div className='h-full w-full'>
          {songs.slice(0, 1).map((song:TRACK, index:number) => (
            <Image src={song.image} key={index} height={500} width={500} alt={song.title} quality={80} className='' />
          ))}
        </div>
      }
      {
        songs.length >= 4 && 
        <div className='grid grid-cols-2 h-full '>
        {songs.slice(0,4).map((song:TRACK, index:number) => (
          <Image src={song.image} key={index} height={200} width={200} alt={song.title} quality={80} className='' />
        ))}
      </div>
      }
    </>
  )
}
