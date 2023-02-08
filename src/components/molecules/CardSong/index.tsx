import Image from 'next/image'
import { Play } from "phosphor-react";
import { usePlayerStore } from '@/store/playerStore'
import { BtnLike } from '@/components/atoms'
import { useEffect } from 'react';
import { TRACK } from '@/types'

interface CardSongProps {
  song: TRACK
}

export const CardSong = ({
  song: {id, music, title, artist, image}
}:CardSongProps) => {

  const {setTrack} = usePlayerStore()

  const handlePlay = () => {
    setTrack({
      id,
      music,
      title,
      artist,
      image
    })
  }

  useEffect(() => {

  },[])

  return (
    <div className='relative rounded-xl overflow-hidden group max-w-[375px]'>
      <BtnLike song={{id,music,title, artist,image}} className='absolute z-10 right-2 -top-12 bg-neutral-900/90 rounded-full group-hover:top-2 transition-[top] duration-150'  />
      <div onClick={handlePlay} className='relative cursor-pointer overflow-hidden active:scale-95 transition-transform'>
        <Image src={image} width={375} height={375} className='' alt={title} />
        <div className='h-[78px] relative overflow-hidden rounded-b-xl'>
          <Image src={image} width={375} height={375} className='absolute h-[900px] saturate-150 -bottom-9 blur-2xl' quality={1} alt={title} />
        </div>
        <div className='absolute bottom-0 p-4 bg-neutral-800 bg-opacity-25 w-full left-1/2 -translate-x-1/2 h-20 backdrop-blur-md'>
          <p className='text-white/90 font-bold text-lg truncate'>{title}</p>
          <p className='text-white/75 text-sm font-semibold truncate'>{artist}</p>
        </div>
      </div>
    </div>
  )
}
