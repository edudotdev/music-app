import { DotsThreeOutline } from 'phosphor-react'
import { MenuPlaylist } from '@/components/molecules/'
import { BtnPlayLast, BtnPlay, BtnPlayNext } from '@/components/atoms'
import { TRACK } from '@/types'

interface BtnOptionsSongProps {
  className?: string
  song: TRACK
  setShowMenu: (value: boolean) => void
  showMenu: boolean
}

export const BtnOptionsSong = ({
  className,
  song,
  setShowMenu,
  showMenu
}:BtnOptionsSongProps) => {  

  return (
    <div className={`absolute group-hover:z-10 bottom-[68px] right-2 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsThreeOutline size={25} color="#fff" weight="fill" />
        </button>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] py-2.5 mt-2 w-28 rounded-md bg-neutral-900/95 shadow-lg">
            <MenuPlaylist song={song} />
            <hr className='opacity-25' />
            <BtnPlay songs={[song]} showIcon={false} className='text-white group flex w-full items-center py-1.5 px-2 text-xs font-semibold hover:bg-neutral-400/10' />
            <BtnPlayNext song={song} />
            <BtnPlayLast song={song} />
          </div>
        )}
      </div>
    </div>
  )
}