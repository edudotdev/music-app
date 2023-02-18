import Image from 'next/image'
import { usePlayerStore } from '@/store/playerStore'
import { BtnLike, BtnOptionsSong, AddedPlaylistInfo } from '@/components/atoms'
import { useState } from 'react';
import { TRACK } from '@/types'

interface CardSongProps {
  song: TRACK
}

export const CardSong = ({
  song: {id, music, title, artist, image}
}:CardSongProps) => {
  const [text, setText] = useState('')
  const {setTrack} = usePlayerStore()
  const [showMenu, setShowMenu] = useState(false)

  const handlePlay = () => {
    setTrack({
      id,
      music,
      title,
      artist,
      image
    })
  }

  return (
    <div className='relative group' onMouseLeave={() => setShowMenu(false)}>
      <BtnLike song={{id,music,title, artist,image}} className='absolute group-hover:z-10 opacity-0 group-hover:opacity-100 right-2 top-2 transition-all'  />
      <BtnOptionsSong song={{id,music,title, artist,image}} setShowMenu={setShowMenu} showMenu={showMenu} setText={setText} className='opacity-0 group-hover:opacity-100 transition-all' />
      <AddedPlaylistInfo namePlaylist={text} className={`${Boolean(text.length)? 'group-hover:opacity-100 visible' : 'invisible opacity-0'}`} />
      <div onClick={handlePlay} className='relative cursor-pointer rounded-xl overflow-hidden active:scale-[.99] transition-transform'>
        <Image src={image} width={400} height={400} className='w-full' alt={title} />
        <div className='h-20 relative overflow-hidden rounded-b-xl'>
          <Image src={image} width={400} height={400} className='absolute h-[900px] saturate-150 -bottom-9 blur-2xl' quality={1} alt={title} />
        </div>
        <div className='absolute bottom-0 p-4 flex flex-col justify-between bg-neutral-800 bg-opacity-25 w-full left-1/2 -translate-x-1/2 h-20 backdrop-blur-md'>
          <p className='text-white/90 font-bold text-base lg:text-lg truncate'>{title}</p>
          <p className='text-white/75 text-xs lg:text-sm font-semibold truncate'>{artist}</p>
        </div>
      </div>
    </div>
  )
}
