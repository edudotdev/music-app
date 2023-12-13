import { TRACK } from '@/types'
import React, { useState, useRef } from 'react'
import { BtnPlay, BtnLike, BtnOptionTableSong } from '@/components/atoms'
import useExternalClick from '@/hooks/useExternalClick'

interface TablePlaylistProps {
  songs: TRACK[]
}

export const TableTopSongs = ({
  songs
}:TablePlaylistProps) => {
  const [active, setActive] = useState<number | boolean>()
  const row = useRef(null)

  const handleClickOutside = () => setActive(false)
  useExternalClick(row, handleClickOutside)
  const handleActiveRow = (index:number) => setActive(index)

  return (
    <div className="mx-auto w-full overflow-x-auto md:rounded-md md:shadow-sm lg:block">
      <table className="whitespace-no-wrap w-full table-fixed text-left">
        <thead>
          <tr className="hidden lg:table-row">
            <th className="relative w-10 text-white px-4 py-5 table-cell">#</th>
            <th className="relative w-full text-white px-4 py-5 table-cell">Song</th>
            <th className="relative w-full text-white py-5 table-cell">Artist</th>
            <th className="relative w-12 text-white py-5 table-cell"></th>
            <th className="relative w-12 text-white py-5 table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song: TRACK, index: number) => (
            <tr ref={row} onClick={() => handleActiveRow(index)} key={index} className={`group table-row rounded-lg overflow-hidden  ${active ===  index? 'bg-neutral-500 [&>:nth-child(2)]:text-white' : 'hover:bg-neutral-600/40 odd:bg-neutral-700/30'}`}>
              <td className='p-1.5 md:p-2.5 text-white text-xs sm:text-base w-8 text-center'>{index+1}</td>
              <td className="truncate p-1.5 md:p-2.5 w-full text-xs lg:text-base text-white table-cell md:py-2">
                <div className='flex items-center gap-4'>
                  <div className='relative rounded-md overflow-hidden cursor-pointer min-h-[45px] min-w-[45px]'>
                    <BtnPlay showText={false} songs={[...songs]} position={index} className='absolute invisible group-hover:visible grid w-full h-full place-items-center bg-neutral-900/80' />
                    <img src={song.image} height={45} width={45} alt={song.title} className='aspect-square' />
                  </div>
                  <div className='flex flex-col'>
                    <span>{song.title}</span>
                    <span className='block lg:hidden text-neutral-300 truncate'>{song.artist}</span>
                  </div>
                </div>
              </td>
              <td className="hidden lg:table-cell relative text-xs lg:text-base truncate p-1.5 md:p-2.5 align-middle text-neutral-400 md:py-2 ">{song.artist}</td>
              <td className="text-xs lg:text-base relative py-1 px-1 text-neutral-300 md:py-2 text-right">
                <div className='flex justify-end'>
                  <BtnLike song={song} className='bg-transparent scale-[0.8]' />
                </div>
              </td>
              <td className="table-cell w-12 relative">
                <BtnOptionTableSong songs={[...songs]} index={index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
