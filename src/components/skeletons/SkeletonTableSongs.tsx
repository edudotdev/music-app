import React from 'react'

export const SkeletonTableSongs = () => {
  return (
    <div className='flex flex-col lg:mt-16'>
      {Array(20).fill('').map((i:number, index:number) => (
        <div key={index} className='w-full h-[61px] odd:bg-neutral-700/30 odd:animate-pulse'></div>
      ))}
    </div>
  )
}
