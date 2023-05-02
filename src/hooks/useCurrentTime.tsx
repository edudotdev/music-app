import React, { useState } from 'react'

export const useCurrentTime = () => {

  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    const newCurrentTime = target.currentTime;
    setCurrentTime(newCurrentTime);
  };
  return { currentTime, setCurrentTime, handleTimeUpdate }
}
