import { Layout } from '@/components/Layout'
import { TableTopSongs } from '@/components/organisms/TableTopSongs'
import { BtnPlay } from '@/components/atoms'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SkeletonTableSongs } from '@/components/skeletons/SkeletonTableSongs'
import { useModalPlaylist } from '@/store/playlistsStore'
import { ModalNewPlaylist } from '@/components/molecules'
import Link from 'next/link'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home = () => {
  const router = useRouter()
  
  const { data, error, isLoading } = useSWR(`/api/discover`, fetcher)

  if (error) router.push('/404')

  const { showModal, setShowModal, song } = useModalPlaylist((state) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    song: state.song
  }))
  
  return (
    <Layout title='Home'>
      <header className='flex justify-between items-center gap-2  px-4 md:px-0'>
        <div className='flex flex-col'>
          <h2 className='text-neutral-100 font-bold text-4xl flex gap-3'>Top Global</h2>
          <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
        </div>
        {/* {!isLoading && <BtnPlay songs={[...data?.discover]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />} */}
      </header>

      <div className='flex justify-center flex-col items-center gap-6'>
        <h2 className='text-2xl lg:text-4xl font-bold text-white'>Music charts not available</h2>
        <Link href='/search' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
          Find music
        </Link>
      </div>

      {/* {isLoading && <SkeletonTableSongs />}
      {!isLoading && <TableTopSongs songs={[...data?.discover]} />}
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />} */}
    </Layout>
  )
}

export default Home