import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react'
import { CardSong } from '@/components/molecules'
import { TRACK } from '@/types'
import { Play, ShuffleAngular } from 'phosphor-react'
import { usePlayerStore, usePlayerIndexStore } from '@/store/playerStore'
import { getFavorites } from '@/services/likes'

export default function Likes () {
  const [favorites, setFavorites] = useState<TRACK[]>([])
  const {setTrack} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  useEffect(() => {
    handleFavorites()
  }, [])

  const handlePlay = () => {
    setTrack(favorites)
    setIndex(0)
  }

  const handleShuffle = async () => {
    if(favorites.length === 0) return
    const songs: any = await getFavorites()
    setTrack(shuffle(songs))
    setIndex(0)
  }

  const handleFavorites = async () => {
    const data = await getFavorites()
    setFavorites(data)
  }

  const shuffle = (array: TRACK[]) => {
    return array.sort(() => Math.random() - 0.5);
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
          <button onClick={handleShuffle} className='flex items-center justify-center gap-2 bg-blue-500 py-2 w-32 text-white text-sm font-semibold rounded-md'>
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