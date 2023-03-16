import { PLAYLIST, TRACK } from '@/types'
import { DotsThreeOutline, Trash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { deletePlaylist } from '@/crud/playlist'
import { BtnPlay, BtnShuffle } from '@/components/atoms'
import { getPlaylists } from '@/services/playlists'

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
  const {song, uuid} = playlist
  const [songsToShuffle, setSongsToShuffle] = useState<TRACK[]>()

  useEffect(() => {
    const handlePlaylist = async () => {
      const data = await getPlaylists()
      const tracks:TRACK[] = data.find((playlist: PLAYLIST) => playlist.uuid === uuid).song
      setSongsToShuffle(tracks)
    }
    handlePlaylist()
  }, [song, uuid])

  return (
    <div className={`absolute group-hover:z-10 w-48 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsThreeOutline size={25} color="#dbeafe" weight="fill" />
        </button>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] mt-2 w-36 origin-bottom-right rounded-md bg-neutral-900/95 shadow-lg ring-opacity-5 focus:outline-none">
            <div className="py-2.5">
              <button onClick={() => deletePlaylist(uuid)} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
                <Trash size={17} color='#dbeafe' weight="fill" />
                Delete
              </button>
              <BtnPlay songs={song} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20' />
              <BtnShuffle songs={songsToShuffle} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}