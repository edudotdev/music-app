import { usePlayerStore } from '@/store/playerStore'
import { TRACK } from '@/types'
import { MusicNotesPlus } from 'phosphor-react'
import React, { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useActionInfoStore } from '@/store/actionInfoStore'

interface BtnPlayLastProps {
  song: TRACK,
  className: string
}

export const BtnPlayLast = ({
  song,
  className
}:BtnPlayLastProps) => {
  const { setTextInfo } = useActionInfoStore()
  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const handleAddQueue = () => {
    tracks.push(song)
    setTextInfo({
      text:`Added to last in queue`,
      active: true
    })
  }
  
  return (
    <button onClick={handleAddQueue} className={className}>
      <span>Play last</span>
    </button>
  )
}
