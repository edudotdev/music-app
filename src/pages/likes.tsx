import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import { CardSong } from '@/components/molecules'
import { TRACK } from '@/types'
import { getFavorites } from '@/services/likes'
import { BtnPlay, BtnShuffle } from '@/components/atoms'

export default function Likes () {
  const [favorites, setFavorites] = useState<TRACK[]>([])
  const [favoritesToShuffle, setFavoritesToShuffle] = useState<TRACK[]>([])

  useEffect(() => {
    handleFavorites()
    handleFavoritesToShuffle()
  }, [])

  const handleFavorites = async () => {
    const data = await getFavorites()
    setFavorites(data)
  }

  const handleFavoritesToShuffle = async () => {
    const data = await getFavorites()
    setFavoritesToShuffle(data)
  }
  
  return (
    <Layout title='Likes'>
      <div className='flex justify-between'>
        <h2 className='text-neutral-100 flex gap-1.5 font-bold text-4xl'>
          <span>Likes -</span>
          <span className='text-blue-300'>{Boolean(favorites)? favorites.length : 0}</span>
        </h2>
        <div className='flex items-center gap-3'>
          <BtnPlay songs={favorites} className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md' />
          <BtnShuffle songs={favoritesToShuffle} className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md' />
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