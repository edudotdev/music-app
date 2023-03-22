import { MusicNoteSimple, SkipBack, SkipForward, Play, Pause, Queue, ArrowsOutSimple, ShuffleAngular } from "phosphor-react"
import Image from 'next/image'
import { shallow } from 'zustand/shallow'
import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef, useState } from "react"
import { BtnQueue, BtnRepeat, ControlVolume, ControlTime } from '@/components/atoms'
import { useStatusRepeat } from "@/store/repeatStore"
import { Tooltip } from "@/components/molecules"

export const PlayerMusic = () => {
  const inputRef = useRef<HTMLAudioElement>(null)
  const [active, setActive] = useState(false)

  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const {index} = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)
  const { setIndex } = usePlayerIndexStore()

  const { statusRepeat } = useStatusRepeat((state) => ({
    statusRepeat: state.statusRepeat
  }), shallow)
  
  const {music, image, title, artist} = tracks[index]

  useEffect(() => {
    if (tracks[0].id.length !== 0) {
      inputRef.current?.play()
      setActive(true)
      if (inputRef.current?.readyState === 4) {
        inputRef.current.play()
          .catch(error => console.log(error));
      }
    }
  }, [index, tracks])

  useEffect(() => {
    if (tracks[0].id.length !== 0) {
      inputRef?.current?.play()
      setActive(true)
    }
    if (inputRef?.current) inputRef.current.currentTime = 0
  }, [tracks])

  const handleEnd = () =>  {
    if(statusRepeat === 'inactive') {
      if (inputRef?.current) setActive(false)
      nextSong()
    } else if(statusRepeat === 'repeat') {
      if(tracks.length === (index + 1)) {
        setIndex(0)
      } else {
        if (inputRef?.current) setActive(false)
        nextSong()
      }
    } else {
      if (inputRef?.current) {
        inputRef.current.currentTime = 0
        inputRef.current.play()
      }
    }
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

    } else {
      setIndex(0)
    }
  }

  const prevSong = () =>  {
    if (inputRef?.current) {
      if(inputRef.current.currentTime < 3 && index !== 0) {
        setIndex(index-1)
        setActive(true) 
        inputRef.current.play()
      } else (inputRef.current.currentTime = 0)
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
  }

  return (
    <div className='flex justify-between w-full z-[9999] mx-auto h-[70px]'>
      <div className="flex min-w-[280px] items-center" >
        <div className='bg-neutral-800 w-[60px] h-[60px] aspect-square grid place-content-center'>
          {image.length > 0 
            ? <Image src={image} width={60} height={60} alt={title} className="rounded-md aspect-square" />          
            : <MusicNoteSimple size={30} color="#aaa" weight="fill" />
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
          <div className="relative w-full max-w-2xl flex flex-col gap-2.5 items-center justify-center">
            <div className="flex gap-4">
              <button disabled={true} className='cursor-not-allowed'>
                <Tooltip text="Shuffle">
                  <ShuffleAngular size={20} color="#ccc" weight="bold" />
                </Tooltip>   
              </button>               

              <button onClick={prevSong} className='p-2 opacity-75 hover:opacity-100'>
                <Tooltip text="Previous">
                  <SkipBack size={20} color="#fff" weight="fill" />
                </Tooltip>                  
              </button>
              <button onClick={() => handlePlayPause()} className='p-2 rounded-full bg-white hover:scale-[1.08] transition-transform'>
                {active &&  <Tooltip text="Play"><Pause size={20} color="#0f0f0f" weight="fill" /></Tooltip>}
                {!active && <Tooltip text="Pause"><Play size={20} color="#0f0f0f" weight="fill" /></Tooltip>}
              </button>
              <button onClick={nextSong} className='p-2 opacity-75 hover:opacity-100'>
                <Tooltip text="Next">
                  <SkipForward size={20} color="#fff" weight="fill" />
                </Tooltip>  
              </button>
              <BtnRepeat />
            </div>
            <div className="flex w-full items-center">
              <div className="relative w-full">
                <audio ref={inputRef} onEnded={handleEnd} onLoadedMetadata={handleDuration} onTimeUpdate={handleTimeUpdate} className='w-full -translate-y-[13px]' src={music} />
                <ControlTime duration={duration} audioRef={inputRef} active={active} currentTime={currentTime} setCurrentTime={setCurrentTime} />
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="flex gap-1 justify-end items-center min-w-[280px]">
        <BtnQueue />
        <ControlVolume audioRef={inputRef} />
        <button disabled={true} className='cursor-not-allowed'>
          <Tooltip text="Full screen">
            <ArrowsOutSimple size={24} color="#fff" weight="fill" className="opacity-75 hover:opacity-100 ml-1" />
          </Tooltip>
        </button>
      </div>
    </div>
  )
};
        
export default PlayerMusic;