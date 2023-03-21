import { usePlayerStore, usePlayerIndexStore } from '@/store/playerStore'
import { useActionInfoStore } from '@/store/actionInfoStore'
import { TRACK } from '@/types'
import { shallow } from 'zustand/shallow'

interface BtnPlayNextProps {
  song: TRACK
}

export const BtnPlayNext = ({
  song
}:BtnPlayNextProps) => {
  const {tracks} = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const {index} = usePlayerIndexStore((state) => ({
    index: state.index
  }), shallow)

  const { setTextInfo } = useActionInfoStore()

  const handlePlayNext = () => {
    tracks.splice((index + 1), 0, song)

    setTextInfo({
      text: `Added to next in queue`,
      active: true
    })
  }

  return (
    <button onClick={handlePlayNext} className='text-white group flex gap-1.5 w-full items-center py-1.5 px-2 text-xs font-semibold hover:bg-neutral-400/10'>
      Play next
    </button>
  )
}
