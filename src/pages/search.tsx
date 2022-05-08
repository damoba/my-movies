import styles from "../styles/Search.module.css";

import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/authProvider";
import { useRouter } from "next/router";
import axios from "../config/axios";
import { fetchSearchResults, filterList } from "../config/requests";
import { Movie } from "../../typings";
import Message from "../components/Message/Message";
import SearchResults from "../components/SearchResults/SearchResults";
import Loader from "../components/Loader/Loader";

interface Props {
  matchingMovies: Movie[];
}

const SearchPage: NextPage<Props> = ({ matchingMovies }) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);

  /**
   * When the new search is loaded, stop the loader display
   */
  useEffect(() => {
    setNextPageIsLoading(false);
  }, [matchingMovies]);

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  return (
    <div className={styles.searchPage}>
      {user && (
        <>
          <Head>
            <title>My Movies - search results</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {nextPageIsLoading && <Loader />}
          <Header
            setNextPageIsLoading={setNextPageIsLoading}
            homeIsCurrentPage={false}
            collectionIsCurrentPage={false}
          />
          {matchingMovies.length === 0 ? (
            <Message text="No movies match your query." style={null} />
          ) : (
            <SearchResults results={matchingMovies} />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  var matchingMovies = [];
  const query = context.query.query;

  if (query) {
    const matchingMoviesResponse = await axios.get(
      fetchSearchResults(query.toString())
    );
    matchingMovies = await filterList(matchingMoviesResponse.data.results);
  }

  return {
    props: {
      matchingMovies,
    },
  };
};
