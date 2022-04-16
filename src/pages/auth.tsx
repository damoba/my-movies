import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles/Login.module.css";

const AuthPage: NextPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <div className={styles.gradient}></div>
        <span className={styles.logo}>My Movies</span>
        <div className={styles.mainBody}>
          <form className={styles.form}>
            <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
            <input placeholder="Email" type="email" />
            <input placeholder="Password" type="password" />
            {isSignUp && (
              <input placeholder="Repeat Password" type="password" />
            )}
            <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
