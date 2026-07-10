import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { CardSong } from '@/components/molecules/CardSong'
import { SkeletonSearch } from '@/components/skeletons/SkeletonSearch'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { TRACK } from '@/types'
import { ModalNewPlaylist, Search } from '@/components/molecules'
import { Disc } from 'phosphor-react'
import { useModalPlaylist } from '@/store/playlistsStore'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const SearchPage: NextPage = () => {
  const router = useRouter()
  const { song: querySong } = router.query

  // Condición SWR: si querySong no está definido o el router no está listo, pasamos `null` para no hacer un fetch inválido
  const { data, error, isLoading } = useSWR(
    querySong ? `/api/search?song=${encodeURIComponent(querySong as string)}` : null,
    fetcher
  )

  if (error) {
    Router.push('/404')
  }

  const { showModal, setShowModal, song } = useModalPlaylist((state) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    song: state.song
  }))

  return (
    <Layout title={`${!querySong ? 'Search Page' : querySong} - search`}>
      <Search />
      
      {querySong !== undefined ? (
        <main className='flex flex-col gap-8'>
          <header className='flex justify-center gap-5 text-neutral-100 font-bold text-2xl lg:text-3xl'>
            <h2 className='text-green-400'>Search - {querySong}</h2>
          </header>
          
          <section className='flex flex-col'>
            {isLoading && <SkeletonSearch />}
            
            {/* Validamos de forma segura que data y data.songs existan antes de renderizar */}
            {data?.songs && data.songs.map((track: TRACK, index: number) => (
              <div key={track.id}>
                <CardSong songs={[...data.songs]} position={index} />
              </div>
            ))}

            {/* Ajustamos la validación para reflejar la estructura exacta del backend ({ songs: [] }) */}
            {data?.songs && data.songs.length === 0 && !isLoading && (
              <div className='flex flex-col justify-center col-span-full mt-10'>
                <p className='text-white text-center font-bold text-base sm:text-xl'>
                  {`couldn't find '${querySong}'`}
                </p>
                <p className='text-gray-400 text-center text-base sm:text-xl'>
                  Try searching again using a different spelling or keywords
                </p>
              </div>
            )}
          </section>
        </main>
      ) : (
        <div className='flex gap-5 flex-col justify-center items-center col-span-full mt-5'>
          <Disc size={120} color="#4ade80" weight="duotone" className='text-center'>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="35s"
              from="0 0 0"
              to="360 0 0"
              repeatCount="indefinite"
            />
          </Disc>
          <span className='text-white text-center font-bold text-xl'>Find your favorite songs or artists</span>
        </div>
      )}
      
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}
    </Layout>
  )
}

export default SearchPage