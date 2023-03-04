import { MusicNoteSimple, SkipBack, SkipForward, Play, Pause, Queue } from "phosphor-react"
import Image from 'next/image'
import { shallow } from 'zustand/shallow'
import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef, useState } from "react"
import { MusicIndicator, BtnQueue, ControlVolume, ControlTime } from '@/components/atoms'

export const PlayerMusic = () => {
  const inputRef = useRef<HTMLAudioElement>(null)
  const [active, setActive] = useState(false)

  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const {index} = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)
  
  // if (inputRef?.current) inputRef.current.volume = 0.3

  const {setIndex} = usePlayerIndexStore()
  const {music, image, title, artist} = tracks[index]

  useEffect(() => {
    if (tracks[0].id.length !== 0) {
      inputRef?.current?.play()
      setActive(true)
    }
  }, [index, tracks])

  useEffect(() => {
    if (tracks[0].id.length !== 0) {
      inputRef?.current?.play()
      setActive(true)
    }
    if (inputRef?.current) inputRef.current.currentTime = 0;
  }, [tracks])


  const handleEnd = () =>  {
    if (inputRef?.current) setActive(false)
    nextSong()
  }

  const handlePlayPause = () =>  {
    if (tracks[0].music.length === 0) return
    if (active) {  
      setActive(false)
      inputRef?.current?.pause()
    } else {
      setActive(true) 
      inputRef?.current?.play()
    }
  }

  const nextSong = () =>  {
    if(index < tracks.length-1) {
      setIndex(index+1)
      setActive(true)
      inputRef?.current?.play()
      
      if (inputRef?.current) {
        inputRef.current.currentTime = 0;
      }
    }
  }

  const prevSong = () =>  {
    if(index !== 0) {
      setIndex(index-1)
      setActive(true) 
      inputRef?.current?.play()

      if (inputRef?.current) inputRef.current.currentTime = 0;
    }
  }
  const [currentTime, setCurrentTime] = useState(0);


  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    const newCurrentTime = target.currentTime;
    setCurrentTime(newCurrentTime);
  };

  const [duration, setDuration] = useState(0)


  const handleDuration = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    const newDuration = target.duration;
    setDuration(newDuration);
  };


  return (
    <div className='flex justify-between w-full z-[9999] mx-auto min-h-[85px]'>
      <div className="flex min-w-[280px]">
        <div className='bg-neutral-800 rounded-lg w-[85px] min-w-85px] aspect-square grid place-content-center'>
          {image.length > 0 
            ? <Image src={image} width={85} height={85} alt={title} className="rounded-lg aspect-square" />          
            : <MusicNoteSimple size={45} color="#aaa" weight="fill" />
          }
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <div className='flex flex-col gap-1.5'>
            <h2 className='text-neutral-100 text-sm font-semibold'>{title}</h2>
            <h3 className='text-neutral-400 text-xs'>{artist}</h3>
          </div>
        </div>
      </div>
      <div className='relative w-full grid'>
        <div className="grid w-full h-full place-items-center">
          <div className="relative w-full max-w-2xl flex flex-col gap-2 items-center justify-center overflow-hidden">
            <div className="flex gap-2.5">
              {Boolean(tracks.length) && 
                <button onClick={prevSong} className='p-2 opacity-75 hover:opacity-100'>
                  <SkipBack size={24} color="#fff" weight="fill" />
                </button>}
              <button onClick={() => handlePlayPause()} className='p-2.5 rounded-full bg-white'>
                {active && <Pause size={26} color="#0f0f0f" weight="fill" />}
                {!active && <Play size={26} color="#0f0f0f" weight="fill" />}
              </button>
              {Boolean(tracks.length) && 
                <button onClick={nextSong} className='p-2 opacity-75 hover:opacity-100'>
                  <SkipForward size={24} color="#fff" weight="fill" />
                </button>}
            </div>
            <div className="flex w-full items-center">
              <div className="relative w-full">
                <audio ref={inputRef} onEnded={handleEnd} onLoadedMetadata={handleDuration} onTimeUpdate={handleTimeUpdate} className='w-full -translate-y-[13px]' src={music} />
                <ControlTime duration={duration} audioRef={inputRef} active={active} currentTime={currentTime} setCurrentTime={setCurrentTime} />
              </div>
              <div className="grid place-items-center right-0 -bottom-1 bg-[#0f0f0f] w-10 h-9">
                <MusicIndicator active={active} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end min-w-[280px]">
        <ControlVolume audioRef={inputRef} />
        <BtnQueue />
      </div>
    </div>
  )
};
        
export default PlayerMusic;