import { DotsThreeOutline, FolderNotchPlus, PlayCircle } from 'phosphor-react'
import { ModalNewPlaylist } from '@/components/molecules/'
import { usePlayerStore } from '@/store/playerStore'
import { TRACK } from '@/types'


interface BtnOptionsSongProps {
  className?: string
  song: TRACK
  setText: (value: string) => void
  setShowMenu: (value: boolean) => void
  showMenu: boolean
}

export const BtnOptionsSong = ({
  className,
  song,
  setText,
  setShowMenu,
  showMenu
}:BtnOptionsSongProps) => {
  const {setTrack} = usePlayerStore()
  
  const handlePlay = () => {
    setTrack(song)
    setShowMenu(false)
  }

  return (
    <div className={`absolute group-hover:z-10 bottom-[88px] right-2 w-48 text-right ${className}`}>
      <div className="relative inline-block text-left">
        <div>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-neutral-900/70 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsThreeOutline size={25} color="#dbeafe" weight="fill" />
          </button>
        </div>
        {showMenu && (
          <div className="absolute right-0 bottom-[50px] mt-2 w-36 origin-bottom-right divide-y divide-gray-100 rounded-md bg-neutral-900/95 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
            <div className="py-2.5">
              <ModalNewPlaylist song={song} setText={setText} className={`text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 transition-[padding] font-semibold text-sm`} />
              <button onClick={handlePlay} className='text-blue-100 group flex gap-1.5 w-full items-center py-2 px-3 transition-[padding] font-semibold text-sm hover:bg-blue-300/20'>
                <PlayCircle size={17} color='#dbeafe' weight="fill" />
                <span>Play</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}