import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { getCountryCode } from '@/services/getCountryCode'
import { TableTopSongs } from '@/components/organisms'
import { SkeletonTableSongs } from '@/components/skeletons/SkeletonTableSongs'
import { BtnPlay } from '@/components/atoms'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useModalPlaylist } from '@/store/playlistsStore'
import { ModalNewPlaylist } from '@/components/molecules'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const ForYou: NextPage = () => {
  const router = useRouter()

  const { data, error, isLoading } = useSWR(`/api/forYou`, fetcher)

  if (error) router.push('/404')

  const { showModal, setShowModal, song } = useModalPlaylist((state) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    song: state.song
  }))

  return (
    <Layout title='For You'>
      <header className='flex justify-between items-center gap-2 px-4 md:px-0'>
        <div className='flex flex-col'>
          <h2 className='text-neutral-100 font-bold text-4xl flex gap-3 relative'>
            Trending 
            {!isLoading && <p className='text-green-400 absolute text-lg -right-8'>{data.code}</p>}
          </h2>
          <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
        </div>
        {!isLoading && <BtnPlay songs={[...data.songs.songs]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />}
      </header>
    {isLoading && <SkeletonTableSongs />}
    {!isLoading && <TableTopSongs songs={[...data.songs.songs]} />}
    {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}
    </Layout>
  )
}

export default ForYou