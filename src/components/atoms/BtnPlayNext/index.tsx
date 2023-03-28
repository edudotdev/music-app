import { usePlayerStore, usePlayerIndexStore } from '@/store/playerStore'
import { useActionInfoStore } from '@/store/actionInfoStore'
import { TRACK } from '@/types'
import { shallow } from 'zustand/shallow'

interface BtnPlayNextProps {
  song: TRACK
  className: string
}

export const BtnPlayNext = ({
  song,
  className
}:BtnPlayNextProps) => {
  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }))

  const {index} = usePlayerIndexStore((state) => ({
    index: state.index
  }))

  const { setTextInfo } = useActionInfoStore()

  const handlePlayNext = () => {
    tracks.splice((index + 1), 0, song)

    setTextInfo({
      text: `Added to next in queue`,
      active: true
    })
  }

  return (
    <button onClick={handlePlayNext} className={className}>
      Play next
    </button>
  )
}
