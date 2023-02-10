import '@/styles/globals.css'
import { Nav, PlayerMusic } from '@/components/organisms/'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className='bg-neutral-900'>
        <div className="flex">
          <Nav />
          <div className="max-h-content w-full overflow-y-auto content p-14">
            <div className='mx-auto w-full max-w-screen-2xl flex flex-col gap-10'>
              {children}
            </div>
          </div>
        </div>
        <div className="fixed w-full lg:max-w-player bottom-0 right-0 bg-[#0f0f0f] p-4 overflow-hidden shadow-player">
          <PlayerMusic />
        </div>
      </body>
    </html>
  )
}
