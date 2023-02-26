import { Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import localForage from "localforage";
import { TRACK } from '@/types'
import { useActionInfoStore } from '@/store/actionInfoStore'

interface BtnLikeProps {
  className?: string
  song: TRACK
}

export const BtnLike = ({
  className = '',
  song
}:BtnLikeProps) => {
  const [active, setActive] = useState(false)
  const { setTextInfo } = useActionInfoStore()

  const handleClick = async () => {
    setActive(!active)

    if (!active) {
      localForage.getItem('likes')
        .then((result:any) => {
          if (result===null) { result = []}
          localForage.setItem('likes', [song, ...result])
          setTextInfo({
            text:'Added to your liked songs',
            active: true
          })
        })
    } else {
      localForage.getItem('likes')
        .then((result:any) => {
          result = result.filter((items: TRACK) => items.id !== song.id)
          localForage.setItem('likes', result)
          setTextInfo({
            text:'Removed from your liked songs',
            active: true
          })
        })
    }
  }
  useEffect(() => {
    localForage.getItem('likes')
      .then((result:any) => {
        if (result === null) return
        result.find((item:TRACK) => item.id === song.id) && setActive(true)
      })
  }, [song])

  return (
    <button onClick={handleClick} className={`p-2 hover:scale-110 transition-all bg-neutral-900/90 rounded-full ${active? 'grayscale-0' : 'grayscale'} ${className}`}>
      <Heart size={25} color="#ef4444" weight="fill" className='' />
    </button>
  )
}
