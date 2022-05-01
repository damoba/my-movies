import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, { filterList } from "../config/api";
import { Movie } from "../../typings";
import { useState } from "react";

interface Props {
  featuredMovie: Movie;
  trendingMovies: Movie[];
  topRatedMovies: Movie[];
}

const IndexPage: NextPage<Props> = ({ featuredMovie }) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState<Movie>(featuredMovie);
  const [selectedMovieIntro, setSelectedMovieIntro] = useState<string>(
    "One of Today's Featured Films"
  );

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  return (
    <div>
      {user && (
        <>
          <Head>
            <title>My Movies</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <FeaturedMovie
            selectedMovie={selectedMovie}
            selectedMovieIntro={selectedMovieIntro}
          />
        </>
      )}
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const topRatedMoviesResponse = await axios.get(requests.fetchTopRatedMovies);
  const topRatedMovies = await filterList(topRatedMoviesResponse.data.results);
  const featuredMovie =
    topRatedMovies[Math.floor(Math.random() * topRatedMovies.length)];

  const trendingMoviesResponse = await axios.get(requests.fetchTrendingMovies);
  const trendingMovies = await filterList(trendingMoviesResponse.data.results);

  return {
    props: {
      featuredMovie,
      topRatedMovies,
      trendingMovies,
    },
  };
};
