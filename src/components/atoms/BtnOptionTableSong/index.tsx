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
      <button ref={button} onClick={() => setShowMenu(!showMenu)} className='p-1.5'>
        <DotsThreeOutline size={18} color="#fff" weight="fill" />
      </button>
      { showMenu &&
        <div className='fixed flex flex-col bottom-48 md:bottom-[unset] w-56 left-1/2 -translate-x-1/2 md:left-[unset] md:translate-x-[unset] md:absolute z-[1000] md:right-4 md:top-7 md:w-32 rounded-md  bg-neutral-700 *:border-b *:border-b-neutral-600 last:border-b-none border border-neutral-600 shadow-xl text-white md:text-xs'>
          <MenuPlaylist song={songs[index]} className='text-white py-1.5 px-2 text-base md:text-xs w-full text-start hover:bg-neutral-400/40 hidden md:block' />
          {/* <BtnPlay songs={songs} position={index} showIcon={false} className='text-left p-1.5 hover:bg-neutral-400/40 w-full' /> */}
          <BtnPlayNext song={songs[index]} className='text-left p-1.5 hover:bg-neutral-400/40 w-full order-1 md:order-2' /> 
          <BtnPlayLast song={songs[index]} className='text-left p-1.5 hover:bg-neutral-400/40 w-full order-2 md:order-3' />
        </div> 
      }
      { showMenu && 
        <div className='fixed md:static bg-black/50 w-full h-full inset-0 z-30'></div>
      }
    </div>
  )
}