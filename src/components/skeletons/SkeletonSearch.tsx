import { Heart } from "phosphor-react";

export const SkeletonSearch = () => {

  return (
    <div className='flex flex-col'>
      {Array(5).fill('').map((e: any, index:number) => (
        <div key={index} className='flex items-center gap-1 relative w-auto overflow-hidden h-[56px] p-1 bg-neutral-600 animate-pulse'>
          <Heart size={25} color="#ccc" weight="fill" className='w-[41px]' />
          <div className='min-w-[45px] h-[45px] rounded-md bg-neutral-900/70'></div>
          <div className='flex flex-col gap-1 justify-center h-[45px] w-full'>
            <p className='ml-1 h-3 w-44 bg-neutral-900/70'></p>
            <p className='ml-1 h-3 w-28 bg-neutral-900/70'></p>
          </div>
        </div>
      ))}
    </div>
  )
}
