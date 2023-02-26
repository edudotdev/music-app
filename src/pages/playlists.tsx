import { Layout } from '@/components/Layout'
import { PlusCircle } from 'phosphor-react'
import localForage from 'localforage'
import { useEffect, useState } from 'react'
import { CardPlaylist } from '@/components/molecules'
import { PLAYLIST } from '@/types'

export default function Playlists () {
  const [playlists, setPlaylists] = useState([])

  const handlePlaylists = async () => {
    await localForage.getItem('playlists')
      .then((result:any) => {
        if (result === null) result = []
        setPlaylists(result)
      })
  }

  useEffect(() => {
    handlePlaylists()
  }, [])

  return (
    <Layout title='Playlists'>
      <h2 className='text-neutral-100 font-bold text-4xl'>Playlists - <span className='text-blue-300'>{Boolean(playlists)? playlists.length : 0}</span></h2>
      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {playlists.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
          ))}
        <button className='relative flex flex-col active:scale-[.99] w-auto'>
          <div className='w-[400px] grid place-items-center h-auto max-w-full rounded-xl overflow-hidden aspect-square bg-neutral-700/60 border-2 border-neutral-600/70 border-opacity-70'>
            <PlusCircle color='#ccc' size={110} weight="fill" className='opacity-40' />
          </div>
          <h2 className='text-white p-2'>New Playlist</h2>
        </button>
      </div>
    </Layout>
  )
}