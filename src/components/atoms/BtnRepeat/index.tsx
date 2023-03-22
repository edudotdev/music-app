import { Repeat, RepeatOnce } from 'phosphor-react'
import { useStatusRepeat } from '@/store/repeatStore'
import { shallow } from 'zustand/shallow'
import { Tooltip } from '@/components/molecules'

export const BtnRepeat = () => {
  const { statusRepeat } = useStatusRepeat((state) => ({
    statusRepeat: state.statusRepeat
  }), shallow)

  const { setStatusRepeat } = useStatusRepeat()

  const handleClick = () => {
    if(statusRepeat === 'inactive') {
      setStatusRepeat('repeat')
    } else if(statusRepeat === 'repeat') {
      setStatusRepeat('repeatOnce')
    } else {
      setStatusRepeat('inactive')
    }
  } 

  return (
    <button onClick={handleClick} className='relative'>
      {statusRepeat === 'inactive' &&  <Tooltip text='Enable repeat'><Repeat size={20} color="#fff" weight="bold" className='opacity-80 hover:opacity-100' /></Tooltip>}
      {statusRepeat === 'repeat' &&  <Tooltip text='Enable repeat'><Repeat size={20} color="#22c55e" weight="bold" /></Tooltip>}
      {statusRepeat === 'repeatOnce' &&  <Tooltip text='Disable repeat'><RepeatOnce size={20} color="#22c55e" weight="bold" /></Tooltip>}
      {statusRepeat === 'repeat' && <div className='h-1 w-1 rounded bg-[#22c55e] absolute left-1/2 -translate-x-1/2 bottom-0.5'></div> 
      || statusRepeat === 'repeatOnce' && <div className='h-1 w-1 rounded bg-[#22c55e] absolute left-1/2 -translate-x-1/2 bottom-0.5'></div>}
    </button>
  )
}