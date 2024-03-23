import { Layout } from '@/components/Layout'
import { CardSong, ModalNewPlaylist, NoFavorites } from '@/components/molecules'
import { TRACK } from '@/types'
import { BtnPlay, BtnShuffle } from '@/components/atoms'
import { useFavorites } from '@/hooks/useFavorites'
import { Star } from 'phosphor-react'
import { useModalPlaylist } from '@/store/playlistsStore'

export default function Likes () {
  const { favorites } = useFavorites()
  
  const { showModal, setShowModal, song } = useModalPlaylist((state) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    song: state.song
  }))

  return (
    <Layout title='Likes'>
      <div className='flex flex-col md:flex-row gap-5 mb-6 items-center md:items-end'>
        <div className='grid place-content-center bg-white p-10 rounded-lg w-[270px] h-[270px]'>
          <Star size={130} color='#16a34a' weight="fill" />
        </div>
        <div className='flex flex-col gap-8 justify-end'>
          <div className='flex flex-col items-center md:items-start gap-2'>
            <h2 className='text-green-600 font-semibold text-3xl'>
              Favorite songs
            </h2>
            <span className='text-white'>{favorites?.length} songs</span>
          </div>
          {favorites &&
            <div className='flex gap-3'>
              <BtnPlay songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 active:bg-green-500 transition-colors py-2 px-6 text-white text-sm font-semibold rounded-md' />
              <BtnShuffle songs={[...favorites]} className='flex items-center justify-center gap-2 bg-green-600 active:bg-green-500 transition-colors py-2 px-6 text-white text-sm font-semibold rounded-md' />
            </div>
          }
        </div>
      </div>

      {favorites?.length === 0 && <NoFavorites/>}

      <div className='flex flex-col'>
        {favorites?.map((song: TRACK, index: number) => (( 
          <CardSong key={song.id} songs={favorites} position={index} />
        )))}
      </div>
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}
    </Layout>
  )
}