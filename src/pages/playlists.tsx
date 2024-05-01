import { Layout } from '@/components/Layout'
import { CardPlaylist, NoPlaylists } from '@/components/molecules'
import { PLAYLIST } from '@/types'
import { usePlaylistsStore } from '@/store/playlistsStore'

export default function Playlists () {  
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }))

  return (
    <Layout title='Playlists'>
      {playlists?.length === 0 && <NoPlaylists />}
      
      <div className='grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mx-2'>
        {playlists?.map((playlist:PLAYLIST) => (
          <CardPlaylist key={playlist.uuid} playlist={playlist} />
        ))}
      </div>
    </Layout>
  )
}