import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { trackDetails } from '@/services/trackDetails'
import { BtnPlay, BtnLike, BtnOptionsSong } from '@/components/atoms'
import { TRACK } from '@/types'

const Track:NextPage<any> = (props) => {
  const [showMenu, setShowMenu] = useState(false)

  const { song } = props

  const track: TRACK = {
    id: song.id,
    music: song.music,
    image: song.image,
    title: song.name,
    artist: song.artist,
  }

  return (
    <Layout title={song.name}>
      <div className='flex flex-col lg:flex-row items-center gap-4 md:gap-8 lg:items-end'>
        <img src={song.image} className='rounded-xl' width={300} alt={song.name} />
        <div className='flex flex-col items-center lg:items-start gap-3 md:gap-6'>
          <h1 className='text-white text-3xl lg:text-5xl font-bold text-balance'>{song.name}</h1>
          <h2 className='text-white text-base'>{song.artist}</h2>
        </div>
      </div>
      <div className='flex gap-5 items-center mx-2'>
          <BtnPlay songs={[track]} position={0} className='md:hover:scale-110 transition-all flex items-center justify-center gap-2 bg-green-600 p-5 text-white text-sm font-semibold rounded-full' showText={false} />
          <BtnLike song={track} className='p-4' />
      </div>
      <div className='mx-2'>
        <div className='relative flex justify-between items-center bg-green-600 rounded-md p-3 md:py-3 md:px-4'>
          <p className='font-semibold text-white'>{song.name}</p>
          <BtnOptionsSong position={0} songs={[track]} setShowMenu={setShowMenu} showMenu={showMenu} className='!static opacity-75' />
        </div>
      </div>
    </Layout>
  )
}

export default Track


export async function getServerSideProps({params}:any) {
  const id = String(params?.id)
  const song = await trackDetails(id)
  
  return { props: { song } }
}
 