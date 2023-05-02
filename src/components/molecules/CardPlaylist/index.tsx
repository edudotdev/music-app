import Link from 'next/link'
import { PLAYLIST } from '@/types'
import { BtnPlay, BtnOptionsPlaylist } from '@/components/atoms'
import { ThumbnailPlaylist } from '@/components/molecules'
import { useState } from 'react'

interface CardPlaylistProps {
  playlist: PLAYLIST
}

export const CardPlaylist = ({
  playlist
}:CardPlaylistProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div key={playlist.uuid} className='relative flex flex-col w-auto aspect-square group md:hover:opacity-90' onMouseLeave={() => setShowMenu(false)}>
      <BtnPlay songs={playlist.song} className='absolute bg-green-500 p-2.5 sm:p-4 rounded-full shadow-xl bottom-14 left-4 md:opacity-0 group-hover:opacity-100 transition-opacity' showText={false} />
      <BtnOptionsPlaylist playlist={playlist} showMenu={showMenu} setShowMenu={setShowMenu} className='absolute bottom-14 right-4 md:opacity-0 group-hover:opacity-100 transition-opacity' />
      <div className='h-full rounded-md md:rounded-xl overflow-hidden border-2 border-neutral-700 border-opacity-70'>
        <Link href={`/playlist/${playlist.uuid}`} className='active:scale-[.99]'>
          <ThumbnailPlaylist songs={playlist.song} />
        </Link>
      </div>
      <h2 className='text-white p-2'>{playlist.name}</h2>
    </div>
  )
}
