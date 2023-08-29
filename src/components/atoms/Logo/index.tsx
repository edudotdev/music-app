import React from 'react'
import { WaveTriangle  } from 'phosphor-react'


export const Logo = () => {
  return (
    <h1 className='flex gap-2 text-3xl font-bold text-white justify-center opacity-90'>
      <WaveTriangle  size={36} color="#fff" weight="duotone" />
      <span>Zounds</span>
    </h1>
  )
}
