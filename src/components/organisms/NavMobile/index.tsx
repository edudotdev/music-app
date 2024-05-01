import { NavLink } from '@/components/molecules'
import { Disc, GlobeSimple, Heart, MagnifyingGlass, Playlist } from 'phosphor-react'
import { useRouter } from 'next/router'


export const NavMobile = () => {
  const router = useRouter()
  
  const colorIcon: string = '#fff'
  const colorIconActive: string = '#4ade80'
  const sizeIcon: number = 24
  
  return (
    <div className='fixed -bottom-0 z-[999999] md:hidden bg-[#0f0f0f] w-full p-0'>
      <div className='flex justify-around bg-white/10'>
        <NavLink variant='mobile' to='/search' text='Search'>
          <MagnifyingGlass size={sizeIcon} color={router.asPath === '/search'? colorIconActive : colorIcon} weight="fill" />
        </NavLink>
        {/* <NavLink variant='mobile' to='/' text='Discover'>
          <GlobeSimple size={sizeIcon} color={router.asPath === '/'? colorIconActive : colorIcon} weight="fill" />
        </NavLink>
        <NavLink variant='mobile' to='/for-you' text='For you'>
          <Disc size={sizeIcon} color={router.asPath === '/for-you'? colorIconActive : colorIcon} weight="fill" />
        </NavLink> */}
        <NavLink variant='mobile' to='/playlists' text='Playlists'>
          <Playlist size={sizeIcon} color={router.asPath === '/playlists'? colorIconActive : colorIcon} weight="fill" />
        </NavLink>
        <NavLink variant='mobile' to='/likes' text='likes'>
          <Heart size={sizeIcon} color={router.asPath === '/likes'? colorIconActive : colorIcon} weight="fill" />
        </NavLink>
      </div>
    </div>
  )
}
