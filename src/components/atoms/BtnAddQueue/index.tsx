import { usePlayerStore } from '@/store/playerStore'
import { TRACK } from '@/types'
import { MusicNotesPlus } from 'phosphor-react'
import React, { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useActionInfoStore } from '@/store/actionInfoStore'

interface BtnAddQueueProps {
  song: TRACK
}

export const BtnAddQueue = ({
  song,
}:BtnAddQueueProps) => {
  const { setTextInfo } = useActionInfoStore()
  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const handleAddQueue = () => {
    tracks.push(song)
    setTextInfo({
      text:`${song.title} added to queue`,
      active: true
    })
  }
  
  return (
    <button onClick={handleAddQueue} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 transition-[padding] font-semibold text-sm hover:bg-blue-300/20'>
      <MusicNotesPlus size={17} color='#dbeafe' weight="fill" />
      <span>Add queue</span>
    </button>
  )
}
