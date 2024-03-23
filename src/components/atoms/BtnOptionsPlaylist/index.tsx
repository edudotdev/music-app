import { PLAYLIST } from '@/types'
import { DotsThreeOutline } from 'phosphor-react'
import React from 'react'
import { deletePlaylist } from '@/crud/playlist'
import { usePlaylistsStore } from '@/store/playlistsStore'

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
  playlist,
}:BtnOptionsPlaylistProps) => {
  const {uuid} = playlist

  const handleDelete = async () => {
    const newPlaylists = await deletePlaylist(uuid)
    setPlaylists(newPlaylists)
  }

  const { setPlaylists } = usePlaylistsStore()

  return (
    <div className={`absolute group-hover:z-10 text-right ${className}`} >
      <div className="relative inline-block text-left">
        <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 bg-neutral-900/60 backdrop-blur-md rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsThreeOutline size={18} color="#fff" weight="fill" />
        </button>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] mt-2 w-24 origin-bottom-right rounded-md bg-neutral-900/95 shadow-lg ring-opacity-5 focus:outline-none">
            <div className="py-2.5">
              <button onClick={handleDelete} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-xs font-semibold hover:bg-neutral-400/10'>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}