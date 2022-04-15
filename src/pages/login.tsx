import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <div className={styles.navbar}>
          <span className={styles.logo}>My Movies</span>
          <div className={styles.gradient}></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
