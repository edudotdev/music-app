import React from 'react'
import { WaveSawtooth } from 'phosphor-react'
import Link from 'next/link'


export const Logo = () => {
  return (
    <Link href='/' className='flex gap-2 text-3xl font-bold text-white justify-center opacity-90'>
      <WaveSawtooth size={36} color="#fff" weight="fill" />
      <span>Zounds</span>
    </Link>
  )
}