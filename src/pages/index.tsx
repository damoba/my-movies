import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { Movie } from "../../typings";
import Header from "../components/Header/Header";

const IndexPage: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);

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
          <Header setLoading={setLoading} setSearchResults={setSearchResults}/>
        </>
      )}
    </div>
  );
};

export default IndexPage;
