import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";

const IndexPage: NextPage = () => {
  const { user } = useAuth();
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
          <Header />
          <div style={{ backgroundColor: "#4ca1af", color:"yellow"}}>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndexPage;
