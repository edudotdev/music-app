import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import { CardPlaylist, ModalNewPlaylist } from '@/components/molecules'
import { getPlaylists } from '@/services/playlists'
import { PLAYLIST } from '@/types'

export default function Playlists () {
  const [playlists, setPlaylists] = useState<PLAYLIST[]>()
  const [showModal, setShowModal] = useState(false)

  const handlePlaylists = async () => {
    const data = await getPlaylists()
    setPlaylists(data)
  }

  useEffect(() => {
    handlePlaylists()
  }, [showModal])

  return (
    <Layout title='Playlists'>
     <div className='flex justify-between'>
      <h2 className='text-neutral-100 font-bold text-4xl'>Playlists</h2>
      <button onClick={() => setShowModal(true)} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-full outline-none'>New Playlist</button>
     </div>
      <div className='grid gap-3 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {playlists?.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
        ))}
      </div>
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} />}
    </Layout>
  )
}