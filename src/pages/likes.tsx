import { Layout } from '@/components/Layout'
import { CardSong, NoFavorites } from '@/components/molecules'
import { TRACK } from '@/types'
import { BtnPlay, BtnShuffle } from '@/components/atoms'
import { useFavorites } from '@/hooks/useFavorites'

export default function Likes () {
  const { favorites } = useFavorites()
  
  return (
    <Layout title='Likes'>
      <div className='flex justify-between'>
        <h2 className='text-neutral-100 flex gap-1.5 font-bold text-4xl'>
          <span>Likes</span>
        </h2>
        <div className='flex items-center gap-3'>
          {favorites &&
            <>
              <BtnPlay songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
              <BtnShuffle songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
            </>
          }
        </div>
      </div>
      
      {favorites?.length === 0 && <NoFavorites/>}

      <div className='grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {favorites?.map((song: TRACK, index: number) => (( 
          <CardSong key={song.id} songs={favorites} position={index} />
        )))}
      </div>
    </Layout>
  )
}