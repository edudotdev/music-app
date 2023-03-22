import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { discover } from '@/services/discover'
import { TableTopSongs } from '@/components/organisms/TableTopSongs'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const  Home: NextPage<Props> = (props) => {

  return (
    <Layout title='Home'>
      <header className='flex flex-col gap-2'>
        <h2 className='text-neutral-100 font-bold text-4xl flex gap-3'>Top Global</h2>
        <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
      </header>
      <TableTopSongs songs={props.discover} />
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