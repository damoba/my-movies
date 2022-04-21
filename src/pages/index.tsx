import styles from "../styles/Home.module.css";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider";

const IndexPage: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  /**
   * If a user is not logged in, they are sent to auth page.
   */
  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user]);

  return (
    <div>
      {user && (
        <>
          <Head>
            <title>My Movies</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* <button onClick={logout}>Sign out</button> */}
        </>
      )}
    </div>
  );
};

export default IndexPage;
