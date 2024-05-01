import { TRACK } from '@/types'
import React, { useState, useRef } from 'react'
import { BtnOptionsSong, BtnPlay } from '@/components/atoms'
import useExternalClick from '@/hooks/useExternalClick'
import Link from 'next/link'

interface TablePlaylistProps {
  songs: TRACK[]
  uuid: string
}

export const TablePlaylist = ({
  songs,
  uuid
}:TablePlaylistProps) => {
  const [active, setActive] = useState<number | boolean>()
  const row = useRef(null)
  const handleClickOutside = () => setActive(false)
  const handleActiveRow = (index:number) => setActive(index)

  useExternalClick(row, handleClickOutside)

  return (
    <div className="mx-auto mt-4 w-full md:rounded-md md:shadow-sm lg:block">
      <table className="whitespace-no-wrap w-full table-fixed text-left">
        <thead>
          <tr className="hidden lg:table-row">
            <th className="relative w-full text-white px-4 py-5 table-cell">Song</th>
            <th className="relative w-full text-white py-5 table-cell">Artist</th>
            <th className="relative w-2/12 text-white py-5 table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song: TRACK, index: number) => (
            <tr ref={row} onClick={() => handleActiveRow(index)} key={index} className={`group table-row rounded-lg ${active ===  index? 'bg-neutral-500 [&>:nth-child(2)]:text-white' : 'hover:bg-neutral-600/40 odd:bg-neutral-700/30'}`}>
              <td className="truncate w-11/12 p-1.5 md:p-2.5 text-xs lg:text-base text-white table-cell md:py-2">
                <div className='flex items-center gap-4'>
                  <div className='relative rounded-md overflow-hidden cursor-pointer min-h-[45px] min-w-[45px]'>
                    <BtnPlay showText={false} songs={songs} position={index} className='absolute invisible group-hover:visible grid w-full h-full place-items-center bg-neutral-900/80' />
                    <img src={song.image} height={45} width={45} alt={song.title} className='aspect-square' />
                  </div>
                  <div className='flex flex-col'>
                    <Link href={`/track/${song.id}`} className='group/text'>
                    <div className='bottom-0 py-2.5 flex flex-col truncate justify-between'>
                      <p className='text-white/90 font-bold text-sm truncate group-hover/text:underline'>{song.title}</p>
                      <p className='text-white/75 text-xs font-semibold truncate lg:hidden'>{song.artist}</p>
                    </div>
                    </Link>
                    {/* <span className='block lg:hidden text-neutral-300 truncate'>{song.artist}</span> */}
                  </div>
                </div>
              </td>
              <td className="hidden lg:table-cell relative text-xs lg:text-base truncate p-1.5 md:p-2.5 align-middle text-neutral-400 md:py-2 md:pl-0 ">{song.artist}</td>
              <td className="text-xs lg:text-base relative pr-5 py-1.5 align-right text-neutral-300 md:py-2 text-right">
                <div className='flex justify-end'>
                  <div className=''>
                    <BtnOptionsSong songs={[...songs]} position={index} playlistUuid={uuid} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
