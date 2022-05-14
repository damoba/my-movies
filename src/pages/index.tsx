import styles from "../styles/Home.module.css";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, {
  fetchMovieForFeatured,
  filterHomeList,
  filterMovieForFeatured,
} from "../config/requests";
import { MovieFromFeatured, MovieFromListItem } from "../../typings";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import HomeList from "../components/HomeList/HomeList";

interface Props {
  featuredMovie: MovieFromFeatured;
  trendingMovies: MovieFromListItem[];
  topRatedMovies: MovieFromListItem[];
  actionMovies: MovieFromListItem[];
  dramaMovies: MovieFromListItem[];
  comedyMovies: MovieFromListItem[];
  romanceMovies: MovieFromListItem[];
  documentaryMovies: MovieFromListItem[];
}

const FEATURED_MOVIE_INTRO = "One of this Week's Trending Films";

const IndexPage: NextPage<Props> = ({
  featuredMovie,
  trendingMovies,
  topRatedMovies,
  actionMovies,
  dramaMovies,
  comedyMovies,
  romanceMovies,
  documentaryMovies,
}) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();
  const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  /**
   * When the back or forward button is pressed, set page to loading
   */
  window.onpopstate = () => {
    setNextPageIsLoading(true);
  };

  /**
   * When the refresh button is pressed, set page to loading
   */
  window.onbeforeunload = () => {
    setNextPageIsLoading(true);
  };

  return (
    <div className={styles.homePage}>
      {user && (
        <>
          <Head>
            <title>My Movies</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {nextPageIsLoading && <Loader />}
          <Header
            setNextPageIsLoading={setNextPageIsLoading}
            homeIsCurrentPage={true}
            collectionIsCurrentPage={false}
          />
          <FeaturedMovie
            selectedMovie={featuredMovie}
            selectedMovieIntro={FEATURED_MOVIE_INTRO}
          />
          <HomeList
            isGradientBackground={true}
            isLast={false}
            isPoster={true}
            title="Trending Now"
            movieList={trendingMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={false}
            isPoster={false}
            title="Top Rated"
            movieList={topRatedMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={false}
            isPoster={false}
            title="Action Movies"
            movieList={actionMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={false}
            isPoster={false}
            title="Drama Movies"
            movieList={dramaMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={false}
            isPoster={false}
            title="Comedy Movies"
            movieList={comedyMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={false}
            isPoster={false}
            title="Romance Movies"
            movieList={romanceMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <HomeList
            isGradientBackground={false}
            isLast={true}
            isPoster={false}
            title="Documentaries"
            movieList={documentaryMovies}
            setNextPageIsLoading={setNextPageIsLoading}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const trendingMoviesResponse = await axios.get(requests.fetchTrendingMovies);
  const featuredMovieId =
    trendingMoviesResponse.data.results[
      Math.floor(Math.random() * trendingMoviesResponse.data.results.length)
    ].id;
  var trendingMovies = await filterHomeList(
    trendingMoviesResponse.data.results,
    featuredMovieId
  );

  const featuredMovieResponse = await axios.get(
    fetchMovieForFeatured(featuredMovieId)
  );
  const featuredMovie = filterMovieForFeatured(featuredMovieResponse.data);

  const topRatedMoviesResponse = await axios.get(requests.fetchTopRatedMovies);
  const topRatedMovies = await filterHomeList(
    topRatedMoviesResponse.data.results,
    featuredMovieId
  );

  const actionMoviesResponse = await axios.get(requests.fetchActionMovies);
  const actionMovies = await filterHomeList(
    actionMoviesResponse.data.results,
    featuredMovieId
  );

  const dramaMoviesResponse = await axios.get(requests.fetchDramaMovies);
  const dramaMovies = await filterHomeList(
    dramaMoviesResponse.data.results,
    featuredMovieId
  );

  const comedyMoviesResponse = await axios.get(requests.fetchComedyMovies);
  const comedyMovies = await filterHomeList(
    comedyMoviesResponse.data.results,
    featuredMovieId
  );

  const romanceMoviesResponse = await axios.get(requests.fetchRomanceMovies);
  const romanceMovies = await filterHomeList(
    romanceMoviesResponse.data.results,
    featuredMovieId
  );

  const documentaryMoviesResponse = await axios.get(
    requests.fetchDocumentaryMovies
  );
  const documentaryMovies = await filterHomeList(
    documentaryMoviesResponse.data.results,
    featuredMovieId
  );

  return {
    props: {
      featuredMovie,
      trendingMovies,
      topRatedMovies,
      actionMovies,
      dramaMovies,
      comedyMovies,
      romanceMovies,
      documentaryMovies,
    },
  };
};
