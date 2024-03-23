import React from 'react'
import Link from 'next/link';
import { MagnifyingGlass, CaretRight } from "phosphor-react";

export const BtnSearch = () => {
  return (
    <Link href="/search" className='font-semibold text-neutral-200 bg-black/40 rounded-xl p-4 text-sm flex mx-2 gap-4 items-center justify-between hover:bg-black/50'>
      <div className='flex gap-4 items-center'>
        <MagnifyingGlass size={25} color="#fff" weight="fill" />
        <span>Search</span>
      </div>
      <CaretRight size={16} color="#fff" weight="bold"  />
    </Link>
  )
}