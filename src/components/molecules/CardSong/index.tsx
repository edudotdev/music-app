import { BtnLike, BtnOptionsSong, BtnPlay } from '@/components/atoms'
import { useState } from 'react';
import { TRACK } from '@/types'
import Link from 'next/link';

interface CardSongProps {
  songs: TRACK[]
  position: number
}

export const CardSong = ({
  songs,
  position
}:CardSongProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const { id, music, title, artist, image } = songs[position]

  return (
    <div className='relative group/play flex items-center gap-1 hover:bg-neutral-600/40 odd:bg-neutral-700/30 px-2'>
      <BtnLike song={{id, music, title, artist, image}} className='!bg-transparent' />
      <div className='relative rounded-md overflow-hidden'>
        <img src={image} width={45} height={45} className='' alt={title} />
        <BtnPlay songs={songs} position={position} className='absolute grid place-content-center z-10 bg-black/40 p-2.5 inset-0 opacity-0 group-hover/play:opacity-100' showText={false} />
      </div>
      <Link href={`/track/${id}`} className='group/text'>
        <div className='bottom-0 px-2 py-2.5 flex flex-col justify-between'>
          <p className='text-white/90 font-bold text-sm truncate group-hover/text:underline'>{title}</p>
          <p className='text-white/75 text-xs font-semibold truncate'>{artist}</p>
        </div>
      </Link>
      <BtnOptionsSong songs={songs} position={position} setShowMenu={setShowMenu} showMenu={showMenu} className='ml-auto mr-1' />
    </div>
  )
}
