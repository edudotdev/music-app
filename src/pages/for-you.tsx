import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import React from 'react'
import { forYou } from '@/services/forYou'
import { getCountryCode } from '@/services/getCountryCode'
import { TableTopSongs } from '@/components/organisms'
import { BtnPlay } from '@/components/atoms'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ForYou: NextPage<Props> = ({songs, code}) => {

  return (
    <Layout title='For You'>
      <header className='flex justify-between items-center gap-2'>
        <div className='flex flex-col'>
          <h2 className='text-neutral-100 font-bold text-4xl flex gap-3 relative'>Trending <p className='text-green-400 absolute text-lg -right-8'>{code}</p></h2>
          <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
        </div>
        <BtnPlay songs={[...songs.songs]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
      </header>
     <TableTopSongs songs={[...songs.songs]} />
    </Layout>
  )
}

export default ForYou

export const getServerSideProps:GetServerSideProps = async () => {

  // const code = await getCountryCode() || 'MX'

  try {
    return {
      props: {
        songs: await forYou('MX'),
        code: 'MX'
      }
    }    
  } 
  catch (_error) {
    return { redirect: { destination: '/404', permanent: false } }
  }
}