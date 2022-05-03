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

interface Props {
  featuredMovie: Movie;
  topRatedMovies: Movie[];
  trendingMovies: Movie[];
}

const IndexPage: NextPage<Props> = ({
  featuredMovie,
  topRatedMovies,
  trendingMovies,
}) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState<Movie>(featuredMovie);
  const [selectedMovieIntro, setSelectedMovieIntro] = useState<string>(
    "One of Today's Featured Films"
  );

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  return (
    <div style={{overflowX: "hidden"}}>
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
          <List
            isGradientBackground={true}
            title="Top Rated"
            movieList={topRatedMovies}
            setSelectedMovie={setSelectedMovie}
            setSelectedMovieIntro={setSelectedMovieIntro}
          />
          <List
            isGradientBackground={false}
            title="Trending Now"
            movieList={trendingMovies}
            setSelectedMovie={setSelectedMovie}
            setSelectedMovieIntro={setSelectedMovieIntro}
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
