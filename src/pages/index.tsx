import type { NextPage } from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  const router = useRouter();
  const user = null;

  useEffect(() => {
    if(!user) router.push('/login')
  }, [])
  
  return (
    <div>
      <Head>
        <title>My Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default IndexPage
