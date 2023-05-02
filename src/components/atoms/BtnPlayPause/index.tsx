import React from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { shallow } from 'zustand/shallow'
import { Tooltip } from '@/components/molecules'
import { Pause, Play } from 'phosphor-react'

interface BtnPlayPauseProps {
  audioRef: React.RefObject<HTMLAudioElement>
  active: boolean
  setActive: (active: boolean) => void
}

export const BtnPlayPause = ({
  audioRef,
  setActive,
  active
}:BtnPlayPauseProps) => {

  const { tracks } = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const handlePlayPause = () =>  {
    if (tracks[0].music.length === 0) return
    setActive(!active)
    audioRef?.current && (active ? audioRef.current.pause() : audioRef.current.play())
  }

  return (
    <button onClick={handlePlayPause} className='p-2 rounded-full bg-white hover:scale-[1.08] transition-transform'>
      {active &&  <Tooltip text="Play"><Pause size={20} color="#0f0f0f" weight="fill" /></Tooltip>}
      {!active && <Tooltip text="Pause"><Play size={20} color="#0f0f0f" weight="fill" /></Tooltip>}
    </button>
  )
}
