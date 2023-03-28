import React, { useEffect, useState } from 'react';
import { TRACK, PLAYLIST } from '@/types'
import localForage from 'localforage'
import { newPlaylist, addSong } from '@/crud/playlist'
import { Playlist } from 'phosphor-react';
import { useActionInfoStore } from '@/store/actionInfoStore'

interface MenuPlaylistProps {
  song: TRACK,
  className: string
}

export const MenuPlaylist = ({
  song,
  className
}:MenuPlaylistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState('')
  const [playlists, setPlaylists] = useState([])
  const { setTextInfo } = useActionInfoStore()

  const handleChange = (e: any) => {
    setNamePlaylist(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if(namePlaylist.trim() === '') return

    newPlaylist(namePlaylist, [song])
    setNamePlaylist('')
    setIsOpen(false)

    setTextInfo({
      text:'Added to playlist',
      active: true
    })
  }

  const handleClick = (playlist: PLAYLIST) => {
    addSong(playlist.uuid, song)
    setIsOpen(false)
    setTextInfo({
      text:'Added to playlist',
      active: true
    })
  }

  useEffect(() => {
    handlePlaylists(setPlaylists)
  }, [isOpen])

  return (
    <div className='z-50'>
      <button
        onMouseEnter={() => setIsOpen(true)}
        className={className}
      >Add to Playlist</button>
      <div className='relative right-full -translate-x-9 -top-[50px]'>
        {isOpen && (
          <div className='absolute rounded-md bg-neutral-900/95 shadow-lg w-36 max-h-[210px] overflow-y-auto py-2.5'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" onChange={(e) => handleChange(e)} value={namePlaylist} placeholder='add playlist...' className='w-full text-sm outline-none bg-transparent focus:bg-neutral-400/10 border-transparent text-white pl-3 py-2' />
            </form>
            {playlists.length > 0 && playlists.map((playlist:PLAYLIST) => (
              <button key={playlist.uuid} onClick={() => handleClick(playlist)} className='cursor-pointer flex gap-2 w-full text-start hover:bg-neutral-400/10 py-1.5 px-2 text-xs font-semibold text-white' title={playlist.name}>
                <Playlist size={17} color="#dbeafe" weight="fill" /> <span className='truncate'>{playlist.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const handlePlaylists = async (setPlaylists: any) => {
  await localForage.getItem('playlists')
    .then((result:any) => {
      if (result === null) result = []
      setPlaylists(result)
    })
}

