import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import { CardPlaylist, ModalNewPlaylist } from '@/components/molecules'
import { getPlaylists } from '@/services/playlists'
import { PLAYLIST } from '@/types'
import { Playlist } from 'phosphor-react'
import Link from 'next/link'

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

     {playlists?.length === 0 &&
        <div className='flex flex-col justify-center items-center gap-10 mt-36'>
          <Playlist size={130} color="#fff" weight="duotone" />
          <div className='flex flex-col gap-8'>
            <h2 className='text-2xl lg:text-4xl font-bold text-white'>Playlist you create wil appear here</h2>
            <p className='text-neutral-400 self-center'>Create playlists to organize your music</p>
            <Link href='/' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
              Discover music
            </Link>
          </div>
        </div>
      }
      
      <div className='grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {playlists?.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
        ))}
      </div>
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} />}
    </Layout>
  )
}