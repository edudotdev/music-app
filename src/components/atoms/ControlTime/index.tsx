import { RefObject, useEffect, useState } from 'react'

interface ControlTimeProps {
  active: boolean
  duration: number
  audioRef: RefObject<HTMLAudioElement>
  currentTime: any
  setCurrentTime: any
}

export const ControlTime = ({
  active,
  duration,
  audioRef,
  currentTime,
  setCurrentTime
}:ControlTimeProps) => { 

  const handleSeek = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const newCurrentTime = parseFloat(target.value);
    setCurrentTime(newCurrentTime);

    if(audioRef.current) audioRef.current.currentTime = newCurrentTime
  }

  const MS = {
    SECOND: 1000,
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
  } as const

  const secondsToMinutes = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60; 

  
    return `${minutes}:${seconds < 10? (`0${Math.floor(seconds)}`) : Math.floor(seconds)}`
  }

  return (
    <div className='flex gap-3'>
      <p className='text-white'>{secondsToMinutes(currentTime)}</p>
      <input
        type="range"
        value={currentTime}
        max={duration}
        onChange={handleSeek}
        className='w-full'
        disabled={Boolean(!active)}
      />
      <p className='text-white'>{secondsToMinutes(duration)}</p>
    </div>
  )
}
