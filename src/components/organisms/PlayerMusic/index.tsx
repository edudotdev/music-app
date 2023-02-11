import { MusicNotes } from "phosphor-react"
import Image from 'next/image'
import { shallow } from 'zustand/shallow'
import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef, useState } from "react"
import { MusicIndicator } from '@/components/atoms'


export const PlayerMusic = () => {
  const inputRef = useRef<HTMLAudioElement>(null)
  const [active, setActive] = useState(false) 
  const [active, setActive] = useState(false) 

  const {track} = usePlayerStore((state) => ({
    track: state.track
  }), shallow)

  const {music, image, title, artist} = track

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.volume = 0.3
    }
    
    
    inputRef?.current?.play()

    if(!inputRef.current?.paused){  
      setActive(!inputRef.current?.paused)
    }


    if(!inputRef.current?.paused){  
      setActive(!inputRef.current?.paused)
    }

  }, [track])
 
  const handleEnd = () =>  {
    if (inputRef?.current) {
      inputRef.current.currentTime = 0;
      setActive(false)
    }
  }

  const handlePause = () =>  {
    setActive(false)
  }

  const handlePlay = () =>  {
    setActive(true)
  }

  return (
    <div className='flex w-full z-[9999] max-w-screen-2xl mx-auto'>
      <div className='bg-neutral-800 ml-4 rounded-lg w-[150px] min-w-[150px] aspect-square grid place-content-center'>
        {image.length > 0 
          ? <Image src={image} width={150} height={150} alt={title} className="rounded-lg aspect-square" />          
          : <MusicNotes size={65} color="#aaa" weight="fill" />
        }
      </div>
      <div className='relative w-full flex flex-col justify-between'>
        <div className="px-4 pt-2 flex justify-between">
          <div className='flex flex-col gap-1.5'>
            <h2 className='text-neutral-100 text-xl font-semibold'>{title}</h2>
            <h3 className='text-neutral-400'>{artist}</h3>
          </div>
        </div>
        <div className="relative pr-2">
          <audio ref={inputRef} onEnded={handleEnd} onPause={handlePause} onPlay={handlePlay} controls className='w-full mx-auto relative -bottom-2' src={music} />
          <div className="absolute grid place-items-center right-2.5 bottom-[4px] bg-[#0f0f0f] w-10 h-8 ">
            <MusicBars active={active} /> 
          </div>
        </div>
        <div className="relative pr-2">
          <audio ref={inputRef} onEnded={handleEnd} onPause={handlePause} onPlay={handlePlay} controls className='w-full mx-auto relative -bottom-2' src={music} />
          <div className="absolute grid place-items-center right-2.5 bottom-[4px] bg-[#0f0f0f] w-10 h-8 ">
            <MusicIndicator active={active} /> 
          </div>
        </div>
      </div>
    </div>
  )
};
        
export default PlayerMusic;