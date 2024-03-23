import { Layout } from '@/components/Layout'
import { useState } from 'react'
import { CardPlaylist, ModalNewPlaylist, NoPlaylists } from '@/components/molecules'
import { PLAYLIST } from '@/types'
import { usePlaylistsStore } from '@/store/playlistsStore'
import { shallow } from 'zustand/shallow'

export default function Playlists () {
  const [showModal, setShowModal] = useState(false)
  
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }), shallow)

  return (
    <Layout title='Playlists'>
      {/* <div className='flex justify-between'>
        <h2 className='text-neutral-100 font-bold text-4xl'>Playlists</h2>
        <button onClick={() => setShowModal(true)} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-full outline-none'>New Playlist</button>
      </div> */}

      {playlists?.length === 0 && <NoPlaylists />}
      
      <div className='grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {playlists?.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
        ))}
      </div>

      {/* {showModal && <ModalNewPlaylist setShowModal={setShowModal} />} */}
    </Layout>
  )
}