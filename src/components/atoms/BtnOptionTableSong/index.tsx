import useExternalClick from '@/hooks/useExternalClick'
import { DotsThreeOutline } from 'phosphor-react'
import { useRef, useState } from 'react'
import { BtnPlay, BtnPlayLast, BtnPlayNext } from '@/components/atoms'
import { MenuPlaylist } from '@/components/molecules'
import { TRACK } from '@/types'

interface BtnOptionTableSongProps {
  songs: TRACK[]
  index: number
}

export const BtnOptionTableSong = ({
  songs,
  index
}:BtnOptionTableSongProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const button = useRef(null)

  const handleClickOutside = () => {
    setTimeout(() => {
      setShowMenu(false)
    }, 100)
  }
  useExternalClick(button, handleClickOutside)
  
  return (
    <div className='grid place-items-center relative'>
      <button onClick={() => setShowMenu(!showMenu)} className='p-1.5 rounded-full hover:bg-neutral-600'>
        <DotsThreeOutline size={18} color="#fff" weight="fill" />
      </button>
      {showMenu &&
        <div ref={button} onClick={() => setShowMenu(!showMenu)} className='absolute right-12 top-0 rounded-md w-32 bg-neutral-900 text-white text-base shadow-2xl p-1 z-10'>
          <MenuPlaylist song={songs[index]} className='text-left p-1.5 hover:bg-neutral-700 text-sm rounded-md w-full' />
          <hr className='opacity-40' />
          <BtnPlay songs={songs} position={index} showIcon={false} className='text-left p-1.5 hover:bg-neutral-700 rounded-md w-full' />
          <BtnPlayNext song={songs[index]} className='text-left p-1.5 hover:bg-neutral-700 rounded-md w-full' /> 
          <BtnPlayLast song={songs[index]} className='text-left p-1.5 hover:bg-neutral-700 rounded-md w-full' />
        </div> 
      }
    </div>
  )
}