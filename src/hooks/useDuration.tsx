import React, { useState } from 'react'

export const useDuration = () => {
  const [duration, setDuration] = useState(0)
  
  const handleDuration = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    const newDuration = target.duration;
    setDuration(newDuration);
  }

  return {duration, handleDuration}
}
