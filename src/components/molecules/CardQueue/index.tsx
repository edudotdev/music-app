import { usePlayerStore, usePlayerIndexStore } from '@/store/playerStore'
import Image from 'next/image'
import { TRACK } from '@/types'
import React from 'react'
import { shallow } from 'zustand/shallow'
import { MusicNotes } from 'phosphor-react'

export const CardQueue = () => {
  const { tracks } = usePlayerStore((state) => ({
    tracks: state.tracks
  }), shallow)

  const {indexS} = usePlayerIndexStore((state) => ({
    indexS: state.index
  }), shallow)

  const {setIndex} = usePlayerIndexStore()

  return (
    <div className='bg-neutral-900 border-2 border-neutral-800/90 py-2 shadow-xl rounded-lg grid max-h-72 overflow-y-auto'>
      {tracks[0].id.length > 0 && tracks?.map((song: TRACK, index: number) =>  (
        <button key={index} onClick={() => setIndex(index)} className='relative w-[350px] gap-3 text-start flex justify-between hover:bg-neutral-700/90 p-3'>
          <div className='flex gap-2 h-full items-center'>
            <Image src={song.image} width={45} height={45} alt={song.title} className='rounded-md' />
            <div className='flex flex-col'>
              <span className={`${indexS === index ? 'text-green-500' : 'text-white'} text-sm`}>{song.title}</span>
              <span className='text-xs text-neutral-400'>{song.artist}</span>
            </div>
          </div>
          {indexS === index && (
            <div className='absolute h-2 w-2 right-3 self-center bg-green-500 rounded-full'></div>
          )}
        </button>
      ))}
      {tracks[0].id.length === 0 && (
        <div className='w-80 flex items-center gap-3 px-2'>
          <div className='bg-neutral-800 rounded-lg w-[45px] min-w-[45px] aspect-square grid place-content-center'>
            <MusicNotes size={20} color="#aaa" weight="fill" />
          </div>
          <span className='text-neutral-300'>No playing music</span>
        </div>
      )}

    </div>
  )
}
