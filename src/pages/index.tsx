import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { discover } from '@/services/discover'
import { CardTopSong } from '@/components/molecules'
import { TRACK } from '@/types'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const  Home: NextPage<Props> = (props) => {


  return (
    <Layout title='Home'>
      <h2 className='text-neutral-100 font-bold text-4xl'>Discover Music</h2>
      <div className='w-full h-96 bg-blue-400 rounded-3xl'>

      </div>

      <h2 className='text-neutral-100 font-bold text-4xl flex flex-col gap-3'><span className='text-base text-neutral-400'>Top Global</span> Songs #1-50</h2>
      
      
      <div className='flex flex-col gap-4'>
        <div className='flex items-center py-4 px-6 justify-between gap-10 text-white font-bold uppercase'>
          <div className='flex gap-8'>
            <div className='w-5'>#</div>
            <div className='w-[80px]'></div>
            <div className='w-[200px] max-w-[200px]'>Name Song</div>
          </div>
          <div className='w-[160px] max-w-[160px]'>Artist</div>
          <div className='w-[41px]'>Like</div>
          <div className='w-[40px]'>Play</div>
        </div>
        {props.discover.map((song:TRACK, index:number) => (
          <CardTopSong key={song.id} song={song} index={index}  />
        ))}
      </div>
    </Layout>
  )
}
export default Home

export const getServerSideProps:GetServerSideProps = async () => {
  try {
    return {
      props: await discover()
    }    
  } 
  catch (_error) {
    return { redirect: { destination: '/404', permanent: false } }
  }
}