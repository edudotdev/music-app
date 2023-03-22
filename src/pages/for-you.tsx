import { Layout } from '@/components/Layout'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import React from 'react'
import { forYou } from '@/services/forYou'
import { getCountryCode } from '@/services/getCountryCode'
import { TableTopSongs } from '@/components/organisms/TableTopSongs'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ForYou: NextPage<Props> = ({songs, code}) => {

  return (
    <Layout title='For You'>
      <header className='flex flex-col gap-2 items-start'>
        <h2 className='text-neutral-100 font-bold text-4xl flex gap-3 relative'>Trending <p className='text-green-400 absolute text-lg -right-8'>{code}</p></h2>
        <span className='text-base font-semibold text-neutral-400'>Songs #1-50</span>
      </header>
     <TableTopSongs songs={songs.songs} />
    </Layout>
  )
}

export default ForYou

export const getServerSideProps:GetServerSideProps = async () => {

  const code = await getCountryCode()

  try {
    return {
      props: {
        songs: await forYou(code),
        code: code
      }
    }    
  } 
  catch (_error) {
    return { redirect: { destination: '/404', permanent: false } }
  }
}