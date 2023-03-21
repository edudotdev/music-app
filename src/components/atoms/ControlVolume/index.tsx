import { SpeakerX, SpeakerNone, SpeakerLow, SpeakerHigh } from 'phosphor-react';
import React, { RefObject, useEffect, useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface ControlVolumeProps {
  audioRef: RefObject<HTMLAudioElement>
}

export const ControlVolume = ({
  audioRef
}:ControlVolumeProps) => {
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    const savedVolume = localStorage.getItem('volume');

    if (savedVolume !== null) {
      const volume = parseFloat(savedVolume);
      audioRef.current!.volume = volume
      setVolume(volume)
    }
  }, [audioRef])

  useEffect(() => {
     if (audioRef?.current) audioRef.current.volume = volume
  }, [volume, audioRef])
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    localStorage.setItem('volume', volume.toString())
    setVolume(newVolume)
  }

  const handleMute = () => {
    {volume === 0? setVolume(.50) : setVolume(0)}
  }

  return (
    <div className='flex gap-2 items-center'>
      <button onClick={handleMute} className='opacity-75 hover:opacity-100'>
        {volume === 0 && <SpeakerX size={20} color="#fff" weight="fill" />}
        {(volume > 0 && volume <= 0.5) && <SpeakerLow size={20} color="#fff" weight="fill" />}
        {(volume > 0.5 && volume <= 1) && <SpeakerHigh size={20} color="#fff" weight="fill" />}
      </button>
      <Slider.Root className="SliderRoot w-[120px]" value={[volume]} defaultValue={[volume]} step={0.01} min={0} max={1} onValueChange={handleVolumeChange} >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" />
      </Slider.Root>
    </div>  
  )
}
