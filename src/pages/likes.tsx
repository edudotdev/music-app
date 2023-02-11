import { Layout } from '@/components/Layout'
import localForage from 'localforage'
import { useEffect, useState } from 'react'
import { CardSong } from '@/components/molecules'
import { TRACK } from '@/types'
import { Heart} from 'phosphor-react'

export default function Likes () {
  const [favorites, setFavorites] = useState<TRACK[]>([])

  useEffect(() => {
    handleFavorites(setFavorites)
  }, [])
  
  return (
    <Layout title='Likes'>
      <h2 className='text-neutral-100 font-bold text-4xl'>Likes - <span className='text-blue-300'>{Boolean(favorites)? favorites.length : 0}</span></h2>
      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {favorites?.map((song: TRACK) => (( 
          <CardSong key={song.id} song={song} />
        )))}
      </div>
    </Layout>
  )
}

const handleFavorites = async (setFavorites: any) => {
  const likes = await localForage.getItem('likes')
  setFavorites(likes)
}