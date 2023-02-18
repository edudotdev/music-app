import React, { useEffect, useState } from 'react';
import { TRACK } from '@/types'
import localForage from 'localforage'
import { newPlaylist, addSong } from '@/crud/playlist'
import { Playlist } from 'phosphor-react';

interface ModalNewPlaylistProps {
  className: string
  song: TRACK
  setText: any
}

export const ModalNewPlaylist = ({
  className,
  song,
  setText
}:ModalNewPlaylistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [timer, setTimer] = useState<any>(null)

  const handleChange = (e: any) => {
    setNamePlaylist(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if(namePlaylist.trim() === '') return

    newPlaylist(namePlaylist, song)
    setNamePlaylist('')
    setIsOpen(false)
  }

  const showPlaylistInfo = (text: string) => {
    setText(text)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {setText('')}, 2500)
    setTimer(newTimer)
  }

  useEffect(() => {
    handlePlaylists(setPlaylists)
  }, [isOpen])

  return (
    <div className='z-50'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-blue-100 py-2 px-3 w-full text-start text-sm font-semibold hover:bg-blue-300/20'
      >Add to Playlist</button>
      <div className='relative right-full -translate-x-5 -top-[46px]'>
        {isOpen && (
          <div className='absolute rounded-md bg-neutral-900/95 shadow-lg w-40 max-h-[210px] overflow-y-auto py-2.5 content'>
            <form action="" onSubmit={(e) => {showPlaylistInfo(namePlaylist); handleSubmit(e)}}>
              <input type="text" onChange={(e) => handleChange(e)} value={namePlaylist} placeholder='add playlist...' className='w-full text-sm outline-none bg-transparent focus:bg-blue-300/20 border-transparent text-white pl-3 py-2' />
            </form>
            {playlists.length > 0 && playlists.map((playlist:any) => (
              <button key={playlist.uuid} onClick={() => {addSong(playlist.uuid, song); showPlaylistInfo(playlist.name); setIsOpen(false)}} className='cursor-pointer flex gap-2 w-full text-start hover:bg-blue-300/20 py-2 px-3 text-sm font-semibold text-blue-100' title={playlist.name}>
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

