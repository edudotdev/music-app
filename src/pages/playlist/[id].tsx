import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { PLAYLIST } from '@/types'
import { ThumbnailPlaylist } from '@/components/molecules'
import { ArrowLeft } from 'phosphor-react'
import { getPlaylistByUUID } from '@/services/playlists'
import { BtnPlay, BtnShuffle } from '@/components/atoms'
import { TablePlaylist } from '@/components/organisms'
import Link from 'next/link'

export default function Playlist ()  {
  const router = useRouter()

  const [playlist, setPlaylist] = useState<PLAYLIST>()

  const uuid = router.query?.id as string

  useEffect(() => {
    handlePlaylist(uuid)
  }, [uuid])

  const handlePlaylist = async (uuid: string) => {
    const data = await getPlaylistByUUID(uuid)
    setPlaylist(data)
  }
  
  return (
    <Layout title={playlist?.name || uuid}>
      <Link href='/playlists' className='bg-white/20 hover:bg-white/30 rounded-full p-2 self-start'>
        <ArrowLeft size={25} color="#fff" weight="bold" />
      </Link>
     {playlist && (
      <div className='flex flex-col lg:flex-row items-center lg:items-end gap-5 lg:gap-10'>
        <div className='min-w-[300px] max-w-[350px] rounded-xl overflow-hidden aspect-square'>
          <ThumbnailPlaylist songs={playlist.song} />
        </div>
        <div className='flex flex-col items-center lg:items-start gap-2 lg:gap-5 w-full'>
          <h1 className='w-full text-center lg:text-left sm:text-2xl lg:text-4xl font-bold text-white bg-transparent'>{playlist.name}</h1> 
          <h3 className='text-lg text-neutral-300'>{playlist.song.length} Songs</h3>
          <div className='flex items-center gap-2.5'>
            <BtnPlay songs={[...playlist.song]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
            <BtnShuffle songs={[...playlist.song]} className='flex items-center justify-center gap-2 bg-green-600 py-2 w-32 text-white text-sm font-semibold rounded-md' />
          </div>
        </div>
      </div>)}
      
      {playlist && <TablePlaylist songs={playlist.song} />}
    </Layout>
  )
}