import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TRACK, PLAYLIST } from '@/types'
import { BtnOptionsPlaylist } from '@/components/atoms'

interface CardPlaylistProps {
  playlist: PLAYLIST
}

export const CardPlaylist = ({
  playlist
}:CardPlaylistProps) => {
  const [showMenu, setShowMenu] = useState(false)


  return (
    <div key={playlist.uuid} className='relative flex flex-col w-auto aspect-square group' onMouseLeave={() => setShowMenu(false)}>
      <BtnOptionsPlaylist showMenu={showMenu} setShowMenu={setShowMenu} className='bottom-12 right-2 opacity-0 group-hover:opacity-100 transition-opacity' />
      <div className='h-full rounded-xl overflow-hidden border-2 border-neutral-700 border-opacity-70'>
        <Link href={`/playlist/${playlist.uuid}`} className='active:scale-[.99]'>
          <div className='grid grid-cols-2 h-full '>
            {playlist.song.slice(0,4).map((song:TRACK, index:number) => (
              <Image src={song.image} key={index} height={200} width={200} alt={song.title} quality={80} className='' />
            ))}
          </div>
        </Link>
      </div>
      <h2 className='text-white p-2'>{playlist.name}</h2>
    </div>
  )
}
