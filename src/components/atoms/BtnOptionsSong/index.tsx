import { DotsThreeOutline } from 'phosphor-react'
import { MenuPlaylist } from '@/components/molecules/'
import { BtnPlayLast, BtnPlayNext } from '@/components/atoms'
import { TRACK } from '@/types'
import useExternalClick from '@/hooks/useExternalClick'
import { useRef } from 'react'

interface BtnOptionsSongProps {
  className?: string
  songs: TRACK[]
  position: number
  setShowMenu: (value: boolean) => void
  showMenu: boolean
}

export const BtnOptionsSong = ({
  className,
  songs,
  position,
  setShowMenu,
  showMenu
}:BtnOptionsSongProps) => {  
  const a = useRef(null)
  const handleClickOutside = () => {
    setTimeout(() => {
      setShowMenu(false)
    }, 100);
  }

  useExternalClick(a, handleClickOutside)
  return (
    <>
      <div className={`text-right ${className}`}>
        <button ref={a} onClick={() => setShowMenu(!showMenu)} className="p-1.5">
          <DotsThreeOutline size={16} color="#fff" weight="fill" />
        </button>
      </div>
      {showMenu && (
        <div className="fixed flex flex-col bottom-48 md:bottom-[unset] w-56 left-1/2 -translate-x-1/2 md:left-[unset] md:translate-x-[unset] md:absolute z-[1000] md:right-4 md:top-10 md:w-32 rounded-md  bg-neutral-700 *:border-b *:border-b-neutral-600 last:border-b-none border border-neutral-600 shadow-xl">
          <MenuPlaylist song={songs[position]} className='text-white py-1.5 px-2 text-base md:text-xs w-full text-start hover:bg-neutral-400/40 hidden md:block' />
          <BtnPlayNext song={songs[position]} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-base md:text-xs hover:bg-neutral-400/40 order-1 md:order-2' />
          <BtnPlayLast song={songs[position]} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-base md:text-xs hover:bg-neutral-400/40 border-none order-2 md:order-3' />
        </div>
      )}
      { showMenu && 
        <div className='fixed md:static bg-black/50 w-full h-full inset-0 z-30'></div>
      }
    </>
  )
}