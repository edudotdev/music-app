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
      <h2 className='text-neutral-100 font-bold text-4xl'>Playlists - <span className='text-blue-300'>{Boolean(playlists)? playlists?.length : 0}</span></h2>
      <button onClick={() => setShowModal(true)} className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md outline-none'>New Playlist</button>
     </div>
      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {playlists?.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
        ))}
      </div>
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} />}
    </Layout>
  )
}