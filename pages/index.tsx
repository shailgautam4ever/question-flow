import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Login from '../components/Login'

import styles from '../styles/Home.module.css'

import Layout from '../components/Layout'
import UserSummary from '../components/UserSummary'
import Questions from '../components/Questions'

export default function Home() {
  const { data, status } = useSession()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (!data && status === 'unauthenticated') {
    return <Login />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <UserSummary />
        <Questions />
      </Layout>
    </div>
  )
}
