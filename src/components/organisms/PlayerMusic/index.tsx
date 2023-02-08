import { MusicNotes } from "phosphor-react"
import Image from 'next/image'
import { shallow } from 'zustand/shallow'
import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef } from "react"

export const PlayerMusic = () => {
  const inputRef = useRef<HTMLAudioElement>(null)

  const {track} = usePlayerStore((state) => ({
    track: state.track
  }), shallow)

  const {music, image, title, artist} = track

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.volume = 0.3
    }
    inputRef?.current?.play()
  }, [track])

  return (
    <div className='flex w-full z-[9999] max-w-screen-2xl mx-auto'>
      <div className='bg-neutral-800 ml-4 rounded-lg w-[150px] min-w-[150px] aspect-square grid place-content-center'>
        {image.length > 0 
          ? <Image src={image} width={150} height={150} alt={title} className="rounded-lg aspect-square" />          
          : <MusicNotes size={65} color="#aaa" weight="fill" />
        }
      </div>
      <div className='w-full flex flex-col justify-between'>
        <div className='mt-2'>
          <h2 className='text-neutral-100 text-xl pl-4 font-semibold'>{title}</h2>
          <h3 className='text-neutral-400 pl-4'>{artist}</h3>
        </div>
        <audio ref={inputRef} controls className='w-full mx-auto relative -bottom-2' src={music} />
      </div>
    </div>
  )
};
        
export default PlayerMusic;