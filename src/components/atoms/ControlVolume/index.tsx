import { SpeakerX, SpeakerNone, SpeakerLow, SpeakerHigh } from 'phosphor-react';
import React, { RefObject, useEffect, useState } from 'react'

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
      console.log(volume)
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef?.current) audioRef.current.volume = volume;
    console.log(volume)
  }, [volume])
  
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    localStorage.setItem('volume', volume.toString())
    setVolume(newVolume)
  }

  return (
    <div className='flex gap-2 items-center'>
      <button onClick={() => setVolume(0)}>
        {volume === 0 && <SpeakerX size={20} color="#fff" weight="fill" />}
        {(volume > 0 && volume <= 0.5) && <SpeakerLow size={20} color="#fff" weight="fill" />}
        {(volume > 0.5 && volume <= 1) && <SpeakerHigh size={20} color="#fff" weight="fill" />}
      </button>
      <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
    </div>  
  )
}
