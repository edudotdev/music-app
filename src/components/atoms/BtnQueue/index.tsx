import { Queue } from 'phosphor-react'
import { CardQueue } from '@/components/molecules'
import { useState, useRef } from 'react'
import useExternalClick from '@/hooks/useExternalClick'

export const BtnQueue = () => {
  const [showMenu, setShowMenu] = useState(false)
  const cardQueue = useRef(null);

  const handleClickOutside = () => {
    setShowMenu(false)
  };

  useExternalClick(cardQueue, handleClickOutside)

  return (
    <div className='relative self-center'>
      <button onClick={() => setShowMenu(!showMenu)} className="relative p-2 opacity-75 hover:opacity-100">
        <Queue size={28} color="#fff" weight="fill" />
      </button>
      {showMenu && (
        <div ref={cardQueue} className='absolute flex flex-col text-white bottom-16 right-0'>
          <CardQueue />
        </div>
      )}
    </div>
  )
}
