import { TRACK } from '@/types'
import { DotsThreeOutline, Play } from 'phosphor-react'
import React from 'react'
import Image from 'next/image'

interface TablePlaylistProps {
  songs: TRACK[]
}

export const TablePlaylist = ({
  songs
}:TablePlaylistProps) => {
  return (
    <div className="mx-auto mt-4 w-full overflow-x-auto md:rounded-md md:shadow-sm lg:block">
      <table className="whitespace-no-wrap w-full table-fixed text-left">
        <thead>
          <tr className="hidden md:table-row">
            <th className="relative w-10/12 text-white px-4 py-5 table-cell">Song</th>
            <th className="relative w-10/12 text-white py-5 table-cell">Artist</th>
            <th className="relative w-2/12 text-white py-5 table-cell"></th>
          </tr>
        </thead>
        <tbody className=" [&>:nth-child(odd)]:bg-neutral-700/70">
          {songs.map((song: TRACK, index: number) => (
            <tr key={index} className="table-row rounded-lg overflow-hidden hover:bg-neutral-600">
              <td onClick={() => console.log('uwu')} className="group truncate w-11/12 px-5 py-3 text-xs lg:text-base text-white table-cell md:py-4">
                <div className='flex items-center gap-4'>
                  <div className='relative rounded-md overflow-hidden cursor-pointer min-h-[45px] min-w-[45px]'>
                    <div className='absolute invisible group-hover:visible grid w-full h-full place-items-center bg-neutral-900/80'>
                      <Play size={18} color="#fff" weight="fill" />
                    </div>
                    <Image src={song.image} height={45} width={45} alt={song.title} className=' aspect-square' />
                  </div>
                  <div className='flex flex-col'>
                    <span>{song.title}</span>
                    <span className='block md:hidden text-neutral-300 truncate'>{song.artist}</span>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell relative text-xs lg:text-base truncate mx-4 py-3 align-middle text-neutral-400 md:py-4 md:pl-0 ">{song.artist}</td>
              <td className="text-xs lg:text-base truncate relative pr-5 py-3 align-right text-neutral-300 md:py-4 text-right">
               <div className='flex justify-end'>
                <DotsThreeOutline size={18} color="#fff" weight="fill" />
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}
