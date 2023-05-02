import Image from 'next/image'
import { BtnLike, BtnOptionsSong, BtnPlay } from '@/components/atoms'
import { useState } from 'react';
import { TRACK } from '@/types'

interface CardSongProps {
  songs: TRACK[]
  position: number
}

export const CardSong = ({
  songs,
  position
}:CardSongProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const {id,music,title, artist,image} = songs[position]

  return (
    <div className='relative group' onMouseLeave={() => setShowMenu(false)}>
      <BtnLike song={{id,music,title, artist,image}} className='absolute z-10 opacity-0 group-hover:opacity-100 right-2 top-2 transition-all'  />
      <BtnPlay songs={songs} position={position} className='absolute z-10 md:opacity-0 bg-green-500 p-2.5 md:p-4 rounded-full shadow-xl bottom-[64px] left-2 group-hover:opacity-100 transition-opacity' showText={false} />
      <BtnOptionsSong songs={songs} position={position} setShowMenu={setShowMenu} showMenu={showMenu} className='opacity-0 group-hover:opacity-100 transition-all' />
      <div className='relative rounded-xl overflow-hidden'>
        <Image src={image} width={400} height={400} className='w-full' alt={title} />
        <div className='h-14 relative overflow-hidden rounded-b-xl'>
          <Image src={image} width={400} height={400} className='absolute h-[900px] saturate-150 -bottom-9 blur-2xl' quality={1} alt={title} />
        </div>
        <div className='absolute bottom-0 px-4 py-2.5 flex flex-col justify-between bg-neutral-800 bg-opacity-25 w-full left-1/2 -translate-x-1/2 h-14 backdrop-blur-md'>
          <p className='text-white/90 font-bold text-sm truncate'>{title}</p>
          <p className='text-white/75 text-xs font-semibold truncate'>{artist}</p>
        </div>
      </div>
    </div>
  )
}
