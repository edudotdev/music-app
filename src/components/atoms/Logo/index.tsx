import React from 'react'
import { SpotifyLogo } from 'phosphor-react'


export const Logo = () => {
  return (
    <h1 className='flex gap-2 text-3xl font-bold text-white justify-center opacity-90'>
      <SpotifyLogo size={36} color="#fff" weight="fill" />
      <span>Musikc</span>
    </h1>
  )
}
