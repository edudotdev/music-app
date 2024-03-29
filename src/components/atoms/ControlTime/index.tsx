import { RefObject, useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface ControlTimeProps {
  active: boolean
  duration: number
  audioRef: RefObject<HTMLAudioElement>
  currentTime: number
  setCurrentTime: (value: number) => void
}

export const ControlTime = ({
  active,
  duration,
  audioRef,
  currentTime,
  setCurrentTime
}:ControlTimeProps) => {

  const handleSeek = (value: number[]) => {
    const newCurrentTime = value[0]
    setCurrentTime(newCurrentTime);
    if(audioRef.current) audioRef.current.currentTime = newCurrentTime
  }

  const secondsToMinutes = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; 
    return `${minutes}:${seconds < 10? (`0${Math.floor(seconds)}`) : Math.floor(seconds)}`
  }

  return (
    <div className='absolute -top-5 md:static flex items-center w-full'>
      <p className='text-neutral-200 text-xs w-[45px] hidden md:block'>{secondsToMinutes(currentTime)}</p>
      <Slider.Root className="SliderRoot w-full" value={[currentTime]} defaultValue={[currentTime]} min={0} max={duration} onValueChange={handleSeek}>
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" />
      </Slider.Root>
      <p className='text-neutral-200 text-xs ml-3 hidden md:block'>{secondsToMinutes(duration)}</p>
    </div>
  )
}
