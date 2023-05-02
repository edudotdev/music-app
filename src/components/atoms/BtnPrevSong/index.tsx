import { Tooltip } from '@/components/molecules'
import { usePlayerIndexStore } from '@/store/playerStore'
import { SkipBack } from 'phosphor-react'
import React from 'react'
import { shallow } from 'zustand/shallow'

interface BtnPrevSongProps {
  audioRef: React.RefObject<HTMLAudioElement>
  setActive: (active: boolean) => void
}

export const BtnPrevSong = ({
  audioRef,
  setActive
}:BtnPrevSongProps) => {

  const { index } = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)

  const { setIndex } = usePlayerIndexStore()

  const prevSong = () =>  {
    audioRef?.current && (
      audioRef.current.currentTime < 3 && index !== 0
        ? (setIndex(index - 1), setActive(true), audioRef.current.play())
        : (audioRef.current.currentTime = 0)
    )
  }

  return (
    <button onClick={prevSong} className='p-2 opacity-75 hover:opacity-100'>
      <Tooltip text="Previous">
        <SkipBack size={20} color="#fff" weight="fill" />
      </Tooltip>                  
    </button>
  )
}
