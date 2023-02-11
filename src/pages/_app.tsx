import { PlayerMusic } from '@/components/organisms'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>   
      <Component {...pageProps} />
      <div className="fixed w-full lg:max-w-player bottom-0 right-0 bg-[#0f0f0f] p-4 overflow-hidden shadow-player">
        <PlayerMusic />
      </div>
    </div>
  )

}
