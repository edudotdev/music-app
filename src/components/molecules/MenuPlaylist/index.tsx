import { TRACK, PLAYLIST } from '@/types'
import { addSong } from '@/crud/playlist'
import { ListPlus } from 'phosphor-react';
import { useActionInfoStore } from '@/store/actionInfoStore'
import { usePlaylistsStore, useModalPlaylist } from '@/store/playlistsStore';

interface MenuPlaylistProps {
  song: TRACK,
  className: string
}

export const MenuPlaylist = ({
  song,
  className
}:MenuPlaylistProps) => {
  const { setTextInfo } = useActionInfoStore()
  const { playlists } = usePlaylistsStore((state) => ({
    playlists: state.playlists
  }))

  const { setShowModal, setSong } = useModalPlaylist((state) => ({
    setShowModal: state.setShowModal,
    setSong: state.setSong
  }))

  const addSongToPlaylist = (playlist: PLAYLIST) => {
    addSong(playlist.uuid, song)
    setTextInfo({
      text:'Added to playlist',
      active: true
    })
  }

  const handleModalPlaylist = () => {
    setSong(song)
    setShowModal(true)
  }

  return (
    <div className='z-50 group/submenu order-3 md:order-1'>
      <button
        className={className}
      >Add to Playlist</button>
      <div className="md:absolute right-full w-full md:-translate-x-2 md:w-36 top-0 overflow-hidden after:w-5 after:h-full after:absolute after:invisible after:group-hover:visible after:left-full after:top-0">
        <div className='md:invisible group-hover/submenu:visible md:rounded-md bg-neutral-700 *:border-b *:border-b-neutral-600 last:border-b-none border border-neutral-600 shadow-xl flex flex-col gap-1'>
          <button onClick={handleModalPlaylist} className='text-white w-full flex justify-between hover:bg-neutral-400/40 gap-2 items-center py-1.5 px-2 whitespace-nowrap md:text-xs'>
            New playlist
            <ListPlus size={16} weight="bold" />
          </button>
          
          {playlists.length > 0 && 
            <span className='text-xs font-semibold text-neutral-400 px-2 !border-b-transparent text-start'>Recents</span>}
            <div className='max-h-[130px] md:max-h-[unset] overflow-y-auto'>
              {playlists.length > 0 && playlists.map((playlist:PLAYLIST) => (
                <button key={playlist.uuid} onClick={() => addSongToPlaylist(playlist)} className='cursor-pointer flex w-full text-start hover:bg-neutral-400/40 py-1.5 px-2 md:text-xs text-white' title={`playlist ${playlist.name}`}>
                  <span className='truncate'>{playlist.name}</span>
                </button>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}