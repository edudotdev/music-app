import { TRACK } from '@/types'
import { shuffle } from '@/services/shuffleSongs'
import { usePlayerIndexStore, usePlayerStore} from '@/store/playerStore'
import { useStatusShuffle } from '@/store/shuffleStore'
import { Play } from 'phosphor-react'

interface BtnPlayProps {
  className?: string
  songs: TRACK[]
  position?: number
  showText?: boolean
  showIcon?: boolean
}

export const BtnPlay = ({
  className,
  songs,
  position = 0,
  showText = true,
  showIcon = true
}:BtnPlayProps) => {
  const { setTrack } = usePlayerStore()
  const { setIndex } = usePlayerIndexStore()

  const { statusShuffle } = useStatusShuffle((state) => ({
    statusShuffle: state.statusShuffle
  }))

  const handleClick = () => {
    if (songs.length === 0) return
    if (statusShuffle && position !== undefined) {
      const selectSong = songs[position]
      let copySongs = [...songs]
      copySongs.splice(position, 1)
      copySongs = shuffle(copySongs)
      setTrack([selectSong, ...copySongs])
      setIndex(0)
    } else if(statusShuffle) {
      setTrack(shuffle([...songs]))
      setIndex(position)
    } else {
      setTrack(songs)
      setIndex(position)
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {showIcon && <Play size={16} color="#fff" weight="fill" />}
      {showText && <span>Play</span>}
    </button>
  )
}
