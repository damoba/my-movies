import styles from "../styles/Auth.module.css";

import type { NextPage } from "next";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  names,
} from "unique-names-generator";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";

const MAIN_BUTTON_TYPE = "main";
const GUEST_BUTTON_TYPE = "guest";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  if (user) router.push("/");

  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingMain, setIsLoadingMain] = useState<boolean>(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  /**
   * Toggles the authentication type between login and signup
   */
  const handleAuthType = () => {
    setIsSignup(!isSignup);
  };

  /**
   * Registers the user. It uses the button type to know whether a main
   * button or the guest button was used.
   * @param {string} buttonType Type of button (e.g. "main")
   * @param {string} email Email being signed up
   * @param {string} password Password being used for account
   */
  const signUp = (buttonType: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error.message);
      if (buttonType === MAIN_BUTTON_TYPE) {
        setIsLoadingMain(false);
      } else {
        setIsLoadingGuest(false);
      }
    });
  };

  /**
   * Logs in the user.
   */
  const logIn = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).catch((error) => {
      alert(error.message);
      setIsLoadingMain(false);
    });
  };

  /**
   * Handles the click of an auth button. Whether the action is a signup or login,
   * the respective function is called.
   * @param {React.FormEvent<HTMLFormElement>} e Event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingMain(true);

    if (isSignup) {
      signUp(
        MAIN_BUTTON_TYPE,
        emailRef.current.value,
        passwordRef.current.value
      );
    } else {
      logIn();
    }
  };

  /**
   * Generates a fake email for the guest.
   * @returns {string} Fake email (e.g. "TypicalPandaNell@guest.guest")
   */
  const generateGuestEmail = (): string => {
    const localPart = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, names],
      separator: "",
      style: "capital",
    });
    const domainPart = "@guest.guest";
    return localPart + domainPart;
  };

  /**
   * Generates a password for the guest.
   * @param {number} length Password length (e.g. 12)
   * @returns {string} Password
   */
  const generateGuestPassword = (length: number): string => {
    const CHARACTERS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    var password = "";
    for (var i = 0; i < length; i++) {
      password += CHARACTERS.charAt(
        Math.floor(Math.random() * CHARACTERS.length)
      );
    }
    return password;
  };

  /**
   * Guest credentials are generated and guest account gets created for user.
   * @param {React.MouseEvent<HTMLButtonElement>} e Event
   */
  const handleGuestLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingGuest(true);
    signUp(GUEST_BUTTON_TYPE, generateGuestEmail(), generateGuestPassword(12));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.logo}>My Movies</header>
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input ref={emailRef} placeholder="Email" type="email" />
            <span
              className={styles.showPasswordToggler}
              onClick={() => setShowPassword(!showPassword)}
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
              ref={passwordRef}
              placeholder="Password"
              type={!showPassword ? "password" : "text"}
            />
            <button
              type="submit"
              style={
                !isSignup
                  ? { backgroundColor: "#3cb19f" }
                  : { backgroundColor: "#ec215f" }
              }
              disabled={isLoadingMain}
            >
              {!isLoadingMain
                ? isSignup
                  ? "Create Account"
                  : "Log In"
                : isSignup
                ? "Creating account..."
                : "Logging in..."}
            </button>
          </form>
          {!isSignup && (
            <button
              className={styles.guest}
              disabled={isLoadingGuest}
              onClick={handleGuestLogIn}
            >
              {!isLoadingGuest ? "Use a Guest Account" : "Setting up..."}
            </button>
          )}
          {!isSignup ? (
            <>
              <h4>
                Try the app without creating an account by clicking on "Use a
                Guest Account".{" "}
              </h4>
              <h4>
                {" "}
                Want your own account?{" "}
                <span className={styles.forSignUp} onClick={handleAuthType}>
                  Sign up now.
                </span>
              </h4>
            </>
          ) : (
            <h4>
              Already have an account or want to use a guest account?{" "}
              <span className={styles.forLogIn} onClick={handleAuthType}>
                Log in.
              </span>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
