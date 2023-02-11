import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { CardSong } from '@/components/molecules/CardSong'
import { SkeletonSearch } from '@/components/skeletons/SkeletonSearch'
import { MagnifyingGlass } from "phosphor-react";
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url:any) => axios.get(url).then(res => res.data)

const Search: NextPage = () => {
  const router = useRouter()

  const { data, error, isLoading } = useSWR(`/api/search?song=${router.query.song}`, fetcher)

  if (error) {
    Router.push('/404')
  }

  return (
    <Layout title={`${router.query.song} - search`}>
      <h2 className='flex gap-5 text-neutral-100 font-bold text-4xl'>
        <MagnifyingGlass size={40} color="#dbeafe" weight="fill" />
        <span className='text-blue-100'>Search - <span className='text-blue-300'>{router.query.song}</span></span>
      </h2>
      <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {isLoading&&<SkeletonSearch />}
        {data&&data.songs?.map((song:any) => ((
          <div key={song.id}>
            <CardSong song={song} />
          </div>
        )))}
      </div>
    </Layout>
  )
}

export default Search