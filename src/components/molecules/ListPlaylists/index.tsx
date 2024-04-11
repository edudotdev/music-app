import { usePlaylists } from '@/hooks/usePlaylists'
import Link from 'next/link'
import { Playlist } from 'phosphor-react'
import React from 'react'

export const ListPlaylists = () => {
  const { playlists } = usePlaylists()
  
  return (
    <div className='flex flex-col gap-3 mx-5 max-h-[235px] overflow-hidden overflow-y-auto'>
      {playlists.length > 0 &&
        playlists.map((playlist) => ((
          <Link href={`/playlist/${playlist.uuid}`} key={playlist.uuid} className='flex gap-2 text-white text-sm'>
            <Playlist size={20} color={'#fff'} weight="fill" /> {playlist.name}
          </Link>
        )))
      } 
    </div>
  )
}
