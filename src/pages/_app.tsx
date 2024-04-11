import { PlayerMusic } from '@/components/organisms'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>   
      <Component {...pageProps} />
      <div className="fixed w-full bottom-10 md:bottom-0 z-50 bg-[#0f0f0f] px-0 py-0 md:py-2 lg:p-4 shadow-player">
        <PlayerMusic />
      </div>
      
    </>
  )

}
