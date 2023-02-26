import Image from 'next/image'
import { Play } from "phosphor-react";
import { usePlayerStore } from '@/store/playerStore'
import { BtnLike } from '@/components/atoms'
import { useEffect } from 'react';
import { TRACK } from '@/types'


interface CardTopSongProps {
  index: number
  song: TRACK
}

export const CardTopSong = ({
  index,
  song: {id, music, title, artist, image}
}:CardTopSongProps) => {
  const {setTrack} = usePlayerStore()

  const handlePlay = () => {
    setTrack([{
      id,
      music,
      title,
      artist,
      image
    }])
  }
  
  return (
    <div className='relative rounded-xl overflow-hidden hover:bg-neutral-800/70 group'>
      <div  className='relative flex items-center py-4 px-6 justify-between gap-10'>
        <div className='flex gap-8 items-center'>
          <span className='text-white/90 text-lg w-5'>{index+1 < 10? ('0'+(index+1)): index+1}</span>
          <Image src={image} width={80} height={80} className='rounded-lg aspect-square' alt={title} />
          <p className='text-white font-bold text-lg truncate w-[200px] max-w-[200px]'>{title}</p>
        </div>
        <p className='text-white/60 text-sm font-semibold truncate w-[160px] max-w-[160px]'>{artist}</p>
        <BtnLike song={{id,music,title, artist,image}} className='relative'  />
        <button onClick={handlePlay} className='bg-blue-500 rounded-full p-2.5 bottom-4 right-3'>
          <Play size={20} color="#fff" weight="fill" />
        </button> 
      </div>
    </div>
  )
}
