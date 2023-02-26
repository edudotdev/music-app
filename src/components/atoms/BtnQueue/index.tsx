import { Queue } from 'phosphor-react'
import { CardQueue } from '@/components/molecules'
import { useState } from 'react'

export const BtnQueue = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='relative self-center'>
      <button onClick={() => setShowMenu(!showMenu)} className="relative p-2 opacity-75 hover:opacity-100">
        <Queue size={28} color="#fff" weight="fill" />
      </button>
      {showMenu && (
        <div onMouseLeave={() => setShowMenu(false)} className='absolute flex flex-col text-white bottom-16 right-0'>
          <CardQueue />
        </div>
      )}
    </div>
  )
}
