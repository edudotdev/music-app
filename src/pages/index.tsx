import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { discover } from '@/services/discover'
import { TableTopSongs } from '@/components/organisms/TableTopSongs'
import { BtnPlay } from '@/components/atoms'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const  Home: NextPage<Props> = ({discover}) => {

  return (
    <Layout title='Home'>
      <header className='flex justify-between items-center gap-2'>
        <div className='flex flex-col'>
          <h2 className='text-neutral-100 font-bold text-4xl flex gap-3'>Top Global</h2>
          <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
        </div>
      <BtnPlay songs={[...discover]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
      </header>
      <TableTopSongs songs={[...discover]} />
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