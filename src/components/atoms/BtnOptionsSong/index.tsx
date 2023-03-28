import { DotsThreeOutline } from 'phosphor-react'
import { MenuPlaylist } from '@/components/molecules/'
import { BtnPlayLast, BtnPlay, BtnPlayNext } from '@/components/atoms'
import { TRACK } from '@/types'

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

  return (
    <div className={`absolute group-hover:z-10 bottom-[68px] right-2 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsThreeOutline size={20} color="#fff" weight="fill" />
        </button>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] py-2.5 mt-2 w-28 rounded-md bg-neutral-900/95 shadow-lg">
            <MenuPlaylist song={songs[position]} className='text-white py-1.5 px-2 text-xs w-full text-start font-semibold hover:bg-neutral-400/10' />
            <hr className='opacity-25' />
            {/* <BtnPlay songs={songs} position={position} showIcon={false} className='text-white group flex w-full items-center py-1.5 px-2 text-xs font-semibold hover:bg-neutral-400/10' /> */}
            <BtnPlayNext song={songs[position]} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-xs transition-[padding] font-semibold hover:bg-neutral-400/10' />
            <BtnPlayLast song={songs[position]} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-xs transition-[padding] font-semibold hover:bg-neutral-400/10' />
          </div>
        )}
      </div>
    </div>
  )
}