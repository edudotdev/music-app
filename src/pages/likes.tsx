import { Layout } from '@/components/Layout'
import localForage from 'localforage'
import { useEffect, useState } from 'react'
import { CardSong } from '@/components/molecules'
import { TRACK } from '@/types'
import { Play, ShuffleAngular } from 'phosphor-react'
import { usePlayerStore } from '@/store/playerStore'

export default function Likes () {
  const [favorites, setFavorites] = useState<TRACK[]>([])
  const {setTrack} = usePlayerStore()


  useEffect(() => {
    handleFavorites()
  }, [])

  const handlePlay = () => {
    setTrack(favorites)
  }

  const handleFavorites = async () => {
    await localForage.getItem('likes').then((result:any) => {
      if (result === null) result = []
      setFavorites(result)
    })
  }
  
  return (
    <Layout title='Likes'>
      <div className='flex justify-between'>
        <h2 className='text-neutral-100 flex gap-1.5 font-bold text-4xl'>
          <span>Likes -</span>
          <span className='text-blue-300'>{Boolean(favorites)? favorites.length : 0}</span>
        </h2>
        <div className='flex items-center gap-3'>
          <button onClick={handlePlay} className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md'>
            <Play size={16} color="#fff" weight="fill" />
            play
          </button>
          <button className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md'>
            <ShuffleAngular size={20} color="#fff" weight="fill" />
            shuffle
          </button>
        </div>
      </div>
      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {favorites?.map((song: TRACK) => (( 
          <CardSong key={song.id} song={song} />
        )))}
      </div>
    </Layout>
  )
}