import styles from "../styles/Home.module.css";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, { filterList } from "../config/requests";
import { Movie } from "../../typings";
import { useState } from "react";
import List from "../components/List/List";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

interface Props {
  featuredMovie: Movie;
  trendingMovies: Movie[];
  topRatedMovies: Movie[];
}

const IndexPage: NextPage<Props> = ({
  featuredMovie,
  trendingMovies,
  topRatedMovies,
}) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie>(featuredMovie);
  const [selectedMovieIntro, setSelectedMovieIntro] = useState<string>(
    "One of this Week's Trending Films"
  );

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

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
            selectedMovie={selectedMovie}
            selectedMovieIntro={selectedMovieIntro}
          />
          <List
            isGradientBackground={true}
            title="Trending Now"
            movieList={trendingMovies}
            setSelectedMovie={setSelectedMovie}
            setSelectedMovieIntro={setSelectedMovieIntro}
          />
          <List
            isGradientBackground={false}
            title="Top Rated"
            movieList={topRatedMovies}
            setSelectedMovie={setSelectedMovie}
            setSelectedMovieIntro={setSelectedMovieIntro}
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
  const trendingMovies = await filterList(trendingMoviesResponse.data.results);
  const featuredMovie =
    trendingMovies[Math.floor(Math.random() * trendingMovies.length)];

  const topRatedMoviesResponse = await axios.get(requests.fetchTopRatedMovies);
  const topRatedMovies = await filterList(topRatedMoviesResponse.data.results);

  return {
    props: {
      featuredMovie,
      trendingMovies,
      topRatedMovies,
    },
  };
};
