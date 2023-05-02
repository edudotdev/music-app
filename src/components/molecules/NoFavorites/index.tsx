import Link from 'next/link'
import { Heart } from 'phosphor-react'
import React from 'react'

export const NoFavorites = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-10 lg:mt-36'>
      <Heart size={130} color="#fff" weight="duotone" />
      <div className='flex flex-col gap-8'>
        <h2 className='text-2xl lg:text-4xl font-bold text-white'>Songs you like wil appear here</h2>
        <p className='text-neutral-400 self-center'>Save songs by tapping the heart</p>
        <Link href='/' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
          Discover music
        </Link>
      </div>
    </div>
  )
}
