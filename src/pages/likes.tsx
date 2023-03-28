import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import { CardSong } from '@/components/molecules'
import { TRACK } from '@/types'
import { getFavorites } from '@/services/likes'
import { BtnPlay, BtnShuffle } from '@/components/atoms'
import { Heart } from 'phosphor-react'
import Link from 'next/link'

export default function Likes () {
  const [favorites, setFavorites] = useState<TRACK[]>([])

  useEffect(() => {
    handleFavorites()
  }, [])

  const handleFavorites = async () => {
    const data = await getFavorites()
    setFavorites(data)
  }
  
  return (
    <Layout title='Likes'>
      <div className='flex justify-between'>
        <h2 className='text-neutral-100 flex gap-1.5 font-bold text-4xl'>
          <span>Likes</span>
        </h2>
        <div className='flex items-center gap-3'>
          <BtnPlay songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
          <BtnShuffle songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
        </div>
      </div>
      {favorites.length === 0 &&
        <div className='flex flex-col justify-center items-center gap-10 mt-36'>
          <Heart size={130} color="#fff" weight="duotone" />
          <div className='flex flex-col gap-8'>
            <h2 className='text-4xl font-bold text-white'>Songs you like wil appear here</h2>
            <p className='text-neutral-400 self-center'>Save songs by tapping the heart</p>
            <Link href='/' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
              Discover music
            </Link>
          </div>
        </div>
      }
      <div className='grid gap-3 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {favorites?.map((song: TRACK, index: number) => (( 
          <CardSong key={song.id} songs={favorites} position={index} />
        )))}
      </div>
    </Layout>
  )
}