import { Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import localForage from "localforage";
import { TRACK } from '@/types'


interface BtnLikeProps {
  className?: string
  song: TRACK
}

export const BtnLike = ({
  className = '',
  song
}:BtnLikeProps) => {
  const [active, setActive] = useState(false)

  const handleClick = async () => {
    setActive(!active)

    if (!active) {
      localForage.getItem('likes')
        .then((result:any) => {
          if (result===null) { result = []}
          localForage.setItem('likes', [song, ...result])
        })
    } else {
      localForage.getItem('likes')
        .then((result:any) => {
          result = result.filter((items: TRACK) => items.id !== song.id)
          localForage.setItem('likes', result)
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
    <button onClick={handleClick} className={`p-2 ${active? 'grayscale-0' : 'grayscale'} ${className}`}>
      <Heart size={25} color="#ef4444" weight="fill" className='' />
    </button>
  )
}
