import React, { useState } from 'react';
import { TRACK, PLAYLIST } from '@/types'
import { newPlaylist, addSong } from '@/crud/playlist'
import { Playlist } from 'phosphor-react';
import { useActionInfoStore } from '@/store/actionInfoStore'
import { usePlaylistsStore } from '@/store/playlistsStore';
import { shallow } from 'zustand/shallow';

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
  const { setTextInfo } = useActionInfoStore()
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }), shallow)

  const { setPlaylists } = usePlaylistsStore()

  const handleChange = (e: any) => {
    setNamePlaylist(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(namePlaylist.trim() === '') return

    const playlists = await newPlaylist(namePlaylist, [song])
    setPlaylists(playlists)

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