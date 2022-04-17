import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import styles from "../styles/Login.module.css";

const AuthPage: NextPage = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingMain, setIsLoadingMain] = useState<boolean>(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState<boolean>(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLElement>) => {
    setShowPassword(!showPassword);
  };

  const handleAuthType = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gradient}></div>

      <header>
        <span className={styles.logo}>My Movies</span>
      </header>

      <main className={styles.main}>
        <form className={styles.form}>
          <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
          <input placeholder="Email" type="email" />
          <span
            className={styles.showPasswordToggler}
            onClick={handleShowPassword}
          >
            {!showPassword ? (
              <>
                <Visibility />{" "}
                <span className={styles.showPasswordText}>Show</span>
              </>
            ) : (
              <>
                <VisibilityOff />{" "}
                <span className={styles.showPasswordText}>Hide</span>
              </>
            )}
          </span>
          <input
            placeholder="Password"
            type={!showPassword ? "password" : "text"}
          />
          <button
            type="submit"
            style={
              !isSignUp
                ? { backgroundColor: "#3cb19f" }
                : { backgroundColor: "#ec215f" }
            }
            disabled={isLoadingMain}
          >
            {!isLoadingMain
              ? isSignUp
                ? "Sign Up"
                : "Log In"
              : isSignUp
              ? "Signing up..."
              : "Logging in..."}
          </button>
          {!isSignUp && (
            <button className={styles.guest} disabled={isLoadingGuest}>
              {!isLoadingGuest ? "Use a Guest Account" : "Logging in..."}
            </button>
          )}
          {!isSignUp ? (
            <h4>
              Try the app without creating an account by using a guest account.
              Want your own account?{" "}
              <span className={styles.forSignUp} onClick={handleAuthType}>
                Sign up now.
              </span>
            </h4>
          ) : (
            <h4>
              Already have an account or want to use a guest account?{" "}
              <span className={styles.forLogIn} onClick={handleAuthType}>
                Log in.
              </span>
            </h4>
          )}
        </form>
      </main>
    </div>
  );
};

export default AuthPage;
