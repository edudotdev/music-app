import React, { useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/atoms'
import { XCircle } from 'phosphor-react'
import { newPlaylist } from '@/crud/playlist'

interface ModalNewPlaylistProps {
  setShowModal: (value:boolean) => void
}

export const ModalNewPlaylist = ({
  setShowModal
}:ModalNewPlaylistProps) => {
  const [namePlaylist, setNamePlaylist] = useState('')
  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setShowModal(false)
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction])
 
  const handleSubmit = (e:any) => {
    e.preventDefault()
    newPlaylist(namePlaylist, [])
    setShowModal(false)
  }

  const handleChange = (e:any) => {
    setNamePlaylist(e.target.value)
  }

  return (
    <div className='absolute w-full h-full bg-neutral-800 bg-opacity-70'>
      <div className='relative left-1/2 -translate-x-1/2 top-[80px] bg-neutral-700 w-full max-w-[500px] p-5 grid gap-5 rounded-xl border-2 border-neutral-500 border-opacity-40'>
        <div className='flex justify-between'>
          <h2 className='text-neutral-200 text-3xl font-semibold'>New playlist</h2>
          <button onClick={() => setShowModal(false)} className='opacity-70 hover:opacity-100'>
            <XCircle size={34} color="#ccc" weight="fill" />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <Input label='Name playlist' onChange={handleChange} />
          <button className='bg-blue-500 w-full rounded-md py-4 font-semibold text-white'>
            Create playlist
          </button>
        </form>
      </div>
    </div>
  )
}
