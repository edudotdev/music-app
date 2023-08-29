import Link from 'next/link'
import { PauseCircle, Play } from 'phosphor-react'
import React from 'react'

export const e404 = () => {
  return (
    <main className='grid h-screen w-full place-items-center'>
      <section className='flex flex-col gap-8'>
        <div className='flex justify-center'>
          <span className='text-8xl text-[#4ade80]'>4</span>
          <PauseCircle size={90} color="#4ade80" className='relative top-1' />
          <span className='text-8xl text-[#4ade80]'>4</span>
        </div>
        <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-white'>
          Ooops! No Page Found!
        </h2>
        <Link href='/' className='bg-white text-neutral-700 font-semibold rounded-full py-2.5 px-5 self-center'>
          Go home
        </Link>
      </section>
    </main>
  )
}

export default e404