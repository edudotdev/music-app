import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import localForage from 'localforage'
import { TRACK } from '@/types'


export default function Playlist ()  {
  const router = useRouter()

  const [playlist, setPlaylists] = useState<any>()

  const uuid = router.query.id as string

  useEffect(() => {
    handlePlaylist(setPlaylists, uuid)
  }, [uuid])

  return (
    <Layout title='uwu'>
      {playlist&& (

      <div className='text-white'>
        <h2 className='text-4xl font-bold mb-3'>{playlist.name}</h2>
        {playlist && playlist.song.map((song:TRACK, index:number) => (
          <span key={index} className='flex flex-col'>
            {song.title}
          </span>
        ))}
      </div>
      )}
        
    </Layout>
  )
}

const handlePlaylist = async (setPlaylists:any, uuid: string) => {
  await localForage.getItem('playlists')
    .then((result:any) => {
      setPlaylists(result.find((playlist:any) => playlist.uuid === uuid))
    })
}
