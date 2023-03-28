import Link from 'next/link'
import { PLAYLIST } from '@/types'
import { BtnPlay } from '@/components/atoms'
import { ThumbnailPlaylist } from '@/components/molecules'

interface CardPlaylistProps {
  playlist: PLAYLIST
}

export const CardPlaylist = ({
  playlist
}:CardPlaylistProps) => {
  return (
    <div key={playlist.uuid} className='relative flex flex-col w-auto aspect-square group hover:opacity-90'>
      <BtnPlay songs={playlist.song} className='absolute bg-green-500 p-4 rounded-full shadow-xl bottom-14 right-4 opacity-0 group-hover:opacity-100 transition-opacity' showText={false} />
      <div className='h-full rounded-xl overflow-hidden border-2 border-neutral-700 border-opacity-70'>
        <Link href={`/playlist/${playlist.uuid}`} className='active:scale-[.99]'>
          <ThumbnailPlaylist songs={playlist.song} />
        </Link>
      </div>
      <h2 className='text-white p-2'>{playlist.name}</h2>
    </div>
  )
}
