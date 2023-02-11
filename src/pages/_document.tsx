import { Html, Head, Main, NextScript } from 'next/document'
import { PlayerMusic } from '@/components/organisms'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
