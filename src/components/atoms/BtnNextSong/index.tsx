import { Tooltip } from '@/components/molecules'
import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'
import { SkipForward } from 'phosphor-react'
import { shallow } from 'zustand/shallow'

interface BtnNextSongProps {
  nextSong: () => void
}

export const BtnNextSong = ({
  nextSong
}:BtnNextSongProps) => {

  return (
    <button onClick={nextSong} className='p-2 opacity-75 hover:opacity-100'>
      <Tooltip text="Next">
        <SkipForward size={20} color="#fff" weight="fill" />
      </Tooltip>  
    </button>
  )
}
