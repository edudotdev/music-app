import { Playlist } from 'phosphor-react'

interface AddedPlaylistInfoProps {
  namePlaylist: string
  className?: string
}

export const AddedPlaylistInfo = ({
  namePlaylist, 
  className
}:AddedPlaylistInfoProps) => {
  return (
    <div className={`flex items-center truncate gap-2 py-3 px-4 rounded-md bg-neutral-900/90 text-blue-100 absolute z-[9] left-2 text-sm bottom-[88px] w-full max-w-action-info transition-opacity duration-300 ${className}`}>
      <span>Added to</span>
      <span className='flex items-center gap-1.5 text-blue-300'>
        <Playlist size={17} color="#dbeafe" weight="fill" /> 
        {namePlaylist}
      </span>
    </div>
  )
}
