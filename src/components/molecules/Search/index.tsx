'use client'
import { useState } from 'react'
import { MagnifyingGlass } from "phosphor-react";
import router from 'next/router';

export const Search = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setInputValue('')
    router.push(`/search?song=${inputValue.toLocaleLowerCase().trim()}`)
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className=''>
      <div className='bg-white/90 w-full flex gap-3 text-base p-3 rounded-lg'>
        <MagnifyingGlass size={30} color="#000" weight="fill" />
        <input 
          className='bg-transparent outline-none text-black w-full'
          type="text" value={inputValue} onChange={e => handleChange(e)} placeholder='Search artists or songs'   
        />
      </div>
    </form>
  )
}
