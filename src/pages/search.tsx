import styles from "../styles/Search.module.css";

import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/authProvider";
import { useRouter } from "next/router";
import axios from "../config/axios";
import {
  fetchMovie,
  fetchRecommendedMovies,
  fetchSearchResults,
  fetchSimilarMovies,
  filterList,
  filterMovie,
} from "../config/requests";
import { Movie } from "../../typings";
import Message from "../components/Message/Message";
import SearchResults from "../components/Results/Results";
import Loader from "../components/Loader/Loader";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import List from "../components/List/List";

interface Props {
  matchingMovies: Movie[];
  similarMovies: Movie[];
  searchedMovie: Movie;
  recommendedMovies: Movie[];
}

const SearchPage: NextPage<Props> = ({
  matchingMovies,
  searchedMovie,
  similarMovies,
  recommendedMovies,
}) => {
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

  /**
   * When the back or forward button are pressed, set page to loading
   * @param {PopStateEvent} e Event
   */
  window.onpopstate = (e: PopStateEvent) => {
    setNextPageIsLoading(true);
  };

  /**
   * When the refresh button is pressed, set page to loading
   * @param {BeforeUnloadEvent} e Event
   */
  window.onbeforeunload = (e: BeforeUnloadEvent) => {
    setNextPageIsLoading(true);
  };

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
            searchedMovie === null ? (
              <Message text="No movies match your query." style={null} />
            ) : (
              <>
                <FeaturedMovie
                  selectedMovie={searchedMovie}
                  selectedMovieIntro={null}
                />
                {similarMovies.length > 0 && (
                  <List
                    isGradientBackground={true}
                    title="Similar Movies"
                    movieList={similarMovies}
                    setNextPageIsLoading={setNextPageIsLoading}
                  />
                )}
                {recommendedMovies.length > 0 && (
                  <List
                    isGradientBackground={false}
                    title="Recommended For You"
                    movieList={recommendedMovies}
                    setNextPageIsLoading={setNextPageIsLoading}
                  />
                )}
              </>
            )
          ) : (
            <SearchResults
              results={matchingMovies}
              setNextPageIsLoading={setNextPageIsLoading}
              title="Search Results"
              isCollection={false}
            />
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
  var searchedMovie = null;
  var similarMovies = [];
  var recommendedMovies = [];
  const query = context.query.query;
  const id = context.query.id;

  if (query) {
    const matchingMoviesResponse = await axios.get(
      fetchSearchResults(query.toString())
    );
    matchingMovies = await filterList(matchingMoviesResponse.data.results);
  } else if (id) {
    const searchedMovieResponse = await axios.get(
      fetchMovie(parseInt(id as string))
    );
    searchedMovie = filterMovie({
      ...searchedMovieResponse.data,
      index: 0,
    });

    const similarMoviesResponse = await axios.get(
      fetchSimilarMovies(parseInt(id as string))
    );
    similarMovies = await filterList(similarMoviesResponse.data.results);

    const recommendedMoviesResponse = await axios.get(
      fetchRecommendedMovies(parseInt(id as string))
    );
    recommendedMovies = await filterList(
      recommendedMoviesResponse.data.results
    );
  }

  return {
    props: {
      matchingMovies,
      searchedMovie,
      similarMovies,
      recommendedMovies,
    },
  };
};
