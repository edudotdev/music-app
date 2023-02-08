import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { searchSong } from '@/services/search'
import { CardSong } from '@/components/molecules/CardSong'
import { useRouter } from 'next/router'
import { MagnifyingGlass } from "phosphor-react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Search: NextPage<Props> = (props) => {
  const router = useRouter()

  return (
    <Layout title={`${router.query.song} - search`}>
      <h2 className='flex gap-5 text-neutral-100 font-bold text-4xl'>
        <MagnifyingGlass size={40} color="#dbeafe" weight="fill" />
        <span className='text-blue-100'>Search - <span className='text-blue-300'>{router.query.song}</span></span>
      </h2>
      <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {props.songs?.map((song:any) => ((
          <div key={song.id}>
            <CardSong song={song} />
          </div>
        )))}
      </div>
    </Layout>
  )
}

export default Search

export const getServerSideProps:GetServerSideProps = async (context) => {
  try {
    const song = String(context.query.song)
    return {
      props: await searchSong(song)
    }    
  } 
  catch (_error) {
    return { redirect: { destination: '/404', permanent: false } }
  }
}