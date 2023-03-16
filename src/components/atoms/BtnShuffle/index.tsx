import { usePlayerIndexStore, usePlayerStore } from '@/store/playerStore'
import { TRACK } from '@/types'
import { ShuffleAngular } from 'phosphor-react'

interface BtnShuffleProps {
  className?: string
  songs: TRACK[] | undefined
}

export const BtnShuffle = ({
  className,
  songs
}:BtnShuffleProps) => {
  const {setTrack} = usePlayerStore()
  const {setIndex} = usePlayerIndexStore()

  const handleClick = async () => {
    if(songs?.length === 0) return
    setTrack(shuffle(songs || [ ]))
    setIndex(0)
  }

  const shuffle = (array: TRACK[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <button onClick={handleClick} className={className}>
      <ShuffleAngular size={20} color="#fff" weight="fill" />
      shuffle
    </button>
  )
}
