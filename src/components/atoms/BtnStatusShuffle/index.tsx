import { Tooltip } from '@/components/molecules'
import { useStatusShuffle } from '@/store/shuffleStore'
import localForage from 'localforage'
import { ShuffleAngular } from 'phosphor-react'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'


export const BtnStatusShuffle = () => {
  const { setStatusShuffle } = useStatusShuffle()
  const { statusShuffle } = useStatusShuffle((state) => ({
    statusShuffle: state.statusShuffle
  }), shallow)

  const handleClick = () => {
    setStatusShuffle(!statusShuffle)
  }
  
  return (
    <button onClick={handleClick} className='relative'>
      {statusShuffle? 
        <>
          <Tooltip text="Disable Shuffle">
            <ShuffleAngular size={20} color="#22c55e" weight="bold" />
          </Tooltip>
          <div className='h-1 w-1 rounded bg-[#22c55e] absolute left-1/2 -translate-x-1/2 bottom-0.5'></div> 
        </>
      :
        <Tooltip text="Enable Shuffle">
          <ShuffleAngular size={20} color="#ccc" weight="bold" />
        </Tooltip>}
    </button>
  )
}
