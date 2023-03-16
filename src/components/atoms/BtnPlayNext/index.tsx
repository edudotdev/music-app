import { usePlayerStore, usePlayerIndexStore } from '@/store/playerStore'
import { useActionInfoStore } from '@/store/actionInfoStore'
import { TRACK } from '@/types'
import { SkipForwardCircle } from 'phosphor-react'
import React from 'react'
import { shallow } from 'zustand/shallow'

interface BtnPlayNextProps {
  song: TRACK
}

export const BtnPlayNext = ({
  song
}:BtnPlayNextProps) => {
  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const {index} = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)

  const { setTextInfo } = useActionInfoStore()

  const handlePlayNext = () => {
    tracks.splice((index + 1), 0, song)

    setTextInfo({
      text: `Added ${song.title} to next in queue`,
      active: true
    })
  }

  return (
    <button onClick={handlePlayNext} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
      <SkipForwardCircle size={20} color='#dbeafe' weight="fill" />
      Play next
    </button>
  )
}
