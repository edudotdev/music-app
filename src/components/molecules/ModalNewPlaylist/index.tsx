import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/atoms'
import { XCircle } from 'phosphor-react'
import { newPlaylist } from '@/crud/playlist'
import { useActionInfoStore } from '@/store/actionInfoStore'
import useExternalClick from '@/hooks/useExternalClick'
import { usePlaylistsStore } from '@/store/playlistsStore'

interface ModalNewPlaylistProps {
  setShowModal: (value:boolean) => void
}

export const ModalNewPlaylist = ({
  setShowModal
}:ModalNewPlaylistProps) => {
  const [namePlaylist, setNamePlaylist] = useState('')
  const modal = useRef(null);
  const { setTextInfo } = useActionInfoStore()

  const { setPlaylists } = usePlaylistsStore()

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) setShowModal(false)
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const playlists = await newPlaylist(namePlaylist, [])
    setPlaylists(playlists)
    
    setTextInfo({
      text:'Playlist created',
      active: true
    })

    setShowModal(false)
  }

  const handleClickOutside = () => {
    setShowModal(false)
  }

  useExternalClick(modal, handleClickOutside)

  const handleChange = (e:any) => {
    setNamePlaylist(e.target.value)
  }

  return (
    <div  className='absolute w-full h-full bg-neutral-800 bg-opacity-70'>
      <div ref={modal} className='relative left-1/2 -translate-x-1/2 top-[80px] bg-neutral-700 w-full max-w-[500px] p-5 grid gap-5 rounded-xl border-2 border-neutral-500 border-opacity-40'>
        <div className='flex justify-between'>
          <h2 className='text-neutral-200 text-3xl font-semibold'>New playlist</h2>
          <button onClick={() => setShowModal(false)} className='opacity-70 hover:opacity-100'>
            <XCircle size={34} color="#ccc" weight="fill" />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <Input label='Name playlist' onChange={handleChange} />
          <button className='bg-green-600 w-full rounded-md py-4 font-semibold text-white'>
            Create playlist
          </button>
        </form>
      </div>
    </div>
  )
}
