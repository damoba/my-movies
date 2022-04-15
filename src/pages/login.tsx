import type { NextPage } from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'

import styles from '../styles/Login.module.css'

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello world
    </div>
  )
}

export default LoginPage
