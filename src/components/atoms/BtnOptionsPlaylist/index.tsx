import { TRACK } from '@/types'
import { DotsThreeOutline, PlayCircle, ShuffleAngular } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { usePlayerIndexStore, usePlayerStore, } from '@/store/playerStore'

interface BtnOptionsPlaylistProps {
  className?: string
  showMenu: boolean
  setShowMenu: (value: boolean) => void
  songs: TRACK[]
}

export const BtnOptionsPlaylist = ({
  className = '',
  showMenu,
  setShowMenu,
  songs
}:BtnOptionsPlaylistProps) => {
  const {setTrack, tracks} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const handlePlay = () => {
    setTrack(songs)
    setIndex(0)
  }

  const handleShuffle = () => {
    const shuffleSongs = shuffle(songs)
    
    setTrack(shuffleSongs)
    setIndex(0)
  }

  return (
    <div className={`absolute group-hover:z-10 w-48 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <div>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsThreeOutline size={25} color="#dbeafe" weight="fill" />
          </button>
        </div>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] mt-2 w-36 origin-bottom-right rounded-md bg-neutral-900/95 shadow-lg ring-opacity-5 focus:outline-none">
            <div className="py-2.5">
              <button onClick={handlePlay} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
                <PlayCircle size={17} color='#dbeafe' weight="fill" />
                <span>Play</span>
              </button>
              <button onClick={handleShuffle} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
                <ShuffleAngular size={17} color='#dbeafe' weight="fill" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


const shuffle = (array: TRACK[]) => {
  return array.sort(() => Math.random() - 0.5);
}