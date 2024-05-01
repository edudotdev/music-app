import React from 'react'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { trackDetails } from '@/services/trackDetails'
import { BtnPlay, BtnLike, BtnOptionsSong } from '@/components/atoms'
import { TRACK } from '@/types'

interface Song {
  album: string;
  artist: string;
  composer: string;
  duration: number;
  id: string;
  image: string;
  music: string;
  name: string;
  releaseDate: string;
}

const Track:NextPage<Song> = (props) => {
  const { album, artist, composer, id, image, music, name } = props

  const track: TRACK = {
    id,
    music,
    image,
    title: name,
    artist,
  }
  
  return (
    <Layout title={name}>
      <div className='flex flex-col lg:flex-row items-center gap-4 md:gap-8 lg:items-end'>
        <img src={image} className='rounded-xl' width={300} height={300} alt={name} />
        <div className='flex flex-col items-center lg:items-start gap-3 md:gap-6'>
         <div className='flex flex-col gap-2'>
          <h1 className='text-white text-3xl lg:text-5xl font-bold text-balance'>{name}</h1>
          <p className='text-gray-300 text-base'>{album}</p>
         </div>
          <p className='text-green-500 text-base'>{artist}</p>
        </div>
      </div>
      <div className='flex gap-5 items-center mx-2'>
          <BtnPlay songs={[track]} position={0} className='md:hover:scale-110 transition-all flex items-center justify-center gap-2 bg-green-600 p-5 text-white text-sm font-semibold rounded-full' showText={false} />
          <BtnLike song={track} className='p-4' />
      </div>
      <div className='mx-2'>
        <div className='relative flex justify-between items-center bg-green-600 rounded-md p-3 md:py-3 md:px-4'>
          <p className='font-semibold text-white'>{name}</p>
          <BtnOptionsSong position={0} songs={[track]} className='!static' />
        </div>
      </div>
      <p className='px-2 text-gray-300'><b className='text-white'>Written By:</b> {composer}</p>
    </Layout>
  )
}

export default Track


export async function getServerSideProps({params}:any) {
  const id = String(params?.id)
  const song: Song = await trackDetails(id)
  
  return { props: song }
}
 