import { MusicNoteSimple } from 'phosphor-react'
import Link from 'next/link';

interface CurrentMusicProps {
  image: string
  title: string
  artist: string
  id: string
}

export const CurrentMusic = ({
  image,
  title, 
  artist,
  id
}: CurrentMusicProps) => {
  return (
    <div className='absolute lg:static -top-[52px] md:-top-[60px] lg:top-0 flex min-w-[280px] items-center w-full lg:w-[unset] p-1.5 lg:p-0 bg-neutral-800 lg:bg-transparent overflow-hidden' >
      <div className='bg-neutral-800 w-[40px] lg:w-[60px] lg:h-[60px] aspect-square grid place-content-center z-10'>
        {
          image.length > 0 
            ? <img src={image} width={60} height={60} alt={title} className="rounded-md aspect-square" />          
            : <MusicNoteSimple size={30} color="#aaa" weight="fill" />
        }
      </div>
      <div className="flex flex-col items-center justify-center pl-2 lg:pl-4 z-10">
        <div className='flex flex-col lg:gap-1.5'>
          <Link href={`/track/${id}`}>
            <h2 className='text-neutral-100 text-xs lg:text-sm font-semibold hover:underline'>{title}</h2>
          </Link>
          <h3 className='text-neutral-400 text-xs'>{artist}</h3>
        </div>
      </div>
      {image.length > 0 && <img src={image} width={60} height={60} alt={title} className="w-full block lg:hidden absolute blur-2xl opacity-20 pointer-event-none z-0 saturate-200 mix-blend-lighten" /> }
    </div>
  )
}
