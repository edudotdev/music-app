import { useEffect, useRef, useState } from "react"

import { shallow } from 'zustand/shallow'
import { useStatusRepeat } from "@/store/repeatStore"
import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'

import { BtnQueue, BtnRepeat, ControlVolume, ControlTime, BtnStatusShuffle, BtnPrevSong, BtnNextSong, BtnPlayPause } from '@/components/atoms'
import { CurrentMusic } from "@/components/molecules"

import { useCurrentTime } from "@/hooks/useCurrentTime"
import { useDuration } from "@/hooks/useDuration"

export const PlayerMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [active, setActive] = useState(false)

  const { tracks } = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const hasMusic = tracks[0].id.length !== 0

  const { index } = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)

  const { setIndex } = usePlayerIndexStore()

  const { statusRepeat } = useStatusRepeat((state) => ({
    statusRepeat: state.statusRepeat
  }), shallow)
  
  const {music, image, title, artist, id} = tracks[index]

  useEffect(() => {
    if (hasMusic) {
      audioRef.current?.play()
      setActive(true)
      if (audioRef.current?.readyState === 4) {
        audioRef.current.play()
          .catch(error => console.log(error));
      }
    }
  }, [index, tracks])

  useEffect(() => {
    if (hasMusic) {
      audioRef?.current?.play()
      setActive(true)
    }
    if (audioRef?.current) audioRef.current.currentTime = 0
  }, [tracks])

  const nextSong = () => setIndex(index < tracks.length - 1 ? index + 1 : 0)
 
  const handleEnd = () =>  {
    if (statusRepeat === 'inactive') {
      if (audioRef?.current) setActive(false);
      return (tracks.length === (index + 1)) ? null : nextSong();
    }
    if (statusRepeat === 'repeat') {
      return (tracks.length === (index + 1)) ? setIndex(0) : (audioRef?.current && setActive(false), nextSong());
    }
    if (audioRef?.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  const { currentTime, setCurrentTime, handleTimeUpdate } = useCurrentTime()
  
  const { duration, handleDuration } = useDuration()

  return (
    <div className='relative flex justify-between w-full z-[9999] mx-auto h-[70px]'>
      <CurrentMusic image={image} title={title} artist={artist} id={id} />
      <div className="grid w-full h-full place-items-center">
        <div className="relative w-full max-w-2xl flex flex-col gap-2.5 items-center justify-center">
          <div className="flex gap-4 order-2 md:order-none">
            <BtnStatusShuffle />
            <BtnPrevSong audioRef={audioRef} setActive={setActive} />
            <BtnPlayPause audioRef={audioRef} setActive={setActive} active={active} />
            <BtnNextSong nextSong={nextSong} />
            <BtnRepeat />
          </div>
          <div className="relative flex w-full items-center order-1 md:order-none">
            <audio ref={audioRef} onEnded={handleEnd} onLoadedMetadata={handleDuration} onTimeUpdate={handleTimeUpdate} src={music} />
            <ControlTime duration={duration} audioRef={audioRef} active={active} currentTime={currentTime} setCurrentTime={setCurrentTime} />
          </div>
        </div>
      </div>
      <div className='absolute right-1.5 -top-[45px] md:-top-[53px] lg:static flex gap-1 justify-end items-center min-w-[280px]'>
        <BtnQueue />
        <ControlVolume audioRef={audioRef} />
      </div>
    </div>
  )
};
        
export default PlayerMusic;