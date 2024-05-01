import Link from 'next/link'
import { Playlist } from 'phosphor-react'

export const NoPlaylists = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-10 lg:mt-36'>
      <Playlist size={130} color="#fff" weight="duotone" />
      <div className='flex flex-col gap-4 lg:gap-8'>
        <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-white'>Playlist you create wil appear here</h2>
        <p className='text-neutral-400 self-center'>Create playlists to organize your music</p>
        <Link href='/search' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
          Find music
        </Link>
      </div>
    </div>
  )
}
