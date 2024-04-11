import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { CardSong } from '@/components/molecules/CardSong'
import { SkeletonSearch } from '@/components/skeletons/SkeletonSearch'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { TRACK } from '@/types'
import { Search } from '@/components/molecules'
import { Disc } from 'phosphor-react'

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const SearchPage: NextPage = () => {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(`/api/search?song=${router.query.song}`, fetcher)

  if (error) Router.push('/404')

  return (
    <Layout title={`${router.query.song === undefined ?  'Search Page' : router.query.song} - search`}>
    <Search />
      {router.query.song !== undefined ?
        <main className='flex flex-col gap-8'>
          <header className='flex justify-center gap-5 text-neutral-100 font-bold text-2xl lg:text-3xl'>
            <h2 className='text-green-400'>Search - {router.query.song}</h2>
          </header>
          <section className='flex flex-col'>

            {isLoading && <SkeletonSearch />}
            
            {data && data.songs.map((song: TRACK, index:number) => ((
                <div key={song.id}>
                  <CardSong songs={[...data.songs]} position={index} />
                </div>
            )))}

            {data && data.songs.length === 0 && (
              <div className='flex flex-col justify-center col-span-full mt-10'>
                <p className='text-white text-center font-bold text-base sm:text-xl'>{`couldn't find '${router.query.song}'`}</p>
                <p className='text-gray-400 text-center text-base sm:text-xl'>Try searching again using a diferent spelling or keywords</p>
              </div>
            )}
          </section>
        </main>
      : <div className='flex gap-5 flex-col justify-center items-center col-span-full mt-5'>
          <Disc size={120} color="#4ade80" weight="duotone" className='text-center'>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="35s"
              from="0 0 0"
              to="360 0 0"
              repeatCount="indefinite"
            ></animateTransform>
          </Disc>
          <span className='text-white text-center font-bold text-xl'>Find your favorite songs or artists</span>
        </div>
      }
    </Layout>
  )
}

export default SearchPage