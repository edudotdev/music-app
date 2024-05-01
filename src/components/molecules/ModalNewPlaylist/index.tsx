import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/atoms'
import { newPlaylist } from '@/crud/playlist'
import { useActionInfoStore } from '@/store/actionInfoStore'
import useExternalClick from '@/hooks/useExternalClick'
import { usePlaylistsStore } from '@/store/playlistsStore'
import { TRACK } from '@/types'

interface ModalNewPlaylistProps {
  setShowModal: (value:boolean) => void
  song: TRACK
}

export const ModalNewPlaylist = ({
  setShowModal,
  song
}:ModalNewPlaylistProps) => {
  const [namePlaylist, setNamePlaylist] = useState('')
  const modal = useRef(null);
  const { setTextInfo } = useActionInfoStore()
  const { setPlaylists } = usePlaylistsStore()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const playlists = await newPlaylist(namePlaylist, [song])
    setPlaylists(playlists)
    
    setTextInfo({
      text:'Playlist created',
      active: true
    })

    setShowModal(false)
  }

  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    setNamePlaylist(e.currentTarget.value)
  }

  return (
    <div className='z-[51] fixed left-0 top-0 flex items-center justify-center bg-black/70 h-screen w-screen'>
      <div ref={modal} className='absolute top-0 left-0 flex items-center h-full w-full justify-center'>
        <div className='w-full max-w-[300px] p-4 grid gap-8 rounded-xl border border-neutral-500 border-opacity-40 bg-neutral-800'>
          <h2 className='text-neutral-200 text-xl font-semibold text-center'>New playlist</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <Input label='name of playlist' onChange={handleChange} />
            <div className='flex justify-between'>
              <button type='button' onClick={() => setShowModal(false)} className='border border-neutral-600 w-32 text-sm hover:bg-neutral-700 rounded-md py-2 text-white'>
                Cancel
              </button>
              <button type='submit' className='bg-green-600 hover:bg-green-500 w-32 rounded-md py-2 text-sm text-white'>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
