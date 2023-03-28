import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { CardSong } from '@/components/molecules/CardSong'
import { SkeletonSearch } from '@/components/skeletons/SkeletonSearch'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { TRACK } from '@/types'

const fetcher = (url:any) => axios.get(url).then(res => res.data)

const Search: NextPage = () => {
  const router = useRouter()

  const { data, error, isLoading } = useSWR(`/api/search?song=${router.query.song}`, fetcher)

  if (error) Router.push('/404')

  return (
    <Layout title={`${router.query.song} - search`}>
      <h2 className='flex justify-center lg:justify-start gap-5 text-neutral-100 font-bold text-2xl lg:text-4xl'>
        <span className='text-green-400'>Search - <span className='text-white'>{router.query.song}</span></span>
      </h2>
      <div className='grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {isLoading && <SkeletonSearch />}
        {data&&data.songs?.map((song: TRACK, index:number) => ((
          <div key={song.id}>
            <CardSong songs={[...data.songs]} position={index} />
          </div>
        )))}
      </div>
    </Layout>
  )
}

export default Search