import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import type { Session } from 'next-auth'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}
