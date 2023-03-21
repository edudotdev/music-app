import { Repeat, RepeatOnce } from 'phosphor-react'
import { useStatusRepeat } from '@/store/repeatStore'
import { shallow } from 'zustand/shallow'

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
      {statusRepeat === 'inactive' &&  <Repeat size={20} color="#fff" weight="bold" className='opacity-80 hover:opacity-100' />}
      {statusRepeat === 'repeat' &&  <Repeat size={20} color="#22c55e" weight="bold" />}
      {statusRepeat === 'repeatOnce' &&  <RepeatOnce size={20} color="#22c55e" weight="bold" />}
      {statusRepeat === 'repeat' && <div className='h-1 w-1 rounded bg-[#22c55e] absolute left-1/2 -translate-x-1/2 bottom-0.5'></div> 
      || statusRepeat === 'repeatOnce' && <div className='h-1 w-1 rounded bg-[#22c55e] absolute left-1/2 -translate-x-1/2 bottom-0.5'></div>}
    </button>
  )
}