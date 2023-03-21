import { TRACK } from '@/types'
import React from 'react'
import { usePlayerIndexStore, usePlayerStore} from '@/store/playerStore'
import { Play } from 'phosphor-react'

interface BtnPlayProps {
  className?: string
  songs: TRACK[]
  position?: number
  showText?: boolean
  showIcon?: boolean
}

export const BtnPlay = ({
  className,
  songs,
  position,
  showText = true,
  showIcon = true
}:BtnPlayProps) => {
  const {setTrack} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const handleClick = () => {
    if(songs.length === 0) return
    setIndex(position || 0)
    setTrack(songs)
  }

  return (
    <button onClick={handleClick} className={className}>
      {showIcon && <Play size={16} color="#fff" weight="fill" />}
      {showText && <span>Play</span>}
    </button>
  )
}
