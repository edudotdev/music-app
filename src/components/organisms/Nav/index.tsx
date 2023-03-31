import React from 'react'
import { Logo } from '../../atoms/'
import { Search, NavLink } from '../../molecules/'
import { GlobeSimple, Disc, MagnifyingGlass, Heart, Playlist, Books } from "phosphor-react";

export const Nav = () => {
  const colorIcon: string = '#fff'
  const sizeIcon: number = 25
 
  return (
    <div className='hidden md:flex flex-col gap-8 py-10 bg-neutral-900/60 bg-opacity-50 min-w-[200px] w-[280px] h-screen sticky top-0 before:block before:absolute before:w-5 before:h-5 before:rounded-full before:left-0 before:-top-10 before:bg-green-500 before:shadow-before-nav lg:z-30'>
      <Logo />
      {/* <Search /> */}
      <NavLink variant='desktop' to='/search' text='Search'>
          <MagnifyingGlass size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
      <div className='flex flex-col'>
        
        <h2 className='text-neutral-400 ml-6 pb-2 text-sm'>Explore</h2>
        <NavLink variant='desktop' to='/' text='Discover'>
          <GlobeSimple size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
        <NavLink variant='desktop' to='/for-you' text='For you'>
          <Disc size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
      </div>
      <div className='flex flex-col'>
        <h2 className='text-neutral-400 ml-6 pb-2 text-sm'>Your collection</h2>
        <NavLink variant='desktop' to='/playlists' text='Playlists'>
          <Playlist size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
        <NavLink variant='desktop' to='/likes' text='Likes'>
          <Heart size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
      </div>
      <hr className='opacity-30 mx-5' />
      <div className='flex flex-col'>
        
      </div>
    </div>
  )
}
