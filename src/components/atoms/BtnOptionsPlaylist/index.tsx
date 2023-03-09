import { PLAYLIST, TRACK } from '@/types'
import { DotsThreeOutline, PlayCircle, ShuffleAngular, Trash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { usePlayerIndexStore, usePlayerStore, } from '@/store/playerStore'
import { deletePlaylist } from '@/crud/playlist'
import localForage from 'localforage'

interface BtnOptionsPlaylistProps {
  className?: string
  showMenu: boolean
  setShowMenu: (value: boolean) => void
  playlist: PLAYLIST
}

export const BtnOptionsPlaylist = ({
  className = '',
  showMenu,
  setShowMenu,
  playlist
}:BtnOptionsPlaylistProps) => {
  const {setTrack, tracks} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const {song, name, uuid} = playlist

  const handlePlay = () => {
    if(song.length === 0) return
    setTrack(song)
    setIndex(0)
  }

  const handleShuffle = async () => {

    const uwu = await localForage.getItem('playlists')
    .then((result:any) => {
      if (result === null) result = []
      return result.find((playlist: any) => playlist.name === name)
    })

    if(uwu.song.length === 0) return
    setTrack(shuffle(uwu.song))
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
              <button onClick={() => deletePlaylist(uuid)} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
                <Trash size={17} color='#dbeafe' weight="fill" />
                Delete
              </button>
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