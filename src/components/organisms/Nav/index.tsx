'use client';

import React from 'react'
import { Logo } from '../../atoms/'
import { Search, NavLink } from '../../molecules/'
import { GlobeSimple, Disc, MicrophoneStage, UsersThree, Heart } from "phosphor-react";

export const Nav = () => {

  const colorIcon: string = '#dbeafe'

  const sizeIcon: number = 28
 
  return (
    <div className='flex flex-col gap-10 py-10 bg-neutral-800 bg-opacity-50 min-w-[260px] w-[260px] h-screen sticky top-0 before:block before:absolute before:w-5 before:h-5 before:rounded-full before:left-0 before:-top-10 before:bg-blue-500 before:shadow-before-nav lg:z-30'>
      <Logo />
      <Search />
      <div className='flex flex-col'>
        <h2 className='text-neutral-400 ml-6 pb-3 text-sm'>Explore</h2>
        <NavLink to='/' text='Discover'>
          <GlobeSimple size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
        <NavLink to='/for-you' text='For you'>
          <Disc size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
      </div>
      <div className='flex flex-col'>
        <h2 className='text-neutral-400 ml-6 pb-3 text-sm'>Trending</h2>
        <NavLink to='/artists' text='Artists'>
          <UsersThree size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
        <NavLink to='/songs' text='Songs'>
          <MicrophoneStage size={32} color={colorIcon} weight="fill" />
        </NavLink>
      </div>
      <div className='flex flex-col'>
        <h2 className='text-neutral-400 ml-6 pb-3 text-sm'>Your collection</h2>
        <NavLink to='/likes' text='Likes'>
          <Heart size={sizeIcon} color={colorIcon} weight="fill" />
        </NavLink>
      </div>
    </div>
  )
}
