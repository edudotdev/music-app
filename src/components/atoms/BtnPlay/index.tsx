import { TRACK } from '@/types'
import React from 'react'
import { usePlayerIndexStore, usePlayerStore} from '@/store/playerStore'
import { Play } from 'phosphor-react'

interface BtnPlayProps {
  className?: string
  songs: TRACK[]
}

export const BtnPlay = ({
  className,
  songs
}:BtnPlayProps) => {
  const {setTrack} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const handleClick = () => {
    if(songs.length === 0) return
    setIndex(0)
    setTrack(songs)
  }

  return (
    <button onClick={handleClick} className={className}>
      <Play size={16} color="#fff" weight="fill" />
      Play
    </button>
  )
}
