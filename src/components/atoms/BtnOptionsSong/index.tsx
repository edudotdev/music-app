import { DotsThreeOutline, MusicNotesPlus, PlayCircle } from 'phosphor-react'
import { MenuPlaylist } from '@/components/molecules/'
import { BtnAddQueue, BtnPlayNext } from '@/components/atoms'
import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'
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
  const {setTrack} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const handlePlay = () => {
    setIndex(0)
    setTrack([song])
    setShowMenu(false)
  }

  return (
    <div className={`absolute group-hover:z-10 bottom-[88px] right-2 w-48 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsThreeOutline size={25} color="#dbeafe" weight="fill" />
        </button>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] py-2.5 mt-2 w-36 rounded-md bg-neutral-900/95 shadow-lg">
            <MenuPlaylist song={song} />
            <hr className='opacity-25' />
            <BtnAddQueue song={song} />
            <button onClick={handlePlay} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 font-semibold text-sm hover:bg-blue-300/20'>
              <PlayCircle size={20} color='#dbeafe' weight="fill" />
              <span>Play</span>
            </button>
            <BtnPlayNext song={song} />
          </div>
        )}
      </div>
    </div>
  )
}