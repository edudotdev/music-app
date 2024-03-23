import React, { useState } from 'react';
import { TRACK, PLAYLIST } from '@/types'
import { ModalNewPlaylist } from '@/components/molecules'
import { newPlaylist, addSong } from '@/crud/playlist'
import { ListPlus, Playlist } from 'phosphor-react';
import { useActionInfoStore } from '@/store/actionInfoStore'
import { usePlaylistsStore, useModalPlaylist } from '@/store/playlistsStore';

interface MenuPlaylistProps {
  song: TRACK,
  className: string
}

export const MenuPlaylist = ({
  song,
  className
}:MenuPlaylistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [showModal, setShowModal] = useState(true)
  const [namePlaylist, setNamePlaylist] = useState('')
  const { setTextInfo } = useActionInfoStore()
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }))

  const { showModal, setShowModal, setSong } = useModalPlaylist((state) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    setSong: state.setSong
  }))

  // const { setPlaylists } = usePlaylistsStore()

  // const handleChange = (e: any) => {
  //   setNamePlaylist(e.target.value)
  // }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   if(namePlaylist.trim() === '') return

  //   const playlists = await newPlaylist(namePlaylist, [song])
  //   setPlaylists(playlists)

  //   setNamePlaylist('')
  //   setIsOpen(false)

  //   setTextInfo({
  //     text:'Added to playlist',
  //     active: true
  //   })
  // }

  const addSongToPlaylist = (playlist: PLAYLIST) => {
    addSong(playlist.uuid, song)
    setIsOpen(false)
    setTextInfo({
      text:'Added to playlist',
      active: true
    })
  }

  const handleModalPlaylist = () => {
    setSong(song)
    setShowModal(!showModal)
  }

  return (
    <div className='z-50 group/submenu order-3 md:order-1'>
      <button
        className={className}
      >Add to Playlist</button>
      <div className="md:absolute right-full w-full md:-translate-x-2 md:w-36 top-0 overflow-hidden after:w-5 after:h-full after:absolute after:invisible after:group-hover:visible after:left-full after:top-0">
        <div className='md:invisible group-hover/submenu:visible md:rounded-md bg-neutral-700 *:border-b *:border-b-neutral-600 last:border-b-none border border-neutral-600 shadow-xl'>
          {/* <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" onChange={(e) => handleChange(e)} value={namePlaylist} placeholder='add playlist...' className='w-full text-sm outline-none bg-transparent focus:bg-neutral-400/10 border-transparent text-white pl-3 py-2' />
          </form> */}
          <button onClick={handleModalPlaylist} className='text-white w-full flex justify-between hover:bg-neutral-400/40 gap-2 items-center py-1.5 px-2 whitespace-nowrap md:text-xs'>
            New playlist
            <ListPlus size={16} weight="bold" />
          </button>
          
          {playlists.length > 0 && <span className='text-xs font-semibold text-neutral-400 px-2 !border-b-transparent'>Recents</span>}
            <div className='max-h-[130px] md:max-h-[unset] overflow-y-auto'>
              {playlists.length > 0 && playlists.map((playlist:PLAYLIST) => (
                <button key={playlist.uuid} onClick={() => addSongToPlaylist(playlist)} className='cursor-pointer flex w-full text-start hover:bg-neutral-400/40 py-1.5 px-2 md:text-xs text-white' title={`playlist ${playlist.name}`}>
                  {/* <Playlist size={17} color="#fff" weight="fill" /> */}
                  <span className='truncate'>{playlist.name}</span>
                </button>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}