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

const GUEST_INNER_HTML = "Use a Guest Account";
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
   */
  const signUp = (buttonType: string) => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).catch((error) => {
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
   * Handles the click of an auth button. If it's the guest button, the
   * guest credentials are generated and then the signup continues. If
   * it's a regular signup or login, the respective functions are called.
   * @param {React.FormEvent<HTMLFormElement>} e Event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (document.activeElement.innerHTML === GUEST_INNER_HTML) {
      setIsLoadingGuest(true);
      emailRef.current.value = generateGuestEmail();
      passwordRef.current.value = generateGuestPassword(12);
      signUp(GUEST_BUTTON_TYPE);
      return;
    }

    setIsLoadingMain(true);

    if (isSignup) {
      signUp(MAIN_BUTTON_TYPE);
    } else {
      logIn();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Movies - log in or sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.logo}>My Movies</header>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
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
          {!isSignup && (
            <button className={styles.guest} disabled={isLoadingGuest}>
              {!isLoadingGuest ? GUEST_INNER_HTML : "Logging in..."}
            </button>
          )}
          {!isSignup ? (
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
      </div>
    </div>
  );
};

export default AuthPage;
