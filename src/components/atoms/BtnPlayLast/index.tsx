import { usePlayerStore } from '@/store/playerStore'
import { TRACK } from '@/types'
import { MusicNotesPlus } from 'phosphor-react'
import React, { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useActionInfoStore } from '@/store/actionInfoStore'

interface BtnPlayLastProps {
  song: TRACK
}

export const BtnPlayLast = ({
  song,
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
    <button onClick={handleAddQueue} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-xs transition-[padding] font-semibold hover:bg-neutral-400/10'>
      {/* <MusicNotesPlus size={17} color='#dbeafe' weight="fill" /> */}
      <span>Play last </span>
    </button>
  )
}
