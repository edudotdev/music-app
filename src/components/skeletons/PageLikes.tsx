import React from 'react'

export const PageLikes = () => {

  return (
    <div className="mx-auto w-full max-w-screen-2xl flex flex-col gap-10"> 
      <div className="h-12 w-40 bg-neutral-700 animate-pulse"></div>
      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {Array(8).fill('').map((i:number, index:number) => (
          <div key={index} className='relative w-auto rounded-xl overflow-hidden'>
            <div className='w-[400px] h-auto max-w-full aspect-square bg-neutral-600 animate-pulse'></div>
            <div className='h-20 p-4 w-full flex flex-col justify-between bg-neutral-800 '>
              <p className='h-4 lg:h-5 w-24 bg-neutral-700 animate-pulse'></p>
              <p className='h-4 lg:h-5 w-16 bg-neutral-700 animate-pulse'></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
