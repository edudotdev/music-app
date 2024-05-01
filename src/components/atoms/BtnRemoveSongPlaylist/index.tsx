import { removeSong } from '@/crud/playlist'
import { MinusCircle } from 'phosphor-react'
import React from 'react'

interface BtnRemoveSongPlaylistProps {
  playlistUuid: string | undefined
  songId: string
}

export const BtnRemoveSongPlaylist = ({
  playlistUuid,
  songId
}:BtnRemoveSongPlaylistProps) => {

  const handleRemove = (playlistUuid: string | undefined, songId: string) => {
    if(playlistUuid !== undefined) {
      removeSong(playlistUuid, songId)
    }
    console.log("removido")
  }
  
  return (
    <button onClick={()=> handleRemove(playlistUuid, songId)} className='text-white py-1.5 px-2 w-full flex justify-between hover:bg-neutral-400/40' >
      Remove
      <MinusCircle size={16} className='pointer-events-none' />
    </button>
  )
}
