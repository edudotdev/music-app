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
    setInputValue('')
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className='mx-4'>
      <div className='bg-white/10 w-full flex gap-3 text-sm text-blue-200 p-4 rounded-2xl'>
        <MagnifyingGlass size={28} color="#fff" weight="fill" />
        <input 
          className='bg-transparent outline-none text-gray-200 w-full'
          type="text" value={inputValue} onChange={e => handleChange(e)} placeholder='search music'   
        />
      </div>
    </form>
  )
}
